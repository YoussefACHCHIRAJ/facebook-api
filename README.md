# Your Package Name

The ys-facebook-api is a package designed to simplify interactions with the Facebook Graph API. It provides pre-defined packages for commonly used functionalities and enums for frequently used metrics and periods.

## Installation

Install the package via npm:

```bash
npm install ys-facebook-api-1
```

## Example of usage

```javascript
const express = require('express');
const { FbPageApi } = require('ys-facebook-api-1');
const app = express();

// Create an instance of FbPageApi
const fbApi = new FbPageApi('v19.0', 'your-app-id', 'your-app-secret');

// Define a route to test the package
app.get('/test-my-package/:accessToken', async (req, res) => {
    try {
        const { accessToken } = req.params;
        
        // Call the facebookUserInfoApi method with the provided access token
        const userInfos = await fbApi.facebookUserInfoApi(accessToken);
        
        // Log the user information to the console
        console.log(userInfos);
        
        // Send a response to the client
        res.send('Endpoint executed successfully');
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).send('An error occurred');
    }
});

// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
## Available Functions

### `facebookExchangeToken(shortAccessToken: string)`

Exchange a short-lived access token for a long-lived one.

- `shortAccessToken`: Short-lived access token to exchange.

### `facebookUserInfoApi(accessToken: string, fields: string = "name,picture")`

Fetch user information from Facebook.

- `accessToken`: Access token of the user.
- `fields`: Fields to retrieve (default: "name,picture").

### `facebookShareTextPostToPage(pageAccessToken: string, payload: ITextPostFbPayload, pageId: string)`

Share a text post to a Facebook page.

- `pageAccessToken`: Access token of the page.
- `payload`: Payload of the text post.
- `pageId`: ID of the page to post to.

### `facebookAccountPages(access_token: string, fields: string = "picture, category_list,category, tasks, name, access_token")`

Get information about the Facebook pages associated with the user.

- `access_token`: Access token of the user.
- `fields`: Fields to retrieve (default: "picture, category_list,category, tasks, name, access_token").

### `facebookPagePostsReactions(pageId: string, pageAccessToken: string, date_preset: PageInsightsDatePreset = PageInsightsDatePreset.this_year, period: PageInsightsPeriod = PageInsightsPeriod.week, metric: string = "page_actions_post_reactions_like_total, page_actions_post_reactions_love_total, page_actions_post_reactions_wow_total")`

Get reactions to posts on a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.this_year`).
- `period`: Period for insights (default: `PageInsightsPeriod.week`).
- `metric`: Metrics to retrieve (default: "page_actions_post_reactions_like_total, page_actions_post_reactions_love_total, page_actions_post_reactions_wow_total").

### `facebookPagePosts(pageId: string, pageAccessToken: string, fields: string = "full_picture,message,permalink_url,created_time,likes.summary(true),comments.summary(true),shares")`

Get posts from a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve (default: "full_picture,message,permalink_url,created_time,likes.summary(true),comments.summary(true),shares").

### `facebookPageScheduledPosts(pageId: string, pageAccessToken: string, fields: string = "full_picture,message,permalink_url,created_time, likes.summary(true),comments.summary(true),shares")`

Get scheduled posts from a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve (default: "full_picture,message,permalink_url,created_time, likes.summary(true),comments.summary(true),shares").

### `facebookPageLikes(pageId: string, pageAccessToken: string)`

Get the number of likes on a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.

### `facebookPageAnalytics(pageId: string, pageAccessToken: string, date_preset: PageInsightsDatePreset = PageInsightsDatePreset.this_year, period: PageInsightsPeriod = PageInsightsPeriod.month)`

Get analytics for a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.this_year`).
- `period`: Period for insights (default: `PageInsightsPeriod.month`).

### `facebookPageWeeklyStats(pageId: string, pageAccessToken: string, date_preset: PageInsightsDatePreset = PageInsightsDatePreset.last_week_mon_sun, period: PageInsightsPeriod = PageInsightsPeriod.day, metric: string = "page_post_engagements,page_impressions,page_daily_follows_unique")`

Get weekly statistics for a Facebook page.

- `pageId`: ID of the Facebook page.
- `pageAccessToken`: Access token of the page.
- `date_preset`: Date preset for insights (default: `PageInsightsDatePreset.last_week_mon_sun`).
- `period`: Period for insights (default: `PageInsightsPeriod.day`).
- `metric`: Metrics to retrieve (default: "page_post_engagements,page_impressions,page_daily_follows_unique").

### `deleteFacebookPagePost(postId: string, pageAccessToken: string)`

Delete a post from a Facebook page.

- `postId`: ID of the post to delete.
- `pageAccessToken`: Access token of the page.

### `facebookPagePostComments(pagePostId: string, pageAccessToken: string, fields: string = "from,message")`

Get comments on a post from a Facebook page.

- `pagePostId`: ID of the post.
- `pageAccessToken`: Access token of the page.
- `fields`: Fields to retrieve for comments (default: "from,message").

### `facebookDeleteComment(commentId: string, pageAccessToken: string)`

Delete a comment from a post on a Facebook page.

- `commentId`: ID of the comment to delete.
- `pageAccessToken`: Access token of the page.

### `replyOnFacebookComment(commentId: string, pageAccessToken: string, reply: string)`

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

