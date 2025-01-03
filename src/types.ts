/**
 * Article Types
 */

export interface ArticleCardProps {
	href: string;
	article: BackendArticle;
}

type website = "htcondor" | "path" | "osg" | "chtc" | "pelican"
type tag = "chtc_featured_article"
type article_type = "news" | "user";

export interface Image {
	path: string;
	alt: string;
}

export interface Article {
	content: string;
	title: string;
	author: string;
	date: Date;
	publish_on: website[];
	type: article_type;
	tag: tag;
	image: Image;
	excerpt: string;
	banner_src: string;
	banner_alt: string;
}

export interface BackendArticle extends Article {
	slug: string[];
	path: string;
}