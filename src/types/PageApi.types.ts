export interface IFacebookPageTextPost {
  message: string;
  pagesDetails: {
    [key: string]: { isScheduled: boolean; publishDate: any };
  };
}

export interface ITextPostFbPayload {
  message: string;
  published?: boolean;
  scheduled_publish_time?: string;
}

export interface IFacebookPagePicturePost {
  message: string;
  image: any;
}

export interface ITextPostFbPayload {
  message: string;
  published?: boolean;
  scheduled_publish_time?: string;
}

export interface IUpdateFacebookPagePost {
  post: {
    message: string;
    postId: string;
    postUrl?: string;
    postImage?: string;
  };
  schedule: {
    scheduledDate: Date;
    scheduledStatus: {
      code: string;
      label: string;
    };
  };
}
