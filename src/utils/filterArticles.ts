import {article_type, BackendArticle, website} from "../types";

export function filterArticles(articles: BackendArticle[], publish_on: website, type: article_type): BackendArticle[]{
	return articles.filter((x: BackendArticle) => x?.publish_on && x.publish_on.includes(publish_on) && x.type == type)
}

export default filterArticles
