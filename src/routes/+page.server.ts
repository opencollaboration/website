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

interface PartnerLogo {
  path: string;
  hue: number;
  inverted: boolean;
}
interface PartnerFrontmatter {
  name: string;
  website: string;
  slug: string;
  lightLogo: PartnerLogo;
  darkLogo: PartnerLogo;
}
export interface Partner extends PartnerFrontmatter {
  description: string;
}

export async function load() {
  const articlesDir = "src/lib/assets/markdown/articles";
  const articleFiles = fs.readdirSync(path.resolve(articlesDir));
  const articles = articleFiles
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

  const partnersDir = "src/lib/assets/markdown/partners";
  const partnerFiles = fs.readdirSync(path.resolve(partnersDir));
  const partners = partnerFiles
    .filter((file) => path.extname(file) === ".md")
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join(partnersDir, filename),
        "utf-8"
      );
      const { data, content } = matter(markdownWithMeta);
      const frontmatter = data as PartnerFrontmatter;

      return {
        ...frontmatter,
        description: content.trim(),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    articles,
    partners,
  };
}