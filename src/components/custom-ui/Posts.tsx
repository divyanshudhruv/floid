import { supabase } from "@/app/utils/Supabase";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent";
import { Row, Column, Button, Text, Spinner } from "@once-ui-system/core";
import { DownloadIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Cards from "./Cards";

type PostData = {
  post_id: string;
  uuid: string | null;
  name: string | null;
  pfp: string | null;
  category: string | null;
  tag: string | null;
  last_post: string | null;
  last_comment: string | null;
  last_like: string | null;
  created_at: string;
  bot_id: string | null;
  like_id: string | null;
  comment_id: string | null;
  post_content: {
    body: string;
    heading: string;
  };
  likers: { uuid: string }[];
  commenters: {
    date: string;
    text: string;
    user: {
      name: string;
      avatar: string;
    };
  }[];
};

const POSTS_PER_LOAD = 6;

export default function Posts() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [colCount, setColCount] = useState(3);

  useEffect(() => {
    const updateColCount = () => {
      const cardWidth = 432; // 27rem * 16px
      const width = window.innerWidth;
      setColCount(
        width < cardWidth * 2 + 32 ? 1 : width < cardWidth * 3 + 64 ? 2 : 3
      );
    };
    updateColCount();
    window.addEventListener("resize", updateColCount);
    return () => window.removeEventListener("resize", updateColCount);
  }, []);

  // Split posts into columns
  const columns = Array.from({ length: colCount }, () => [] as PostData[]);
  posts.forEach((post, i) => columns[i % colCount].push(post));

  const fetchPosts = useCallback(async (offset = 0) => {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select(
        "post_id, uuid, name, pfp, category, tag, created_at, post_content, likers, commenters"
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + POSTS_PER_LOAD - 1);
    setLoading(false);
    return Array.isArray(data) ? data : [];
  }, []);

  useEffect(() => {
    fetchPosts().then((data) =>
      setPosts(
        data.map((item) => ({
          post_id: item.post_id,
          uuid: item.uuid ?? null,
          name: item.name ?? null,
          pfp: item.pfp ?? null,
          category: item.category ?? null,
          tag: item.tag ?? null,
          created_at: item.created_at,
          post_content: item.post_content ?? { body: "", heading: "" },
          likers: item.likers ?? [],
          commenters: item.commenters ?? [],
          last_post: null,
          last_comment: null,
          last_like: null,
          bot_id: null,
          like_id: null,
          comment_id: null,
        }))
      )
    );
  }, [fetchPosts]);

  const loadMore = async () => {
    const newPosts = await fetchPosts(posts.length);
    if (newPosts.length) {
      setPosts((prev) => [
        ...prev,
        ...newPosts.map((item) => ({
          post_id: item.post_id,
          uuid: item.uuid ?? null,
          name: item.name ?? null,
          pfp: item.pfp ?? null,
          category: item.category ?? null,
          tag: item.tag ?? null,
          created_at: item.created_at,
          post_content: item.post_content ?? { body: "", heading: "" },
          likers: item.likers ?? [],
          commenters: item.commenters ?? [],
          last_post: null,
          last_comment: null,
          last_like: null,
          bot_id: null,
          like_id: null,
          comment_id: null,
        })),
      ]);
    }
  };

  return (
    <>
      <Row
        fillWidth
        gap="20"
        style={{ marginTop: 32, alignItems: "flex-start", width: "100%" }}
      >
        {posts.length === 0 ? (
          <Column fillHeight center fillWidth>
            <Spinner size="xl" />
          </Column>
        ) : (
          columns.map((col, colIdx) => (
            <Column key={colIdx} gap="20" style={{ flex: 1, minWidth: 0 }}>
              {col.map((item, idx) => (
                <AnimatedContent
                  delay={colIdx * 0.15 + idx * 0.08}
                  initialOpacity={0}
                  id={`animated-card-${colIdx}-${idx}-${item.post_id}-${item.uuid}`}
                  distance={30}
                  key={`animated-card-${colIdx}-${idx}-${item.post_id}-${item.uuid}`}
                >
                  <Cards data={item} />
                </AnimatedContent>
              ))}
            </Column>
          ))
        )}
      </Row>
      <Row center fillWidth>
        <Button
          variant="secondary"
          weight="default"
          data-border="conservative"
          size="m"
          onClick={loadMore}
        >
          <Text onBackground="neutral-medium">
            <Row center>
              {loading ? (
                <>
                  <Spinner size="s" />
                  &nbsp; Loading...
                </>
              ) : (
                <>
                  <DownloadIcon size={13} color="#555" />
                  &nbsp;Load More
                </>
              )}
            </Row>
          </Text>
        </Button>
      </Row>
    </>
  );
}
