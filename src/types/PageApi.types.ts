//* general page's types
export interface IFbPageReviews {
  created_time: string;
  recommendation_type: "positive" | "negative";
  review_text: string;
  reviewer: {
    name: string;
    id: string;
  };
}


//* post's types
interface IBasePostFbPayload {
  published?: boolean;
  scheduled_publish_time?: string;
}

export interface ITextPostFbPayload extends IBasePostFbPayload {
  message: string;
}

export interface IPicturePostFbPayload extends IBasePostFbPayload {
  url: string;
}
