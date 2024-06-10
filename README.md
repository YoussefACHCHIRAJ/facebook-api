# @achchiraj/facebook-api

The facebook-api is a package designed to simplify interactions with the Facebook Graph API. It provides pre-defined packages for commonly used functionalities and enums for frequently used metrics and periods.

## Installation

Install the package via npm:

```bash
npm install @achchiraj/facebook-api
```

## Example of usage

```javascript
const { facebookPageApi } = require('@achchiraj/facebook-api');

// Create an instance of FbPageApi
const fbApi = facebookPageApi('your-app-id', 'your-app-secret', 'optional-api-version');

// Call the userInfoApi method with the access token
const userInfos = await fbApi.userInfo(accessToken);
// Log the user information to the console
console.log(userInfos);

// Call the accountPages method with the access token and the fields needed
const facebookPages = await fbApi.accountPages(accessToken, "picture, name, access_token");
// Log the facebook pages
console.log(facebookPages);
        

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
## Available Functions

```javascript 
exchangeToken(shortAccessToken: string)
```

Exchange a short-lived access token for a long-lived one.

- `shortAccessToken`: Short-lived access token to exchange.

```javascript 
userInfo(accessToken: string, fields?: string)
```

Fetch user information from Facebook.

- `accessToken`: Access token of the user.
- `fields`: Fields to retrieve (default: "name,picture").

```javascript 
shareTextPostToPage(pageAccessToken: string, payload: ITextPostFbPayload, pageId: string)
```

Share a text post to a Facebook page.

- `pageAccessToken`: Access token of the page.
- `payload`: Payload of the text post.
- `pageId`: ID of the page to post to.

Example:

```javascript
const payload = {
  message: "Hello, world!",
  published: true,
  scheduled_publish_time: "2024-06-15T12:00:00Z"
};
```

```javascript 
accountPages(access_token: string, fields?: string)
```

Get information about the Facebook pages associated with the user.

- `access_token`: Access token of the user.
- `fields`: Fields to retrieve (default: "picture, category_list,category, tasks, name, access_token").


```javascript 
pagePostsReactions(pageId: string, pageAccessToken: string, date_preset?: PageInsightsDatePreset period?: PageInsightsPeriod, metric?: string)
```

Get reactions to posts on a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.this_year`).
- `period`: Period for insights (default: `PageInsightsPeriod.week`).
- `metric`: Metrics to retrieve (default: "page_actions_post_reactions_like_total, page_actions_post_reactions_love_total, page_actions_post_reactions_wow_total").


```javascript 
pagePosts(pageId: string, pageAccessToken: string, fields?: string)
```

Get posts from a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve (default: "full_picture,message,permalink_url,created_time,likes.summary(true),comments.summary(true),shares").

```javascript 
pageScheduledPosts(pageId: string, pageAccessToken: string, fields?: string)
```

Get scheduled posts from a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve (default: "full_picture,message,permalink_url,created_time, likes.summary(true),comments.summary(true),shares").

```javascript 
pageLikes(pageId: string, pageAccessToken: string)
```

Get the number of likes on a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.

```javascript 
pageAnalytics(pageId: string, pageAccessToken: string, date_preset?: PageInsightsDatePreset, period?: PageInsightsPeriod)
```

Get analytics for a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.this_year`).
- `period`: Period for insights (default: `PageInsightsPeriod.month`).

```javascript 
pageWeeklyStats(pageId: string, pageAccessToken: string, date_preset?: PageInsightsDatePreset, period?: PageInsightsPeriod, metric?: string)
```

Get weekly statistics for a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.last_week_mon_sun`).
- `period`: Period for insights (default: `PageInsightsPeriod.day`).
- `metric`: Metrics to retrieve (default: "page_post_engagements,page_impressions,page_daily_follows_unique").

```javascript 
deleteFacebookPagePost(postId: string, pageAccessToken: string)
```

Delete a post from a Facebook page.

- `postId`: ID of the post to delete.
- `pageAccessToken`: Access token of the page.

```javascript 
pagePostComments(pagePostId: string, pageAccessToken: string, fields?: string)
```

Get comments on a post from a Facebook page.

- `pagePostId`: ID of the post.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve for comments (default: "from,message").

```javascript 
deleteComment(commentId: string, pageAccessToken: string)
```

Delete a comment from a post on a Facebook page.

- `commentId`: ID of the comment to delete.
- `pageAccessToken`: Access token of the page.

```javascript 
replyOnFacebookComment(commentId: string, pageAccessToken: string, reply: string)
```

Reply to a comment on a post on a Facebook page.

- `commentId`: ID of the comment to reply to.
- `pageAccessToken`: Access token of the page.
- `reply`: Reply message.

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

