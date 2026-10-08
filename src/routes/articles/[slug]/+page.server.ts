import { error } from "@sveltejs/kit";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import frontMatter from "front-matter";
import { marked } from "marked";
import { findTeamMember } from "$lib/assets/data/teamMembersData";

const articlesDir = path.join("src", "lib", "assets", "markdown", "articles");

interface ArticleAttributes {
  title: string;
  description: string;
  date: string;
  image?: string;
  author?: string;
  draft?: boolean;
}

export function load({ params }) {
  const { slug } = params;
  const markdownPath = path.join(articlesDir, `${slug}.md`);

  let fileContent: string;
  try {
    fileContent = readFileSync(markdownPath, "utf-8");
  } catch (err) {
    console.error(`Could not load article for slug: ${slug}`, err);
    error(404, "Article not found");
  }

  const { attributes, body } = frontMatter<ArticleAttributes>(fileContent);
  if (attributes.draft) {
    error(404, "Article not found");
  }

  const member = attributes.author ? findTeamMember(attributes.author) : undefined;
  if (attributes.author && !member) {
    // Fail the build rather than silently publishing an article with a broken byline
    throw new Error(`Article "${slug}" has unknown author "${attributes.author}"`);
  }

  return {
    post: {
      ...attributes,
      author: member && { name: member.name, role: member.role, image: member.image },
      content: marked.parse(body, { async: false }),
    },
  };
}

export function entries() {
  return readdirSync(articlesDir)
    .filter((file: string) => file.endsWith(".md"))
    .filter((file: string) => !frontMatter<ArticleAttributes>(readFileSync(path.join(articlesDir, file), "utf-8")).attributes.draft)
    .map((file: string) => ({
      slug: file.replace(".md", ""),
    }));
}
