import matter from "gray-matter"
import {BackendArticle, website, tag, Image, article_type} from "../types";

function getSlug(path: string){
	const splitSlug = path.slice(0, -3).split("-")
	return [splitSlug[0], splitSlug[1], splitSlug[2], splitSlug.slice(3).join("-")]
}

function getDate(path: string){
	const splitSlug = path.slice(0, -3).split("-")
	return new Date(Date.parse(splitSlug.slice(0, 3).join("-")))
}

function isArticle(path: string){
	const regex = /\d\d\d\d-\d\d?-\d\d?-.*?\.md/g
	return path.search(regex) != -1
}

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

export async function getArticles(organization: string, repo: string, branch: string): Promise<BackendArticle[]> {
	const tree = await getTree(organization, repo, branch)
	const paths = getPaths(tree)

	// Filter out the non-article paths and pull down and parse the remote files
	return Promise.all(
			paths
					.filter((path) => isArticle(path))
					.map(async (path) => await getArticle(organization, repo, path, branch))
	)
}

export function filterArticles(articles: BackendArticle[], publish_on: website, type: article_type): BackendArticle[]{
	return articles.filter((x: BackendArticle) => x?.publish_on && x.publish_on.includes(publish_on) && x.type == type)
}

export async function getTree(organization: string, repo: string, branch: string): Promise<GitTree> {
	const url = `https://api.github.com/repos/${organization}/${repo}/git/trees/${branch}?recursive=1`
	const res = await fetch(url)
	const json = await res.json()
	return json as GitTree
}

export function getPaths(tree: GitTree) : string[] {
	return tree.tree.map((item) => item['path'])
}

export async function getRawFile(organization: string, repo: string, path: string, branch: string): Promise<string> {

	const url = new URL(`https://raw.githubusercontent.com/${organization}/${repo}/${branch}/${path}`)

	const res = await fetch(url, {headers: {"Accept": "application/vnd.github.raw"}})

	return await res.text()
}

export interface GitHubReleaseData {
	tag_name: string;
	target_commitish: string;
	body: string;
}

export interface ReleasePageProps {
	releaseData: GitHubReleaseData;
}

export interface GithubMilestoneData {
	title: string;
	state: "open" | "closed";
	created_at: string;
	updated_at: string;
	closed_at: string;
	due_on: string;
}

interface GitTreeItem {
	path: string;
	mode: string;
	type: string;
	sha: string;
	size: number;
	url: string;
}

interface GitTree {
	sha: string;
	url: string;
	tree: GitTreeItem[];
}

export default getArticles