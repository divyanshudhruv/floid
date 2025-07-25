import {
  Card,
  Row,
  Column,
  Text,
  Media,
  IconButton,
} from "@once-ui-system/core";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Outfit } from "next/font/google";
import { DM_Sans } from "next/font/google";
import StaggeredFade from "../eldoraui/fadein";
import { Download, Heart, MessageCircle, ReplyAllIcon } from "lucide-react";
import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";
import { useRouter } from "next/navigation";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";

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

// Utils

// Cards
export default function Cards({ data }: { data: PostData }) {
  return (
    <Card
      direction="column"
      gap="12"
      radius="l-4"
      maxWidth={26}
      fitHeight
      padding="l"
      horizontal="center"
      vertical="space-between"
      className="cards cards-small"
      style={{
        backgroundColor: "#EEEFF0",
        border: "1px solid #E0E0E0",
        transition: "all 0.3s ease-in-out",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.backgroundColor = "#e5e7e7")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.backgroundColor = "#EEEFF0")
      }
    >
      <Column gap="4" fillWidth horizontal="start">
        <Row
          id="header"
          fillWidth
          horizontal="start"
          vertical="center"
          fitHeight
        >
          <Row gap="8" center fillHeight vertical="center">
            <Row center gap="8" fillHeight>
              <Media
                src={data.pfp || ""}
                unoptimized
                width={1.5}
                height={1.5}
                radius="full"
                loading={data.pfp === null}
              />
              <Text className={outfit.className} variant="label-default-s">
                {data.name}
              </Text>
            </Row>
            <Row fillHeight vertical="end" height={1.2} gap="2">
              <Text
                variant="label-default-s"
                onBackground="neutral-weak"
                style={{ fontSize: "10px" }}
              >
                #{data.tag}
              </Text>
              <Text
                variant="label-default-s"
                onBackground="neutral-weak"
                style={{ fontSize: "10px" }}
              >
                •
              </Text>
              <Text
                variant="label-default-s"
                onBackground="neutral-weak"
                style={{ fontSize: "10px" }}
              >
                {formatRelativeTime(data.created_at)}
              </Text>
            </Row>
          </Row>
        </Row>
        <Column id="main-content" gap="12" fillWidth>
          <Text variant="heading-default-s" className={outfit.className}>
            {data.post_content?.heading}
          </Text>
          <Text
            variant="body-default-xs"
            className={dmSans.className}
            onBackground="neutral-weak"
            style={{
              fontSize: "13px",
              letterSpacing: "0.1px",
              whiteSpace: "pre-line",
            }}
          >
            <StaggeredFade
              text={data.post_content?.body || ""}
              className={dmSans.className}
            />
          </Text>
        </Column>
      </Column>
      <Row vertical="center" horizontal="start" gap="4" fillWidth fitHeight>
        <Row gap="1" vertical="center" horizontal="start" minWidth={3}>
          <IconButton
            variant="secondary"
            size="m"
            style={{ borderColor: "transparent" }}
          >
            <MessageCircle color="#555" size={15} />
          </IconButton>
          <Text
            variant="label-default-s"
            onBackground="neutral-medium"
            className={outfit.className}
          >
            <CountUp
              from={0}
              to={Array.isArray(data.commenters) ? data.commenters.length : 0}
              duration={2}
            />
          </Text>
        </Row>
        <Row gap="1" vertical="center" horizontal="start" minWidth={3}>
          <IconButton
            variant="secondary"
            size="m"
            style={{ borderColor: "transparent" }}
          >
            <Heart color="#555" size={15} />
          </IconButton>
          <Text
            variant="label-default-s"
            onBackground="neutral-medium"
            className={outfit.className}
          >
            <CountUp
              from={0}
              to={Array.isArray(data.likers) ? data.likers.length : 0}
              duration={2}
            />
          </Text>
        </Row>
        <Row gap="2" center>
          <IconButton
            variant="secondary"
            size="m"
            style={{ borderColor: "transparent" }}
          >
            <Download color="#555" size={15} />
          </IconButton>
        </Row>
        <Row gap="2" center>
          <IconButton
            variant="secondary"
            size="m"
            style={{ borderColor: "transparent" }}
          >
            <ReplyAllIcon color="#555" size={15} />
          </IconButton>
        </Row>
      </Row>
      <Comments comments={data.commenters || []} />
    </Card>
  );
}

const Comment: React.FC<{ data: CommentData }> = React.memo(({ data }) => (
  <Row horizontal="center" gap="8" fillHeight vertical="start">
    <Media
      src={data.user.avatar}
      unoptimized
      width={1.5}
      height={1.5}
      minHeight={1.5}
      minWidth={1.5}
      radius="full"
    />
    <Column vertical="start">
      <Row gap="4">
        <Text className={outfit.className} variant="label-default-s">
          {data.user.name}
        </Text>
        <Row height={1} gap="4" vertical="end">
          <Text
            variant="label-default-s"
            onBackground="neutral-weak"
            style={{ fontSize: "10px" }}
          >
            •
          </Text>
          <Text
            variant="label-default-s"
            onBackground="neutral-weak"
            style={{ fontSize: "10px" }}
          >
            {formatRelativeTime(data.date)}
          </Text>
        </Row>
      </Row>
      <Text
        variant="label-default-s"
        onBackground="neutral-weak"
        style={{ fontSize: "10px" }}
      >
        {data.text}
      </Text>
    </Column>
  </Row>
));

const Comments: React.FC<{ comments: CommentData[] }> = React.memo(
  ({ comments }) => (
    <Column fillWidth horizontal="start" vertical="start" paddingY="8" gap="20">
      {comments.map((comment, idx) => (
        <Comment
          key={
            comment.user && comment.user.name
              ? `${comment.user.name}-${comment.date}-${idx}`
              : `comment-${idx}`
          }
          data={comment}
        />
      ))}
    </Column>
  )
);
