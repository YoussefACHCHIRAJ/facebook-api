# @achchiraj/facebook-api

The facebook-api is a package designed to simplify interactions with the Facebook Graph API. It provides pre-defined packages for commonly used functionalities and enums for frequently used metrics and periods.

## Installation

Install the package via npm:

```bash
npm install @achchiraj/facebook-api
```

## Example of usage

```javascript
const { FacebookPageApi } = require("@achchiraj/facebook-api");

// Create an instance of FbPageApi
// const fbApi = facebookPageApi('your-app-id', 'your-app-secret', 'optional-api-version');

// Call the userInfo method with the access token
const userInfos = await FacebookPageApi.userInfo(accessToken);
// Log the user information to the console
console.log(userInfos);

// Call the accountPages method with the access token and the fields needed
const facebookPages = await FacebookPageApi.accountPages(
  accessToken,
  "picture, name, access_token"
);
// Log the facebook pages
console.log(facebookPages);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Available Functions

### Personal Account Functions :

```javascript
exchangeToken(shortAccessToken: string, version?: string)
```

Exchange a short-lived access token for a long-lived one.

- `shortAccessToken`: Short-lived access token to exchange.
- `version`: version of the api (default: 'v20.0')

```javascript
userInfo(accessToken: string, fields?: string, version?: string)
```

Fetch user information from Facebook.

- `accessToken`: Access token of the user.
- `fields`: Fields to retrieve (default: "name,picture").
- `version`: version of the api (default: 'v20.0')

```javascript
accountPages(access_token: string, fields?: string, version?: string)
```

Get information about the Facebook pages associated with the user.

- `access_token`: Access token of the user.
- `fields`: Fields to retrieve (default: "picture, category_list,category, tasks, name, access_token").
- `version`: version of the api (default: 'v20.0')

### Facebook Page Functions :

```javascript
pageDetails(pageId: string, pageAccessToken: string, fields?: string)
```

Get page's details.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve (default: "about,attire,bio,location,parking,hours,emails,website").

```javascript
pageReviews(pageId: string, pageAccessToken: string) : Promise<IFbPageReviews[]>
```

Get page's reviews.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.

Object format:

```javascript
[
  {
    created_time: string;
    recommendation_type: "positive" | "negative";
    review_text: string;
    reviewer: {
      name: string;
      id: string;
    };
  }
];
```

```javascript
pagePosts(pageId: string, pageAccessToken: string, fields?: string, version?: string)
```

Get posts from a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve (default: "full_picture,message,permalink_url,created_time,likes.summary(true),comments.summary(true),shares").
- `version`: version of the api (default: 'v20.0')

```javascript
pageLikes(pageId: string, pageAccessToken: string, version?: string)
```

Get the number of likes on a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `version`: version of the api (default: 'v20.0')

```javascript
pageAnalytics(pageId: string, pageAccessToken: string, date_preset?: PageInsightsDatePreset, period?: PageInsightsPeriod, version?: string)
```

Get analytics for a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.this_year`).
- `period`: Period for insights (default: `PageInsightsPeriod.month`).
- `version`: version of the api (default: 'v20.0')

```javascript
pageWeeklyStats(pageId: string, pageAccessToken: string, date_preset?: PageInsightsDatePreset, period?: PageInsightsPeriod, metric?: string, version?: string)
```

Get weekly statistics for a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.last_week_mon_sun`).
- `period`: Period for insights (default: `PageInsightsPeriod.day`).
- `metric`: Metrics to retrieve (default: "page_post_engagements,page_impressions, page_daily_follows_unique").
- `version`: version of the api (default: 'v20.0')

### Facebook Page Posts Functions :

```javascript
shareTextPostToPage(pageAccessToken: string, payload: ITextPostFbPayload, pageId: string, version?: string)
```

Share a text post to a Facebook page.

- `pageAccessToken`: Access token of the page.
- `payload`: Payload of the text post.
- `pageId`: ID of the page to post to.
- `version`: version of the api (default: 'v20.0')

Example:

```javascript
const payload = {
  message: "Hello, world!",
  published: true,
  scheduled_publish_time: "2024-06-15T12:00:00Z",
};
```

```javascript
pagePostsReactions(pageId: string, pageAccessToken: string, date_preset?: PageInsightsDatePreset period?: PageInsightsPeriod, metric?: string, version?: string)
```

Get reactions to posts on a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.this_year`).
- `period`: Period for insights (default: `PageInsightsPeriod.week`).
- `metric`: Metrics to retrieve (default: "page_actions_post_reactions_like_total, page_actions_post_reactions_love_total, page_actions_post_reactions_wow_total").
- `version`: version of the api (default: 'v20.0')

```javascript
pageScheduledPosts(pageId: string, pageAccessToken: string, fields?: string, version?: string)
```

Get scheduled posts from a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve (default: "full_picture,message,permalink_url,created_time, likes.summary(true),comments.summary(true),shares").
- `version`: version of the api (default: 'v20.0')

```javascript
deleteFacebookPagePost(postId: string, pageAccessToken: string, version?: string)
```

Delete a post from a Facebook page.

- `postId`: ID of the post to delete.
- `pageAccessToken`: Access token of the page.
- `version`: version of the api (default: 'v20.0')

### Facebook Page Post Comments Functions :

```javascript
pagePostComments(pagePostId: string, pageAccessToken: string, fields?: string, version?: string)
```

Get comments on a post from a Facebook page.

- `pagePostId`: ID of the post.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve for comments (default: "from,message").
- `version`: version of the api (default: 'v20.0')

```javascript
commentOnPost(postId: string, pageAccessToken: string,comment: string, version?: string)
```

Delete a comment from a post on a Facebook page.

- `postId`: ID of the post.
- `pageAccessToken`: Access token of the page.
- `comment`: The comment content.
- `version`: version of the api (default: 'v20.0')

```javascript
deleteComment(commentId: string, pageAccessToken: string, version?: string)
```

Delete a comment from a post on a Facebook page.

- `commentId`: ID of the comment to delete.
- `pageAccessToken`: Access token of the page.
- `version`: version of the api (default: 'v20.0')

```javascript
replyOnFacebookComment(commentId: string, pageAccessToken: string, reply: string, version?: string)
```

Reply to a comment on a post on a Facebook page.

- `commentId`: ID of the comment to reply to.
- `pageAccessToken`: Access token of the page.
- `reply`: Reply message.
- `version`: version of the api (default: 'v20.0')

## Enums

### `PageInsightsDatePreset`

An enum representing various date presets for Facebook page insights.

- `today`: Today
- `yesterday`: Yesterday
- `this_month`: This month
- `last_month`: Last month
- `this_quarter`: This quarter
- `maximum`: Maximum
- `data_maximum`: Data maximum
- `last_3d`: Last 3 days
- `last_7d`: Last 7 days
- `last_14d`: Last 14 days
- `last_28d`: Last 28 days
- `last_30d`: Last 30 days
- `last_90d`: Last 90 days
- `last_week_mon_sun`: Last week (Monday to Sunday)
- `last_week_sun_sat`: Last week (Sunday to Saturday)
- `last_quarter`: Last quarter
- `last_year`: Last year
- `this_week_mon_today`: This week (Monday to today)
- `this_week_sun_today`: This week (Sunday to today)
- `this_year`: This year

### `PageInsightsPeriod`

An enum representing various periods for Facebook page insights.

- `day`: Day
- `week`: Week
- `days_28`: 28 days
- `month`: Month
- `lifetime`: Lifetime
- `total_over_range`: Total over range
