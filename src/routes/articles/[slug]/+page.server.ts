import { error } from "@sveltejs/kit";
import { readFileSync } from "node:fs";
import path from "node:path";
import frontMatter from "front-matter";
import { marked } from "marked";

const articlesDir = path.join("src", "lib", "articles");

export function load({ params }) {
  const { slug } = params;
  const markdownPath = path.join(articlesDir, `${slug}.md`);

  console.log(markdownPath)
  try {
    const fileContent = readFileSync(markdownPath, "utf-8");
    console.log(fileContent)

    const { attributes, body } = frontMatter(fileContent);

    const content = marked.parse(body);

    return {
      post: {
        ...attributes, 
        content, 
      },
    };
  } catch (err) {
    console.error(`Could not load article for slug: ${slug}`, err);
    throw error(404, "Article not found");
  }
}
