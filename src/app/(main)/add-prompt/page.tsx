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
} from "@once-ui-system/core";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/Supabase";
import Sidebar from "@/components/custom-ui/Sidebar";
import { Inter, Outfit } from "next/font/google";
import { Bell, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

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
        <Flex
          fillWidth
          fillHeight
          paddingX="xs"
          paddingY="xs"
          radius="s-4"
          border="neutral-medium"
          style={{ backgroundColor: "#fff" }}
        >
          k
        </Flex>
      </Row>
    </>
  );
}
