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
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPrompts, setTotalPrompts] = useState<number>(0);

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

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const { count: userCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });
        const { count: promptCount } = await supabase
          .from("prompts")
          .select("*", { count: "exact", head: true });
        setTotalUsers(userCount ?? 0);
        setTotalPrompts(promptCount ?? 0);
      } catch (error) {
        addToast({
          message: "Could not fetch user or prompt counts.",
          variant: "danger",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);
  return (
    <>
      <Flex fillWidth paddingY="l" center marginTop="80">
        <Column maxWidth={46} horizontal="center" vertical="start" gap="32">
          <Column center gap="12" className="hero">
            <GitStarButton stars={140} />
            <Flex maxWidth={43}>
              <Text
                style={{
                  fontSize: "55px",
                  textAlign: "center",
                  lineHeight: "64px",
                  marginTop: "4px",
                  fontWeight: "500",
                  letterSpacing: "-0.6px",
                }}
                className={inter.className + " text-hero-big"}
              >
                The first prompt network —{" "}
                <AnimatedGradientText> for Everyone</AnimatedGradientText>
              </Text>
            </Flex>
          </Column>
          <Flex center className="hero-description" maxWidth={40}>
            <Text                id="searchbar"

              style={{
                fontSize: "16px",
                textAlign: "center",
                lineHeight: "24px",
                color: "#555",
                letterSpacing: "-0.2px",
              }}
              className={inter.className + " text-hero-small"}
            >
              Floid helps you manage and publish AI prompts with ease and like
              never before. Share with the world or keep it private — it's your
              workflow to control.
            </Text>
          </Flex>
          <Flex fillWidth paddingX="xl" data-border="playful" maxWidth={30} >
            <Row gap="8" center>
              <Input
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
                    <IconButton size="m" variant="secondary">
                      <Filter size={17} color="#777"></Filter>
                    </IconButton>
                  </Flex>
                }
              />
            </Row>
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
              Already used by <b style={{ color: "#555" }}>{totalUsers + 2}+</b>{" "}
              creators,
              <br />
              generating <b style={{ color: "#555" }}>{totalPrompts}+</b>{" "}
              prompts
            </Text>
          </Column>
        </Column>
      </Flex>
    </>
  );
}
