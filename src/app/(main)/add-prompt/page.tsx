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
  MediaUpload,
  Select,
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
  Edit,
  Edit2,
  Edit3,
  Eye,
  EyeClosed,
  Feather,
  Lock,
  LucideMenu,
  LucideTrash2,
  Mail,
  Plus,
  RefreshCcw,
  SidebarCloseIcon,
  Trash,
  Trash2Icon,
  User,
  User2,
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
    children: ["frontend", "user"],
  },
  search: {
    name: "Search",
    children: ["prompts"],
  },
  prompts: { name: "Prompts" },
  engineering: {
    name: "Home",
    children: ["frontend"],
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
          overflowY: "hidden",
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
          paddingY="2"
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

        {(section === "All Prompts" ||
          section === "Private" ||
          section === "Public") && (
          <Vault
            userInfoFromSession={userInfoFromSession}
            activeTab={section}
            setActiveTab={setSection}
          />
        )}

        {(section === "Profile" || section === "Settings") && (
          <Dashboard
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

function Vault({
  userInfoFromSession,
  activeTab,
  setActiveTab,
}: {
  userInfoFromSession: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
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
  const [selectedFilter, setSelectedFilter] = useState("");

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
        style={{
          overflowY: "scroll",
          maxHeight: "calc(100vh - 24px)",
          backgroundColor: "#fff",
        }}
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
                {activeTab === "Private" ? "Private Prompts" : "All Prompts"}
              </Text>
              <Text
                style={{ fontSize: "15px" }}
                className={inter.className}
                onBackground="neutral-medium"
              >
                {activeTab === "Private"
                  ? "Manage your private prompts"
                  : "Explore all available prompts"}
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
              {activeTab === "All Prompts" && (
                <Select
                  id="basic-select"
                  label="Choose a filter"
                  value={selectedFilter}
                  height="s"
                  style={{ maxWidth: "20vw" }}
                  options={[
                    { value: "all", label: "All" },
                    { value: "private", label: "Private" },
                    { value: "public", label: "Public" },
                    { value: "draft", label: "Draft" },
                    { value: "published", label: "Published" },
                    { value: "featured", label: "Featured" },
                  ]}
                  onSelect={(filter) => setSelectedFilter(filter)}
                />
              )}
            </Row>

            <Row
              marginTop="20"
              fillWidth
              fitHeight
              gap="12"
              vertical="start"
              horizontal="start"
              wrap={true}
            >
              {activeTab === "Private" &&
                (() => {
                  const filteredPrompts = prompts
                    .filter((prompt) => prompt.is_private)
                    .filter((prompt) => {
                      if (!searchValue) return true;
                      const search = searchValue.toLowerCase();
                      return prompt.title.toLowerCase().includes(search);
                    });
                  if (filteredPrompts.length === 0) {
                    return (
                      <Row fillWidth center>
                        <Text
                          className={inter.className}
                          onBackground="neutral-weak"
                          variant="label-default-s"
                        >
                          No prompts found
                        </Text>
                      </Row>
                    );
                  }
                  return filteredPrompts.map((prompt, index) => (
                    <PrivateCard
                      key={index}
                      title={prompt.title}
                      description={prompt.description}
                      card_id={prompt.card_id}
                      pfp={prompt.pfp}
                      id_published={prompt.id_published}
                      is_featured={prompt.is_featured}
                      is_private={prompt.is_private}
                    />
                  ));
                })()}

              {activeTab === "All Prompts" &&
                (() => {
                  const filteredPrompts = prompts
                    .filter((prompt) => {
                      // Filter by selectedFilter
                      if (!selectedFilter || selectedFilter === "all")
                        return true;
                      if (selectedFilter === "private")
                        return prompt.is_private;
                      if (selectedFilter === "public")
                        return !prompt.is_private;
                      if (selectedFilter === "draft")
                        return !prompt.id_published;
                      if (selectedFilter === "published")
                        return prompt.id_published;
                      if (selectedFilter === "featured")
                        return prompt.is_featured;
                      return true;
                    })
                    .filter((prompt) => {
                      // Filter by searchValue (case-insensitive, title or card_id)
                      if (!searchValue) return true;
                      const search = searchValue.toLowerCase();
                      return (
                        prompt.title.toLowerCase().includes(search) ||
                        prompt.card_id.toLowerCase().includes(search)
                      );
                    });

                  if (filteredPrompts.length === 0) {
                    return (
                      <Row fillWidth center>
                        <Text
                          className={inter.className}
                          onBackground="neutral-weak"
                          variant="label-default-s"
                        >
                          No prompts found
                        </Text>
                      </Row>
                    );
                  }

                  return filteredPrompts.map((prompt, index) => (
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
                  ));
                })()}
            </Row>
          </Column>
        </Column>
      </Column>
    </>
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
            <IconButton variant="secondary" size="s">
              <Eye color="#555" size={14} />
            </IconButton>
            <IconButton
              variant="secondary"
              size="s"
              onClick={() => router.push("/add-prompt")}
            >
              <LucideTrash2 color="#555" size={14} />
            </IconButton>{" "}
            <IconButton variant="secondary" size="s">
              <Edit color="#555" size={14} />
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
                backgroundColor: "#dadada",

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
                backgroundColor: "#f0f0f0",
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
            <IconButton
              variant="secondary"
              size="s"
              onClick={() => router.push("/add-prompt")}
            >
              <EyeClosed color="#555" size={14} />
            </IconButton>{" "}
            <IconButton
              variant="secondary"
              size="s"
              onClick={() => router.push("/add-prompt")}
            >
              <LucideTrash2 color="#555" size={14} />
            </IconButton>{" "}
            <IconButton variant="secondary" size="s">
              <Edit color="#555" size={14} />
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
          {is_private === true && (
            <Tag size="s" variant="brand">
              <Text style={{ fontSize: "12px" }}>Private</Text>
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
          <Checkbox checked={true} defaultChecked={true} disabled />
        </Row>
      </Card>
    </Flex>
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
import PromptCardGlobal from "@/components/custom-ui/Prompts";

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
        className="text-muted-foreground mt-16 text-xs "
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

function Dashboard({
  userInfoFromSession,
  activeTab,
  setActiveTab,
}: {
  userInfoFromSession: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const [userInputData, setUserInputData] = useState<any>({
    firstName: "",
    lastName: "",
    email: userInfoFromSession?.email || "",
    username: "",
  });

  function saveAccountSettings() {


  }

  function saveUserInputData() {}

  function deleteAccount() {}
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
        style={{
          overflowY: "scroll",
          maxHeight: "calc(100vh - 24px)",
          backgroundColor: "#fff",
        }}
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
                {activeTab === "Profile" ? "Your Profile" : "Settings"}
              </Text>
              <Text
                style={{ fontSize: "15px" }}
                className={inter.className}
                onBackground="neutral-medium"
              >
                {activeTab === "Profile"
                  ? "Manage your profile settings"
                  : "Customize your account preferences"}
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
          {activeTab === "Profile" && (
            <Column fillWidth gap="32" wrap={true}>
              <Column gap="16" fillWidth>
                {" "}
                <Text
                  variant="label-default-m"
                  className={inter.className}
                  onBackground="neutral-strong"
                >
                  Update your avatar
                </Text>{" "}
                <Row gap="8" vertical="center">
                  <MediaUpload
                    aspectRatio="1/1"
                    maxWidth={3.5}
                    maxHeight={3.5}
                    style={{ overflow: "hidden !important" }}
                    emptyState=""
                  />
                  <Button>Upload image</Button>
                </Row>
              </Column>

              <Column fillWidth gap="16" maxWidth={30}>
                <Text
                  variant="label-default-m"
                  className={inter.className}
                  onBackground="neutral-strong"
                  marginBottom="4"
                >
                  Basic Information
                </Text>
                <Input
                  id=""
                  label="First name"
                  height="s"
                  description="Enter your first name"
                  hasPrefix={<User2 size={15} color="#666"></User2>}
                  value={userInputData.firstName}
                  onChange={(e) =>
                    setUserInputData({
                      ...userInputData,
                      firstName: e.target.value,
                    })
                  }
                ></Input>
                <Input
                  id=""
                  label="Last name"
                  height="s"
                  description="Enter your last name"
                  hasPrefix={<User2 size={15} color="#666"></User2>}
                  value={userInputData.lastName}
                  onChange={(e) =>
                    setUserInputData({
                      ...userInputData,
                      lastName: e.target.value,
                    })
                  }
                ></Input>{" "}
                <Input
                  id=""
                  label="Email"
                  hasPrefix={<Mail size={15} color="#666"></Mail>}
                  height="s"
                  description="Enter your email address"
                  disabled
                  value={userInputData.email}
                  onChange={(e) =>
                    setUserInputData({
                      ...userInputData,
                      email: e.target.value,
                    })
                  }
                ></Input>
                <Row gap="12" center>
                  <Input
                    id=""
                    label="Username"
                    height="s"
                    description="Choose a unique username"
                    hasPrefix={<Feather size={15} color="#666"></Feather>}
                    value={userInputData.username}
                    onChange={(e) =>
                      setUserInputData({
                        ...userInputData,
                        username: e.target.value,
                      })
                    }
                  ></Input>
                </Row>
                <Row fillWidth vertical="center" horizontal="start">
                  {" "}
                  <Button onClick={saveUserInputData}>Save all</Button>
                </Row>{" "}
              </Column>
            </Column>
          )}
          {activeTab === "Settings" && (
            <Column fillWidth gap="24">
              <Row gap="0" vertical="center">
                <Text
                  variant="label-default-m"
                  className={inter.className}
                  onBackground="neutral-strong"
                >
                  Account Settings
                </Text>
              </Row>
              <Column fillWidth gap="20" maxWidth={30}>
                <Input
                  id=""
                  label="Two-Factor Authentication"
                  height="s"
                  description="Enable 2FA for added security"
                  hasPrefix={<Lock size={15} color="#666"></Lock>}
                  disabled
                ></Input>
                <Row fillWidth vertical="center" horizontal="start" gap="4">
                  {" "}
                  <Button onClick={saveAccountSettings}>
                    Save changes
                  </Button>{" "}
                  <Button variant="danger" onClick={deleteAccount}>
                    Delete Account
                  </Button>
                </Row>{" "}
              </Column>
            </Column>
          )}
        </Column>
      </Column>
    </>
  );
}
