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
  SegmentedControl,
  Input,
  Icon,
  Checkbox,
  LineChart,
  CodeBlock,
  CursorCard,
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
  LucideTrash2,
  Plus,
  SidebarCloseIcon,
  Trash,
  Trash2Icon,
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
    children: ["backend", "private"],
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
  private: { name: "Private" },
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
            <Flex
              gap="8"
              vertical="center"
              horizontal="start"
              fitWidth
              onClick={() => router.push("/")}
              cursor="pointer"
            >
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

        {(section === "Shared" ||
          section === "Private" ||
          section === "Public") && (
          <ActiveTab
            userInfoFromSession={userInfoFromSession}
            activeTab={section}
            setActiveTab={setSection}
          />
        )}
      </Row>
    </>
  );
}

/**
 * Example prompts data for PromptCard component.
 * Save this as prompts.json in your project.
 */

function AllPrompts({ userInfoFromSession }: { userInfoFromSession: any }) {
  const router = useRouter();

  const [prompts, setPrompts] = useState([
    {
      title: "Summarize Article",
      description: "Summarize the given article in 3 sentences.",
      card_id: "prompt-001",
      pfp: "user1@example.com",
      id_published: true,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Translate to French",
      description: "Translate the following text to French.",
      card_id: "prompt-002",
      pfp: "user2@example.com",
      id_published: false,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Generate Blog Ideas",
      description: "Suggest 5 blog post ideas about AI.",
      card_id: "prompt-003",
      pfp: "user3@example.com",
      id_published: true,
      is_featured: false,
      is_private: true,
    },
    {
      title: "Code Review",
      description: "Review this TypeScript code for best practices.",
      card_id: "prompt-004",
      pfp: "user4@example.com",
      id_published: false,
      is_featured: false,
      is_private: true,
    },
    {
      title: "Write Email Reply",
      description: "Draft a polite reply to this customer email.",
      card_id: "prompt-005",
      pfp: "user5@example.com",
      id_published: true,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Fix Grammar",
      description: "Correct the grammar in this paragraph.",
      card_id: "prompt-006",
      pfp: "user6@example.com",
      id_published: true,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Explain Concept",
      description: "Explain quantum computing in simple terms.",
      card_id: "prompt-007",
      pfp: "user7@example.com",
      id_published: false,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Summarize Meeting",
      description: "Summarize the key points from this meeting transcript.",
      card_id: "prompt-008",
      pfp: "user8@example.com",
      id_published: true,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Generate Tweet",
      description: "Write a tweet about the latest tech trends.",
      card_id: "prompt-009",
      pfp: "user9@example.com",
      id_published: false,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Create To-Do List",
      description: "Make a to-do list for launching a new product.",
      card_id: "prompt-010",
      pfp: "user10@example.com",
      id_published: true,
      is_featured: false,
      is_private: false,
    },
  ]);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

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
                Explore and manage your prompts collection
              </Text>
            </Column>
            <Row vertical="center" horizontal="center" gap="16">
              <Tag background="neutral-strong" fitHeight fitWidth>
                Free
              </Tag>
              <Button weight="default" size="m">
                <Text
                  className={inter.className}
                  style={{ fontSize: "14px" }}
                  variant="label-default-m"
                >
                  Upgrade to pro
                </Text>
              </Button>
            </Row>
          </Row>
        </Column>

        <Column marginTop="20">
          <Column fillWidth>
            <Row fillWidth gap="8">
              <Input
                id="input-1"
                label="Search"
                height="s"
                value={searchValue}
                onChange={handleChange}
                hasPrefix={<Icon name="search" size="xs" />}
                hasSuffix={
                  searchValue.length > 0 ? (
                    <IconButton
                      variant="ghost"
                      icon="close"
                      size="s"
                      onClick={handleClear}
                      aria-label="Clear search"
                    />
                  ) : null
                }
              />
            </Row>
            <Scroller
              direction="column"
              fadeColor="transparent"
              fillWidth
              style={{ maxHeight: "calc(100vh - 270px)" }}
            >
              <Row
                marginTop="20"
                fillWidth
                fitHeight
                gap="12"
                vertical="start"
                horizontal="start"
                wrap={true}
              >
                {prompts.map((prompt, index) => (
                  <PromptCard
                    key={index}
                    title={prompt.title}
                    description={prompt.description}
                    card_id={prompt.card_id}
                    pfp={prompt.pfp}
                    id_published={prompt.id_published}
                    is_featured={prompt.is_featured}
                    is_private={prompt.is_private}
                  />
                ))}
              </Row>
            </Scroller>{" "}
          </Column>
        </Column>
      </Column>
    </>
  );
}

function SharedCard({
  title,
  description,
  card_id,
  pfp,
  id_published = false,
  is_featured = false,
}: {
  title: string;
  description: string;
  pfp: string;
  card_id: string;
  id_published?: boolean;
  is_featured?: boolean;
}) {
  const router = useRouter();
  return (
    <Flex fillWidth>
      {" "}
      <Card
        fillWidth
        padding="s"
        radius="s-4"
        border="neutral-medium"
        direction="row"
        vertical="center"
        horizontal="start"
        gap="8"
      >
        <Row vertical="center" horizontal="start" fillWidth>
          <Row gap="8" fillWidth>
            {" "}
            <Checkbox /> <Avvvatars value={pfp} style="shape" />
            <Row gap="4" vertical="center" horizontal="start">
              <Text
                variant="label-default-s"
                onBackground="neutral-strong"
                className={inter.className}
                style={{ lineHeight: "1", fontSize: "13px" }}
              >
                {title}
              </Text>
              <SmartLink href="#">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-weak"
                  className={inter.className}
                  style={{ fontSize: "13px", lineHeight: "1" }}
                >
                  <InlineCode> {card_id}</InlineCode>
                </Text>
              </SmartLink>
            </Row>
          </Row>
          <Row
            fillWidth
            vertical="center"
            horizontal="start"
            paddingY="4"
            gap="4"
          >
            {id_published ? (
              <Tag
                size="s"
                style={{
                  backgroundColor: "#f0f0f0",
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
            ) : (
              <Tag
                size="s"
                style={{
                  backgroundColor: "#dadada",
                  borderColor: "transparent",
                }}
              >
                <Text
                  style={{ fontSize: "12px" }}
                  onBackground="neutral-medium"
                >
                  Draft
                </Text>
              </Tag>
            )}{" "}
            {is_featured && (
              <Tag size="s" variant="gradient">
                <Text style={{ fontSize: "12px" }}>Featured</Text>
              </Tag>
            )}
          </Row>
        </Row>
        <Row center gap="8">
          <IconButton variant="secondary" size="m">
            <ArrowUpRight color="#555" size={14} />
          </IconButton>
          <IconButton
            variant="secondary"
            size="m"
            onClick={() => router.push("/add-prompt")}
          >
            <Clipboard color="#555" size={14} />
          </IconButton>{" "}
          <IconButton
            variant="secondary"
            size="m"
            onClick={() => router.push("/add-prompt")}
          >
            <LucideTrash2 color="#555" size={14} />
          </IconButton>{" "}
        </Row>{" "}
      </Card>
    </Flex>
  );
}

function PromptCard({
  title,
  description,
  card_id,
  pfp,
  id_published = false,
  is_featured = false,
  is_private = false,
}: {
  title: string;
  description: string;
  pfp: string;
  card_id: string;
  id_published?: boolean;
  is_featured?: boolean;
  is_private?: boolean;
}) {
  const router = useRouter();
  return (
    <Flex>
      {" "}
      <Card
        fillWidth
        padding="s"
        radius="s"
        border="neutral-medium"
        maxWidth={22}
        minWidth={22}
        as={Flex}
        direction="column"
        vertical="start"
        horizontal="start"
        gap="8"
      >
        <Row vertical="center" horizontal="space-between" fillWidth>
          <Row gap="8">
            <Avvvatars value={pfp} style="shape" />
            <Column gap="4" vertical="center" horizontal="start">
              <Text
                variant="label-default-s"
                onBackground="neutral-strong"
                className={inter.className}
                style={{ lineHeight: "1", fontSize: "13px" }}
              >
                {title}
              </Text>
              <SmartLink href="#">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-weak"
                  className={inter.className}
                  style={{ fontSize: "13px", lineHeight: "1" }}
                >
                  {card_id}
                </Text>
              </SmartLink>
            </Column>
          </Row>
          <Row center gap="8">
            {" "}
            <IconButton
              variant="secondary"
              size="s"
              onClick={() => router.push("/add-prompt")}
            >
              <LucideTrash2 color="#555" size={14} />
            </IconButton>{" "}
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
          gap="4"
        >
          {is_featured && (
            <Tag size="s" variant="gradient">
              <Text style={{ fontSize: "12px" }}>Featured</Text>
            </Tag>
          )}

          {is_private && (
            <Tag size="s" variant="brand">
              <Text style={{ fontSize: "12px" }}>Private</Text>
            </Tag>
          )}
          {id_published ? (
            <Tag
              size="s"
              style={{
                backgroundColor: "#f0f0f0",
                borderColor: "transparent",
              }}
            >
              <Text style={{ fontSize: "12px" }} onBackground="neutral-medium">
                Published
              </Text>
            </Tag>
          ) : (
            <Tag
              size="s"
              style={{
                backgroundColor: "#dadada",
                borderColor: "transparent",
              }}
            >
              <Text style={{ fontSize: "12px" }} onBackground="neutral-medium">
                Draft
              </Text>
            </Tag>
          )}
        </Row>
        <Row
          fillWidth
          horizontal="end"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
            width: "100%",
            padding: "16px 16px",
          }}
        >
          <Checkbox />
        </Row>
      </Card>
    </Flex>
  );
}

function PrivateCard({
  title,
  description,
  card_id,
  pfp,
  id_published = false,
  is_featured = false,
}: {
  title: string;
  description: string;
  pfp: string;
  card_id: string;
  id_published?: boolean;
  is_featured?: boolean;
}) {
  const router = useRouter();
  return (
    <Flex>
      {" "}
      <Card
        fillWidth
        padding="s"
        radius="s"
        border="neutral-medium"
        maxWidth={22}
        minWidth={22}
        as={Flex}
        direction="column"
        vertical="start"
        horizontal="start"
        gap="8"
      >
        <Row vertical="center" horizontal="space-between" fillWidth>
          <Row gap="8">
            <Avvvatars value={pfp} style="shape" />
            <Column gap="4" vertical="center" horizontal="start">
              <Text
                variant="label-default-s"
                onBackground="neutral-strong"
                className={inter.className}
                style={{ lineHeight: "1", fontSize: "13px" }}
              >
                {title}
              </Text>
              <SmartLink href="#">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-weak"
                  className={inter.className}
                  style={{ fontSize: "13px", lineHeight: "1" }}
                >
                  {card_id}
                </Text>
              </SmartLink>
            </Column>
          </Row>
          <Row center gap="8">
            {" "}
            <IconButton
              variant="secondary"
              size="s"
              onClick={() => router.push("/add-prompt")}
            >
              <LucideTrash2 color="#555" size={14} />
            </IconButton>{" "}
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
          gap="4"
        >
          <Tag size="s" variant="brand">
            <Text style={{ fontSize: "12px" }}>Private</Text>
          </Tag>
        </Row>
        <CodeBlock
          marginBottom="40"
          reloadButton={true}
          copyButton={false}
          title="Prompt"
          codes={[
            {
              code:
                description.length > 80
                  ? description.slice(0, 80).replace(/(.{33})/g, "$1\n") + "..."
                  : description.replace(/(.{33})/g, "$1\n"),
              language: "js",
              label: "Line numbers",
            },
          ]}
        />

        <Row
          fillWidth
          horizontal="end"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
            width: "100%",
            padding: "16px 16px",
          }}
        >
          <Checkbox checked={true} defaultChecked={true} />
        </Row>
      </Card>
    </Flex>
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
        overflow="hidden"
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
                <Text
                  className={inter.className}
                  style={{ fontSize: "14px" }}
                  variant="label-default-m"
                >
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
            <Scroller
              direction="column"
              fadeColor="transparent"
              fillWidth
              fillHeight
              minHeight={27}
              paddingBottom="32"
            >
              <Column gap="16">
                <BarChart
                  minHeight={25}
                  // title="Wealth distribution"
                  description="Global share of wealth held by Top 1% vs Bottom 99%"
                  axis="none"
                  legend={{
                    position: "bottom-center",
                  }}
                  series={[
                    { key: "Top 1%", color: "yello" },
                    { key: "Bottom 99%" },
                  ]}
                  data={[
                    {
                      label: "2025 (est.)",
                      "Top 1%": 52.5,
                      "Bottom 99%": 47.5,
                    },
                  ]}
                />
                <LineBarChart
                  // title="Actions vs Time"
                  fillHeight
                  minHeight={25}
                  axis="both"
                  description="Global share of wealth held by Top 1% vs Bottom 99%"
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
                <LineChart
                  // title="CEO vs Employee Paycheck"
                  axis="both"
                  description="Global share of wealth held by Top 1% vs Bottom 99%"
                  minHeight={25}
                  date={{
                    format: "yyyy",
                  }}
                  series={[
                    { key: "Employee Paycheck", color: "green" },
                    { key: "CEO Paycheck", color: "red" },
                  ]}
                  data={[
                    {
                      date: new Date("1980-01-01"),
                      "CEO Paycheck": 500000,
                      "Employee Paycheck": 25000,
                    },
                    {
                      date: new Date("1990-01-01"),
                      "CEO Paycheck": 800000,
                      "Employee Paycheck": 30000,
                    },
                    {
                      date: new Date("2000-01-01"),
                      "CEO Paycheck": 1200000,
                      "Employee Paycheck": 33000,
                    },
                    {
                      date: new Date("2010-01-01"),
                      "CEO Paycheck": 1600000,
                      "Employee Paycheck": 35000,
                    },
                    {
                      date: new Date("2020-01-01"),
                      "CEO Paycheck": 3000000,
                      "Employee Paycheck": 40000,
                    },
                  ]}
                />
              </Column>
            </Scroller>
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
import ToolTipComponent from "@/components/comp-354";
import AlertComponent from "@/components/comp-313";

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
                      typeof window !== "undefined" &&
                      !item.isFolder()
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

function ActiveTab({
  userInfoFromSession,
  activeTab = "shared",
  setActiveTab = () => {},
}: {
  userInfoFromSession: any;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}) {
  const router = useRouter();

  const [prompts, setPrompts] = useState([
    {
      title: "Summarize Article",
      description:
        "Summarize the given article in 3 sentences. The summary should capture the main points and be concise, clear, and easy to understand for a general audience. Avoid copying sentences verbatim from the article.",
      card_id: "prompt-001",
      pfp: "user1@example.com",
      id_published: true,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Translate to French",
      description:
        "Translate the following text to French. Ensure that the translation is accurate, natural-sounding, and preserves the original meaning and tone. Pay attention to idiomatic expressions and context.",
      card_id: "prompt-002",
      pfp: "user2@example.com",
      id_published: false,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Generate Blog Ideas",
      description:
        "Suggest 5 blog post ideas about AI. The ideas should be original, engaging, and suitable for a tech-savvy audience. Each idea should include a brief explanation of the topic and its relevance.",
      card_id: "prompt-003",
      pfp: "user3@example.com",
      id_published: true,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Code Review",
      description:
        "Review this TypeScript code for best practices. Identify any potential bugs, suggest improvements for readability and maintainability, and recommend optimizations where appropriate. Provide clear explanations for each suggestion.",
      card_id: "prompt-004",
      pfp: "user4@example.com",
      id_published: false,
      is_featured: false,
      is_private: true,
    },
    {
      title: "Write Email Reply",
      description:
        "Draft a polite reply to this customer email. Address the customer's concerns, provide helpful information, and maintain a friendly and professional tone throughout the response.",
      card_id: "prompt-005",
      pfp: "user5@example.com",
      id_published: true,
      is_featured: false,
      is_private: true,
    },
    {
      title: "Fix Grammar",
      description:
        "Correct the grammar in this paragraph. Ensure that the revised text is free of grammatical errors, flows smoothly, and maintains the original meaning. Highlight any significant changes made.",
      card_id: "prompt-006",
      pfp: "user6@example.com",
      id_published: true,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Explain Concept",
      description:
        "Explain quantum computing in simple terms. Use analogies and examples to make the concept accessible to someone with no technical background. Avoid jargon and keep the explanation concise.",
      card_id: "prompt-007",
      pfp: "user7@example.com",
      id_published: false,
      is_featured: false,
      is_private: false,
    },
    {
      title: "Summarize Meeting",
      description:
        "Summarize the key points from this meeting transcript. Focus on decisions made, action items, and any important discussions. Present the summary in a clear and organized format.",
      card_id: "prompt-008",
      pfp: "user8@example.com",
      id_published: true,
      is_featured: false,
      is_private: true,
    },
    {
      title: "Generate Tweet",
      description:
        "Write a tweet about the latest tech trends. The tweet should be catchy, informative, and suitable for a broad audience. Use relevant hashtags and keep it within the character limit.",
      card_id: "prompt-009",
      pfp: "user9@example.com",
      id_published: false,
      is_featured: true,
      is_private: false,
    },
    {
      title: "Create To-Do List",
      description:
        "Make a to-do list for launching a new product. Include all major steps from initial planning to post-launch activities. Each item should be actionable and clearly described.",
      card_id: "prompt-010",
      pfp: "user10@example.com",
      id_published: true,
      is_featured: false,
      is_private: true,
    },
  ]);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const [segmentedControlValue, setSegmentedControlValue] = useState("shared");

  return (
    <>
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
                Private Prompts
              </Text>
              <Text
                style={{ fontSize: "15px" }}
                className={inter.className}
                onBackground="neutral-medium"
              >
                Manage your private prompts
              </Text>
            </Column>
            <Row vertical="center" horizontal="center" gap="16">
              <Tag background="neutral-strong" fitHeight fitWidth>
                Free
              </Tag>
              <Button weight="default" size="m">
                <Text
                  className={inter.className}
                  style={{ fontSize: "14px" }}
                  variant="label-default-m"
                >
                  Upgrade to pro
                </Text>
              </Button>
            </Row>
          </Row>
        </Column>
        <Column gap="20">
          {" "}
          {/* <SegmentedControl
            marginTop="20"
            fillWidth={false}
            selected={activeTab.toLowerCase()}
            buttons={[
              { value: "shared", label: "Shared", disabled: true },
              { value: "private", label: "Private" },
              { value: "public", label: "Public", disabled: true },
            ]}
            onToggle={(value) => {
              setSegmentedControlValue(value);
              setActiveTab(value.charAt(0).toUpperCase() + value.slice(1));
            }}
          /> */}
          <Column fillWidth>
            {activeTab.toLowerCase() === "shared" && (
              <>
                <Row fillWidth gap="8">
                  <Input
                    id="input-1"
                    label="Search"
                    height="s"
                    value={searchValue}
                    onChange={handleChange}
                    hasPrefix={<Icon name="search" size="xs" />}
                    hasSuffix={
                      searchValue.length > 0 ? (
                        <IconButton
                          variant="ghost"
                          icon="close"
                          size="s"
                          onClick={handleClear}
                          aria-label="Clear search"
                        />
                      ) : null
                    }
                  />
                  <Button size="l" className={inter.className}>
                    <Text className={inter.className}>Share</Text>
                  </Button>
                </Row>
                <Scroller
                  direction="column"
                  fadeColor="transparent"
                  fillWidth
                  style={{ maxHeight: "calc(100vh - 270px)" }}
                >
                  <Column
                    marginTop="20"
                    fillWidth
                    fitHeight
                    gap="12"
                    vertical="center"
                    horizontal="center"
                    wrap={true}
                  >
                    {prompts.map((prompt, index) => (
                      <SharedCard
                        key={index}
                        title={prompt.title}
                        description={prompt.description}
                        card_id={prompt.card_id}
                        pfp={prompt.pfp}
                        id_published={prompt.id_published}
                        is_featured={prompt.is_featured}
                      />
                    ))}
                  </Column>
                </Scroller>{" "}
              </>
            )}

            {activeTab.toLowerCase() === "private" && (
              <>
                {" "}
                <Column marginTop="20">
                  <Column fillWidth>
                    <Row fillWidth gap="8">
                      <Input
                        id="input-1"
                        label="Search"
                        height="s"
                        value={searchValue}
                        onChange={handleChange}
                        hasPrefix={<Icon name="search" size="xs" />}
                        hasSuffix={
                          searchValue.length > 0 ? (
                            <IconButton
                              variant="ghost"
                              icon="close"
                              size="s"
                              onClick={handleClear}
                              aria-label="Clear search"
                            />
                          ) : null
                        }
                      />
                    </Row>
                    <Scroller
                      direction="column"
                      fadeColor="transparent"
                      fillWidth
                      style={{ maxHeight: "calc(100vh - 270px)" }}
                    >
                      <Row
                        marginTop="20"
                        fillWidth
                        fitHeight
                        gap="12"
                        vertical="start"
                        horizontal="start"
                        wrap={true}
                      >
                        {prompts.map((prompt, index) => (
                          <PrivateCard
                            key={index}
                            title={prompt.title}
                            description={prompt.description}
                            card_id={prompt.card_id}
                            pfp={prompt.pfp}
                            id_published={prompt.id_published}
                            is_featured={prompt.is_featured}
                          />
                        ))}
                      </Row>
                    </Scroller>{" "}
                  </Column>
                </Column>
              </>
            )}

            {activeTab.toLowerCase() === "public" && (
              <Text
                variant="body-default-s"
                className={inter.className}
                onBackground="neutral-medium"
              >
                Public prompts are not yet implemented.
              </Text>
            )}
          </Column>{" "}
        </Column>
      </Column>
    </>
  );
}
