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
  useToast,
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
  Spinner,
} from "@once-ui-system/core";

import { Inter_Tight } from "next/font/google";
import { AiFillAlert } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsAlphabet, BsArrowRight } from "react-icons/bs";
import { DiGithub, DiGithubBadge } from "react-icons/di";
import { FaGithub } from "react-icons/fa";
import { GiGemini } from "react-icons/gi";
import { GrGithub } from "react-icons/gr";
import {
  PiAndroidLogo,
  PiAppleLogo,
  PiArrowDown,
  PiCamera,
  PiCode,
  PiCodeBlock,
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
  PiSparkle,
  PiTrash,
  PiVideo,
  PiVideoCamera,
  PiVideoConference,
} from "react-icons/pi";
import { RiGeminiLine } from "react-icons/ri";
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
  TbPrompt,
  TbTag,
  TbWorldDownload,
} from "react-icons/tb";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export default function Home() {
  const { addToast } = useToast();
  useEffect(() => {
    async function handleUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const user = session.user;
      const { id, email, user_metadata } = user;
      const google_id = user_metadata?.provider_id || user_metadata?.sub || id;
      const display_name =
        user_metadata?.name || user_metadata?.full_name || "";
      const full_name = user_metadata?.full_name || user_metadata?.name || "";
      const first_name = full_name.split(" ").slice(0, 1).join(" ");
      const last_name = full_name.split(" ").slice(1).join(" ");
      const profile_picture_url = user_metadata?.picture || null;

      // Fetch existing user

      const { data: existing, error: fetchError } = await supabase
        .from("users")
        .select("id, profile_picture_url")
        .eq("google_id", google_id)
        .single();

      if (existing) {
        // Update last_sign_in_at, and other fields except profile_picture_url if already present
        await supabase
          .from("users")
          .update({
            email,
            display_name,
            first_name,
            last_name,
            last_sign_in_at: new Date().toISOString(),
            profile_picture_url: existing.profile_picture_url
              ? existing.profile_picture_url
              : profile_picture_url,
            id: user.id,
          })
          .eq("id", existing.id);

        addToast({
          message: "Welcome back, " + display_name + "!",
          variant: "success",
        });
        window.location.replace("/");
      } else {
        // Insert new user
        await supabase.from("users").insert([
          {
            google_id,
            email,
            display_name,
            first_name,
            last_name,
            profile_picture_url,
            created_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            id: user.id,
          },
        ]);
        addToast({
          message: "Welcome, " + display_name + "!",
          variant: "success",
        });
        window.location.replace("/");
      }
    }
    handleUser();
    // Redirect to home after success
  }, []);
  return (
    <Flex
      fillWidth
      fillHeight
      center
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Spinner size="l" />
    </Flex>
  );
}
