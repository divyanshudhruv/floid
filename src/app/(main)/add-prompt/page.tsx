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
  useToast,
  Spinner,
  Dialog,
  Textarea,
  NavIcon,
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
  Home,
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
    children: ["main_dashboard", "frontend", "user"],
  },
  main_dashboard: { name: "Home" },
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
  tokens: { name: "Private Prompts" },
  guidelines: { name: "Public" },
  // "web-platform": { name: "Web Platform" },
  backend: { name: "All Prompts" },
  private: { name: "Private Prompts" },
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
        // Fetch user info from 'users' table
        const { data, error } = await supabase
          .from("users")
          .select("first_name, last_name, email, uuid, pfp,username")
          .eq("email", session.user.email)
          .single();

        if (data) {
          setUserInfoFromSession({
            id: data.uuid,
            email: data.email,
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            pfp: data.pfp || "",
            avatar: data.pfp || "",
            username: data.username || "",
          });
        } else {
          setUserInfoFromSession(null);
        }
      } else {
        setUserInfoFromSession(null);
      }
    };
    fetchSession();

    // Add realtime subscription for user info changes
    let channel: any;
    let userEmail: string | null = null;

    supabase.auth.getSession().then(({ data: { session } }) => {
      userEmail = session?.user?.email ?? null;
      if (userEmail) {
        channel = supabase
          .channel(`users-realtime-${userEmail}`)
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "users",
              filter: `email=eq.${userEmail}`,
            },
            (payload: any) => {
              const newData = payload.new;
              setUserInfoFromSession({
                id: newData.uuid,
                email: newData.email,
                name: `${newData.first_name || ""} ${
                  newData.last_name || ""
                }`.trim(),
                pfp: newData.pfp || "",
                avatar: newData.pfp || "",
                username: newData.username || "",
              });
            }
          )
          .subscribe();
      }
    });

    return () => {
      if (channel) channel.unsubscribe();
    };
  }, []);

  // Only realtime retrieve: listen for changes in the "prompts" table and update state
  useEffect(() => {
    const channel = supabase
      .channel("prompts-featured-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "prompts" },
        (payload: any) => {
          if (
            payload.new &&
            typeof payload.new.is_featured !== "undefined" &&
            payload.old &&
            payload.new.is_featured !== payload.old.is_featured
          ) {
            // Handle is_featured change here, e.g. show a toast or refetch data
            // Example: console.log(`Prompt ${payload.new.prompt_id} is_featured changed to ${payload.new.is_featured}`);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const router = useRouter();
  const [section, setSection] = useState("All Prompts");
  const [openAddPromptDialog, setOpenAddPromptDialog] = useState(false);
  const [newPromptName, setNewPromptName] = useState("");
  const [newPromptContent, setNewPromptContent] = useState("");
  const [newPromptLoading, setNewPromptLoading] = useState(false);
  const { addToast } = useToast();
  function handleAddPrompt() {
    setNewPromptLoading(true);
    if (!newPromptName || !newPromptContent) {
      addToast({
        message: "Please enter both prompt name and content.",
        variant: "danger",
      });
      setNewPromptLoading(false);
      return;
    }
    // Add prompt to the database
    supabase
      .from("prompts")
      .insert([
        {
          content: {
            title: newPromptName,
            description: newPromptContent,
          },
        },
      ])
      .then(({ data, error }) => {
        if (error) {
          addToast({
            message: "Error adding prompt.",
            variant: "danger",
          });
        } else {
          addToast({
            message: "Prompt added successfully.",
            variant: "success",
          });
          setNewPromptName("");
          setNewPromptContent("");
        }
      });
    setNewPromptLoading(false);
    setOpenAddPromptDialog(false);
  }

  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
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
        className="add-prompt-container"
      >
        <Column
          fillWidth
          maxWidth={17}
          width={17}
          fillHeight
          paddingRight="xs"
          paddingY="2"
          vertical="space-between"
          className="sidebar-container"
        >
          <Column
            background="neutral-weak"
            fillHeight
            className="sidebar-content"
          >
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
                  (e.currentTarget.style.backgroundColor = "#000")
                }
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                  (e.currentTarget.style.backgroundColor = "#27272A")
                }
                onClick={() => setOpenAddPromptDialog(true)}
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
                  (e.currentTarget.style.backgroundColor = "#000")
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
              />
            </div>
          </Flex>
        </Column>

        <Flex className="sidebar-horizontal">
          <Row
            style={{
              minWidth: "100vw",
              maxWidth: "100vw",
              height: "100%",
              background: "#f5f5f5",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              padding: "24px 16px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Flex
              gap="8"
              vertical="center"
              horizontal="space-between"
              fillWidth
            >
              <Row fillWidth gap="8" vertical="center">
                {" "}
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
                <Tag variant="neutral" size="s" fitHeight>
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "12px" }}
                    className={inter.className}
                  >
                    Beta
                  </Text>
                </Tag>
              </Row>
              <Row gap="4">
                {" "}
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
                    const shown =
                      local.length > 7
                        ? `${local.slice(0, 8)}***${local.slice(-2)}@${domain}`
                        : `${local.slice(0, 7)}***${local.slice(-1)}@${domain}`;
                    return shown;
                  })()}
                  placement="right-end"
                  avatarProps={{
                    src:
                      userInfoFromSession?.pfp || userInfoFromSession?.avatar,
                  }}
                />
                <NavIcon
                  isActive={isActive}
                  onClick={handleClick}
                  aria-label="Toggle navigation menu"
                  aria-expanded={isActive}
                  aria-controls="demo-nav"
                >
                  {" "}
                </NavIcon>
              </Row>
            </Flex>{" "}
            {isActive && (
              <Column padding="m" id="demo-nav">
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
                      (e.currentTarget.style.backgroundColor = "#000")
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.backgroundColor = "#27272A")
                    }
                    onClick={() => setOpenAddPromptDialog(true)}
                    className={outfit.className}
                  >
                    Add prompt
                  </Button>
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
                      (e.currentTarget.style.backgroundColor = "#000")
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.backgroundColor = "#27272A")
                    }
                    onClick={() => router.push("/add-prompt")}
                  >
                    <Bell color="#F8F9FA" size={15} fontWeight={3} />
                  </IconButton>
                </Row>
                <Row style={{ backgroundColor: "#fff" }} paddingX="s">
                  {" "}
                  <Sidebar items={items} setSection={setSection} />
                </Row>
              </Column>
            )}
          </Row>
        </Flex>

        {(section === "All Prompts" || section === "Private Prompts") && (
          <Vault
            userInfoFromSession={userInfoFromSession}
            activeTab={section}
            setActiveTab={setSection}
            changeSidebarWidth={() => {
              const sidebar = document.querySelector(
                ".sidebar-container"
              ) as HTMLElement | null;
              if (sidebar) {
                const currentWidth = sidebar.getAttribute("data-width");
                sidebar.style.transition =
                  "width 0.3s cubic-bezier(0.4,0,0.2,1)";
                sidebar.style.overflow = "hidden";
                sidebar.style.height = "100%"; // Always enforce 100% height
                if (currentWidth === "narrow") {
                  sidebar.setAttribute("data-width", "wide");
                  sidebar.style.display = "flex";
                  // Force reflow to ensure transition works after display change
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  sidebar.offsetWidth;
                  sidebar.style.width = "300px"; // Set to wide width
                } else {
                  sidebar.setAttribute("data-width", "narrow");
                  sidebar.style.width = "0px"; // Set to narrow width
                  // Listen for transition end to set display none
                  const handleTransitionEnd = () => {
                    sidebar.style.display = "none";
                    sidebar.removeEventListener(
                      "transitionend",
                      handleTransitionEnd
                    );
                  };
                  sidebar.addEventListener(
                    "transitionend",
                    handleTransitionEnd
                  );
                }
              }
            }}
          />
        )}

        {(section === "Profile" || section === "Settings") && (
          <Dashboard
            userInfoFromSession={userInfoFromSession}
            activeTab={section}
            setActiveTab={setSection}
            changeSidebarWidth={() => {
              const sidebar = document.querySelector(
                ".sidebar-container"
              ) as HTMLElement | null;
              if (sidebar) {
                const currentWidth = sidebar.getAttribute("data-width");
                sidebar.style.transition =
                  "width 0.3s cubic-bezier(0.4,0,0.2,1)";
                sidebar.style.overflow = "hidden";
                sidebar.style.height = "100%"; // Always enforce 100% height
                if (currentWidth === "narrow") {
                  sidebar.setAttribute("data-width", "wide");
                  sidebar.style.display = "flex";
                  // Force reflow to ensure transition works after display change
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  sidebar.offsetWidth;
                  sidebar.style.width = "300px"; // Set to wide width
                } else {
                  sidebar.setAttribute("data-width", "narrow");
                  sidebar.style.width = "0px"; // Set to narrow width
                  // Listen for transition end to set display none
                  const handleTransitionEnd = () => {
                    sidebar.style.display = "none";
                    sidebar.removeEventListener(
                      "transitionend",
                      handleTransitionEnd
                    );
                  };
                  sidebar.addEventListener(
                    "transitionend",
                    handleTransitionEnd
                  );
                }
              }
            }}
          />
        )}
      </Row>

      <Dialog
        title="Add Prompt"
        isOpen={openAddPromptDialog}
        onClose={() => setOpenAddPromptDialog(false)}
        description="Add a new prompt to your vault"
      >
        <Column gap="12">
          {" "}
          <Input
            id=""
            label="Prompt name"
            height="s"
            description="Enter the name of your prompt"
            value={newPromptName}
            onChange={(e) => setNewPromptName(e.target.value)}
          ></Input>
          <Textarea
            id=""
            label="Prompt content"
            style={{ minHeight: "200px" }}
            description="Enter or paste the content of your prompt"
            value={newPromptContent}
            onChange={(e) => setNewPromptContent(e.target.value)}
          ></Textarea>
          <Row fillWidth horizontal="end">
            {" "}
            <Button
              variant="primary"
              loading={newPromptLoading}
              onClick={handleAddPrompt}
            >
              Add Prompt
            </Button>
          </Row>{" "}
        </Column>
      </Dialog>
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
  changeSidebarWidth,
}: {
  userInfoFromSession: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  changeSidebarWidth: () => void;
}) {
  const router = useRouter();
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPrompts() {
      const { data, error } = await supabase
        .from("prompts")
        .select(
          "prompt_id, is_published, is_featured, is_private, content, prompt_avatar, uuid,is_sharable, created_at"
        );
      if (!error && data) {
        setPrompts(
          data.map((item: any) => ({
            title: item.content?.title,
            prompt: item.content?.prompt || "",
            card_id: item.prompt_id,
            pfp: item.prompt_avatar || item.uuid || "",
            is_published: item.is_published,
            is_featured: item.is_featured,
            is_private: item.is_private,
            is_sharable: item.is_sharable,
            created_at: item.created_at,
            description: item.content?.description || "",
          }))
        );
      }
    }
    fetchPrompts();
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };
  const [selectedFilter, setSelectedFilter] = useState("");

  // Listen for realtime updates to the prompt and update local state accordingly
  // Listen for realtime updates to the prompts table and update local state accordingly
  useEffect(() => {
    const channel = supabase
      .channel("prompts-vault-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prompts" },
        (payload: any) => {
          // Normalize payload for both old and new data
          const getPromptFromRow = (row: any) => ({
            title: row.content?.title,
            prompt: row.content?.prompt || "",
            card_id: row.prompt_id,
            pfp: row.prompt_avatar || row.uuid || "",
            is_published: row.is_published,
            is_featured: row.is_featured,
            is_private: row.is_private,
            is_sharable: row.is_sharable,
            created_at: row.created_at,
            description: row.content?.description || "",
          });

          if (payload.eventType === "INSERT" && payload.new) {
            setPrompts((prev) => [getPromptFromRow(payload.new), ...prev]);
          }
          if (payload.eventType === "UPDATE" && payload.new) {
            setPrompts((prev) =>
              prev.map((item) =>
                item.card_id === payload.new.prompt_id
                  ? getPromptFromRow(payload.new)
                  : item
              )
            );
          }
          if (payload.eventType === "DELETE" && payload.old) {
            setPrompts((prev) =>
              prev.filter((item) => item.card_id !== payload.old.prompt_id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      {" "}
      <Column
        fillWidth
        fillHeight
        padding="xs"
        radius="s-4"
        border="neutral-medium"
        className="vault-container"
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
          <IconButton
            variant="secondary"
            size="m"
            onClick={changeSidebarWidth}
            className="sidebar-toggle"
          >
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
                {activeTab === "Private Prompts"
                  ? "Private Prompts"
                  : "All Prompts"}
              </Text>
              <Text
                style={{ fontSize: "15px" }}
                className={inter.className}
                onBackground="neutral-medium"
              >
                {activeTab === "Private Prompts"
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
            <Row fillWidth gap="8" className="search-bar-container">
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
                  className="filter-select"
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
              className="prompts-container-small"
            >
              {activeTab === "Private Prompts" &&
                (() => {
                  const filteredPrompts = prompts
                    .filter((prompt) => prompt.is_private)
                    .filter((prompt) => {
                      if (!searchValue) return true;
                      const search = searchValue.toLowerCase();
                      return prompt.title.toLowerCase().includes(search);
                    });
                  if (!prompts.length) {
                    return (
                      <Row fillWidth center>
                        <Spinner size="l" />
                      </Row>
                    );
                  }
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
                      is_published={prompt.is_published}
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
                        return !prompt.is_published;
                      if (selectedFilter === "published")
                        return prompt.is_published;
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

                  if (!prompts.length) {
                    return (
                      <Row fillWidth center>
                        <Spinner size="l" />
                      </Row>
                    );
                  }
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
                      is_featured={prompt.is_featured}
                      is_private={prompt.is_private}
                      is_published={prompt.is_published}
                      is_sharable={prompt.is_sharable}
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
// Refactored PromptCard component with improvements and bug fixes

function PromptCard({
  title,
  description,
  card_id,
  pfp,
  is_featured = false,
  is_private = false,
  is_published = false,
  is_sharable = false,
}: {
  title: string;
  description: string;
  pfp: string;
  card_id: string;
  is_featured?: boolean;
  is_private?: boolean;
  is_published?: boolean;
  is_sharable?: boolean;
}) {
  const [isPublished, setIsPublished] = useState(is_published);
  const [isPrivate, setIsPrivate] = useState(is_private);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFeatured, setIsFeatured] = useState(is_featured);

  const router = useRouter();
  const { addToast } = useToast();

  const [featuredCount, setFeaturedCount] = useState(20);
  // Automatically update is_featured based on likes count, with realtime updates
  useEffect(() => {
    let ignore = false;

    async function checkAndUpdateFeatured() {
      const { data, error } = await supabase
        .from("likes")
        .select("likes")
        .eq("prompt_id", card_id)
        .single();

      if (!ignore && !error && data) {
        const likesArray = Array.isArray(data.likes) ? data.likes : [];
        const likesCount = likesArray.length;
        if (likesCount > featuredCount && !isFeatured) {
          await supabase
            .from("prompts")
            .update({ is_featured: true })
            .eq("prompt_id", card_id);
          setIsFeatured(true);
          addToast({
            message: "Your prompt was marked as featured",
            variant: "success",
          });
        } else if (likesCount <= featuredCount && isFeatured) {
          await supabase
            .from("prompts")
            .update({ is_featured: false })
            .eq("prompt_id", card_id);
          setIsFeatured(false);
          addToast({
            message: "Your prompt was unmarked as featured",
            variant: "danger",
          });
        }
      }
    }

    checkAndUpdateFeatured();

    // Listen for realtime changes in likes for this prompt
    const channel = supabase
      .channel(`likes-realtime-${card_id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
          filter: `prompt_id=eq.${card_id}`,
        },
        () => {
          checkAndUpdateFeatured();
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      channel.unsubscribe();
    };
  }, [card_id, isFeatured, addToast]);
  // Keep state in sync with props if they change
  useEffect(() => {
    setIsPrivate(is_private);
  }, [is_private]);
  useEffect(() => {
    setIsPublished(is_published);
  }, [is_published]);
  function changePrivacy(card_id: string) {
    // If prompt is published and user tries to make it private, unpublish first
    if (!isPrivate && isPublished) {
      supabase
        .from("prompts")
        .update({ is_private: true, is_published: false })
        .eq("prompt_id", card_id)
        .then(({ error }) => {
          if (error) {
            addToast({
              message:
                "Failed to change privacy. Please try again. Error: " +
                error.message,
              variant: "danger",
            });
          } else {
            setIsPrivate(true);
            setIsPublished(false);
            addToast({
              message: "Prompt privacy changed to Private and unpublished.",
              variant: "success",
            });
          }
        });
    } else {
      supabase
        .from("prompts")
        .update({ is_private: !isPrivate })
        .eq("prompt_id", card_id)
        .then(({ error }) => {
          if (error) {
            addToast({
              message:
                "Failed to change privacy. Please try again. Error: " +
                error.message,
              variant: "danger",
            });
          } else {
            setIsPrivate((prev) => !prev);
            addToast({
              message: `Prompt privacy changed to ${
                !isPrivate ? "Private" : "Public"
              }`,
              variant: "success",
            });
          }
        });
    }
  }

  function deletePrompt(card_id: string) {
    supabase
      .from("prompts")
      .delete()
      .eq("prompt_id", card_id)
      .then(({ error }) => {
        if (error) {
          addToast({
            message:
              "Failed to delete prompt. Please try again. Error: " +
              error.message,
            variant: "danger",
          });
          setDeleteDialogOpen(false);
        } else {
          addToast({
            message: "Prompt deleted successfully",
            variant: "success",
          });
          setDeleteDialogOpen(false);
          // Optionally: remove card from UI (parent should handle)
        }
      });
  }

  function updatePublishedStatus(card_id: string) {
    if (isPrivate) {
      addToast({
        message:
          "Cannot publish a private prompt. Please make it public first.",
        variant: "danger",
      });
      return;
    }
    supabase
      .from("prompts")
      .update({ is_published: !isPublished })
      .eq("prompt_id", card_id)
      .then(({ error }) => {
        if (error) {
          addToast({
            message:
              "Failed to update published status. Please try again. Error: " +
              error.message,
            variant: "danger",
          });
        } else {
          setIsPublished((prev) => !prev);
          addToast({
            message: `Prompt ${
              !isPublished ? "published" : "unpublished"
            } successfully`,
            variant: "success",
          });
        }
      });
  }

  // Clipboard copy helper
  const [copyLoading, setCopyLoading] = useState(false);
  async function handleCopy() {
    setCopyLoading(true);
    setTimeout(async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(description);
        } else {
          // Fallback: prompt user to copy manually
          window.prompt("Copy to clipboard: Ctrl+C, Enter", description);
        }
      } catch (err) {
        // Optionally handle error (e.g., show a toast)
      }
      setCopyLoading(false);
    }, 1000);
  }

  // Listen for realtime updates to the prompt and update local state accordingly
  useEffect(() => {
    const channel = supabase
      .channel(`promptcard-realtime-${card_id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "prompts",
          filter: `prompt_id=eq.${card_id}`,
        },
        (payload: any) => {
          if (payload.eventType === "UPDATE" && payload.new) {
            setIsPrivate(payload.new.is_private);
            setIsPublished(payload.new.is_published);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [card_id]);

  const [editDialog, setEditDialog] = useState(false);

  return (
    <>
      <Flex>
        <Card
          fillWidth
          padding="s"
          radius="s"
          border="neutral-medium"
          maxWidth={22}
          minWidth={22}
          className="prompt-card"
          as={Flex}
          direction="column"
          vertical="start"
          horizontal="start"
          gap="8"
          style={{ position: "relative" }}
        >
          <Row vertical="center" horizontal="space-between" fillWidth>
            <Row gap="8">
              <Avvvatars value={title} style="shape" />
              <Column gap="4" vertical="center" horizontal="start">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-strong"
                  className={inter.className}
                  style={{ lineHeight: "1", fontSize: "13px" }}
                >
                  {title.slice(0, 19).concat("...")}
                </Text>
                <SmartLink href="#">
                  <Text
                    variant="label-default-s"
                    onBackground="neutral-weak"
                    className={inter.className}
                    style={{ fontSize: "13px", lineHeight: "1" }}
                  >
                    {card_id.slice(0, 8)}
                  </Text>
                </SmartLink>
              </Column>
            </Row>
            <Row center gap="8">
              <IconButton
                variant="secondary"
                size="s"
                onClick={() => changePrivacy(card_id)}
                aria-label={isPrivate ? "Make Public" : "Make Private"}
              >
                {isPrivate ? (
                  <EyeClosed color="#555" size={14} />
                ) : (
                  <Eye color="#555" size={14} />
                )}
              </IconButton>
              <IconButton
                variant="secondary"
                size="s"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <LucideTrash2 color="#555" size={14} />
              </IconButton>
              <IconButton
                variant="secondary"
                size="s"
                onClick={() => setEditDialog(true)}
              >
                <Edit color="#555" size={14} />
              </IconButton>
              <IconButton variant="secondary" size="s" onClick={handleCopy}>
                {copyLoading ? (
                  <Spinner size="s" />
                ) : (
                  <Clipboard color="#555" size={14} />
                )}
              </IconButton>
            </Row>
          </Row>
          <Row
            fillWidth
            vertical="center"
            horizontal="start"
            paddingY="4"
            gap="4"
          >
            {isFeatured && (
              <Tag size="s" variant="gradient">
                <Text style={{ fontSize: "12px" }}>Featured</Text>
              </Tag>
            )}
            {isPrivate && (
              <Tag size="s" variant="brand">
                <Text style={{ fontSize: "12px" }}>Private</Text>
              </Tag>
            )}
            {isPublished ? (
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
                <Text
                  style={{ fontSize: "12px" }}
                  onBackground="neutral-medium"
                >
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
            <Checkbox
              label=""
              isChecked={isPublished}
              onToggle={() => updatePublishedStatus(card_id)}
            />
          </Row>
        </Card>
      </Flex>
      <Dialog
        title="Delete Prompt"
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        description="Are you sure you want to delete this prompt? This action cannot be undone."
      >
        <Button variant="danger" onClick={() => deletePrompt(card_id)}>
          Delete Prompt
        </Button>
      </Dialog>
    </>
  );
}

function PrivateCard({
  title,
  description,
  card_id,
  pfp,
  is_featured = false,
  is_private = false,
  is_published = false,
}: {
  title: string;
  description: string;
  pfp: string;
  card_id: string;
  is_featured?: boolean;
  is_private?: boolean;
  is_published?: boolean;
}) {
  const router = useRouter();
  const { addToast } = useToast();
  const [privateChecked, setPrivateChecked] = useState<boolean>(!!is_private);
  const [visible, setVisible] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Keep state in sync with props
  useEffect(() => {
    setPrivateChecked(!!is_private);
  }, [is_private]);

  function changePrivacy(card_id: string) {
    supabase
      .from("prompts")
      .update({ is_private: !privateChecked })
      .eq("prompt_id", card_id)
      .then(({ error }) => {
        if (error) {
          addToast({
            message:
              "Failed to change privacy. Please try again. Error: " +
              error.message,
            variant: "danger",
          });
        } else {
          setPrivateChecked((prev) => !prev);
          addToast({
            message: `Prompt privacy changed to ${
              !privateChecked ? "Private" : "Public"
            }`,
            variant: "success",
          });
        }
      });
  }

  function deletePrompt(card_id: string) {
    supabase
      .from("prompts")
      .delete()
      .eq("prompt_id", card_id)
      .then(({ error }) => {
        if (error) {
          addToast({
            message:
              "Failed to delete prompt. Please try again. Error: " +
              error.message,
            variant: "danger",
          });
          setDeleteDialogOpen(false);
        } else {
          addToast({
            message: "Prompt deleted successfully",
            variant: "success",
          });
          setDeleteDialogOpen(false);
          setVisible(false);
        }
      });
  }

  if (!visible) return null;

  // Clipboard copy helper
  const [copyLoading, setCopyLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(is_featured);
  async function handleCopy() {
    setCopyLoading(true);
    setTimeout(async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(description);
        } else {
          // Fallback: prompt user to copy manually
          window.prompt("Copy to clipboard: Ctrl+C, Enter", description);
        }
      } catch (err) {
        // Optionally handle error (e.g., show a toast)
      }
      setCopyLoading(false);
    }, 1000);
  }

  return (
    <Flex>
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
        style={{ position: "relative" }}
      >
        <Row vertical="center" horizontal="space-between" fillWidth>
          <Row gap="8">
            <Avvvatars value={title} style="shape" />
            <Column gap="4" vertical="center" horizontal="start">
              <Text
                variant="label-default-s"
                onBackground="neutral-strong"
                className={inter.className}
                style={{ lineHeight: "1", fontSize: "13px" }}
              >
                {title.slice(0, 19).concat("...")}
              </Text>
              <SmartLink href="#">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-weak"
                  className={inter.className}
                  style={{ fontSize: "13px", lineHeight: "1" }}
                >
                  {card_id.slice(0, 8)}
                </Text>
              </SmartLink>
            </Column>
          </Row>
          <Row center gap="8">
            <IconButton
              variant="secondary"
              size="s"
              onClick={() => changePrivacy(card_id)}
              aria-label={privateChecked ? "Make Public" : "Make Private"}
            >
              {privateChecked ? (
                <EyeClosed color="#555" size={14} />
              ) : (
                <Eye color="#555" size={14} />
              )}
            </IconButton>
            <IconButton
              variant="secondary"
              size="s"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <LucideTrash2 color="#555" size={14} />
            </IconButton>
            <IconButton variant="secondary" size="s">
              <Edit color="#555" size={14} />
            </IconButton>
            <IconButton
              variant="secondary"
              size="s"
              onClick={() => {
                if (navigator.clipboard && window.isSecureContext) {
                  navigator.clipboard.writeText(description);
                } else {
                  // fallback for insecure context or unsupported browsers
                  const textArea = document.createElement("textarea");
                  textArea.value = description;
                  // Avoid scrolling to bottom
                  textArea.style.position = "fixed";
                  textArea.style.left = "-999999px";
                  document.body.appendChild(textArea);
                  textArea.focus();
                  textArea.select();
                  try {
                    document.execCommand("copy");
                  } catch (err) {
                    // Optionally handle error
                  }
                  document.body.removeChild(textArea);
                }
              }}
            >
              {copyLoading ? (
                <Spinner size="s" />
              ) : (
                <Clipboard color="#555" size={14} />
              )}
            </IconButton>
          </Row>
        </Row>
        <Row
          fillWidth
          vertical="center"
          horizontal="start"
          paddingY="4"
          gap="4"
        >
          {" "}
          {isFeatured && (
            <Tag size="s" variant="gradient">
              <Text style={{ fontSize: "12px" }}>Featured</Text>
            </Tag>
          )}
          {privateChecked && (
            <Tag size="s" variant="brand">
              <Text style={{ fontSize: "12px" }}>Private</Text>
            </Tag>
          )}
          {is_published ? (
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
          )}{" "}
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
      <Dialog
        title="Delete Prompt"
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        description="Are you sure you want to delete this prompt? This action cannot be undone."
      >
        <Button variant="danger" onClick={() => deletePrompt(card_id)}>
          Delete Prompt
        </Button>
      </Dialog>
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
                    ) : item.getItemData().name === "Home" ? (
                      <Home className="text-muted-foreground pointer-events-none size-4" />
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
  changeSidebarWidth,
}: {
  userInfoFromSession: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  changeSidebarWidth: () => void;
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
    firstName: userInfoFromSession?.name?.split(" ")[0] || "",
    lastName: userInfoFromSession?.name?.split(" ")[1] || "",
    email: userInfoFromSession?.email || "",
    username: userInfoFromSession?.username || "",
  });

  const { addToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<boolean>(false);
  const [deleteAccountDialog, setDeleteAccountDialog] =
    useState<boolean>(false);
  function saveAccountSettings() {}

  function saveUserInputData() {
    setLoading(true);
    supabase
      .from("users")
      .update({
        first_name: userInputData.firstName,
        last_name: userInputData.lastName,
        username: userInputData.username,
      })
      .eq("uuid", userInfoFromSession?.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error updating user info:", error);
          addToast({
            message: "Failed to update user info. Please try again.",
            variant: "danger",
          });
        } else {
          console.log("User info updated successfully:", data);

          addToast({
            message: "User info updated successfully!",
            variant: "success",
          });
        }
        setLoading(false);
      });
  }

  function confirmDeleteAccount() {
    setDelLoading(true);

    supabase
      .from("users")
      .delete()
      .eq("uuid", userInfoFromSession?.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error deleting account:", error);
          addToast({
            message: "Failed to delete account. Please try again.",
            variant: "danger",
          });
        } else {
          console.log("Account deleted successfully:", data);
          addToast({
            message: "Account deleted successfully!",
            variant: "success",
          });
          router.push("/");
        }
        setDelLoading(false);
        setDeleteAccountDialog(false);
      });
  }

  function logoutFromSupabase() {
    supabase.auth.signOut().then(() => {
      router.push("/");
    });
  }

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
        className="vault-container"
      >
        <Column
          gap="4"
          fillWidth
          fitHeight
          vertical="center"
          horizontal="start"
        >
          <IconButton
            variant="secondary"
            size="m"
            onClick={changeSidebarWidth}
            className="sidebar-toggle"
          >
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
                    initialPreviewImage={userInfoFromSession.pfp}
                  />
                  <Button disabled={true}>Upload image</Button>
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
                  <Button
                    onClick={saveUserInputData}
                    disabled={loading}
                    loading={loading}
                  >
                    Save All
                  </Button>
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
                  <Button
                    variant="primary"
                    onClick={() => logoutFromSupabase()}
                  >
                    Log Out
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteAccountDialog(true)}
                  >
                    Delete Account
                  </Button>
                </Row>{" "}
              </Column>
            </Column>
          )}
        </Column>
      </Column>
      <Dialog
        title="Delete Account"
        isOpen={deleteAccountDialog}
        onClose={() => setDeleteAccountDialog(false)}
        description="Are you sure you want to delete your account? This action cannot be undone."
      >
        <Button
          variant="danger"
          onClick={confirmDeleteAccount}
          loading={delLoading}
        >
          Delete Account
        </Button>
      </Dialog>
    </>
  );
}
