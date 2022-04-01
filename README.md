# Firebase function for seo meta tags

## Step 1
Deploy this code to google cloud function
https://cloud.google.com/functions/docs/deploying

Set `seo` as entry point

## Step 2
Setup `API_URL` ENV variable
https://cloud.google.com/functions/docs/configuring/env-var

Function call `API_URL/seo` endpoint that should return json object
```
{
    "title": "page title",
    "desc": "page description",
    "image": "page thumbnail"
}
```

## Step 3
Update `firebase.json`
Set rewrite on routes where you would like to get dynamic tags
```
"rewrites": [
  {
    "source": "**/event/**",
    "function": "yourFunctionName"
  },
]
