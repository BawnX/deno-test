import { loadPost } from "./posts.ts";
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("Load Post return null if the post no exists", async () => {
  const post = await loadPost("non-existent");
  assertEquals(post, null);
});

Deno.test("Load Post return a post if the post does exists", async () => {
  const post = await loadPost("hello-world");
  console.log(post)
  assertEquals(post?.id, "hello-world");
});
