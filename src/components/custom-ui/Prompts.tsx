import {
  Card,
  Row,
  Column,
  Text,
  Media,
  IconButton,
  CodeBlock,
  SmartLink,
  Flex,
  Tag,
  Checkbox,
  Dialog,
  Input,
  Button,
  Spinner,
} from "@once-ui-system/core";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Outfit } from "next/font/google";
import { DM_Sans } from "next/font/google";
import StaggeredFade from "../eldoraui/fadein";
import {
  ArrowUpRight,
  Clipboard,
  Copy,
  Download,
  Heart,
  HeartHandshakeIcon,
  HeartPlus,
  LucideTrash2,
  MessageCircle,
  ReplyAllIcon,
  Share2Icon,
} from "lucide-react";
import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";
import { useRouter } from "next/navigation";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";
import Avvvatars from "avvvatars-react";
import { create } from "domain";

// Fonts
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900", "200"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Types
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

type CommentData = {
  user: {
    name: string;
    avatar: string;
  };
  date: string;
  text: string;
};

export default function PromptCardGlobal({
  title,
  description,
  card_id,
  pfp,
  is_published = false,
  is_featured = false,
  is_private = false,
  created_at = "",
}: {
  title: string;
  description: string;
  pfp: string;
  card_id: string;
  is_published?: boolean;
  is_featured?: boolean;
  is_private?: boolean;
  created_at?: string;
}) {
  const [promptShareDialog, setPromptShareDialog] = useState(false);
  const router = useRouter();
  const created_at_simplified = formatRelativeTime(created_at);

  // Clipboard copy helper
  const [copyLoading, setCopyLoading] = useState(false);
  async function handleCopy() {
    setCopyLoading(true);
    setTimeout(async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(description);
        } else {
          // Fallback: prompt user to copy manually
          window.prompt("Copy to clipboard: Ctrl+C, Enter", description);
        }
      } catch (err) {
        // Optionally handle error (e.g., show a toast)
      }
      setCopyLoading(false);
    }, 1000);
  }
  return (
    <>
      <Flex>
        {" "}
        <Card
          fillWidth
          padding="s"
          radius="s"
          border="neutral-medium"
          maxWidth={22}
          minWidth={22}
          as={Flex}
          direction="column"
          vertical="start"
          horizontal="start"
          gap="8"
          //   style={{ backgroundColor: "#f7f7f7" }}
        >
          <Row vertical="center" horizontal="space-between" fillWidth>
            <Row gap="8">
              <Avvvatars value={title} style="shape" />
              <Column gap="4" vertical="center" horizontal="start">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-strong"
                  className={inter.className}
                  style={{ lineHeight: "1", fontSize: "13px" }}
                >
                  {title.slice(0, 19).concat("...")}
                </Text>
                <SmartLink href="#">
                  <Text
                    variant="label-default-s"
                    onBackground="neutral-weak"
                    className={inter.className}
                    style={{ fontSize: "13px", lineHeight: "1" }}
                  >
                    {card_id.slice(0, 8)}
                  </Text>
                </SmartLink>
              </Column>
            </Row>
            <Row center gap="8">
              {" "}
              <IconButton variant="secondary" size="s">
                <Heart color="#555" size={14} />
              </IconButton>{" "}
              <IconButton
                variant="secondary"
                size="s"
                onClick={() => setPromptShareDialog(true)}
              >
                <Share2Icon color="#555" size={14} />
              </IconButton>
              <IconButton variant="secondary" size="s" onClick={handleCopy}>
                {copyLoading ? (
                  <Spinner size="s" />
                ) : (
                  <Clipboard color="#555" size={14} />
                )}
              </IconButton>{" "}
            </Row>{" "}
          </Row>
          <Row
            fillWidth
            vertical="center"
            horizontal="start"
            paddingY="4"
            gap="4"
          >
            {is_featured && (
              <Tag size="s" variant="gradient">
                <Text style={{ fontSize: "12px" }}>Featured</Text>
              </Tag>
            )}

            <Tag
              size="s"
              style={{
                backgroundColor: "#f0f0f0",
                borderColor: "transparent",
              }}
            >
              <Text style={{ fontSize: "12px" }} onBackground="neutral-medium">
                {created_at_simplified}
              </Text>
            </Tag>
          </Row>

          <CodeBlock
            marginBottom="32"
            reloadButton={true}
            copyButton={false}
            title="Prompt"
            codes={[
              {
                code: description,
                language: "js",
                label: "Line numbers",
              },
            ]}
          />
          <Row
            fillWidth
            horizontal="end"
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              margin: "auto",
              width: "100%",
              padding: "16px 16px",
            }}
          >
            <Checkbox defaultChecked={true} disabled />
          </Row>
        </Card>
      </Flex>

      <Dialog
        isOpen={promptShareDialog}
        onClose={() => setPromptShareDialog(false)}
        title="Share prompt"
        description="Share this prompt with others"
        style={{ scale: 0.9 }}
      >
        <Column fillWidth gap="0" marginTop="4">
          {" "}
          <CodeBlock
            marginBottom="12"
            reloadButton={true}
            copyButton={true}
            title="Prompt"
            codes={[
              {
                code: description,
                language: "js",
                label: title,
              },
            ]}
          />
        </Column>
      </Dialog>
    </>
  );
}
