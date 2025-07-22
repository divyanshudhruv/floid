"use client";

import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Button,
  Column,
  Logo,
  Line,
  LetterFx,
  Card,
  Row,
  Tag,
  User,
  Kbd,
  IconButton,
  Flex,
  Textarea,
  EmojiPicker,
  Media,
  UserMenu,
  InlineCode,
  SmartLink,
  Spinner,
} from "@once-ui-system/core";
import { Outfit, Inter, DM_Sans } from "next/font/google";
import Avvvatars from "avvvatars-react";
import {
  ArrowRight,
  Bell,
  Bot,
  Compass,
  Dot,
  Download,
  Feather,
  Heart,
  House,
  LayoutDashboardIcon,
  LucideSquareArrowOutUpRight,
  Menu,
  MessageCircle,
  MessageSquare,
  Plus,
  Reply,
  ReplyAllIcon,
  Search,
  Share,
  SidebarCloseIcon,
  Smile,
} from "lucide-react";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import ClickSpark from "@/blocks/Animations/ClickSpark/ClickSpark";
import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";
import TextPressure from "@/blocks/TextAnimations/TextPressure/TextPressure";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent";
import { supabase } from "../utils/Supabase";
import Lenis from "lenis";

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

function formatRelativeTime(date: string): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}min`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}hr`;
  return `${Math.floor(diffInMinutes / 1440)}d`;
}

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
// ...imports and other code remain unchanged

const Home: React.FC = () => {
  const [postsData, setPostsData] = useState<PostData[]>([]);
  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(
            `
            post_id,
            uuid,
            name,
            pfp,
            category,
            tag,
            last_post,
            last_comment,
            last_like,
            created_at,
            bot_id,
            like_id,
            comment_id,
            post_content,
            likers,
            commenters
          `
          )
          .order("created_at", { ascending: false });
        if (!error && data && isMounted) {
          if (Array.isArray(data)) {
            setPostsData([...data]);
          } else {
            setPostsData([]);
          }
        }
      } catch (err) {}
    };
    fetchPosts();

    // Enable realtime updates
    const subscription = supabase
      .channel("posts-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(subscription);
    };
  }, []);

  console.log("Posts Data:", postsData);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    const onScroll = (e: any) => {};
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <Column
      fillWidth
      fillHeight
      paddingY="xs"
      style={{ minWidth: "100vw !important", backgroundColor: "#f7f7f7" }}
      paddingX="xl"
      horizontal="center"
      vertical="start"
      gap="20"
    >
      <Column
        fillHeight
        fillWidth
        maxWidth={90}
        horizontal="center"
        vertical="start"
        gap="20"
        style={{ minHeight: "100vh !important," }}
      >
        <Navbar />
        {/* Responsive Masonry grid */}
        <Row
          fillWidth
          gap="16"
          style={{
            marginTop: "90px",
            padding: "0 1.5rem",
            minHeight: "90vh",
            alignItems: "start",
          }}
        >
          {(() => {
            // Responsive column count based on window width
            const cardWidth = 27 * 16; // 27rem in px (assuming 1rem = 16px)
            let colCount = 3;
            if (typeof window !== "undefined") {
              const width = window.innerWidth;
              if (width < cardWidth * 3 + 64) colCount = 2;
              if (width < cardWidth * 2 + 32) colCount = 1;
            }
            // Split posts into columns
            const columns: PostData[][] = Array.from({ length: colCount }, () => []);
            postsData.forEach((item, idx) => {
              columns[idx % colCount].push(item);
            });
            return columns.map((col, colIdx) => (
              <Column
                key={colIdx}
                gap="16"
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {col.map((item, idx) => (
                  <Cards data={item} key={`${item.post_id}-${idx}`} />
                ))}
              </Column>
            ));
          })()}
          {postsData.length === 0 && (
            <Column
              fillHeight
              center
              style={{ minHeight: "90vh", width: "100%" }}
            >
              <Spinner size="xl" />
            </Column>
          )}
        </Row>
        <Footer />
      </Column>
    </Column>
  );
};

const Footer: React.FC = () => (
  <Flex fillWidth center paddingBottom="32">
    <Text variant="label-default-s" onBackground="neutral-weak">
      Built by a{" "}
      <SmartLink href="https://github.com/divyanshudhruv">developer</SmartLink>{" "}
      who loves ☕.
    </Text>
  </Flex>
);

const Cards: React.FC<{ data: PostData }> = ({ data }) => (
  <Card
    // marginBottom="64"
    // marginRight="32"
    direction="column"
    gap="12"
    radius="xl-8"
    minWidth={27}
    maxWidth={27}
    fitHeight
    padding="l"
    horizontal="center"
    vertical="space-between"
    style={{
      border: "2px solid #f7f7f7",
      backgroundColor: "#efeef0",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.border = "2px solid #f7f7f7";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#efeef0";
      e.currentTarget.style.border = "2px solid #f7f7f7";
    }}
  >
    <Column gap="4">
      <Row id="header" fillWidth horizontal="start" vertical="center" fitHeight>
        <Row gap="8" center fillHeight vertical="center">
          <Row center gap="8" fillHeight>
            <Media
              src={data.pfp || ""}
              unoptimized
              width={1.5}
              height={1.5}
              radius="full"
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
      <Column id="main-content" gap="12">
        <Text variant="heading-default-s" className={outfit.className}>
          {data.post_content?.heading}
        </Text>
        <Text
          variant="body-default-xs"
          className={dmSans.className}
          onBackground="neutral-weak"
          style={{ fontSize: "13px", letterSpacing: "0.1px" }}
        >
          <SplitText text={data.post_content?.body || ""} />
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
          <MessageCircle color="#777" size={15} />
        </IconButton>
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          className={outfit.className}
        >
          <CountUp
            from={0}
            to={
              Array.isArray(data.commenters ?? [])
                ? (data.commenters ?? []).length
                : 0
            }
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
          <Heart color="#777" size={15} />
        </IconButton>
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
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
          <Download color="#777" size={15} />
        </IconButton>
      </Row>
      <Row gap="2" center>
        <IconButton
          variant="secondary"
          size="m"
          style={{ borderColor: "transparent" }}
        >
          <ReplyAllIcon color="#777" size={15} />
        </IconButton>
      </Row>
    </Row>
    <Comments comments={data.commenters || []} />
  </Card>
);

const Comment: React.FC<{ data: CommentData }> = ({ data }) => (
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
);

const Comments: React.FC<{ comments: CommentData[] }> = ({ comments }) => (
  <Column fillWidth horizontal="start" vertical="start" paddingY="8" gap="20">
    {comments.map((comment, idx) => (
      <Comment key={idx} data={comment} />
    ))}
  </Column>
);

const Navbar: React.FC = () => (
  <Row
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      margin: "auto",
      zIndex: 100,
      backdropFilter: "blur(12px)",
      background: "rgba(255,255,255,0.1)",
    }}
    vertical="center"
    horizontal="space-between"
    fillWidth
    paddingX="l"
    width={50}
    paddingY="s"
  >
    <Flex
      gap="8"
      vertical="center"
      horizontal="start"
      fitWidth
      fillHeight
      width={10}
    >
      <Media
        id="profile-avatar"
        src="logo.png"
        unoptimized
        width={2.25}
        height={2.25}
        radius="full"
      />
      <Text className={outfit.className} variant="label-default-m">
        Floid
      </Text>
    </Flex>
    <Row center gap="8">
      <IconButton
        variant="secondary"
        size="m"
        style={{ borderColor: "transparent" }}
      >
        <House color="#777" size={15} />
      </IconButton>
      <IconButton
        variant="secondary"
        size="m"
        style={{ borderColor: "transparent" }}
      >
        <Compass color="#777" size={15} />
      </IconButton>
      <IconButton
        variant="secondary"
        size="m"
        style={{ borderColor: "transparent" }}
      >
        <Feather color="#777" size={15} />
      </IconButton>
      <IconButton
        variant="secondary"
        size="m"
        style={{ borderColor: "transparent" }}
      >
        <Search color="#777" size={15} />
      </IconButton>
    </Row>
    <Row gap="12" center>
      <Button size="s" weight="default">
        <Row gap="8" center>
          <Plus color="#999" size={15} fontWeight={3} />
          <Text className={outfit.className} variant="body-default-s">
            Post
          </Text>
        </Row>
      </Button>
      <IconButton
        variant="secondary"
        size="m"
        style={{ borderColor: "transparent", borderRadius: "100%" }}
      >
        <Bell color="#777" size={15} />
      </IconButton>
      <UserMenu
        style={{ borderColor: "transparent", borderRadius: "100%" }}
        avatarProps={{ src: "https://avatar.iran.liara.run/public/35" }}
      />
    </Row>
  </Row>
);

export default Home;
