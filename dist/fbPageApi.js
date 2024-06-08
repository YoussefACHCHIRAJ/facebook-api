"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FbPageApi = void 0;
const axios_1 = __importDefault(require("axios"));
const enums_1 = require("./enums");
const fbRequest = axios_1.default.create({
    baseURL: "https://graph.facebook.com/",
});
class FbPageApi {
    constructor(app_api_version, app_id, app_secret) {
        this.appVersion = app_api_version;
        this.appId = app_id;
        this.appSecret = app_secret;
    }
    facebookExchangeToken(shortAccessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get(`${this.appVersion}/oauth/access_token`, {
                    params: {
                        grant_type: "fb_exchange_token",
                        client_id: this.appId,
                        client_secret: this.appSecret,
                        fb_exchange_token: shortAccessToken,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed exchange short access token, details error: " + error);
            }
        });
    }
    facebookUserInfoApi(accessToken, fields = "name,picture") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get("me", {
                    params: { access_token: accessToken, fields },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get user info, details error: " + error);
            }
        });
    }
    facebookShareTextPostToPage(pageAccessToken, payload, pageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.post(`${this.appVersion}/${pageId}/feed`, payload, {
                    params: { access_token: pageAccessToken },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed to share text post, details error: " + error);
            }
        });
    }
    facebookAccountPages(access_token, fields = "picture, category_list,category, tasks, name, access_token") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get(`${this.appVersion}/me/accounts`, {
                    params: {
                        access_token,
                        fields,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get pages infos, details error: " + error);
            }
        });
    }
    facebookPagePostsReactions(pageId, pageAccessToken, date_preset = enums_1.PageInsightsDatePreset.this_year, period = enums_1.PageInsightsPeriod.week, metric = "page_actions_post_reactions_like_total, page_actions_post_reactions_love_total, page_actions_post_reactions_wow_total") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get(`${pageId}/insights`, {
                    params: {
                        access_token: pageAccessToken,
                        metric,
                        date_preset,
                        period,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get page post's reactions, details error: " + error);
            }
        });
    }
    facebookPagePosts(pageId, pageAccessToken, fields = "full_picture,message,permalink_url,created_time,likes.summary(true),comments.summary(true),shares") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get(`${this.appVersion}/${pageId}/feed`, {
                    params: {
                        access_token: pageAccessToken,
                        fields,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get page's posts, details error: " + error);
            }
        });
    }
    facebookPageScheduledPosts(pageId, pageAccessToken, fields = "full_picture,message,permalink_url,created_time, likes.summary(true),comments.summary(true),shares") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get(`${this.appVersion}/${pageId}/scheduled_posts`, {
                    params: {
                        access_token: pageAccessToken,
                        fields,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get page's scheduled posts, details error: " + error);
            }
        });
    }
    facebookPageLikes(pageId, pageAccessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: { fan_count }, } = yield fbRequest.get(`${pageId}`, {
                    params: {
                        access_token: pageAccessToken,
                        fields: "fan_count",
                    },
                });
                return fan_count;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get page likes count, details error: " + error);
            }
        });
    }
    facebookPageAnalytics(pageId, pageAccessToken, date_preset = enums_1.PageInsightsDatePreset.this_year, period = enums_1.PageInsightsPeriod.month) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get(`${pageId}/insights/page_impressions_unique`, {
                    params: {
                        access_token: pageAccessToken,
                        date_preset,
                        period,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get page's analytics, details error: " + error);
            }
        });
    }
    facebookPageWeeklyStats(pageId, pageAccessToken, date_preset = enums_1.PageInsightsDatePreset.last_week_mon_sun, period = enums_1.PageInsightsPeriod.day, metric = "page_post_engagements,page_impressions,page_daily_follows_unique") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get(`${pageId}/insights`, {
                    params: {
                        access_token: pageAccessToken,
                        date_preset,
                        period,
                        metric,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get page's weekly stats, details error: " + error);
            }
        });
    }
    deleteFacebookPagePost(postId, pageAccessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.delete(postId, {
                    params: {
                        access_token: pageAccessToken,
                    },
                });
                return data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed delete page post, details error: " + error);
            }
        });
    }
    facebookPagePostComments(pagePostId, pageAccessToken, fields = "from,message") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.get(`${pagePostId}/comments`, {
                    params: {
                        fields,
                        access_token: pageAccessToken,
                    },
                });
                return data.data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed get comments of this post, details error: " + error);
            }
        });
    }
    facebookDeleteComment(commentId, pageAccessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.delete(`${commentId}`, {
                    params: {
                        access_token: pageAccessToken,
                    },
                });
                return data.data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed delete this comment, details error: " + error);
            }
        });
    }
    replyOnFacebookComment(commentId, pageAccessToken, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield fbRequest.post(`${commentId}/comments`, { message: reply }, {
                    params: {
                        access_token: pageAccessToken,
                    },
                });
                return data.data;
            }
            catch (error) {
                throw new Error("Uh oh!, failed failed to reply on this comment, details error: " + error);
            }
        });
    }
}
exports.FbPageApi = FbPageApi;
