import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { WritingList } from "@/components/writing-list";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays, articles, and notes on engineering, security, and craft.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Writing"
        title="Essays, articles & notes"
        description="Long-form articles and shorter notes on engineering, security, Linux, and the craft of building things."
      />
      <WritingList posts={posts} />
    </div>
  );
}
