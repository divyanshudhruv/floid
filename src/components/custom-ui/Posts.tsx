import { supabase } from "@/app/utils/Supabase";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent";
import { Row, Column, Button, Text, Spinner, Flex } from "@once-ui-system/core";
import { DownloadIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Cards from "./Cards";
import PromptCard from "./Prompts";
import { Inter } from "next/font/google";
import "./../../app/global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function Posts() {
  const [loading, setLoading] = useState(false);

  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPrompts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("prompts")
        .select(
          "prompt_id, is_published, is_featured, is_private, content, prompt_avatar, uuid, is_sharable, created_at,uuid"
        )
        .eq("is_published", true)
        .eq("is_private", false);
      if (!error && data) {
        setPrompts(
          data.map((item: any) => ({
            title: item.content?.title,

            prompt: item.content?.prompt || "",
            card_id: item.prompt_id,
            pfp: item.prompt_avatar || item.uuid || "",
            is_published: item.is_published,
            is_featured: item.is_featured,
            is_private: item.is_private,
            is_sharable: item.is_sharable,
            created_at: item.created_at,
            description: item.content?.description || "",
            uuid: item.uuid || "",
          }))
        );
      }
      setLoading(false);
    }
    fetchPrompts();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("public:prompts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prompts" },
        (payload) => {
          // Refetch prompts on any insert/update/delete
          (async () => {
            setLoading(true);
            const { data, error } = await supabase
              .from("prompts")
              .select(
                "prompt_id, is_published, is_featured, is_private, content, prompt_avatar, uuid, is_sharable, created_at"
              )
              .eq("is_published", true)
              .eq("is_private", false);
            if (!error && data) {
              setPrompts(
                data.map((item: any) => ({
                  title: item.content?.title,
                  prompt: item.content?.prompt || "",
                  card_id: item.prompt_id,
                  pfp: item.prompt_avatar || item.uuid || "",
                  is_published: item.is_published,
                  is_featured: item.is_featured,
                  is_private: item.is_private,
                  is_sharable: item.is_sharable,
                  created_at: item.created_at,
                  description: item.content?.description || "",
                  uuid: item.uuid || "",
                }))
              );
            }
            setLoading(false);
          })();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return (
    <>
      <Row
        fillWidth
        // background="accent-strong"
        center
        style={{ marginTop: 32 }}
        maxWidth={80}
      >
        {loading ? (
          <Column fillHeight center fillWidth>
            <Spinner size="xl" />
          </Column>
        ) : (
          // <Row
          //   gap="20"
          //   horizontal="start"
          //   background="accent-strong"
          //   wrap={true}
          //   maxWidth={50}
          //   fitWidth
          // >
          <Column
            style={{ width: "100%" }}
            fillWidth
            center
            horizontal="center"
          >
            <div className="posts-grid">
              {prompts.length === 0 ? (
                <Row fillWidth center style={{ gridColumn: "1 / -1" }}>
                  <Text
                    className={inter.className}
                    onBackground="neutral-weak"
                    variant="label-default-s"
                  >
                    No prompts found
                  </Text>
                </Row>
              ) : (
                prompts.map((prompt, index) => (
                  <div
                    key={prompt.card_id || index}
                    style={{ breakInside: "avoid", width: "fit-content" }}
                  >
                    <PromptCard
                      title={prompt.title}
                      description={prompt.description}
                      card_id={prompt.card_id}
                      pfp={prompt.pfp}
                      is_published={prompt.is_published}
                      is_featured={prompt.is_featured}
                      is_private={prompt.is_private}
                      created_at={prompt.created_at}
                      uuid={prompt.uuid}
                    />
                  </div>
                ))
              )}
            </div>
          </Column>
          // </Row>
        )}
      </Row>
      {/* {posts.length ===</Column> 0 ? null : (
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
      )} */}
    </>
  );
}
