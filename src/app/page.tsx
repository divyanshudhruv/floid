"use client";

import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Logo,
  Line,
  LetterFx,
  Flex,
  Row,
  ThemeSwitcher,
  IconButton,
  ToggleButton,
  Scroller,
  Input,
  Card,
  Icon,
  Avatar,
  Media,
  Tag,
  DropdownWrapper,
  Option,
  Kbd,
  ContextMenu,
  Dialog,
  CodeBlock,
  useToast,
  Spinner,
  Skeleton,
} from "@once-ui-system/core";
import { DrawerDemo } from "@/components/custom-drawer";
import { useState } from "react";
import { useEffect } from "react";

import { Inter_Tight } from "next/font/google";
import { AiFillAlert } from "react-icons/ai";
import { BiCross, BiExit, BiSearch } from "react-icons/bi";
import { BsAlphabet, BsArrowRight } from "react-icons/bs";
import { DiGithub, DiGithubBadge } from "react-icons/di";
import { FaBroom, FaGithub } from "react-icons/fa";
import { GiGemini } from "react-icons/gi";
import { GrGithub } from "react-icons/gr";
import {
  PiAndroidLogo,
  PiAppleLogo,
  PiArrowDown,
  PiBroom,
  PiCamera,
  PiCaretDown,
  PiCode,
  PiCodeBlock,
  PiDoor,
  PiDoorOpen,
  PiDotsThreeCircle,
  PiDownloadLight,
  PiFileJsDuotone,
  PiGithubLogo,
  PiGoogleLogo,
  PiGoogleLogoBold,
  PiGoogleLogoLight,
  PiLampThin,
  PiLinuxLogo,
  PiMagnifyingGlass,
  PiOpenAiLogo,
  PiOpenAiLogoDuotone,
  PiOpenAiLogoLight,
  PiPencil,
  PiQuestion,
  PiSparkle,
  PiTrash,
  PiVideo,
  PiVideoCamera,
  PiVideoConference,
} from "react-icons/pi";
import { RiFilter3Fill, RiGeminiLine } from "react-icons/ri";
import { SiPerplexity } from "react-icons/si";
import {
  TbAbc,
  TbAlphabetLatin,
  TbBrandGithub,
  TbBrandGithubCopilot,
  TbBrandReact,
  TbClick,
  TbDeselect,
  TbDownload,
  TbFileDownload,
  TbFileSmile,
  TbList,
  TbMoodSmile,
  TbPencil,
  TbPencilSearch,
  TbPrompt,
  TbQuestionMark,
  TbTag,
  TbWorldDownload,
} from "react-icons/tb";
import React from "react";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export default function Home() {
  const [cardData, setCardData] = useState<CardContainerProps[]>([]);

  useEffect(() => {
    async function fetchPrompts() {
      const { data, error } = await supabase
        .from("prompts")
        .select(
          "id, title, description, tags, click_counts, models, author_id, content, created_at, updated_at"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching prompts:", error);
        return;
      }
      if (data) {
        setCardData(
          data.map((prompt: any) => ({
            title: prompt.title,
            description: prompt.description ?? "",
            tags: prompt.tags ?? [],
            onPreview: () => console.log("Previewing", prompt.title),
            isNew: !!(
              prompt.created_at &&
              new Date(prompt.created_at) >
                new Date(Date.now() - 1000 * 60 * 60 * 1)
            ), // true if created within 1 hour, else false
            clicks: prompt.click_counts ?? 0,
            prompt_id: prompt.id,
            prompt: prompt.content ?? "",
            author_id: prompt.author_id,
            date: prompt.created_at,
            icons: prompt.models ?? [],
          }))
        );
      }
    }
    fetchPrompts();
  }, []);
  const [searchPromptQuery, setSearchPromptQuery] = useState("");
  const [searchPromptQueryViaClick, setSearchPromptQueryViaClick] =
    useState("");

  function googleSignInSupabase() {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
        queryParams: {
          prompt: "select_account",
        },
      },
    });
  }

  const [session, setSession] = useState<Session | null>(null);

  const [user, setUser] = useState<{
    name?: string;
    profilePic?: string;
  } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email,
          profilePic: session.user.user_metadata?.avatar_url || "",
        });
      } else {
        setUser(null);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          setUser({
            name: session.user.user_metadata?.name || session.user.email,
            profilePic: session.user.user_metadata?.avatar_url || "",
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);
  function supabaseSessionLogout() {
    supabase.auth.signOut().then(() => {
      setUser(null);
      window.location.reload();
    });
  }

  useEffect(() => {
    const channel = supabase
      .channel("prompts-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "prompts" },
        (payload) => {
          // Only refetch on new row insert
          supabase
            .from("prompts")
            .select(
              "id, title, description, tags, click_counts, models, author_id, content, created_at, updated_at"
            )
            .order("created_at", { ascending: false })
            .then(({ data, error }) => {
              if (error) {
                console.error("Error fetching prompts:", error);
                return;
              }
              if (data) {
                setCardData(
                  data.map((prompt: any) => ({
                    title: prompt.title,
                    description: prompt.description ?? "",
                    tags: prompt.tags ?? [],
                    onPreview: () => console.log("Previewing", prompt.title),
                    isNew:
                      prompt.created_at &&
                      new Date(prompt.created_at) >
                        new Date(Date.now() - 1000 * 60 * 60 * 1), // new if created within 1 hour
                    clicks: prompt.click_counts ?? 0,
                    prompt_id: prompt.id,
                    prompt: prompt.content ?? "",
                    author_id: prompt.author_id,
                    date: prompt.created_at,
                    icons: prompt.models ?? [],
                  }))
                );
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const options = [
    { label: "Recent", value: "ascending" },
    { label: "Old", value: "ascending" },
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    let orderBy = "created_at";
    let ascending = true;

    if (value === "descending") {
      ascending = false;
    } else if (value === "most_recent") {
      ascending = false;
      orderBy = "created_at";
    } else {
      ascending = true;
      orderBy = "created_at";
    }

    supabase
      .from("prompts")
      .select(
        "id, title, description, tags, click_counts, models, author_id, content, created_at, updated_at"
      )
      .order(orderBy, { ascending })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching prompts:", error);
          return;
        }
        if (data) {
          setCardData(
            data.map((prompt: any) => ({
              title: prompt.title,
              description: prompt.description ?? "",
              tags: prompt.tags ?? [],
              onPreview: () => console.log("Previewing", prompt.title),
              isNew: !!(
                prompt.created_at &&
                new Date(prompt.created_at) >
                  new Date(Date.now() - 1000 * 60 * 60 * 1)
              ),
              clicks: prompt.click_counts ?? 0,
              prompt_id: prompt.id,
              prompt: prompt.content ?? "",
              author_id: prompt.author_id,
              date: prompt.created_at,
              icons: prompt.models ?? [],
            }))
          );
        }
      });
  };

  return (
    <Flex
      fillWidth
      center
      padding="l"
      style={{ minHeight: "100vh" }}
      background="surface"
    >
      <Column
        fillWidth
        fillHeight
        horizontal="center"
        vertical="start"
        gap="20"
      >
        <Flex fillWidth horizontal="start" vertical="center">
          {" "}
          <Row fillWidth horizontal="between" vertical="center">
            {" "}
            <Text
              className={interTight.className + " text-heading"}
              style={{ color: "#FC42FF", fontSize: "32px" }}
            >
              Floid — Prompts
            </Text>
            <Row gap="8">
              {" "}
              <ToggleButton
                size="m"
                style={{ border: "1px solid #33333322", paddingBlock: "17px" }}
                onClick={() => {
                  window.open(
                    "https://github.com/divyanshudhruv/floid",
                    "_blank"
                  );
                }}
              >
                <Row center gap="8">
                  {" "}
                  Github
                  <GrGithub size={16} />
                </Row>
              </ToggleButton>{" "}
              <ToggleButton
                size="m"
                style={{ border: "1px solid #33333322", paddingBlock: "17px" }}
                onClick={googleSignInSupabase}
              >
                <Row center gap="8">
                  {" "}
                  {user ? (
                    <>
                      <Text>{user?.name}</Text>
                      <Avatar src={user?.profilePic} />
                    </>
                  ) : (
                    <Text>Login</Text>
                  )}
                </Row>
              </ToggleButton>{" "}
              {user ? (
                <IconButton
                  tooltip="Logout"
                  tooltipPosition="bottom"
                  size="m"
                  variant="secondary"
                  style={{
                    border: "1px solid #33333322",
                  }}
                  onClick={supabaseSessionLogout}
                >
                  <Row center gap="8">
                    <Text>
                      <BiExit color="#444" />
                    </Text>
                  </Row>
                </IconButton>
              ) : null}
            </Row>
          </Row>
        </Flex>{" "}
        <Flex
          direction="column"
          fillWidth
          horizontal="start"
          vertical="center"
          className="heading-container-gap"
        >
          <Text
            className={interTight.className + " text-heading"}
            style={{
              fontSize: "29px",
              backgroundImage:
                "linear-gradient(to bottom, #0d0d0e 0%, #131315 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Crafted for seamless, engaging interactions with AI models.
          </Text>
          <Text
            className={interTight.className + " text-heading"}
            style={{
              fontSize: "29px",
              backgroundImage:
                "linear-gradient(to bottom, #68686f 0%, #7A7A83 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Intuitive prompts designed for effortless, engaging conversations
            with AI.
          </Text>
        </Flex>
        <Flex fillWidth horizontal="start" vertical="center">
          <Text>
            <Row
              center
              className={interTight.className}
              gap="8"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #3a3a3fDD 0%, #23232aDD 100%)",
                WebkitBackgroundClip: "text",
                fontSize: "15px",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {" "}
              Open with{" "}
              <IconButton
                variant="secondary"
                style={{ backgroundColor: "#33333311" }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = "#33333322";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = "#33333311";
                }}
              >
                <TbMoodSmile />
              </IconButton>
              Upload your own
              <DrawerDemo />
            </Row>
          </Text>
        </Flex>
        <Flex height={0.25} fillWidth></Flex>
        <Column fillWidth horizontal="start" vertical="center" gap="16">
          <Scroller direction="row">
            <Row
              fillWidth
              horizontal="start"
              vertical="center"
              style={{ minWidth: "100% !important" }}
              gap="8"
            >
              {[
                {
                  icon: <PiOpenAiLogo />,
                  label: "ChatGPT",
                  onClick: () => setSearchPromptQueryViaClick("ChatGPT"),
                  tooltip: "Open with ChatGPT",
                  tooltipPosition: "bottom",
                },
                {
                  icon: <RiGeminiLine />,
                  label: "Gemini",
                  onClick: () => setSearchPromptQueryViaClick("Gemini"),
                  tooltip: "Open with Gemini",
                  tooltipPosition: "bottom",
                },
                {
                  icon: <SiPerplexity />,
                  label: "Perplexity",
                  onClick: () => setSearchPromptQueryViaClick("Perplexity"),
                  tooltip: "Open with Perplexity",
                  tooltipPosition: "bottom",
                },
                {
                  icon: <PiAndroidLogo />,
                  label: "Android",
                  onClick: () => setSearchPromptQueryViaClick("Android"),
                  tooltip: "Open with Android",
                  tooltipPosition: "bottom",
                },
                {
                  icon: <PiAppleLogo />,
                  label: "Apple",
                  onClick: () => setSearchPromptQueryViaClick("Apple"),
                  tooltip: "Open with Apple",
                  tooltipPosition: "bottom",
                },
                {
                  icon: <PiLinuxLogo />,
                  label: "Linux",
                  onClick: () => setSearchPromptQueryViaClick("Linux"),
                  tooltip: "Open with Linux",
                  tooltipPosition: "bottom",
                },
                {
                  icon: <PiCode />,
                  label: "Code",
                  onClick: () => setSearchPromptQueryViaClick("Code"),
                  className: interTight.className,
                  tooltip: "Open with Code",
                  tooltipPosition: "bottom",
                },
                {
                  icon: <PiDotsThreeCircle />,
                  label: "Others",
                  onClick: () => setSearchPromptQueryViaClick("Others"),
                  className: interTight.className,
                },
                {
                  icon: <PiBroom />,
                  label: "Clear",
                  onClick: () => setSearchPromptQueryViaClick(""),
                  className: interTight.className,
                },
              ].map(({ icon, label, onClick, className }, idx) => (
                <ToggleButton
                  key={label}
                  size="m"
                  style={{
                    border: "1px solid #33333322",
                    paddingBlock: "17px",
                  }}
                  data-border="rounded"
                  className={className}
                  onClick={onClick}
                >
                  <Row center gap="4">
                    {icon}
                    {label}
                  </Row>
                </ToggleButton>
              ))}
            </Row>
          </Scroller>
          <Row gap="20" center>
            {" "}
            <Row
              fillWidth
              horizontal="start"
              vertical="center"
              maxWidth={26}
              gap="8"
            >
              <Input
                id=""
                placeholder="Search..."
                height="s"
                className={interTight.className}
                hasPrefix={<PiMagnifyingGlass color="#444" />}
                onChange={(e) => setSearchPromptQuery(e.target.value)}
                value={searchPromptQuery}
              ></Input>
              <DropdownWrapper
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                trigger={
                  <IconButton size="l" variant="secondary">
                    <RiFilter3Fill color="#333" />
                  </IconButton>
                }
                dropdown={
                  <Column minWidth={10} padding="4" gap="2">
                    {options.map((option) => (
                      <Option
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        selected={option.value === selected}
                        onClick={handleSelect}
                      />
                    ))}
                  </Column>
                }
              />
            </Row>
            <Text variant="label-default-s" onBackground="neutral-weak">
              <Row>
                {" "}
                {searchPromptQuery.trim() !== "" && (
                  <>
                    {
                      cardData.filter(
                        (card) =>
                          card.title
                            .toLowerCase()
                            .includes(searchPromptQuery.toLowerCase()) ||
                          card.description
                            .toLowerCase()
                            .includes(searchPromptQuery.toLowerCase())
                      ).length
                    }
                    &nbsp;found{" "}
                  </>
                )}
              </Row>
            </Text>
          </Row>
          <Flex height={0.1}></Flex>
          <Row fillWidth horizontal="start" vertical="start" wrap gap="24">
            {" "}
            {(() => {
              const query = searchPromptQuery.trim();
              const clickQuery = searchPromptQueryViaClick.trim();

              // Show skeletons if loading
              if (!cardData.length) {
                return (
                  <Row
                    fillWidth
                    horizontal="start"
                    vertical="start"
                    wrap
                    gap="24"
                  >
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <Skeleton
                        key={idx}
                        shape="block"
                        delay="1"
                        radius="l"
                        width="s"
                        className="card-container"
                        style={{
                          minWidth: "320px",
                          minHeight: "180px",
                          maxWidth: "320px",
                          maxHeight: "180px",
                          borderRadius: "10px",
                        }}
                      />
                    ))}
                  </Row>
                );
              }

              // If both are selected, show cards that match BOTH
              if (query !== "" && clickQuery !== "") {
                const filtered = cardData.filter((card) => {
                  const matchesText =
                    card.title.toLowerCase().includes(query.toLowerCase()) ||
                    card.description
                      .toLowerCase()
                      .includes(query.toLowerCase());
                  const matchesModel =
                    Array.isArray(card.icons) &&
                    card.icons.some(
                      (model) =>
                        typeof model === "string" &&
                        (model.toLowerCase() === clickQuery.toLowerCase() ||
                          model
                            .toLowerCase()
                            .includes(clickQuery.toLowerCase()))
                    );
                  return matchesText && matchesModel;
                });
                if (!filtered.length) {
                  return (
                    <Flex fillWidth horizontal="start" paddingX="4">
                      <Text
                        variant="label-default-m"
                        onBackground="neutral-medium"
                      >
                        No data found
                      </Text>
                    </Flex>
                  );
                }
                return filtered.map((card, idx) => (
                  <CardContainer
                    key={card.title + idx}
                    title={card.title}
                    description={card.description}
                    tags={card.tags}
                    onPreview={card.onPreview}
                    icons={card.icons}
                    isNew={card.isNew}
                    clicks={card.clicks}
                    prompt_id={card.prompt_id}
                    prompt={card.prompt}
                    author_id={card.author_id}
                    date={card.date}
                  />
                ));
              }

              // If only model filter is selected
              if (clickQuery !== "") {
                const filtered = cardData.filter(
                  (card) =>
                    Array.isArray(card.icons) &&
                    card.icons.some(
                      (model) =>
                        typeof model === "string" &&
                        (model.toLowerCase() === clickQuery.toLowerCase() ||
                          model
                            .toLowerCase()
                            .includes(clickQuery.toLowerCase()))
                    )
                );
                if (!filtered.length) {
                  return (
                    <Flex fillWidth horizontal="start" paddingX="4">
                      <Text
                        variant="label-default-m"
                        onBackground="neutral-medium"
                      >
                        No data found
                      </Text>
                    </Flex>
                  );
                }
                return filtered.map((card, idx) => (
                  <CardContainer
                    key={card.title + idx}
                    title={card.title}
                    description={card.description}
                    tags={card.tags}
                    onPreview={card.onPreview}
                    icons={card.icons}
                    isNew={card.isNew}
                    clicks={card.clicks}
                    prompt_id={card.prompt_id}
                    prompt={card.prompt}
                    author_id={card.author_id}
                    date={card.date}
                  />
                ));
              }

              // If only text search is selected
              if (query !== "") {
                const filtered = cardData.filter(
                  (card) =>
                    card.title.toLowerCase().includes(query.toLowerCase()) ||
                    card.description.toLowerCase().includes(query.toLowerCase())
                );
                if (!filtered.length) {
                  return (
                    <Flex fillWidth horizontal="start" paddingX="4">
                      <Text
                        variant="label-default-m"
                        onBackground="neutral-medium"
                      >
                        No data found
                      </Text>
                    </Flex>
                  );
                }
                return filtered.map((card, idx) => (
                  <CardContainer
                    key={card.title + idx}
                    title={card.title}
                    description={card.description}
                    tags={card.tags}
                    onPreview={card.onPreview}
                    icons={card.icons}
                    isNew={card.isNew}
                    clicks={card.clicks}
                    prompt_id={card.prompt_id}
                    prompt={card.prompt}
                    author_id={card.author_id}
                    date={card.date}
                  />
                ));
              }

              // If nothing is selected, show all
              return cardData.map((card, idx) => (
                <CardContainer
                  key={card.title + idx}
                  title={card.title}
                  description={card.description}
                  tags={card.tags}
                  onPreview={card.onPreview}
                  icons={card.icons}
                  isNew={card.isNew}
                  clicks={card.clicks}
                  prompt_id={card.prompt_id}
                  prompt={card.prompt}
                  author_id={card.author_id}
                  date={card.date}
                />
              ));
            })()}
          </Row>
          <Row
            fillWidth
            horizontal="start"
            vertical="start"
            paddingTop="0"
            marginTop="m"
          >
            <Text
              variant="label-default-s"
              onBackground="neutral-medium"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Row center gap="8">
                © 2024 Floid. All rights reserved. Powered by{" "}
                <Tag variant="info">Supabase</Tag> &{" "}
                <Tag variant="info">Once UI System</Tag>
              </Row>
            </Text>
          </Row>
        </Column>
      </Column>
    </Flex>
  );
}

///add things author id and all prompts and all
type CardContainerProps = {
  title: string;
  isNew?: boolean;
  clicks?: number;
  description: string;
  tags?: string[];
  icons?: React.ReactNode[];
  prompt_id?: string;
  onPreview?: () => void;
  author_id?: string;
  prompt: string;
  date?: string; // Optional date of creation
};

function CardContainer({
  title,
  isNew = false,
  clicks = 0,
  description,
  tags = [],
  icons = [],
  prompt_id,
  prompt,
  author_id,
  date,
  onPreview,
}: CardContainerProps) {
  function updateClickCount() {
    setIsOpen(true); // Update the click count for the card

    // Only update if prompt_id exists
    if (!prompt_id) return;

    // Prevent multiple increments per session/user for this prompt
    // Update click_counts in supabase
    // First, fetch the current click_counts from the table
    supabase
      .from("prompts")
      .select("click_counts")
      .eq("id", prompt_id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to fetch click count:", error);
          return;
        }
        const currentClicks = data?.click_counts ?? 0;
        // Now, update the click_counts with incremented value
        supabase
          .from("prompts")
          .update({ click_counts: currentClicks + 1 })
          .eq("id", prompt_id)
          .then(({ error }) => {
            if (error) {
              console.error("Failed to update click count:", error);
            }
          });
      });
  }
  const [isOpen, setIsOpen] = useState(false);

  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    if (!author_id) return;
    supabase
      .from("users")
      .select("display_name")
      .eq("id", author_id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching author name:", error);
          setAuthorName("");
        } else {
          setAuthorName(data?.display_name ?? "");
        }
      });
  }, [author_id]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  function deletePrompt(promptId: string) {
    setShowDeleteDialog(true);
  }

  function editPrompt(promptId: string) {
    // Logic to edit the prompt
  }

  const [sessionID, setSessionID] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionID(session?.user?.id ?? null);
    });
  }, []);

  const { addToast } = useToast();
  return (
    <>
      <Flex>
        <ContextMenu
          placement="bottom-start"
          dropdown={
            <Column gap="2" padding="4" minWidth={10}>
              {author_id === sessionID ? (
                <>
                  <Option
                    hasPrefix={<PiPencil color="#333" />}
                    label="Edit"
                    value="edit"
                    onClick={() => prompt_id && editPrompt(prompt_id)}
                    style={{
                      cursor: "pointer",
                      color: "#222",
                      backgroundColor: "#eee",
                      pointerEvents: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#fafafa")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#222")}
                  />

                  <Line marginY="2" />
                  <Option
                    hasPrefix={<PiTrash color="#222" />}
                    value="delete"
                    onClick={() => prompt_id && deletePrompt(prompt_id)}
                    style={{
                      cursor: "pointer",
                      color: "#333",
                    }}
                  >
                    <Text variant="label-default-s">Delete</Text>
                  </Option>
                </>
              ) : (
                <Option
                  hasPrefix={<PiQuestion color="#333" />}
                  label="You don't have permission to edit"
                  value="edit"
                  style={{
                    cursor: "pointer",
                    color: "#fafafa",
                  }}
                />
              )}
            </Column>
          }
        >
          <Card
            radius="l-4"
            direction="column"
            border="neutral-alpha-medium"
            paddingBottom="12"
            maxWidth={20}
            cursor="interactive"
            overflow="hidden"
            className="card-container"
          >
            <Column
              paddingTop="24"
              style={{ backgroundColor: "#fff" }}
              gap="12"
            >
              <Row
                fillWidth
                gap="8"
                vertical="center"
                horizontal="between"
                paddingX="24"
              >
                <Text
                  variant="label-strong-xl"
                  className={interTight.className}
                >
                  <Row gap="8">
                    <Text
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0d0d0e 0%, #131315 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: sessionID === author_id ? "120px" : "170px", // adjust as needed
                        display: "block",
                      }}
                      title={title}
                    >
                      {title}
                    </Text>
                    {isNew && (
                      <Tag
                        variant="neutral"
                        className={interTight.className}
                        style={{
                          backgroundColor: "#131315",
                          color: "#fff",
                          fontWeight: 500,
                          paddingInline: "4px",
                          paddingBlock: "2px",
                        }}
                        data-border="rounded"
                      >
                        <Text
                          variant="label-strong-xs"
                          style={{ color: "#fafafa", fontSize: "10px" }}
                        >
                          New
                        </Text>
                      </Tag>
                    )}

                    {sessionID === author_id && (
                      <Tag
                        variant="gradient"
                        className={interTight.className}
                        style={{
                          fontWeight: 500,
                          paddingInline: "4px",
                          paddingBlock: "2px",
                        }}
                        data-border="rounded"
                      >
                        <Text
                          variant="label-strong-xs"
                          style={{ fontSize: "10px" }}
                        >
                          You
                        </Text>
                      </Tag>
                    )}
                  </Row>
                </Text>
                <Tag
                  variant="neutral"
                  className={interTight.className}
                  size="s"
                  data-border="conservative"
                >
                  <Row center gap="4">
                    <Text variant="label-default-xs">{clicks}</Text>
                    <TbClick />
                  </Row>
                </Tag>
              </Row>
              <Column fillWidth gap="8" paddingX="24">
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {description}
                </Text>
              </Column>
              <Row
                gap="4"
                vertical="center"
                textVariant="label-default-s"
                onBackground="neutral-medium"
                paddingX="24"
                wrap={true}
              >
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    variant="neutral"
                    className={interTight.className}
                    data-border="rounded"
                    style={{ backgroundColor: "#fafafa" }}
                  >
                    <Text
                      variant="label-default-xs"
                      style={{
                        fontSize: "12px",
                        backgroundImage:
                          "linear-gradient(to bottom, #4e4e54ff 0%, #6e6e76ff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {tag}
                    </Text>
                  </Tag>
                ))}
              </Row>
              <Line background="neutral-alpha-medium" height={0.005} />
            </Column>

            <Row
              fillWidth
              paddingX="24"
              horizontal="between"
              vertical="center"
              paddingTop="12"
            >
              <Row fitWidth gap="2" vertical="center" horizontal="start">
                {Array.isArray(icons) && icons.length > 0
                  ? (icons as string[]).map((iconStr, i) => {
                      // Map string to React element
                      let icon: React.ReactNode = null;
                      switch (iconStr) {
                        case "ChatGPT":
                          icon = <PiOpenAiLogo />;
                          break;
                        case "Gemini":
                          icon = <RiGeminiLine />;
                          break;
                        case "Perplexity":
                          icon = <SiPerplexity />;
                          break;
                        case "Android":
                          icon = <PiAndroidLogo />;
                          break;
                        case "Apple":
                          icon = <PiAppleLogo />;
                          break;
                        case "Linux":
                          icon = <PiLinuxLogo />;
                          break;
                        case "Code":
                          icon = <PiCode />;
                          break;
                        case "Others":
                          icon = <PiDotsThreeCircle />;
                          break;
                        default:
                          icon = null;
                      }
                      return icon ? (
                        <IconButton
                          key={i}
                          variant="tertiary"
                          style={{ color: "#131315dd" }}
                          size="s"
                        >
                          {icon}
                        </IconButton>
                      ) : null;
                    })
                  : null}
              </Row>
              <Text
                onBackground="neutral-weak"
                variant="body-default-xs"
                style={{ cursor: onPreview ? "pointer" : undefined }}
                onClick={onPreview}
              >
                <Row gap="4" center>
                  <Text onClick={updateClickCount}>Preview prompt</Text>
                  <BsArrowRight />
                </Row>
              </Text>
            </Row>
          </Card>
        </ContextMenu>
      </Flex>

      {/* Delete Prompt Dialog */}
      <Dialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Delete Prompt"
        description="Are you sure you want to delete this prompt? This action cannot be undone."
      >
        <Flex direction="row" gap="16">
          <Button
            variant="danger"
            onClick={() => {
              if (!prompt_id) return;
              supabase
                .from("prompts")
                .delete()
                .eq("id", prompt_id)
                .then(({ error }) => {
                  if (error) {
                    addToast({
                      message: error.message,
                      variant: "danger",
                    });
                  } else {
                    setShowDeleteDialog(false);
                    addToast({
                      message: "Prompt deleted successfully",
                      variant: "success",
                    });
                  }
                });
            }}
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
        </Flex>
      </Dialog>

      {/* rdf */}
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
      >
        <CodeBlock
          copyButton={true}
          codes={[
            {
              code: `${[prompt]}
      `,
              language: "javascript",
              label: "Prompt",
            },
            {
              code: `${date ? new Date(date).toUTCString() : ""}
      `,
              language: "html",
              label: "Date of Creation (GMT)",
            },
            {
              code: `${authorName}
      `,
              language: "html",
              label: "Author",
            },
          ]}
        />
      </Dialog>
    </>
  );
}
