# GitHub-WebHook-Forwarder
GitHub's 'push' webhook requests make no distinction between branches, so commits to ANY branch will set off your webhook. This is a quick NodeJS app that acts as a middleman between GitHub and your webhook endpoint, forwarding all verified requests except for pushes to non-main branches. 

# Setup
1. Install [NodeJS](https://nodejs.org/en/download/).
2. Execute `npm i` in the project directory to install dependencies.
3. Open `config.js` and insert your Repo details, webhook URL, and secret key. Make sure you include "/github" at the end of the webhook URL.
4. Start the app with `node app.js`.
