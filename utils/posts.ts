import { extract } from "std/front_matter/any.ts";
import { Post } from "../types.d.ts";
import { render } from "gfm/mod.ts";

export async function loadPost(id: string): Promise<Post | null> {
  try {
    const raw = await Deno
      .readTextFile(`./content/posts/${id}.md`)
      .catch(() => null);

    if (!raw) return null;

    const { attrs, body } = extract(raw);
    const params = attrs as Record<string, string>;
    const post: Post = {
      id,
      title: params.title,
      body: render(body),
      date: new Date(params.date),
      excerpt: params.excerpt,
    };
    return post;
  } catch {
    return null;
  }
}
export async function listPost(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    promises.push(loadPost(id));
  }

  const posts = await Promise.all(promises) as Post[];

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}
