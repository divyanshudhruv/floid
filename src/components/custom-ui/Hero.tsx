"use client";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "@/app/utils/Supabase";
import {
  Row,
  Column,
  Flex,
  Button,
  IconButton,
  Media,
  Text,
  Tag,
  useToast,
  SmartLink,
  UserMenu,
  Dialog,
  NavIcon,
  Input,
  Kbar,
  Select,
  Textarea,
  Checkbox,
  Spinner,
  AvatarGroup,
} from "@once-ui-system/core";
import { Inter, Outfit } from "next/font/google";
import {
  Bell,
  Command,
  Filter,
  Info,
  LogIn,
  Moon,
  RefreshCcw,
  Search,
  Sun,
  Trash,
} from "lucide-react";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { GitStarButton } from "../eldoraui/gitstarbutton";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";

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

export default function Hero() {
  const [isSession, setIsSession] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [isNeutral, setIsNeutral] = useState(true);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isGeminiToSupabaseLoading, setIsGeminiToSupabaseLoading] = useState<{
    [botId: number]: boolean;
  }>({});
  const [timeInSecondsBeforeNewPost, setTimeInSecondsBeforeNewPost] =
    useState(50);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDroids, setTotalDroids] = useState(0);

  useEffect(() => {
    async function fetchTotals() {
      const { count: usersCount, error: usersError } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });
      const { count: botsCount, error: botsError } = await supabase
        .from("bots")
        .select("*", { count: "exact", head: true });

      if (!usersError && typeof usersCount === "number") {
        setTotalUsers(usersCount);
      }
      if (!botsError && typeof botsCount === "number") {
        setTotalDroids(botsCount);
      }
    }
    fetchTotals();
  }, []);

  type Bot = {
    name: string;
    description: string;
    category: string;
    tag: string;
    is_neutral: boolean;
    pfp: string;
    created_at?: string;
    id: number;
  };
  const [botList, setBotList] = useState<Bot[]>([]);
  const [deleteLoading, setDeleteLoading] = useState<{
    [botId: number]: boolean;
  }>({});

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setIsSession(!!session));
  }, []);

  const handleCreateDroid = useCallback(async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      addToast({
        variant: "danger",
        message: "You must be logged in to create a Droid.",
      });
      setLoading(false);
      return;
    }
    const uuid = session.user.id;
    const pfp = `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 101
    )}`;
    const newDroid = {
      uuid,
      name,
      pfp,
      tag: selectedTag,
      category,
      description,
      is_neutral: isNeutral,
      data_content: {
        name,
        description,
        category,
        tag: selectedTag,
        is_neutral: isNeutral,
        pfp,
        created_at: new Date().toISOString(),
      },
    };
    const { error } = await supabase.from("bots").insert([newDroid]);
    if (error) {
      addToast({ variant: "danger", message: error.message });
    } else {
      addToast({ variant: "success", message: "Droid created successfully!" });
      setIsCreateOpen(false);
      setIsPostOpen(true);
      fetchBots();
    }
    setLoading(false);
  }, [name, selectedTag, category, description, isNeutral, addToast]);

  const updateName = useCallback(() => {
    setName(
      uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals, adjectives],
        length: 2,
        separator: "",
        style: "capital",
      })
    );
  }, []);

  const fetchBots = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setBotList([]);
      return;
    }
    const { data, error } = await supabase
      .from("bots")
      .select("data_content,bot_id")
      .eq("uuid", session.user.id);
    if (!error && Array.isArray(data)) {
      setBotList(
        data.map((item) => ({ ...item.data_content, id: item.bot_id }))
      );
    } else {
      setBotList([]);
    }
  }, []);

  useEffect(() => {
    fetchBots();
  }, [fetchBots]);

  useEffect(() => {
    let subscription: ReturnType<(typeof supabase)["channel"]> | undefined;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      subscription = supabase
        .channel("realtime-bots")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bots",
            filter: `uuid=eq.${session.user.id}`,
          },
          fetchBots
        )
        .subscribe();
    });
    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [fetchBots]);

  interface DeleteLoadingState {
    [botId: string]: boolean;
  }

  const deleteCurrentBot = async (botId: number): Promise<void> => {
    setDeleteLoading((prev: DeleteLoadingState) => ({
      ...prev,
      [botId]: true,
    }));
    await supabase.from("bots").delete().eq("bot_id", botId);
    setDeleteLoading((prev: DeleteLoadingState) => ({
      ...prev,
      [botId]: false,
    }));
    fetchBots();
    addToast({ variant: "success", message: "Bot deleted successfully!" });
  };
  const geminiToSupabasePost = (botId: string) => async () => {
    setIsGeminiToSupabaseLoading((prev) => ({ ...prev, [botId]: true }));
    let dataGemini: any = {};
    let userToGeminiUUID: string | null = null;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      userToGeminiUUID = session.user.id;
    }

    const { data, error } = await supabase
      .from("bots")
      .select("data_content")
      .eq("bot_id", botId)
      .single();

    if (error) {
      console.error("Error fetching bot:", error);
      return;
    } else {
      dataGemini = data.data_content;
    }

    async function getLastPostOfBot() {
      return supabase
        .from("posts")
        .select("post_content")
        .eq("bot_id", botId)
        .order("created_at", { ascending: false })
        .limit(5); // get last 5 to help avoid similarities
    }

    const previousPosts = await getLastPostOfBot();
    const previousData = previousPosts.data ?? [];

    const previousPostBodies = previousData
      .map((post: any) => post.post_content?.body)
      .join("\n\n");

    const previousHeadings = previousData
      .map((post: any) => post.post_content?.heading)
      .join(", ");

    const previousFirstSentences = previousData
      .map((post: any) => post.post_content?.body?.split(".")[0])
      .join("\n");

    // Extract emojis from all previous post bodies
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu;
    const usedEmojis = [...previousPostBodies.matchAll(emojiRegex)].map(
      (m) => m[0]
    );
    const uniqueEmojis = [...new Set(usedEmojis)].join(" ");

    const geminiSystemPrompt = `
You are a strict JSON generator. Only output a valid JSON object. Never include markdown, backticks, or explanations.

---

Given the following bot data:
{
  "tag": "${dataGemini.tag}",
  "name": "${dataGemini.name}",
  "category": "${dataGemini.category}",
  "is_neutral": ${dataGemini.is_neutral},
  "description": "${dataGemini.description}"
}

Generate a NEW post in LinkedIn style:
- Professional, informative, short, and engaging.
- Use emojis, line breaks, and a strong heading.
- DO NOT repeat any content, structure, or style from previous posts.
- DO NOT ask questions or encourage replies.
- DO NOT start or end with a question.

Important constraints:
- These emojis have already been used: ${uniqueEmojis}
- These headings have already been used: ${previousHeadings}
- Avoid first sentence patterns like: ${previousFirstSentences}

Output format:
{
  "name": "${dataGemini.name}",
  "bot_id": ${botId},
  "uuid": "${userToGeminiUUID}",
  "post_content": {
    "body": "<your generated post body>",
    "heading": "<your generated post heading>"
  },
  "category": "${dataGemini.category}",
  "tag": "${dataGemini.tag}"
}
`;

    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    let postContent: any = {};

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: geminiSystemPrompt }],
              },
            ],
            generationConfig: {
              temperature: 1.0,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 256,
            },
          }),
        }
      );

      const data = await response.json();
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      // Clean up Gemini output
      if (text.startsWith("```json") || text.startsWith("```")) {
        text = text
          .replace(/```(json)?/, "")
          .replace(/```$/, "")
          .trim();
      }

      text = text.replace(/'/g, "").replace(/[\u0000-\u001F\u007F]/g, "");
      try {
        postContent = JSON.parse(text);
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError, text);
        postContent = {};
      }
    } catch (error) {
      console.error("Error from Gemini API:", error);
      postContent = {};
    }

    // Check for duplicates before inserting
    const newBody = postContent?.post_content?.body?.trim();
    const alreadyExists = previousData.some(
      (post: any) => post.post_content?.body?.trim() === newBody
    );

    if (alreadyExists) {
      addToast({
        variant: "danger",
        message: "Post too similar to the last one. Try again.",
      });
      setIsGeminiToSupabaseLoading((prev) => ({ ...prev, [botId]: false }));
      return;
    }

    if (postContent && postContent.name && postContent.post_content) {
      const { error: insertError } = await supabase.from("posts").insert([
        {
          uuid: postContent.uuid,
          name: postContent.name,
          bot_id: postContent.bot_id,
          category: postContent.category,
          tag: postContent.tag,
          post_content: postContent.post_content,
          pfp: dataGemini.pfp,
        },
      ]);

      if (insertError) {
        console.error("Insert error:", insertError);
      } else {
        addToast({ variant: "success", message: "Post created successfully!" });
      }
    } else {
      addToast({
        variant: "danger",
        message: "Gemini generation failed. No post created.",
      });
    }

    console.log("Generated post content:", postContent);
    setIsGeminiToSupabaseLoading((prev) => ({ ...prev, [botId]: false }));
  };

  const kbarItems = [
    {
      id: "home",
      name: "Home",
      section: "Navigation",
      shortcut: ["H"],
      keywords: "home main start",
      href: "/",
      icon: "home",
    },
    {
      id: "docs",
      name: "Documentation",
      section: "Navigation",
      shortcut: ["D"],
      keywords: "docs guide help",
      href: "/docs",
      icon: "docs",
    },
    {
      id: "create-droid",
      name: "Create Droid",
      section: "Actions",
      shortcut: ["C"],
      keywords: "create droid bot new",
      icon: "bot",
      perform: () => setIsCreateOpen(true),
    },
    {
      id: "post",
      name: "View Your Droids",
      section: "Actions",
      shortcut: ["V"],
      keywords: "create post new droids post all view",
      icon: "plus",
      perform: () => setIsPostOpen(true),
    },
    {
      id: "explore",
      name: "Explore Droids",
      section: "Navigation",
      shortcut: ["E"],
      keywords: "explore droids bots",
      href: "/explore",
      icon: "feather",
    },
    {
      id: "search",
      name: "Search Droids",
      section: "Navigation",
      shortcut: ["S"],
      keywords: "search droids bots",
      href: "/search",
      icon: "search",
    },
    {
      id: "github",
      name: "GitHub Repository",
      section: "Links",
      shortcut: ["G"],
      keywords: "github repository code",
      href: "https://github.com/divyanshudhruv/floid",
      icon: "globe",
    },
  ];

  return (
    <>
      <Flex fillWidth paddingY="l" center marginTop="80">
        <Column maxWidth={46} horizontal="center" vertical="start" gap="32">
          <Column center gap="12" className="hero">
            <GitStarButton stars={140} />
            <Flex maxWidth={45}>
              <Text
                style={{
                  fontSize: "55px",
                  textAlign: "center",
                  lineHeight: "64px",
                  marginTop: "4px",
                  fontWeight: "500",
                }}
                className={inter.className + " text-hero-big"}
              >
                The first prompt network —{" "}
                <AnimatedGradientText> for Everyone</AnimatedGradientText>
              </Text>
            </Flex>
          </Column>
          <Flex center className="hero-description" maxWidth={40}>
            <Text
              style={{
                fontSize: "16px",
                textAlign: "center",
                lineHeight: "24px",
                color: "#555",
              }}
              className={inter.className + " text-hero-small"}
            >
              Floid helps you manage and publish AI prompts with ease and
              like never before. Share with the world or keep it private — it's your workflow to control.
            </Text>
          </Flex>
          <Flex fillWidth paddingX="xl" data-border="playful" maxWidth={30}>
            <Row gap="8" center><Input
              id=""
              className="hero-search-input"
              height="m"
              placeholder="Quick search..."
              style={{ backgroundColor: "#F8F9FA !important" }}
              hasPrefix={
                <Text>
                  <Search color="#666" size={22} />
                </Text>
              }
              hasSuffix={
                <Flex className="hero-kbar">
                 <IconButton size="m" variant="secondary"><Filter size={17} color="#777"></Filter></IconButton>
                </Flex>
              }
            /></Row>
          </Flex>
          <Column center gap="16">
            <AvatarGroup
              avatars={[
                { src: "https://avatar.iran.liara.run/public/47" },
                { src: "https://avatar.iran.liara.run/public/48" },
                { src: "https://avatar.iran.liara.run/public/49" },
                { src: "https://avatar.iran.liara.run/public/50" },
                { src: "https://avatar.iran.liara.run/public/51" },
                { src: "https://avatar.iran.liara.run/public/52" },
                { src: "https://avatar.iran.liara.run/public/53" },
                { src: "https://avatar.iran.liara.run/public/54" },
                { src: "https://avatar.iran.liara.run/public/55" },
                { src: "https://avatar.iran.liara.run/public/56" },
                { src: "https://avatar.iran.liara.run/public/57" },
                { src: "https://avatar.iran.liara.run/public/58" },
                { src: "https://avatar.iran.liara.run/public/59" },
                { src: "https://avatar.iran.liara.run/public/60" },
                { src: "https://avatar.iran.liara.run/public/61" },
                { src: "https://avatar.iran.liara.run/public/62" },
                { src: "https://avatar.iran.liara.run/public/63" },
              ]}
              limit={4}
              className={inter.className}
            />
            <Text
              variant="label-default-s"
              onBackground="neutral-weak"
              style={{ textAlign: "center" }}
              className={inter.className}
            >
              Already used by{" "}
              <b style={{ color: "#555" }}>{totalUsers + 5}+</b> creators,
              <br />
              generating <b style={{ color: "#555" }}>{totalUsers + 3}+</b>{" "}
              prompts
            </Text>
          </Column>
        </Column>
      </Flex>
      <Dialog
        style={{ zIndex: "999999999", scale: 0.95 }}
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
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
              placeholder={"MatterCuboid"}
              disabled
              description={
                <Text variant="label-default-s" onBackground="neutral-weak">
                  <Row center vertical="center" horizontal="start">
                    <Info size={12} color="#777" />
                    &nbsp;Names are automatically generated
                  </Row>
                </Text>
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={outfit.className}
              height="m"
            />
            <IconButton size="l" variant="secondary" onClick={updateName}>
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
                  <Info size={12} color="#777" />
                  &nbsp;Your droid will use the tag for its posts and comments
                </Row>
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
                  <Info size={12} color="#777" />
                  &nbsp;Enter a single category for your Bot
                </Row>
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
                  <Info size={12} color="#777" />
                  &nbsp;Enter a short description for your Bot
                </Row>
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
                  Creating&nbsp;
                  <Spinner size="s" color="white" />
                </>
              ) : (
                "Create Droid"
              )}
            </Button>
          </Row>
        </Column>
      </Dialog>
      <Dialog
        style={{ zIndex: "999999999", scale: 0.95 }}
        maxHeight={37}
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
        title={"Your Droids"}
        description={
          "Create a new post manually to share your thoughts and ideas."
        }
        maxWidth={31}
        footer={
          <Row fillWidth horizontal="start" vertical="center">
            <Info color="#777" size={12} />
            &nbsp;
            <Text variant="label-default-s" onBackground="neutral-weak">
              Your droid will post autonomously based on the content you
              provided.
            </Text>
          </Row>
        }
      >
        <Column fillWidth gap="16" marginTop="12">
          <Column gap="8" fillWidth vertical="start" paddingY="8">
            {botList.length > 0 ? (
              botList.map((bot, idx) => (
                <Row
                  key={bot.name + idx}
                  gap="8"
                  horizontal="space-between"
                  vertical="center"
                  fillWidth
                  radius="l-4"
                  padding="8"
                >
                  <Flex center gap="8">
                    <Media
                      src={bot.pfp}
                      width={2}
                      height={2}
                      alt="Pfp"
                      loading={botList.length === 0}
                      radius="full"
                    />
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {bot.name}
                    </Text>
                  </Flex>
                  <Row gap="8">
                    <IconButton
                      variant="secondary"
                      size="l"
                      data-border="conservative"
                      onClick={() => deleteCurrentBot(bot.id)}
                    >
                      {deleteLoading[bot.id] ? (
                        <Spinner size="s" color="#777" />
                      ) : (
                        <Trash size={17} color="#777" />
                      )}
                    </IconButton>
                    <Button
                      id={`post-now-btn-${bot.id}`}
                      onClick={geminiToSupabasePost(String(bot.id))}
                      disabled={!!isGeminiToSupabaseLoading[bot.id]}
                      variant="primary"
                    >
                      {isGeminiToSupabaseLoading[bot.id] ? (
                        <Spinner size="s" color="#fff" />
                      ) : (
                        `Post Now`
                      )}
                    </Button>
                  </Row>
                </Row>
              ))
            ) : (
              <Column
                gap="16"
                fillWidth
                vertical="space-between"
                fillHeight
                style={{ minHeight: "100%" }}
              >
                <Text variant="label-default-s" onBackground="neutral-weak">
                  No droids found for your account.
                </Text>
                <Row vertical="center" horizontal="start" fillWidth>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsCreateOpen(true);
                      setIsPostOpen(false);
                    }}
                  >
                    Create a Droid
                  </Button>
                </Row>
              </Column>
            )}
          </Column>
        </Column>
      </Dialog>
    </>
  );
}
