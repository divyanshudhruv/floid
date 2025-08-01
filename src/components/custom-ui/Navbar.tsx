"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
} from "@once-ui-system/core";
import { Inter, Outfit } from "next/font/google";
import {
  Bell,
  LayoutDashboard,
  LogIn,
  Moon,
  Plus,
  SquareChartGanttIcon,
  Sun,
  Table2Icon,
} from "lucide-react";

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

const Navbar: React.FC<{}> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSession, setIsSession] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoading, setIsLoading] = useState(true);
  const [userPfp, setUserPfp] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);
  const router = useRouter();
  // Navbar scroll effect
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const handleScroll = () => {
      if (!navbar) return;
      navbar.classList.toggle("navbar-active", window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Session check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsSession(!!session);
    });
  }, []);

  // Google login
  const supabaseLoginGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://floid.vercel.app/auth/callback`,
        queryParams: { prompt: "select_account" },
      },
    });
  };

  return (
    <>
      <Row
        id="navbar"
        className="navbar"
        vertical="center"
        horizontal="space-between"
        fillWidth
        paddingX="m"
        width={47}
        style={{ paddingBlock: "3px" }}
        height={3.6}
        radius="m-4"
        zIndex={5}
      >
        <Flex
          gap="8"
          vertical="center"
          horizontal="start"
          fitWidth
          fillHeight
          width={10}
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
          <Tag variant="neutral" size="s">
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "12px" }}
              className={inter.className}
            >
              Beta
            </Text>
          </Tag>
          <Row marginX="16" center gap="16" className="navbar-links">
            <SmartLink
              style={{ fontSize: "12px", color: "#333" }}
              href="#"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
            >
              <Text className={inter.className}>Privacy</Text>
            </SmartLink>
            <SmartLink
              style={{ fontSize: "12px", color: "#333" }}
              href="#"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
            >
              <Text className={inter.className}>Terms</Text>
            </SmartLink>
            <SmartLink
              style={{ fontSize: "12px", color: "#333" }}
              href="#searchbar"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
            >
              <Text className={inter.className}>Search</Text>
            </SmartLink>
          </Row>
        </Flex>
        <Row gap="12" center>
          <NavIconToggle />
          <IconButton
            variant="secondary"
            size="m"
            style={{
              borderColor: "transparent",
              borderRadius: "27%",
              position: "relative",
              overflow: "hidden",
            }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <span
              style={{
                display: "inline-block",
                transition:
                  "transform 0.3s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.3s",
                transform: theme === "light" ? "scale(1)" : "scale(0.5)",
                opacity: theme === "light" ? 1 : 0,
                position: "absolute",
                left: "50%",
                top: "50%",
                translate: "-50% -50%",
              }}
            >
              <Sun color="#555" size={19} fontWeight={3} />
            </span>
            <span
              style={{
                display: "inline-block",
                transition:
                  "transform 0.3s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.3s",
                transform: theme === "dark" ? "scale(1)" : "scale(0.5)",
                opacity: theme === "dark" ? 1 : 0,
                position: "absolute",
                left: "50%",
                top: "50%",
                translate: "-50% -50%",
              }}
            >
              <Moon color="#555" size={17} fontWeight={3} />
            </span>
          </IconButton>
          {isSession && (
            <IconButton
              variant="primary"
              size="m"
              style={{
                borderColor: "transparent",
                borderRadius: "27%",
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
              <Table2Icon color="#F8F9FA" size={15} fontWeight={3} />
            </IconButton>
          )}

          {isSession ? (
            <UserMenu
              style={{
                borderColor: "transparent",
                borderRadius: "100%",
                zIndex: "99999 !important",
              }}
              placement="top"
              avatarProps={{ src: userPfp ?? undefined }}
              loading={isLoading}
            />
          ) : (
            <IconButton
              variant="primary"
              size="m"
              style={{
                borderColor: "transparent",
                borderRadius: "27%",
                backgroundColor: "#27272A !important",
                transition: "background 0.15s",
              }}
              onClick={() => setIsOpen(true)}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                (e.currentTarget.style.backgroundColor = "#18181B")
              }
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                (e.currentTarget.style.backgroundColor = "#27272A")
              }
            >
              <LogIn color="#F8F9FA" size={15} fontWeight={3} />
            </IconButton>
          )}
        </Row>
      </Row>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        style={{ scale: 0.9, zIndex: 99999 }}
        title={"Sign in to your account"}
        description={
          "Sign in to your account to create ai-bots, posts, comment, and like."
        }
        maxWidth={35}
      >
        <Column fillWidth gap="16" marginTop="12">
          <Row fillWidth vertical="center" gap="8" horizontal="start">
            <Button
              variant="primary"
              weight="default"
              size="m"
              onClick={() => {
                setIsOpen(false);
                supabaseLoginGoogle();
              }}
              className={outfit.className}
            >
              <Flex center fillWidth fillHeight />
              <Media
                src={
                  "https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png"
                }
                unoptimized
                width={1.1}
                height={1.1}
                minWidth={1.1}
                minHeight={1.1}
                radius="full"
              />
              &nbsp;&nbsp;&nbsp;{"Continue with Google"}
            </Button>
          </Row>
        </Column>
      </Dialog>
    </>
  );
};

function NavIconToggle() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Column fillWidth className="nav-icon-toggle">
      <IconButton
        variant="secondary"
        size="m"
        style={{
          borderColor: "transparent",
          borderRadius: "27%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <NavIcon
          isActive={isActive}
          onClick={() => setIsActive(!isActive)}
          aria-label="Toggle navigation menu"
          aria-expanded={isActive}
          aria-controls="demo-nav"
        />
      </IconButton>
    </Column>
  );
}

export default Navbar;
