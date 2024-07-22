import axios from "axios";
import { IFbPageReviews, IPicturePostFbPayload, ITextPostFbPayload } from "./types/PageApi.types";
import { PageInsightsDatePreset, PageInsightsPeriod } from "./enums";

const fbRequest = axios.create({
  baseURL: "https://graph.facebook.com/",
});

const DEFAULT_API_VERSION = "v20.0";

export class FacebookPageApi {
  //* start Personal account apis
  public static async exchangeToken(
    shortAccessToken: string,
    app_id: string,
    app_secret: string,
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(`${version}/oauth/access_token`, {
        params: {
          grant_type: "fb_exchange_token",
          client_id: app_id,
          client_secret: app_secret,
          fb_exchange_token: shortAccessToken,
        },
      });
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed exchange short access token. Error details: " +
          errorMessage
      );
    }
  }

  static async userInfo(
    accessToken: string,
    fields: string = "name,picture",
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(`${version}/me`, {
        params: { access_token: accessToken, fields },
      });
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get user info. Error details: " + errorMessage
      );
    }
  }

  static async accountPages(
    access_token: string,
    fields: string = "picture, category_list,category, tasks, name, access_token",
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(`${version}/me/accounts`, {
        params: {
          access_token,
          fields,
        },
      });
      return data?.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get pages infos. Error details: " + errorMessage
      );
    }
  }
  //* end Personal account apis

  //* start Facebook Page apis
  static async pageDetails(
    pageId: string,
    access_token: string,
    fields: string = "about,attire,bio,location,parking,hours,emails,website"
  ) {
    try {
      const { data } = await fbRequest.get(`${pageId}`, {
        params: {
          fields,
          access_token,
        },
      });
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get page Details. Error details: " + errorMessage
      );
    }
  }

  static async pageReviews(
    pageId: string,
    access_token: string
  ): Promise<IFbPageReviews[]> {
    try {
      const { data } = await fbRequest.get(`${pageId}/ratings`, {
        params: {
          access_token,
        },
      });
      return data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get page Details. Error details: " + errorMessage
      );
    }
  }

  static async pageLikes(
    pageId: string,
    pageAccessToken: string,
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const {
        data: { fan_count },
      } = await fbRequest.get(`${version}/${pageId}`, {
        params: {
          access_token: pageAccessToken,
          fields: "fan_count",
        },
      });
      return fan_count;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get page likes count. Error details: " + errorMessage
      );
    }
  }

  static async pageAnalytics(
    pageId: string,
    pageAccessToken: string,
    date_preset: PageInsightsDatePreset = PageInsightsDatePreset.this_year,
    period: PageInsightsPeriod = PageInsightsPeriod.month,
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(
        `${version}/${pageId}/insights/page_impressions_unique`,
        {
          params: {
            access_token: pageAccessToken,
            date_preset,
            period,
          },
        }
      );
      return data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get page's analytics. Error details: " + errorMessage
      );
    }
  }

  static async pageWeeklyStats(
    pageId: string,
    pageAccessToken: string,
    date_preset: PageInsightsDatePreset = PageInsightsDatePreset.last_week_mon_sun,
    period: PageInsightsPeriod = PageInsightsPeriod.day,
    metric: string = "page_post_engagements,page_impressions,page_daily_follows_unique",
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(`${version}/${pageId}/insights`, {
        params: {
          access_token: pageAccessToken,
          date_preset,
          period,
          metric,
        },
      });
      return data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get page's weekly stats. Error details: " + errorMessage
      );
    }
  }
  //* end Facebook Page apis

  //* start Facebook Page posts apis

  static async shareTextPostToPage(
    pageId: string,
    pageAccessToken: string,
    payload: ITextPostFbPayload,
    version: string = DEFAULT_API_VERSION
  ): Promise<{ id: string }> {
    try {
      const { data } = await fbRequest.post(
        `${version}/${pageId}/feed`,
        payload,
        {
          params: { access_token: pageAccessToken },
        }
      );
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed to share text post. Error details: " + errorMessage
      );
    }
  }

  static async sharePicturePostToPage(
    pageId: string,
    pageAccessToken: string,
    payload: IPicturePostFbPayload,
    version: string = DEFAULT_API_VERSION
  ): Promise<{
    id: string;
    post_id: string;
  }> {
    try {
      const { data } = await fbRequest.post(
        `${version}/${pageId}/photos`,
        payload,
        {
          params: { access_token: pageAccessToken },
        }
      );
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed to share picture post. Error details: " + errorMessage
      );
    }
  }

  static async updateTextPostOfPage(
    postId: string,
    pageAccessToken: string,
    payload: { message: string },
    version: string = DEFAULT_API_VERSION
  ): Promise<{
    success: boolean;
  }> {
    try {
      const { data } = await fbRequest.post(`${version}/${postId}`, payload, {
        params: { access_token: pageAccessToken },
      });
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed to update this text post. Error details: " +
          errorMessage
      );
    }
  }

  static async deletePagePost(
    postId: string,
    pageAccessToken: string,
    version: string = DEFAULT_API_VERSION
  ): Promise<{ success: boolean }> {
    try {
      const { data } = await fbRequest.delete(`${version}/${postId}`, {
        params: {
          access_token: pageAccessToken,
        },
      });
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed delete page post. Error details: " + errorMessage
      );
    }
  }

  static async pagePostsReactions(
    pageId: string,
    pageAccessToken: string,
    date_preset: PageInsightsDatePreset = PageInsightsDatePreset.this_year,
    period: PageInsightsPeriod = PageInsightsPeriod.week,
    metric: string = "page_actions_post_reactions_like_total, page_actions_post_reactions_love_total, page_actions_post_reactions_wow_total",
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(`${version}/${pageId}/insights`, {
        params: {
          access_token: pageAccessToken,
          metric,
          date_preset,
          period,
        },
      });

      return data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get page post's reactions. Error details: " +
          errorMessage
      );
    }
  }

  static async pagePosts(
    pageId: string,
    pageAccessToken: string,
    fields: string = "full_picture,message,permalink_url,created_time,likes.summary(true),comments.summary(true),shares",
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(`${version}/${pageId}/feed`, {
        params: {
          access_token: pageAccessToken,
          fields,
        },
      });

      return data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get page's posts. Error details: " + errorMessage
      );
    }
  }

  static async pageScheduledPosts(
    pageId: string,
    pageAccessToken: string,
    fields: string = "full_picture,message,permalink_url,created_time, likes.summary(true),comments.summary(true),shares",
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(
        `${version}/${pageId}/scheduled_posts`,
        {
          params: {
            access_token: pageAccessToken,
            fields,
          },
        }
      );

      return data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get page's scheduled posts. Error details: " +
          errorMessage
      );
    }
  }
  //* end Facebook Page posts apis

  //* start Facebook Page post comments apis
  static async pagePostComments(
    pagePostId: string,
    pageAccessToken: string,
    fields: string = "from,message",
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.get(
        `${version}/${pagePostId}/comments`,
        {
          params: {
            fields,
            access_token: pageAccessToken,
          },
        }
      );
      return data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed get comments of this post. Error details: " +
          errorMessage
      );
    }
  }

  static async commentOnPost(
    pagePostId: string,
    pageAccessToken: string,
    comment: string,
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.post(
        `${version}/${pagePostId}/comments`,
        { message: comment },
        {
          params: {
            access_token: pageAccessToken,
          },
        }
      );
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed failed to comment on this post. Error details: " +
          errorMessage
      );
    }
  }

  static async deleteComment(
    commentId: string,
    pageAccessToken: string,
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.delete(`${version}/${commentId}`, {
        params: {
          access_token: pageAccessToken,
        },
      });
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed delete this comment. Error details: " + errorMessage
      );
    }
  }

  static async replyOnComment(
    commentId: string,
    pageAccessToken: string,
    reply: string,
    version: string = DEFAULT_API_VERSION
  ) {
    try {
      const { data } = await fbRequest.post(
        `${version}/${commentId}/comments`,
        { message: reply },
        {
          params: {
            access_token: pageAccessToken,
          },
        }
      );
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error;
      throw new Error(
        "Uh oh!, failed failed to reply on this comment. Error details: " +
          errorMessage
      );
    }
  }
  //* end Facebook Page post comments apis
}
