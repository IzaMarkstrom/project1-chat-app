import { describe, expect, test } from "@jest/globals";
import { loadAllPosts } from "./models/todo-db";

describe("test the server", () => {
  test("testing jest", () => {
    expect(true).toBe(true);
  });
});

// describe("loading all posts", () => {
//   test("should return an array of posts", async () => {
//     const posts = await loadAllPosts();
//     expect(posts).toBeInstanceOf(Promise);
//   });
// });
