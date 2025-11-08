import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  image: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
}

export async function load() {
  const articlesDir = "src/lib/articles";
  const files = fs.readdirSync(path.resolve(articlesDir));

  const articles = files
    .filter((file) => path.extname(file) === ".md")
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join(articlesDir, filename),
        "utf-8"
      );
      const { data } = matter(markdownWithMeta);
      const frontmatter = data as ArticleFrontmatter;

      return {
        slug: filename.replace(".md", ""),
        ...frontmatter,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    data: articles,
  };
}
