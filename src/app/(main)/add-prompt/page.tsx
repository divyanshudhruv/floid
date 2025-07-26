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
} from "@once-ui-system/core";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/Supabase";
import Sidebar from "@/components/custom-ui/Sidebar";
import { Inter, Outfit } from "next/font/google";
import { Bell, Plus, SidebarCloseIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/comp-449";
import Component from "@/components/comp-311";
import FileUploader from "@/components/comp-548";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

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
    name: "Engineering",
    children: ["frontend", "backend"],
  },
  frontend: { name: "Frontend", children: ["design-system", "web-platform"] },
  "design-system": {
    name: "Design System",
    children: ["components", "tokens", "guidelines"],
  },
  components: { name: "Components" },
  tokens: { name: "Tokens" },
  guidelines: { name: "Guidelines" },
  "web-platform": { name: "Web Platform" },
  backend: { name: "Backend", children: ["apis", "infrastructure"] },
  apis: { name: "APIs" },
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
        });
      } else {
        setUserInfoFromSession(null);
      }
    };
    fetchSession();
  }, []);

  const router = useRouter();
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
        {/* <Column
          fillHeight
          style={{ minHeight: "calc(100svh - 25px)" }}
          horizontal="center"
          vertical="start"
          gap="20"
        >
          <Navbar /> 

          
        </Column> */}

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
            <Sidebar items={items} />
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
                avatarProps={{ src: userInfoFromSession?.pfp }}
                dropdown={<Column width={10} height={20}></Column>}
              />
            </div>
          </Flex>
        </Column>
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
                  <Text className={outfit.className} variant="label-default-m">Upgrade to pro</Text>
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
            <Scroller direction="row">
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
                    54
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
                    456
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
                    123
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
                    23
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

              <Row
                fillWidth
                fillHeight
                minHeight={25}
                maxHeight={25}

                // background="brand-strong"
              >
                <LineBarChart
                  marginTop="16"
                  title="CEO vs Employee Paycheck"
                  fillHeight
                  axis="both"
                  date={{
                    format: "yyyy",
                    start: new Date("2000-01-01"),
                    end: new Date("2020-01-01"),
                    selector: true,
                    presets: {
                      display: true,
                      granularity: "week",
                    },
                    dual: true,
                  }}
                  series={[
                    { key: "Screen Time (hrs)", color: "moss" },
                    { key: "Physical Activity (hrs)", color: "yellow" },
                  ]}
                  data={[
                    {
                      date: new Date("2000-01-01"),
                      "Screen Time (hrs)": 2.5,
                      "Physical Activity (hrs)": 1.8,
                    },
                    {
                      date: new Date("2005-01-01"),
                      "Screen Time (hrs)": 3.0,
                      "Physical Activity (hrs)": 1.6,
                    },
                    {
                      date: new Date("2010-01-01"),
                      "Screen Time (hrs)": 4.0,
                      "Physical Activity (hrs)": 1.3,
                    },
                    {
                      date: new Date("2015-01-01"),
                      "Screen Time (hrs)": 5.5,
                      "Physical Activity (hrs)": 1.0,
                    },
                    {
                      date: new Date("2020-01-01"),
                      "Screen Time (hrs)": 7.0,
                      "Physical Activity (hrs)": 0.8,
                    },
                  ]}
                />
              </Row>
            </Column>
            <Column
              fillWidth
              maxWidth={25}
              height={25 + 10}
              maxHeight={25+3.25}
                
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
      </Row>
    </>
  );
}
