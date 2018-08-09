import * as moviesGet from "./controller/movies/get"
import * as moviesPost from "./controller/movies/post"
import * as commentsPost from "./controller/comment/post"
import * as commentsGet from "./controller/comment/get"

export const AppRoutes = [
  {
    path: "/movies",
    method: "get",
    action: moviesGet.getAction,
  },
  {
    path: "/movies",
    method: "post",
    action: moviesPost.postAction,
  },
  {
    path: "/comments",
    method: "post",
    action: commentsPost.postAction,
  },
  {
    path: "/comments",
    method: "get",
    action: commentsGet.getAction,
  },
]
