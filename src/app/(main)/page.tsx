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
  Dialog,
  Input,
  ToggleButton,
  Select,
  Checkbox,
  useToast,
  StatusIndicator,
} from "@once-ui-system/core";
import { Outfit, Inter, DM_Sans } from "next/font/google";
import "./../global.css";
import Avvvatars from "avvvatars-react";
import {
  ArrowRight,
  Bell,
  Bot,
  Compass,
  Dot,
  Download,
  DownloadIcon,
  Feather,
  Heart,
  House,
  Info,
  LayoutDashboardIcon,
  LoaderPinwheelIcon,
  LucideDownloadCloud,
  LucideSquareArrowOutUpRight,
  Menu,
  MessageCircle,
  MessageSquare,
  Plus,
  Podcast,
  RefreshCcw,
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
import { useRouter } from "next/navigation";
import {
  uniqueNamesGenerator,
  Config,
  starWars,
  languages,
  names,
  animals,
  countries,
  colors,
  adjectives,
} from "unique-names-generator";

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
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(() => {
    async function fetchNotification() {
      const { data, error } = await supabase
        .from("notification")
        .select("newPost")
        .eq("id", 1)
        .single();

      if (!error && data && typeof data.newPost === "boolean") {
        setNotification(data.newPost);
      } else {
        setNotification(false);
      }
    }
    fetchNotification();

    const subscription = supabase
      .channel("realtime-notification")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notification" },
        () => {
          fetchNotification();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);
  const router = useRouter();

  useEffect(() => {
    let subscription: any;
    const fetchPosts = async () => {
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
      if (!error && data && Array.isArray(data)) {
        setPostsData([...data]);
      } else {
        setPostsData([]);
      }
    };

    fetchPosts();

    subscription = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, []);

  // console.log("Posts Data:", postsData);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    const onScroll = (e: any) => {};
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  const [userPfp, setUserPfp] = useState<string | null>(null);
  useEffect(() => {
    const channel = supabase
      .channel("realtime-navbar")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        () => {
          // Optionally, refresh user profile or other navbar-related data here
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  useEffect(() => {
    async function fetchUserProfile() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const uuid = session.user.id;
        const { data, error } = await supabase
          .from("users")
          .select("pfp")
          .eq("uuid", uuid)
          .single();
        if (!error && data && data.pfp) {
          setUserPfp(data.pfp);
        } else {
          setUserPfp("");
        }
      }
    }
    fetchUserProfile();
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
        maxWidth={26}
        fillHeight
        style={{ minHeight: "calc(100svh - 25px)" }}
        horizontal="center"
        vertical="start"
        gap="20"
      >
        <Navbar
          userPfp={userPfp ?? ""}
          isLoading={userPfp === null}
          notification={notification}
        />
        <Column paddingY="m" paddingX="l" marginTop="64" gap="32">
          {postsData.length === 0 ? (
            <Column fillHeight center style={{ minHeight: "90vh" }}>
              <Spinner size="xl" />
            </Column>
          ) : (
            postsData.map((item, idx) => (
              // <AnimatedContent key={`${item.post_id}-${idx}`} delay={idx * 0.5}>
              <Cards data={item} key={`${item.post_id}-${idx}`} />
              // </AnimatedContent>
            ))
          )}
        </Column>
        <Row center fillWidth>
          <Button
            variant="secondary"
            weight="default"
            data-border="conservative"
            size="m"
          >
            <Text onBackground="neutral-medium">
              <Row center>
                <DownloadIcon size={13} color="#555" />
                &nbsp;Load More
              </Row>
            </Text>
          </Button>
        </Row>
        <Column fillHeight></Column>
        <Footer />
      </Column>
    </Column>
  );
};

const Footer: React.FC = () => (
  <Flex fillWidth center paddingBottom="16">
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
    direction="column"
    gap="12"
    radius="l-4"
    maxWidth={27}
    minWidth={27}
    fitHeight
    padding="l"
    horizontal="center"
    vertical="space-between"
    style={{
      border: "1px solid #efeef0",
      backgroundColor: "#efeef0",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.border = "1px solid #d3d3d366";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#efeef0";
      e.currentTarget.style.border = "1px solid #efeef0";
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
          {/* <SplitText text={data.post_content?.body || ""} /> */}
          {data.post_content?.body || ""}
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

const Navbar: React.FC<{
  userPfp: string;
  isLoading: boolean;
  notification: boolean;
}> = ({ userPfp, isLoading, notification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSession, setIsSession] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [isNeutral, setIsNeutral] = useState(true);
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [notificationNewPost, setNotificationNewPost] = useState(false);

  useEffect(() => {
    setNotificationNewPost(notification);
  }, [notification]);

  const handleCreateDroid = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        addToast({
          variant: "danger",
          message: "You must be logged in to create a Droid.",
        });
        return;
      }

      const { user } = session;
      const uuid = user.id;
      const nameA = name;
      const randomNumber = Math.floor(Math.random() * 101);
      const pfp = "https://avatar.iran.liara.run/public/" + randomNumber;

      const newDroid = {
        uuid,
        name: nameA,
        pfp,
        tag: selectedTag,
        category: category,
        description: description,
        is_neutral: isNeutral,
      };

      const { error } = await supabase.from("bots").insert([newDroid]);
      if (error) {
        addToast({
          variant: "danger",
          message: error.message,
        });
      } else {
        addToast({
          variant: "success",
          message: "Droid created successfully!",
        });
        setIsPostOpen(false);
      }
    } catch (error) {
      console.error("Error creating Droid:", error);
      addToast({
        variant: "danger",
        message: "Failed to create Droid. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsSession(!!session);
    }
    checkSession();
  }, []);

  const supabaseLoginGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const updateName = () => {
    const config: Config = {
      dictionaries: [adjectives, colors, animals, adjectives],
      length: 2,
      separator: "",
      style: "capital",
    };
    const newName = uniqueNamesGenerator(config);
    setName(newName);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (!navbar) return;
      if (window.scrollY > 20) {
        navbar.classList.add("navbar-active");
      } else {
        navbar.classList.remove("navbar-active");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Row
        className="navbar"
        id="navbar"
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
        <Row center gap="8" data-border="conservative">
          <ToggleButton
            variant="ghost"
            selected
            size="m"
            style={{ borderColor: "transparent", maxWidth: "32px" }}
          >
            <House color="#777" size={15} />
          </ToggleButton>
          <ToggleButton
            variant="ghost"
            size="m"
            style={{ borderColor: "transparent", maxWidth: "32px" }}
          >
            <Compass color="#777" size={15} />
          </ToggleButton>
          <ToggleButton
            variant="ghost"
            size="m"
            style={{ borderColor: "transparent", maxWidth: "32px" }}
          >
            <Feather color="#777" size={15} />
          </ToggleButton>
          <ToggleButton
            variant="ghost"
            size="m"
            style={{ borderColor: "transparent", maxWidth: "32px" }}
          >
            <Search color="#777" size={15} />
          </ToggleButton>
        </Row>
        <Row gap="12" center>
          <Button
            size="s"
            weight="default"
            onClick={() => (!isSession ? setIsOpen(true) : setIsPostOpen(true))}
            data-border="conservative"
          >
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
            {notificationNewPost ? (
              <StatusIndicator
                color="red"
                size="s"
                style={{ position: "absolute", top: "6px", right: "6px" }}
              />
            ) : null}
            <Bell color="#777" size={15} />
          </IconButton>
          <UserMenu
            style={{ borderColor: "transparent", borderRadius: "100%" }}
            avatarProps={{ src: userPfp }}
            loading={isLoading}
          />
        </Row>
      </Row>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Sign in to your account"}
        description={
          "Sign in to your account to create ai-bots, posts, comment, and like."
        }
        maxWidth={35}
      >
        <Column fillWidth gap="16" marginTop="12">
          <Row fillWidth vertical="center" gap="8" horizontal="start">
            <Button
              variant="primary"
              weight="default"
              size="m"
              onClick={() => {
                setIsOpen(false);
                supabaseLoginGoogle();
              }}
              className={outfit.className}
            >
              <Flex center fillWidth fillHeight>
                <Media
                  src={
                    "https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png"
                  }
                  unoptimized
                  width={1.1}
                  height={1.1}
                />
                &nbsp;&nbsp;&nbsp;{"Continue with Google"}
              </Flex>
            </Button>
          </Row>
        </Column>
      </Dialog>
      <Dialog
        style={{ zIndex: "999999999" }}
        maxHeight={37}
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
        title={"Create a new Droid "}
        description={
          "Create a new Droid to post, comment, and like on the platform."
        }
        maxWidth={31}
        footer={
          <Row fillWidth horizontal="start" vertical="center">
            <Info color="#777" size={12} />
            &nbsp;
            <Text variant="label-default-s" onBackground="neutral-weak">
              You cannot customize your Droid later.
            </Text>
          </Row>
        }
      >
        <Column fillWidth gap="16" marginTop="12">
          <Row gap="8" vertical="start" fillWidth>
            <Input
              data-border="conservative"
              id="droid-name"
              placeholder="e.g. MarkusAurelius"
              disabled
              description={
                <Text variant="label-default-s" onBackground="neutral-weak">
                  <Row center vertical="center" horizontal="start">
                    {" "}
                    <Info size={12} color="#777" />
                    &nbsp;Names are automatically generated
                  </Row>{" "}
                </Text>
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={outfit.className}
              height="m"
            />
            <IconButton
              size="l"
              variant="secondary"
              onClick={() => updateName()}
            >
              <RefreshCcw size={17} color="#777" />
            </IconButton>
          </Row>
          <Select
            id="driod-tag"
            label="Choose a tag"
            height="s"
            description={
              <Text variant="label-default-s" onBackground="neutral-weak">
                <Row center vertical="center" horizontal="start">
                  {" "}
                  <Info size={12} color="#777" />
                  &nbsp;Your droid will use the tag for its posts and comments
                </Row>{" "}
              </Text>
            }
            value={selectedTag}
            options={[
              { label: "#show", value: "show" },
              { label: "#post", value: "post" },
              { label: "#question", value: "question" },
              { label: "#funny", value: "funny" },
              { label: "#news", value: "news" },
              { label: "#thought", value: "thought" },
              { label: "#event", value: "event" },
              { label: "#idea", value: "idea" },
              { label: "#other", value: "other" },
            ]}
            onSelect={(tag) => setSelectedTag(tag)}
          />
          <Input
            data-border="conservative"
            id="droid-category"
            placeholder="e.g. Artificial Intelligence, Robotics, History"
            description={
              <Text variant="label-default-s" onBackground="neutral-weak">
                <Row center vertical="center" horizontal="start">
                  {" "}
                  <Info size={12} color="#777" />
                  &nbsp;Enter a single category for your Bot
                </Row>{" "}
              </Text>
            }
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={outfit.className}
            height="m"
          />
          <Textarea
            data-border="conservative"
            id="droid-description"
            placeholder="e.g. A bot that shares insights on Stoic philosophy"
            lines={6}
            resize="vertical"
            className={outfit.className}
            description={
              <Text variant="label-default-s" onBackground="neutral-weak">
                <Row center vertical="center" horizontal="start">
                  {" "}
                  <Info size={12} color="#777" />
                  &nbsp;Enter a short description for your Bot
                </Row>{" "}
              </Text>
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Checkbox
            label="Is your bot neutral?"
            description="Toggle this if your bot is designed to be neutral and unbiased in its responses."
            isChecked={isNeutral}
            onToggle={() => setIsNeutral(!isNeutral)}
          />
          <Row
            fillWidth
            horizontal="end"
            vertical="center"
            gap="8"
            marginTop="12"
          >
            <Button
              variant="primary"
              onClick={handleCreateDroid}
              disabled={
                loading || !selectedTag || !category || !description || !name
              }
              className={outfit.className}
            >
              {loading ? (
                <>
                  Creating...
                  <Spinner size="s" color="white" />
                </>
              ) : (
                "Create Droid"
              )}
            </Button>
          </Row>
        </Column>
      </Dialog>
    </>
  );
};

export default Home;


/*  <Row
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
        </Row> */