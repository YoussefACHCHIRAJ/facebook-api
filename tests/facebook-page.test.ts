import { FacebookPageApi } from "../src/FacebookPageApi";
import dotenv from "dotenv";
import {  describe } from "node:test";

dotenv.config({ path: ".env.development" });

const fbAccessToken = process.env.FB_ACCESS_TOKEN!;

let postId: string;
let commentId: string;
let pageId: string;
let pageAccessToken: string;

jest.setTimeout(30000);

describe("Test FacebookPageApi", () => {
  test("Should get user info", async () => {
    const userInfo = await FacebookPageApi.userInfo(fbAccessToken, "id, name");
    expect(userInfo).toHaveProperty("id");
    expect(userInfo).toHaveProperty("name");
  });

  test("Should get account pages", async () => {
    const fbPages = await FacebookPageApi.accountPages(fbAccessToken);

    expect(Array.isArray(fbPages)).toBe(true);

    if (fbPages.length === 0) return;

    const { id, access_token } = fbPages[0];
    pageId = id;
    pageAccessToken = access_token;
    fbPages.forEach((page: any) => {
      expect(page).toHaveProperty("name");
      expect(page).toHaveProperty("access_token");
    });
  });
});

describe("Test facebook page api for a single page", () => {
  test("Should share text post to page", async () => {
    const payload = { message: "Test message" };
    const result = await FacebookPageApi.shareTextPostToPage(
      pageId,
      pageAccessToken,
      payload
    );
    expect(result).toHaveProperty("id");
    postId = result.id;
  });

  test("Should get page posts reactions", async () => {
    const reactions = await FacebookPageApi.pagePostsReactions(
      pageId,
      pageAccessToken
    );
    expect(Array.isArray(reactions)).toBe(true);

    reactions.forEach((reaction: any) => {
      expect(reaction).toHaveProperty("name");
      expect(reaction).toHaveProperty("period");
      expect(reaction).toHaveProperty("values");
      expect(Array.isArray(reaction.values)).toBe(true);
    });
  });

  test("Should get page posts", async () => {
    const pagePosts = await FacebookPageApi.pagePosts(pageId, pageAccessToken);

    expect(Array.isArray(pagePosts)).toBe(true);

    if (pagePosts.length === 0) return;

    pagePosts.forEach((pagePost: any) => {
      expect(pagePost).toHaveProperty("id");
      expect(pagePost).toHaveProperty("permalink_url");
      expect(pagePost).toHaveProperty("created_time");
    });
  });

  test("Should get page scheduled posts", async () => {
    const scheduledPosts = await FacebookPageApi.pageScheduledPosts(
      pageId,
      pageAccessToken
    );
    expect(Array.isArray(scheduledPosts)).toBe(true);

    if (scheduledPosts.length === 0) return;

    scheduledPosts.forEach((pagePost: any) => {
      expect(pagePost).toHaveProperty("id");
      expect(pagePost).toHaveProperty("message");
      expect(pagePost).toHaveProperty("created_time");
    });
  });

  test("Should get page likes", async () => {
    const likesCount = await FacebookPageApi.pageLikes(pageId, pageAccessToken);
    expect(Number.isInteger(likesCount)).toBe(true);
  });

  test("Should get page analytics", async () => {
    const analytics = await FacebookPageApi.pageAnalytics(
      pageId,
      pageAccessToken
    );
    // Add your assertions here based on the response structure
    expect(Array.isArray(analytics)).toBe(true);

    if (analytics.length === 0) return;

    analytics.forEach((analytic: any) => {
      expect(analytic).toHaveProperty("name");
      expect(analytic).toHaveProperty("period");
      expect(analytic).toHaveProperty("values");
      expect(Array.isArray(analytic.values)).toBe(true);
    });
  });

  test("Should get page weekly stats", async () => {
    const weeklyStats = await FacebookPageApi.pageWeeklyStats(
      pageId,
      pageAccessToken
    );
    // Add your assertions here based on the response structure
    expect(Array.isArray(weeklyStats)).toBe(true);

    if (weeklyStats.length === 0) return;

    weeklyStats.forEach((analytic: any) => {
      expect(analytic).toHaveProperty("name");
      expect(analytic).toHaveProperty("period");
      expect(analytic).toHaveProperty("values");
      expect(Array.isArray(analytic.values)).toBe(true);
    });
  });
});

describe("Test Facebook page api for posts and comments management", () => {
  test("Should get page post comments", async () => {
    const comments = await FacebookPageApi.pagePostComments(
      postId,
      pageAccessToken
    );

    expect(Array.isArray(comments)).toBe(true);

    if (comments.length === 0) return;

    comments.forEach((comment: any) => {
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("message");
      expect(comment).toHaveProperty("from");
      expect(comment.from).toHaveProperty("name");
    });
  });

  test("Should comment on a page post", async () => {
    const result = await FacebookPageApi.commentOnPost(
      postId,
      pageAccessToken,
      "make a simple comment"
    );
    expect(result).toHaveProperty("id");
    commentId = result.id;
  });

  test("Should reply on a comment", async () => {
    const result = await FacebookPageApi.replyOnComment(
      commentId,
      pageAccessToken,
      "reply on this comment"
    );
    expect(result).toHaveProperty("id");
  });

  test("Should delete a comment", async () => {
    const result = await FacebookPageApi.deleteComment(
      commentId,
      pageAccessToken
    );
    expect(result).toHaveProperty("success", true);
  });

  test("Should delete page post", async () => {
    const deleteResult = await FacebookPageApi.deletePagePost(
      postId,
      pageAccessToken
    );
    expect(deleteResult).toHaveProperty("success", true);
  });
});
