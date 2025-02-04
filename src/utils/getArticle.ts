import {BackendArticle, Image, tag, website} from "../types";
import matter from "gray-matter";
import {getRawFile} from "./getArticles";

export async function getArticle(organization: string, repo: string, path: string, branch: string): Promise<BackendArticle> {
	const text = await getRawFile(organization, repo, path, branch)
	const frontMatter = matter(text)

	return {
		path: path,
		slug: getSlug(path),
		date: getDate(path),
		content: frontMatter.content,
		title: frontMatter.data?.title as string,
		author: frontMatter.data?.author as string,
		publish_on: frontMatter.data?.publish_on as website[],
		type: frontMatter.data?.type as "news" | "user",
		tag: frontMatter.data?.tag as tag,
		image: frontMatter.data?.image as Image,
		excerpt: frontMatter.data?.excerpt as string,
		banner_src: frontMatter.data?.banner_src as string,
		banner_alt: frontMatter.data?.banner_alt as string
	}
}

function getSlug(path: string){
	const splitSlug = path.slice(0, -3).split("-")
	return [splitSlug[0], splitSlug[1], splitSlug[2], splitSlug.slice(3).join("-")]
}

function getDate(path: string){
	const splitSlug = path.slice(0, -3).split("-")
	return new Date(Date.parse(splitSlug.slice(0, 3).join("-")))
}

export default getArticle
