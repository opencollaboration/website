import { fail } from "@sveltejs/kit";
import { writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const partnersDir = path.join("src", "lib", "assets","markdown","partners");
const logosDir = path.join("static", "resources", "partnericons");

if (!existsSync(partnersDir)) {
  mkdirSync(partnersDir, { recursive: true });
}
if (!existsSync(logosDir)) {
  mkdirSync(logosDir, { recursive: true });
}

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const website = formData.get("website") as string;
    const description = (formData.get("description") as string) || "";
    const lightLogo = formData.get("lightLogo") as File;
    const darkLogo = formData.get("darkLogo") as File;
    const lightLogoHue = formData.get("lightLogoHue") as string;
    const darkLogoHue = formData.get("darkLogoHue") as string;
    const lightLogoInverted = formData.get("lightLogoInverted") as string; 
    const darkLogoInverted = formData.get("darkLogoInverted") as string;

    const errors: Record<string, string> = {};

    if (!name || name.trim().length === 0) {
      errors.name = "Partner name is required.";
    }
    if (!website) {
      errors.website = "Website URL is required.";
    } else {
      try {
        new URL(website);
      } catch {
        errors.website = "Please enter a valid URL.";
      }
    }
    if (!lightLogo || lightLogo.size === 0) {
      errors.lightLogo = "Light mode logo is required.";
    } else if (!ALLOWED_IMAGE_TYPES.includes(lightLogo.type)) {
      errors.lightLogo = "Invalid image format for light logo.";
    }
    if (!darkLogo || darkLogo.size === 0) {
      errors.darkLogo = "Dark mode logo is required.";
    } else if (!ALLOWED_IMAGE_TYPES.includes(darkLogo.type)) {
      errors.darkLogo = "Invalid image format for dark logo.";
    }
    if (Object.keys(errors).length > 0) {
      return fail(400, { errors });
    }

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const lightLogoExt = path.extname(lightLogo.name) || ".png";
    const darkLogoExt = path.extname(darkLogo.name) || ".png";

    const lightLogoFilename = `${slug}-light${lightLogoExt}`;
    const darkLogoFilename = `${slug}-dark${darkLogoExt}`;
    const markdownFilename = `${slug}.md`;

    const lightLogoDiskPath = path.join(logosDir, lightLogoFilename);
    const darkLogoDiskPath = path.join(logosDir, darkLogoFilename);
    const markdownPath = path.join(partnersDir, markdownFilename);

    const lightLogoPublicPath = `/resources/partnericons/${lightLogoFilename}`;
    const darkLogoPublicPath = `/resources/partnericons/${darkLogoFilename}`;

    const markdownContent = `---
name: "${name.replace(/"/g, '\\"')}"
website: "${website}"
slug: "${slug}"
lightLogo:
  path: "${lightLogoPublicPath}"
  hue: ${lightLogoHue}
  inverted: ${lightLogoInverted === "true"}
darkLogo:
  path: "${darkLogoPublicPath}"
  hue: ${darkLogoHue}
  inverted: ${darkLogoInverted === "true"}
---

${description}
`;

    try {
      await Promise.all([
        writeFile(
          lightLogoDiskPath,
          Buffer.from(await lightLogo.arrayBuffer())
        ),
        writeFile(darkLogoDiskPath, Buffer.from(await darkLogo.arrayBuffer())),
        writeFile(markdownPath, markdownContent),
      ]);
    } catch (err) {
      console.error(err);
      errors.server =
        "An error occurred while saving the partner data. Please try again.";
      return fail(500, { errors });
    }

    return {
      success: true,
      message: `Partner "${name}" added successfully!`,
    };
  },
};
