import { fail } from "@sveltejs/kit";
import { writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const articlesDir = path.join("src", "lib", "articles");
const imagesDir = path.join("static", "articleImages");

if (!existsSync(articlesDir)) {
  mkdirSync(articlesDir, { recursive: true });
}
if (!existsSync(imagesDir)) {
  mkdirSync(imagesDir, { recursive: true });
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const image = formData.get("image") as File;

    const errors: Record<string, string> = {};

    if (!title || title.trim().length === 0) {
      errors.title = "Title is required.";
    }
    if (!description || description.trim().length === 0) {
      errors.description = "Description is required.";
    }
    if (!date) {
      errors.date = "Date is required.";
    }
    if (!image || image.size === 0) {
      errors.image = "Cover image is required.";
    } else if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        image.type
      )
    ) {
      errors.image = "Invalid image format. Please use JPG, PNG, WEBP, or GIF.";
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors });
    }

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const imageExtension = path.extname(image.name) || ".jpg";
    const imageFilename = `${slug}${imageExtension}`;
    const markdownFilename = `${slug}.md`;

    const imagePath = path.join(imagesDir, imageFilename);
    const markdownPath = path.join(articlesDir, markdownFilename);

    
    const markdownContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${date}"
image: "/articleImages/${imageFilename}"
---

<!-- Add your article content here -->
`;

    try {
      // --- Write Files to the Filesystem ---
      await writeFile(imagePath, Buffer.from(await image.arrayBuffer()));
      await writeFile(markdownPath, markdownContent);
    } catch (err) {
      console.error(err);
      errors.server =
        "An error occurred while saving the article. Please try again.";
      return fail(500, { errors });
    }

    return {
      success: true,
      message: `Article "${title}" created successfully!`,
    };
  },
};
