"use client";
import Navbar from "@/components/custom-ui/Navbar";
import {
  Column,
  Flex,
  Row,
  Text,
  Tag,
  IconButton,
  Button,
  UserMenu,
  Card,
  Scroller,
  Feedback,
  BarChart,
  LineBarChart,
  Media,
  SmartLink,
  InlineCode,
} from "@once-ui-system/core";
import Avvvatars from "avvvatars-react";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/Supabase";
// import Sidebar from "@/components/custom-ui/Sidebar";
import {
  Inter,
  Outfit,
  Fira_Code,
  Geist_Mono,
  Source_Code_Pro,
  Fira_Sans_Condensed,
} from "next/font/google";
import {
  ArrowUpRight,
  Bell,
  ChartLineIcon,
  ChartNoAxesColumnDecreasing,
  ChartNoAxesColumnIncreasingIcon,
  Clipboard,
  Copy,
  Delete,
  LucideMenu,
  Plus,
  SidebarCloseIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/comp-449";
import Component from "@/components/comp-311";
import FileUploader from "@/components/comp-548";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
const firaSansCondensed = Fira_Sans_Condensed({
  subsets: ["latin"],
  weight: "400",
});

interface Item {
  name: string;
  children?: string[];
}

const items: Record<string, Item> = {
  company: {
    name: "Company",
    children: ["engineering"],
  },
  engineering: {
    name: "Home",
    children: ["dashboard", "frontend", "user"],
  },
  dashboard: { name: "Dashboard" },
  frontend: {
    name: "Your vault",
    children: ["backend", "design-system"],
  },
  "design-system": {
    name: "Active",
    children: ["components", "tokens", "guidelines"],
  },
  user: {
    name: "User",
    children: ["profile", "settings"],
  },
  profile: { name: "Profile" },
  settings: { name: "Settings" },
  components: { name: "Shared" },
  tokens: { name: "Private" },
  guidelines: { name: "Public" },
  // "web-platform": { name: "Web Platform" },
  backend: { name: "All Prompts" },
  apis: { name: "All Prompts" },
  infrastructure: { name: "Infrastructure" },
  marketing: { name: "Marketing", children: ["content", "seo"] },
  content: { name: "Content" },
  seo: { name: "SEO" },
  operations: { name: "Operations", children: ["hr", "finance"] },
  hr: { name: "HR" },
  finance: { name: "Finance" },
};

export default function AddPromptPage() {
  const [userInfoFromSession, setUserInfoFromSession] = useState<any>(null);
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { id, email, user_metadata } = session.user;
        setUserInfoFromSession({
          id,
          email,
          name: user_metadata?.name || "",
          pfp: user_metadata?.pfp || "",
          avatar: user_metadata?.avatar_url || "",
        });
      } else {
        setUserInfoFromSession(null);
      }
    };
    fetchSession();
  }, []);

  const router = useRouter();
  const [section, setSection] = useState("All Prompts");
  return (
    <>
      <Row
        fillWidth
        fillHeight
        paddingY="xs"
        style={{
          minWidth: "100vw !important",
          minHeight: "100vh",
          backgroundColor: "#fafafa",
        }}
        paddingX="xs"
        horizontal="start"
        vertical="start"
      >
        <Column
          fillWidth
          maxWidth={17}
          width={17}
          fillHeight
          paddingRight="xs"
          paddingY="xs"
          vertical="space-between"
        >
          <Column>
            <Flex gap="8" vertical="center" horizontal="start" fitWidth>
              <img
                src="/logo-dark.png"
                style={{
                  borderRadius: "100%",
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                }}
                alt="Logo"
              />
              <Text
                onBackground="neutral-strong"
                style={{ fontSize: "16px" }}
                className={inter.className}
              >
                Floid
              </Text>
              <Tag variant="neutral" size="s">
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "12px" }}
                  className={inter.className}
                >
                  Beta
                </Text>
              </Tag>
            </Flex>

            <Row
              gap="8"
              fillWidth
              horizontal="start"
              vertical="center"
              marginTop="8"
              fitHeight
              paddingY="xs"
              marginBottom="8"
            >
              <Button
                fillWidth
                data-border="conservative"
                weight="default"
                size="s"
                style={{
                  borderColor: "transparent",
                  backgroundColor: "#27272A !important",
                  transition: "background 0.15s",
                  color: "#F8F9FA",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                  (e.currentTarget.style.backgroundColor = "#18181B")
                }
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                  (e.currentTarget.style.backgroundColor = "#27272A")
                }
                onClick={() => router.push("/")}
                className={outfit.className}
              >
                Add prompt
              </Button>{" "}
              <IconButton
                data-border="conservative"
                variant="primary"
                size="m"
                style={{
                  borderColor: "transparent",
                  backgroundColor: "#27272A !important",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                  (e.currentTarget.style.backgroundColor = "#18181B")
                }
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                  (e.currentTarget.style.backgroundColor = "#27272A")
                }
                onClick={() => router.push("/add-prompt")}
              >
                <Bell color="#F8F9FA" size={15} fontWeight={3} />
              </IconButton>
            </Row>
            <Sidebar items={items} setSection={setSection} />
          </Column>
          <Flex
            fillWidth
            style={{
              minWidth: "100%",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "100%" }}>
              <UserMenu
                style={{
                  width: "100%",
                  minWidth: "0",
                  boxSizing: "border-box",
                  display: "block",
                }}
                name={userInfoFromSession?.name || "Guest"}
                subline={(() => {
                  const email = userInfoFromSession?.email || "Not logged in";
                  if (!email.includes("@")) return email;
                  const [local, domain] = email.split("@");
                  if (local.length <= 6) return email;
                  // max 12 chars, show first 3, last 2, *** in middle, keep domain
                  const shown =
                    local.length > 7
                      ? `${local.slice(0, 8)}***${local.slice(-2)}@${domain}`
                      : `${local.slice(0, 7)}***${local.slice(-1)}@${domain}`;
                  return shown;
                })()}
                placement="right-end"
                avatarProps={{
                  src: userInfoFromSession?.pfp || userInfoFromSession?.avatar,
                }}
                dropdown={<Column width={10} height={20}></Column>}
              />
            </div>
          </Flex>
        </Column>
        {section === "Dashboard" && (
          <>
            <Dashboard
              userInfoFromSession={userInfoFromSession}
              sectionVariable={section}
              sectionVariableFunction={setSection}
            />
          </>
        )}
        {section === "All Prompts" && (
          <AllPrompts userInfoFromSession={userInfoFromSession} />
        )}
      </Row>
    </>
  );
}

function AllPrompts({ userInfoFromSession }: { userInfoFromSession: any }) {
  const router = useRouter();

  return (
    <>
      {" "}
      <Column
        fillWidth
        fillHeight
        paddingX="xs"
        paddingY="xs"
        radius="s-4"
        border="neutral-medium"
        style={{ backgroundColor: "#fff" }}
      >
        <Column
          gap="4"
          fillWidth
          fitHeight
          vertical="center"
          horizontal="start"
        >
          <IconButton variant="secondary" size="m">
            <SidebarCloseIcon color="#555" size={17}></SidebarCloseIcon>
          </IconButton>
          <Row gap="0" fillWidth vertical="center" horizontal="space-between">
            <Column>
              <Text
                variant="heading-strong-xl"
                style={{ fontSize: "24px" }}
                className={inter.className}
                onBackground="neutral-strong"
              >
                All prompts
              </Text>
              <Text
                style={{ fontSize: "15px" }}
                className={inter.className}
                onBackground="neutral-medium"
              >
                Here you can find all the prompts created by you. 🔨
              </Text>
            </Column>
            <Row vertical="center" horizontal="center" gap="16">
              <Tag background="neutral-strong" fitHeight fitWidth>
                Free
              </Tag>
              <Button weight="default" size="m">
                <Text className={outfit.className} variant="label-default-m">
                  Upgrade to pro
                </Text>
              </Button>
            </Row>
          </Row>
        </Column>
        <Scroller
          direction="column"
          fadeColor="transparent"
          fillWidth
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          <Row
            marginTop="40"
            fillWidth
            fitHeight
            gap="20"
            vertical="start"
            horizontal="start"
            wrap={true}
          >
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>{" "}
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>{" "}
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>{" "}
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>{" "}
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>{" "}
            <Flex>
              {" "}
              <Card
                fillWidth
                padding="s"
                radius="s"
                border="neutral-medium"
                maxWidth={25}
                as={Flex}
                direction="column"
                vertical="start"
                horizontal="start"
                gap="8"
              >
                <Row vertical="center" horizontal="space-between" fillWidth>
                  <Row gap="8">
                    <Avvvatars value={"vhibojnkljjsdgwer"} style="shape" />
                    <Column gap="4" vertical="center" horizontal="start">
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-strong"
                        className={inter.className}
                        style={{ lineHeight: "1", fontSize: "13px" }}
                      >
                        Image prompt
                      </Text>
                      <SmartLink href="#">
                        <Text
                          variant="label-default-s"
                          onBackground="neutral-weak"
                          className={inter.className}
                          style={{ fontSize: "13px", lineHeight: "1" }}
                        >
                          asdf-asf3fasf-qi9304-sjot
                        </Text>
                      </SmartLink>
                    </Column>
                  </Row>
                  <Row center gap="8">
                    <IconButton variant="secondary" size="s">
                      <ArrowUpRight color="#555" size={14} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      size="s"
                      onClick={() => router.push("/add-prompt")}
                    >
                      <Clipboard color="#555" size={14} />
                    </IconButton>
                  </Row>{" "}
                </Row>
                <Row
                  fillWidth
                  vertical="center"
                  horizontal="start"
                  paddingY="4"
                >
                  <Tag
                    size="s"
                    style={{
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                    }}
                  >
                    <Text
                      style={{ fontSize: "12px" }}
                      onBackground="neutral-medium"
                    >
                      Published
                    </Text>
                  </Tag>
                </Row>
                <InlineCode
                  padding="0"
                  style={{
                    padding: "10px",
                    backgroundColor: "#F0F0F0",
                    borderColor: "transparent",
                  }}
                >
                  <Text
                    onBackground="neutral-strong"
                    style={{ letterSpacing: "0.2px", whiteSpace: "pre-line" }}
                  >
                    {`You are a strict and professional prompt engineer. Your task isto create a prompt for a text-to-image model that generates animage of a futuristic cityscape at night, with neon lights andflying cars.

                And you will provide the prompt in a code block format, like this:


                prompt: "Create an image of a futuristic cityscape at night, with neon lights and flying cars."
                                
                tags: ["futuristic", "cityscape", "night", "neon lights", "flying cars"]

                `}
                  </Text>
                </InlineCode>
              </Card>
            </Flex>
          </Row>
        </Scroller>
      </Column>
    </>
  );
}
function Dashboard({
  userInfoFromSession,
  sectionVariable,
  sectionVariableFunction,
}: {
  userInfoFromSession: any;
  sectionVariable: string;
  sectionVariableFunction: (section: string) => void;
}) {
  return (
    <>
      {" "}
      <Column
        fillWidth
        fillHeight
        paddingX="xs"
        paddingY="xs"
        radius="s-4"
        border="neutral-medium"
        style={{ backgroundColor: "#fff" }}
      >
        <Column
          gap="4"
          fillWidth
          fitHeight
          vertical="center"
          horizontal="start"
        >
          <IconButton variant="secondary" size="m">
            <SidebarCloseIcon color="#555" size={17}></SidebarCloseIcon>
          </IconButton>
          <Row gap="0" fillWidth vertical="center" horizontal="space-between">
            <Column>
              <Text
                variant="heading-strong-xl"
                style={{ fontSize: "24px" }}
                className={inter.className}
                onBackground="neutral-strong"
              >
                Dashboard
              </Text>
              <Text
                style={{ fontSize: "15px" }}
                className={inter.className}
                onBackground="neutral-medium"
              >
                Welcome back, {userInfoFromSession?.name || "Guest"} 👋
              </Text>
            </Column>
            <Row vertical="center" horizontal="center" gap="16">
              <Tag background="neutral-strong" fitHeight fitWidth>
                Free
              </Tag>
              <Button weight="default" size="m">
                <Text className={outfit.className} variant="label-default-m">
                  Upgrade to pro
                </Text>
              </Button>
            </Row>
          </Row>
        </Column>

        <Row
          id="stats-container"
          height={4}
          marginTop="40"
          fillWidth
          horizontal="start"
          gap="12"
          wrap={true}
        >
          <Scroller direction="row" fadeColor="transparent">
            {" "}
            <Flex>
              {" "}
              <Card
                direction="row"
                padding="s"
                fillHeight
                minWidth={16}
                radius="s"
                vertical="center"
                horizontal="space-between"
                as={Flex}
                marginRight="12"
              >
                <Text variant="body-default-s" className={inter.className}>
                  Total prompts
                </Text>
                <Text variant="body-default-s" className={inter.className}>
                  <Row>
                    74&nbsp;&nbsp;
                    <Text
                      style={{
                        color: "#277665",
                        fontSize: "12px",
                      }}
                    >
                      <Row>
                        {" "}
                        <ChartNoAxesColumnIncreasingIcon
                          size={17}
                          color="#277665"
                        />
                        +200%
                      </Row>
                    </Text>
                  </Row>
                </Text>
              </Card>
            </Flex>
            <Flex>
              <Card
                direction="row"
                padding="s"
                fillHeight
                minWidth={16}
                radius="s"
                vertical="center"
                as={Flex}
                horizontal="space-between"
                marginRight="12"
              >
                <Text variant="body-default-s" className={inter.className}>
                  Total likes
                </Text>
                <Text variant="body-default-s" className={inter.className}>
                  <Row>
                    456&nbsp;&nbsp;
                    <Text
                      style={{
                        color: "#277665",
                        fontSize: "12px",
                      }}
                    >
                      <Row>
                        {" "}
                        <ChartNoAxesColumnIncreasingIcon
                          size={17}
                          color="#277665"
                        />
                        +5%
                      </Row>
                    </Text>
                  </Row>
                </Text>
              </Card>
            </Flex>
            <Flex>
              <Card
                direction="row"
                padding="s"
                fillHeight
                minWidth={16}
                radius="s"
                vertical="center"
                as={Flex}
                marginRight="12"
                horizontal="space-between"
              >
                <Text variant="body-default-s" className={inter.className}>
                  Total downloads
                </Text>
                <Text variant="body-default-s" className={inter.className}>
                  <Row>
                    456&nbsp;&nbsp;
                    <Text
                      style={{
                        color: "#AD2A08",

                        fontSize: "12px",
                      }}
                    >
                      <Row>
                        {" "}
                        <ChartNoAxesColumnDecreasing
                          size={17}
                          color="#AD2A08"
                        />
                        -13%
                      </Row>
                    </Text>
                  </Row>
                </Text>
              </Card>
            </Flex>
            <Flex>
              <Card
                direction="row"
                padding="s"
                fillHeight
                minWidth={16}
                radius="s"
                vertical="center"
                as={Flex}
                marginRight="12"
                horizontal="space-between"
              >
                <Text variant="body-default-s" className={inter.className}>
                  Total shares
                </Text>
                <Text variant="body-default-s" className={inter.className}>
                  <Row>
                    456&nbsp;&nbsp;
                    <Text
                      style={{
                        color: "gray",
                        fontSize: "12px",
                      }}
                    >
                      <Row>
                        {" "}
                        <ChartLineIcon size={17} color="gray" />
                        +0%
                      </Row>
                    </Text>
                  </Row>
                </Text>
              </Card>
            </Flex>
            <Flex>
              <Card
                direction="row"
                padding="s"
                fillHeight
                minWidth={16}
                radius="s"
                vertical="center"
                as={Flex}
                marginRight="12"
                horizontal="space-between"
              >
                <Text variant="body-default-s" className={inter.className}>
                  Subscription
                </Text>
                <Tag variant="neutral" size="s">
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "12px" }}
                    className={inter.className}
                  >
                    Beta
                  </Text>
                </Tag>
              </Card>
            </Flex>
          </Scroller>
        </Row>

        <Row marginTop="40" height={20} gap="12" fillWidth>
          {" "}
          <Column fillWidth flex={6} radius="s" fillHeight gap="8">
            <Component />
            {/* <Text
                variant="heading-strong-xl"
                style={{ fontSize: "24px" }}
                className={inter.className}
                onBackground="neutral-strong"
              >
                Your prompts
              </Text> */}

            <Row fillWidth fillHeight minHeight={25} maxHeight={25} wrap={true}>
              <LineBarChart
                marginTop="16"
                title="Actions vs Time"
                fillHeight
                axis="both"
                legend={{ display: true, position: "top-left" }}
                date={{
                  format: "yyyy",
                  start: new Date("2000-01-01"),
                  end: new Date("2020-01-01"),
                  selector: true,
                  presets: {
                    display: true,
                    granularity: "year",
                  },
                  dual: true,
                }}
                series={[
                  { key: "Likes", color: "emerald" },

                  { key: "Total Prompts", color: "orange" },
                ]}
                data={[
                  {
                    date: new Date("2000-01-01"),
                    Likes: 10,

                    "Total Prompts": 8,
                  },
                  {
                    date: new Date("2005-01-01"),
                    Likes: 50,

                    "Total Prompts": 15,
                  },
                  {
                    date: new Date("2010-01-01"),
                    Likes: 120,

                    "Total Prompts": 65,
                  },
                  {
                    date: new Date("2015-01-01"),
                    Likes: 100,

                    "Total Prompts": 80,
                  },
                  {
                    date: new Date("2020-01-01"),
                    Likes: 256,

                    "Total Prompts": 44,
                  },
                ]}
              />
            </Row>
          </Column>
          <Column
            fillWidth
            maxWidth={25}
            height={25 + 10}
            maxHeight={25 + 3.25}
            fillHeight
            //   background="accent-medium"
            //   radius="l-4"
            //   border="neutral-medium"
            horizontal="center"
            vertical="center"
            //   paddingX="s"
            //   paddingY="s"
          >
            {" "}
            <FileUploader />
          </Column>
        </Row>
      </Column>
    </>
  );
}

import React from "react";
import { syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderOpenIcon } from "lucide-react";

import {
  Tree,
  TreeItem,
  TreeItemLabel,
} from "../../../components/originui/tree";

interface Item {
  name: string;
  children?: string[];
}

const indent = 20;

// Helper to get all item ids that are folders (should be expanded)
function getAllFolderIds(items: Record<string, Item>): string[] {
  return Object.entries(items)
    .filter(([_, item]) => item.children && item.children.length > 0)
    .map(([id]) => id);
}

interface SidebarProps {
  items: Record<string, Item>;
  setSection: (section: string) => void;
}

function Sidebar({ items, setSection }: SidebarProps) {
  const expandedItems = getAllFolderIds(items);

  const tree = useTree<Item>({
    initialState: {
      expandedItems,
    },
    indent,
    rootItemId: "company",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature],
  });

  // Render all folders as open, and remove any click handlers that toggle open/close
  return (
    <div className="flex h-full flex-col gap-2 *:first:grow">
      <div>
        <Tree
          className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))] bg-transparent"
          indent={indent}
          tree={tree}
          aria-disabled={true}
        >
          {tree.getItems().map((item) => {
            const itemName = item.getItemName();
            return (
              <TreeItem
                key={item.getId()}
                item={item}
                aria-disabled={true}
                className=""
              >
                <TreeItemLabel
                  className="before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10"
                  onClick={() => {
                    // Set the section to the item's name
                    if (
                      typeof itemName === "string" &&
                      typeof window !== "undefined"
                    ) {
                      setSection(itemName);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <span className="flex items-center gap-2">
                    {item.isFolder() ? (
                      <FolderOpenIcon className="text-muted-foreground pointer-events-none size-4" />
                    ) : (
                      <FileIcon className="text-muted-foreground pointer-events-none size-4" />
                    )}
                    {itemName}
                  </span>
                </TreeItemLabel>
              </TreeItem>
            );
          })}
        </Tree>
      </div>

      {/* <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-xs"
      >
        Basic tree with icons ∙{" "}
        <a
          href="https://headless-tree.lukasbach.com"
          className="hover:text-foreground underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          API
        </a>
      </p> */}
    </div>
  );
}
