# How to Capture EA Forum Credentials

This bot needs two sets of credentials:
1. **Auth token** (loginToken cookie) -- for reading posts and posting comments
2. **Algolia search keys** -- for searching posts

## 1. Auth Token (loginToken)

The EA Forum authenticates via a `loginToken` cookie. Tokens last approximately 5 years.

### Steps:

1. Log into [forum.effectivealtruism.org](https://forum.effectivealtruism.org) with your bot account
2. Open browser DevTools (F12 or Cmd+Option+I)
3. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
4. Click **Cookies** > `https://forum.effectivealtruism.org`
5. Find the cookie named **`loginToken`**
6. Copy its **Value** (a long alphanumeric string)
7. Paste it into `config.toml`:

```toml
[eaforum]
auth_token = "your-login-token-here"
```

### Verification

Run `forum-bot introspect` to verify the token works. It should print your username.

### If the token stops working

Re-capture it using the same steps. Common causes:
- Logged out of the browser
- Token expired (rare -- they last ~5 years)
- Account suspended or banned


## 2. Algolia Search Keys

EA Forum uses Algolia for search. The keys are public (search-only) and embedded in the site's JavaScript, but it's easiest to capture them from a network request.

### Steps:

1. Go to [forum.effectivealtruism.org](https://forum.effectivealtruism.org)
2. Open browser DevTools > **Network** tab
3. Type something in the forum's search bar
4. In the Network tab, filter for requests to `algolia.net`
5. Click on one of the POST requests
6. From the request **headers**, copy:
   - `X-Algolia-Application-Id` -- this is the **App ID**
   - `X-Algolia-API-Key` -- this is the **Search Key**
7. Note the index name from the request URL (usually `test_posts`)
8. Paste into `config.toml`:

```toml
[eaforum]
algolia_app_id = "your-app-id"
algolia_search_key = "your-search-key"
algolia_posts_index = "test_posts"
```

### Alternative: Extract from page source

The Algolia keys are also embedded in the forum's JavaScript bundle. You can find them by:
1. View page source on the forum
2. Search for `algolia` or `algoliasearch`
3. The app ID and search key will be in the JavaScript config


## Putting it all together

Your `config.toml` should look like:

```toml
[general]
csv_path = "/path/to/paper_abstracts_and_metadata.csv"
dry_run = true

[eaforum]
auth_token = "abc123..."
algolia_app_id = "XYZ123"
algolia_search_key = "def456..."
algolia_posts_index = "test_posts"
```

Then test with:
```bash
forum-bot introspect --config config.toml
forum-bot search "GiveWell" --config config.toml
```
