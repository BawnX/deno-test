import { extract } from "std/front_matter/any.ts";
import { Post } from "../types.d.ts";

export async function loadPost(id: string): Promise<Post | null> {
  try {
    const raw = await Deno.readTextFile(`./content/posts/${id}.md`);
    const { attrs, body } = extract(raw);
    const params = attrs as Record<string, string>;
    const post: Post = {
      id,
      title: params.title,
      body,
      date: new Date(params.date),
      excerpt: params.excerpt,
    };
    return post;
  } catch {
    return null;
  }
}
