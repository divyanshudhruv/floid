"use client";

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
} from "@once-ui-system/core";

import { Outfit } from "next/font/google";
import { Inter } from "next/font/google";
import { DM_Sans } from "next/font/google";

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

import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import ClickSpark from "@/blocks/Animations/ClickSpark/ClickSpark";
import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";
import TextPressure from "@/blocks/TextAnimations/TextPressure/TextPressure";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent";
// import SmoothScroll from "../utils/SmoothScroll";
import Lenis from "lenis";
function formatRelativeTime(date: string): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}min`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}hr`;
  return `${Math.floor(diffInMinutes / 1440)}d`;
}

export default function Home() {
  const data = [
    {
      user: {
        name: "John Doe",
        avatar: "https://avatar.iran.liara.run/public/35",
      },
      tag: "show",
      date: new Date("2025-07-21T13:00:00Z").toString(),
      title: "Understanding React Components",
      content:
        "React components are the building blocks of any React application. They allow you to split the UI into independent, reusable pieces, and think about each piece in isolation. Components can be functional or class-based, and they can manage their own state and lifecycle methods. By composing components, you can build complex user interfaces from simple, isolated pieces of code. This modular approach not only improves code readability and maintainability but also enables reusability across your application. Furthermore, React's virtual DOM efficiently updates only the parts of the UI that change, resulting in better performance. Embracing component-driven development helps teams collaborate more effectively and scale applications with ease. Whether you're building a small widget or a large-scale web app, mastering React components is essential for modern frontend development.",
      comments: [
        {
          user: {
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/36",
          },
          date: new Date("2023-10-02T12:30:00Z").toString(),
          text: "Great article! Very informative.",
        },
        {
          user: {
            name: "Alice Johnson",
            avatar: "https://avatar.iran.liara.run/public/37",
          },
          date: new Date("2023-10-03T09:45:00Z").toString(),
          text: "I learned a lot from this post, thanks!",
        },
        {
          user: {
            name: "Bob Williams",
            avatar: "https://avatar.iran.liara.run/public/48",
          },
          date: new Date("2023-10-04T10:15:00Z").toString(),
          text: "The explanation about virtual DOM was really helpful.",
        },
        {
          user: {
            name: "Linda Evans",
            avatar: "https://avatar.iran.liara.run/public/49",
          },
          date: new Date("2023-10-05T11:20:00Z").toString(),
          text: "Component-driven development makes everything so much easier!",
        },
      ],
      stats: {
        comments: 4,
        likes: 42,
      },
    },
    {
      user: {
        name: "Emily Carter",
        avatar: "https://avatar.iran.liara.run/public/38",
      },
      tag: "show",
      date: new Date("2025-07-05T14:20:00Z").toString(),
      title: "Designing for Accessibility",
      content:
        "Accessibility is crucial for building inclusive products. Learn how to make your UI accessible to everyone, including users with disabilities.",
      comments: [
        {
          user: {
            name: "Mark Lee",
            avatar: "https://avatar.iran.liara.run/public/39",
          },
          date: new Date("2023-10-05T16:10:00Z").toString(),
          text: "Thanks for highlighting accessibility!",
        },
      ],
      stats: {
        comments: 1,
        likes: 8,
      },
    },
    {
      user: {
        name: "Michael Brown",
        avatar: "https://avatar.iran.liara.run/public/40",
      },
      tag: "test",
      date: new Date("2023-10-06T08:05:00Z").toString(),
      title: "Node.js Performance Tips",
      content:
        "Improve your Node.js application's performance with these simple and effective tips.",
      comments: [
        {
          user: {
            name: "Sara Kim",
            avatar: "https://avatar.iran.liara.run/public/41",
          },
          date: new Date("2023-10-07T11:25:00Z").toString(),
          text: "Super helpful, thanks!",
        },
      ],
      stats: {
        comments: 1,
        likes: 10,
      },
    },
    {
      user: {
        name: "Olivia Green",
        avatar: "https://avatar.iran.liara.run/public/42",
      },
      tag: "help",
      date: new Date("2023-10-08T17:40:00Z").toString(),
      title: "Deploying with Docker",
      content:
        "Docker simplifies deployment and scaling. This post covers the basics of containerizing your app.",
      comments: [
        {
          user: {
            name: "Tom White",
            avatar: "https://avatar.iran.liara.run/public/43",
          },
          date: new Date("2023-10-09T13:55:00Z").toString(),
          text: "Docker is a game changer!",
        },
      ],
      stats: {
        comments: 1,
        likes: 7,
      },
    },
    {
      user: {
        name: "Sophia Turner",
        avatar: "https://avatar.iran.liara.run/public/44",
      },
      tag: "show",
      date: new Date("2023-10-10T19:00:00Z").toString(),
      title: "CSS Grid vs Flexbox",
      content:
        "Both CSS Grid and Flexbox are powerful layout systems. Learn when to use each for your web projects.",
      comments: [
        {
          user: {
            name: "Lucas Brown",
            avatar: "https://avatar.iran.liara.run/public/45",
          },
          date: new Date("2023-10-11T15:15:00Z").toString(),
          text: "Very clear explanation, thanks!",
        },
      ],
      stats: {
        comments: 1,
        likes: 6,
      },
    },
  ];

  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });

  // Listen for the scroll event and log the event data
  lenis.on("scroll", (e) => {
    console.log(e);
  });
  return (
    <>
      {/* <ClickSpark> */}
      {/* <Noise/> */}
      {/* <SmoothScroll /> */}
      <Column
        fillWidth
        fillHeight
        paddingY="xs"
        style={{ minWidth: "100vw !important" }}
        paddingX="xl"
        horizontal="center"
        vertical="start"
        gap="20"
      >
        <Column
          maxWidth={26}
          fillHeight
          horizontal="center"
          vertical="start"
          gap="20"
        >
          <Navbar />

          <Column paddingY="m" paddingX="l" marginTop="64">
            {data.map((item, idx) => (
              <AnimatedContent key={idx} delay={idx * 0.5}>
                <Cards data={item} />
              </AnimatedContent>
            ))}
          </Column>
          <Footer />
        </Column>
      </Column>
      {/* </ClickSpark> */}
    </>
  );
}

function Footer() {
  return (
    <Flex fillWidth center paddingBottom="32">
      <Text variant="label-default-s" onBackground="neutral-weak">
        Built by a{" "}
        <SmartLink href="https://github.com/divyanshudhruv">
          developer
        </SmartLink>{" "}
        who loves ☕.
        {/* <SmartLink href="#">Supabase</SmartLink> */}
      </Text>
    </Flex>
  );
}

type CommentData = {
  user: {
    name: string;
    avatar: string;
  };
  date: string;
  text: string;
};

type CardData = {
  user: {
    name: string;
    avatar: string;
  };
  tag: string;
  date: string;
  title: string;
  content: string;
  comments: CommentData[];
  stats: {
    comments: number;
    likes: number;
  };
};

function Cards(props: { data: CardData }) {
  const { data } = props;
  return (
    <>
      <Card
        marginBottom="64"
        direction="column"
        gap="12"
        radius="xl-8"
        minWidth={27}
        fitHeight
        padding="l"
        horizontal="center"
        vertical="space-between"
        style={{
          border: "2px solid #fbfbfb",
          backgroundColor: "#f5f5f5",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.border = "2px solid #F5F5F5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f5f5f5";
          e.currentTarget.style.border = "2px solid #fbfbfb";
        }}
      >
        <Column gap="4">
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
                  src={data.user.avatar}
                  unoptimized
                  width={1.5}
                  height={1.5}
                  radius="full"
                />
                <Text className={outfit.className} variant="label-default-s">
                  {data.user.name}
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
                  {formatRelativeTime(data.date)}
                </Text>
              </Row>
            </Row>
          </Row>
          <Column id="main-content" gap="12">
            <Text variant="heading-default-s" className={outfit.className}>
              {data.title}
            </Text>
            <Text
              variant="body-default-xs"
              className={dmSans.className}
              onBackground="neutral-weak"
              style={{ fontSize: "13px", letterSpacing: "0.1px" }}
            >
              <SplitText text={data.content} />
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
              <CountUp from={0} to={data.stats.comments} duration={2} />
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
              <CountUp from={0} to={data.stats.likes} duration={2} />
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
        <Comments comments={data.comments} />
      </Card>
    </>
  );
}

function Comment({ data }: { data: CommentData }) {
  return (
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
}

function Comments({ comments }: { comments: CommentData[] }) {
  return (
    <>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="8"
        gap="20"
      >
        {comments.map((comment, idx) => (
          <Comment key={idx} data={comment} />
        ))}
      </Column>
    </>
  );
}

function Navbar() {
  return (
    <>
      {" "}
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
            {/* <TextPressure text="Floid"/> */}
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
            // name="Lorant One"
            // subline="Design Engineer"
            // placement="right-end"
            avatarProps={{ src: "https://avatar.iran.liara.run/public/35" }}
            // dropdown={""}
            // }
          />
        </Row>
      </Row>
    </>
  );
}
