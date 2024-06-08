# Your Package Name

The ys-facebook-api is a package designed to simplify interactions with the Facebook Graph API. It provides pre-defined packages for commonly used functionalities and enums for frequently used metrics and periods.

## Installation

Install the package via npm:

```bash
npm install ys-facebook-api-1
```

## Example of usage

```code
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
