import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../types.d.ts";
import { logo } from "../utils/assets.ts";
import { listPost } from "../utils/posts.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const posts = await listPost();
    return context.render({ posts });
  },
};

export default function Home({ data }: PageProps) {
  const { posts } = data;
  return (
    <main class="p-4">
      <img src={logo} alt="logo" />
      <h1 class="text-4xl font-bold">Mi Blog</h1>
      {posts.map((post: Post) => (
        <article class="p-4">
          <h2 class="text-2xl font-bold">
            <a class="hover:text-blue-600" href={`/blog/${post.id}`}>
              {post.title}
            </a>
          </h2>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
        </article>
      ))}
    </main>
  );
}
