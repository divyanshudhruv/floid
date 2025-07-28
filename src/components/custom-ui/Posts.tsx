import { supabase } from "@/app/utils/Supabase";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent";
import { Row, Column, Button, Text, Spinner, Flex } from "@once-ui-system/core";
import { DownloadIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Cards from "./Cards";
import PromptCard from "./Prompts";

export default function Posts() {
  const [loading, setLoading] = useState(false);

  const [prompts, setPrompts] = useState([
    {
      title: "Summarize Article",
      description: "Summarize the given article in 3 sentences.",
      card_id: "prompt-001",
      pfp: "user1@example.com",
      id_published: true,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Translate to French",
      description: "Translate the following text to French.",
      card_id: "prompt-002",
      pfp: "user2@example.com",
      id_published: false,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Generate Blog Ideas",
      description: "Suggest 5 blog post ideas about AI.",
      card_id: "prompt-003",
      pfp: "user3@example.com",
      id_published: true,
      is_featured: false,
      is_private: true,
    },
    {
      title: "Code Review",
      description: "Review this TypeScript code for best practices.",
      card_id: "prompt-004",
      pfp: "user4@example.com",
      id_published: false,
      is_featured: false,
      is_private: true,
    },
    {
      title: "Write Email Reply",
      description: "Draft a polite reply to this customer email.",
      card_id: "prompt-005",
      pfp: "user5@example.com",
      id_published: true,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Fix Grammar",
      description: "Correct the grammar in this paragraph.",
      card_id: "prompt-006",
      pfp: "user6@example.com",
      id_published: true,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Explain Concept",
      description: "Explain quantum computing in simple terms.",
      card_id: "prompt-007",
      pfp: "user7@example.com",
      id_published: false,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Summarize Meeting",
      description: "Summarize the key points from this meeting transcript.",
      card_id: "prompt-008",
      pfp: "user8@example.com",
      id_published: true,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Generate Tweet",
      description: "Write a tweet about the latest tech trends.",
      card_id: "prompt-009",
      pfp: "user9@example.com",
      id_published: false,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Create To-Do List",
      description: "Make a to-do list for launching a new product.",
      card_id: "prompt-010",
      pfp: "user10@example.com",
      id_published: true,
      is_featured: false,
      is_private: false,
    },
  ]);
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
          <Column style={{ width: "100%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                alignItems: "start",
                width: "100%",
              }}
            >
              {prompts.map((prompt, index) => (
                <div
                  key={index}
                  style={{ breakInside: "avoid", width: "100%" }}
                >
                  <PromptCard
                    title={prompt.title}
                    description={prompt.description}
                    card_id={prompt.card_id}
                    pfp={prompt.pfp}
                    id_published={prompt.id_published}
                    is_featured={prompt.is_featured}
                    is_private={prompt.is_private}
                  />
                </div>
              ))}
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
