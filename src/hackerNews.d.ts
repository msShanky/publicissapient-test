declare interface NewsHit {
	author: string;
	comment_text: null;
	created_at: string;
	created_at_i: number;
	num_comments: number;
	objectID: string;
	parent_id: null | string;
	points: number;
	story_id: null | number;
	story_text: null | string;
	story_title: null | string;
	story_url: null | string;
	title: string;
	url: string;
}

declare interface FrontPageNews {
	hits: NewsHit[];
	exhaustiveNbHits: boolean;
	hitsPerPage: number;
	nbHits: number;
	nbPages: number;
	page: number;
	params: string;
	processingTimeMS: number;
	query: string;
}

declare type NewsState = {
	data: NewsHit[];
	isFetching: boolean;
	isError: boolean;
	error: string;
};
