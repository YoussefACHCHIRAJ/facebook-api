export interface ITextPostFbPayload {
  message: string;
  published?: boolean;
  scheduled_publish_time?: string;
}

export interface IFbPageReviews {
  created_time: string;
  recommendation_type: "positive" | "negative";
  review_text: string;
  reviewer: {
    name: string;
    id: string;
  };
}
