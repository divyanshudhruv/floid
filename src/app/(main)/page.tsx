"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  AvatarGroup,
  Kbar,
} from "@once-ui-system/core";
import { Outfit, Inter, DM_Sans } from "next/font/google";
import "./../global.css";
import {
  ArrowRight,
  Bell,
  Bot,
  Command,
  Compass,
  Delete,
  Dot,
  Download,
  DownloadIcon,
  Feather,
  Heart,
  House,
  Info,
  LayoutDashboardIcon,
  LoaderPinwheelIcon,
  LogIn,
  LucideDownloadCloud,
  LucideSquareArrowOutUpRight,
  Menu,
  MessageCircle,
  MessageSquare,
  Moon,
  Plus,
  Podcast,
  RefreshCcw,
  Reply,
  ReplyAllIcon,
  Search,
  Share,
  SidebarCloseIcon,
  Smile,
  Sun,
  Trash,
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
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { GitStarButton } from "@/components/eldoraui/gitstarbutton";
import StaggeredFade from "@/components/eldoraui/fadein";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import LovedBy from "@/components/magicui/avatar-circles";
import { CardComment } from "@/components/eldoraui/animatedcardcomment";
import NavBar from "@/components/custom-ui/Navbar";
import Hero from "@/components/custom-ui/Hero";
import Footer from "@/components/custom-ui/Footer";


import Posts from "@/components/custom-ui/Posts";

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

// Main Page
const Home: React.FC = () => {
  const [userPfp, setUserPfp] = useState<string | null>(null);
  const router = useRouter();

  // Notification
  

  // Load More

  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    lenis.on("scroll", () => {});
    return () => {
      lenis.off("scroll", () => {});
      lenis.destroy();
    };
  }, []);

  // Navbar user pfp
  useEffect(() => {
    const channel = supabase
      .channel("realtime-navbar")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        () => {}
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
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
        setUserPfp(!error && data && data.pfp ? data.pfp : "");
      }
    };
    fetchUserProfile();
  }, []);

  // Responsive columns

  return (
    <>
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
          fillHeight
          style={{ minHeight: "calc(100svh - 25px)" }}
          horizontal="center"
          vertical="start"
          gap="20"
        >
          <NavBar
            userPfp={userPfp ?? ""}
            isLoading={userPfp === null}
          />
          <Hero />
          <>
            <Posts />
          </>
          <Footer />
        </Column>
      </Column>
    </>
  );
};
export default Home;
