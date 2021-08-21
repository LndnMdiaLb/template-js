const { parsed: env } = require("dotenv").config();
const {
    API_key: consumer_key,
    API_secret_key: consumer_secret,
    Access_token: access_token,
    Access_token_secret: access_token_secret
  } = env;

const Twit = require("twit");
const interact = require("./twitter");

/*

    https://www.npmjs.com/package/twit
    https://github.com/ttezel/twit
    https://developer.twitter.com/en/docs/api-reference-index
    https://developer.twitter.com/en/docs/tweets/search/guides/standard-operators
    https://api.twitter.com/1.1/users/lookup.json?screen_name=turnofftheDOTtv

*/

var Twitter = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
  // strictSSL: true,         // optional - requires SSL certificates to be valid.
});

module.exports = interact(Twitter);
