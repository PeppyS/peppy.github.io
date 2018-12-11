---
id: "2"
title: Encoding / Decoding Structs in Golang
date: "2018-12-02T02:35:00.000Z"
layout: post
draft: true
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
			"object": "DatabaseReference",
			"parent": {
				"table": "users",
				"id": "3245"
			}
		}
	}
}
```

Looking good....except for user id!! Now your front-end engineers are going to get mad at you cause they gotta parse your weird response just to find the user id this post belongs to! 😡
