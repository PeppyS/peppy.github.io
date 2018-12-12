---
id: "2"
title: Encoding / Decoding Structs in Golang
date: "2018-12-02T02:35:00.000Z"
layout: post
draft: false
path: "/posts/golang-marshal-tip-2/"
category: "Blog"
tags:
  - "golang"
description: "Tip about JSON encoding structs in Golang..."
---

So. Let's say you're back-end engineer at a blog company. They need you to build out an API to fetch blog posts.

You'll probably have a struct like this:

```go
type BlogPost struct {
    ID         string            `json:"id"`
    Content    string            `json:"content"`
    LikesCount int               `json:"likes_count"`
    User       DatabaseReference `json:"user_id"`
}
```

Now let's say you have a handler to fetch a given blog post:

*This example uses [gin](https://github.com/gin-gonic/gin) as the HTTP web framework*
```go
func (a *PostsAPI) GetByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		postID := ctx.Param("id")

		post, err := a.postService.GetByID(ctx, postID)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, err)
			return
		}

		ctx.JSON(http.StatusOK, map[string]interface{}{
			"data": post,
		})
	}
}
```

Now here's what happens when someone sends a request to `https://api.yourblogcompany.com/posts/5234563`
```json
{
	"data": {
		"id": "5234563",
		"content": "So. Lets say you’re building a blog, and you want to keep track of comments for each post...",
		"likes_count": 0,
		"user_id": {
			"path": "path/to/your/database/users",
			"id": "3245",
			"another_irrelevant_field": "lolz"
		}
	}
}
```

Looking good....except for user id!! Your `User` field with type `DatabaseReference` type was JSON encoded with a bunch of irrelvant fields.

Now your front-end engineers are going to get mad at you cause they gotta parse your weird response just to find the user id this post belongs to! 😡

# Option 1 - Specify payload

We can probably adjust our endpoint and specify exactly what is getting set in the payload:
```go
func (a *PostsAPI) GetByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		postID := ctx.Param("id")

		post, err := a.postService.GetByID(ctx, postID)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, err)
			return
		}

		ctx.JSON(http.StatusOK, map[string]interface{}{
			"data": map[string]interface{}{
				"id":          post.ID,
				"content":     post.Content,
				"likes_count": post.LikesCount,
				"user_id":     post.User.ID,
			},
		})
	}
}
```

This option works. But can definitely become a pain as you start to build out multiple endpoints that will respond with a Post object.

If only there was a better way...

# Option 2 - Custom JSON Marshalling!

Oh yeah there is. With go, you can re-write a struct's `MarshalJSON()` method, defining exactly how this struct should be JSON encoded.

Check it out.

```go
func (p Post) MarshalJSON() ([]byte, error) {
	// Alias used to bring all of Post's existing fields over
	type PostAlias Post

	return json.Marshal(struct {
		PostAlias 
		User  string `json:"user_id"`
	}{
		PostAlias: PostAlias(p),
		User:      p.User.ID,
	})
}
```

Now, whenever our `Post` object is marshalled into JSON, it will override the `User` field with type `DatabaseReference` to be marshalled with just the user ID.

Sooo, we can go back to doing just this:
```go
ctx.JSON(http.StatusOK, map[string]interface{}{
	"data": post,
})
```

And we'll get:
```json
{
	"data": {
		"id": "5234563",
		"content": "So. Lets say you’re building a blog, and you want to keep track of comments for each post...",
		"likes_count": 0,
		"user_id": "3245",
	}
}
```

Now your fellow back-end engineers are diggin your clean code, AND your fellow front-end engineers are happy with a clean API response that's easy to parse.

😎😎
