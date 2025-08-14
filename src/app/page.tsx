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

export default function Home() {
  const cardData = [
    {
      title: "ChatGPT",
      description: "ChatGPT is a conversational AI model developed by OpenAI.",
      tags: ["AI", "Chatbot"],
      onPreview: () => console.log("Previewing ChatGPT"),
      icons: [
        <PiOpenAiLogo />,
        <PiSparkle />,
        <PiCode />,
        <PiDotsThreeCircle />,
      ],
      isNew: true,
      clicks: 100,
    },
    {
      title: "Bard",
      description: "Bard is a conversational AI model developed by Google.",
      tags: ["AI", "Chatbot"],
      onPreview: () => console.log("Previewing Bard"),
      icons: [
        <PiGoogleLogo />,
        <PiSparkle />,
        <PiCode />,
        <PiDotsThreeCircle />,
      ],
      isNew: false,
      clicks: 50,
    },
    {
      title: "Claude",
      description:
        "Claude is a conversational AI model developed by Anthropic.",
      tags: ["AI", "Chatbot"],
      onPreview: () => console.log("Previewing Claude"),
      icons: [
        <PiOpenAiLogo />,
        <PiSparkle />,
        <PiCode />,
        <PiDotsThreeCircle />,
      ],
      isNew: false,
      clicks: 75,
    },
    {
      title: "Gemini",
      description:
        "Gemini is a conversational AI model developed by Google DeepMind.",
      tags: ["AI", "Chatbot"],
      onPreview: () => console.log("Previewing Gemini"),
      icons: [
        <PiGoogleLogo />,
        <PiSparkle />,
        <PiCode />,
        <PiDotsThreeCircle />,
      ],
      isNew: false,
      clicks: 60,
    },
  ];
  const [searchPromptQuery, setSearchPromptQuery] = useState("");

  function googleSignInSupabase() {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
      redirectTo: window.location.origin+"/auth/callback",
      queryParams: {
        prompt: "select_account",
      },
      },
    });
  
  }
  return (
    <Flex
      fillWidth
      center
      padding="l"
      style={{ minHeight: "100vh" }}
      background="surface"
    >
      <Column
        fillWidth
        fillHeight
        horizontal="center"
        vertical="start"
        gap="20"
      >
        <Flex fillWidth horizontal="start" vertical="center">
          {" "}
          <Row fillWidth horizontal="between" vertical="center">
            {" "}
            <Text
              className={interTight.className}
              style={{ color: "#FC42FF", fontSize: "32px" }}
            >
              Floid — Prompts
            </Text>
            <Row gap="8">
              {" "}
              <ToggleButton
                size="m"
                style={{ border: "1px solid #33333322", paddingBlock: "17px" }}
              >
                <Row center gap="8">
                  {" "}
                  Github
                  <GrGithub size={16} />
                </Row>
              </ToggleButton>{" "}
              <ToggleButton
                size="m"
                style={{ border: "1px solid #33333322", paddingBlock: "17px" }}
                onClick={googleSignInSupabase}
              >
                <Row center gap="8">
                  {" "}
                  Login after session exists then show username and pfp
                  <Avatar src={""} />
                </Row>
              </ToggleButton>{" "}
            </Row>
          </Row>
        </Flex>{" "}
        <Flex direction="column" fillWidth horizontal="start" vertical="center">
          <Text
            className={interTight.className}
            style={{
              fontSize: "29px",
              backgroundImage:
                "linear-gradient(to bottom, #0d0d0e 0%, #131315 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Crafted for seamless, engaging interactions with AI models.
          </Text>
          <Text
            className={interTight.className}
            style={{
              fontSize: "29px",
              backgroundImage:
                "linear-gradient(to bottom, #68686f 0%, #7A7A83 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Intuitive prompts designed for effortless, engaging conversations
            with AI.
          </Text>
        </Flex>
        <Flex fillWidth horizontal="start" vertical="center">
          <Text>
            <Row
              center
              className={interTight.className}
              gap="8"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #3a3a3fDD 0%, #23232aDD 100%)",
                WebkitBackgroundClip: "text",
                fontSize: "15px",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {" "}
              Open with{" "}
              <IconButton
                variant="secondary"
                style={{ backgroundColor: "#33333311" }}
              >
                <TbMoodSmile />
              </IconButton>
              Upload your own
              <DrawerDemo />
            </Row>
          </Text>
        </Flex>
        <Flex height={0.25} fillWidth></Flex>
        <Column fillWidth horizontal="start" vertical="center" gap="16">
          <Scroller direction="row">
            <Row
              fillWidth
              horizontal="start"
              vertical="center"
              style={{ minWidth: "100% !important" }}
              gap="8"
            >
              {[
                {
                  icon: <PiOpenAiLogo />,
                  label: "ChatGPT",
                  onClick: () => console.log("ChatGPT clicked"),
                },
                {
                  icon: <RiGeminiLine />,
                  label: "Gemini",
                  onClick: () => console.log("Gemini clicked"),
                },
                {
                  icon: <SiPerplexity />,
                  label: "Perplexity",
                  onClick: () => console.log("Perplexity clicked"),
                },
                {
                  icon: <PiAndroidLogo />,
                  label: "Android",
                  onClick: () => console.log("Android clicked"),
                },
                {
                  icon: <PiAppleLogo />,
                  label: "Apple",
                  onClick: () => console.log("Apple clicked"),
                },
                {
                  icon: <PiLinuxLogo />,
                  label: "Linux",
                  onClick: () => console.log("Linux clicked"),
                },
                {
                  icon: <PiCode />,
                  label: "Code",
                  onClick: () => console.log("Code clicked"),
                  className: interTight.className,
                },
                // {
                //   icon: <PiDotsThreeCircle />,
                //   label: "Others",
                //   onClick: () => console.log("Others clicked"),
                //   className: interTight.className,
                // },
              ].map(({ icon, label, onClick, className }, idx) => (
                <ToggleButton
                  key={label}
                  size="m"
                  style={{
                    border: "1px solid #33333322",
                    paddingBlock: "17px",
                  }}
                  data-border="rounded"
                  className={className}
                  onClick={onClick}
                >
                  <Row center gap="4">
                    {icon}
                    {label}
                  </Row>
                </ToggleButton>
              ))}
              <OtherOptions />
            </Row>
          </Scroller>
          <Row gap="20" center>
            {" "}
            <Row fillWidth horizontal="start" vertical="center" maxWidth={23}>
              <Input
                id=""
                placeholder="Search..."
                height="s"
                className={interTight.className}
                hasPrefix={<PiMagnifyingGlass color="#444" />}
                onChange={(e) => setSearchPromptQuery(e.target.value)}
                value={searchPromptQuery}
              ></Input>
            </Row>
            <Text variant="label-default-s" onBackground="neutral-weak">
              <Row>
                {" "}
                {searchPromptQuery.trim() !== "" && (
                  <>
                    {
                      cardData.filter(
                        (card) =>
                          card.title
                            .toLowerCase()
                            .includes(searchPromptQuery.toLowerCase()) ||
                          card.description
                            .toLowerCase()
                            .includes(searchPromptQuery.toLowerCase())
                      ).length
                    }
                    &nbsp;found{" "}
                  </>
                )}
              </Row>
            </Text>
          </Row>
          <Flex height={0.1}></Flex>
          <Row fillWidth horizontal="start" vertical="start" wrap gap="24">
            {" "}
            {cardData
              .filter(
                (card) =>
                  searchPromptQuery.trim() === "" ||
                  card.title
                    .toLowerCase()
                    .includes(searchPromptQuery.toLowerCase()) ||
                  card.description
                    .toLowerCase()
                    .includes(searchPromptQuery.toLowerCase())
              )
              .map((card, idx) => (
                <CardContainer
                  key={card.title + idx}
                  title={card.title}
                  description={card.description}
                  tags={card.tags}
                  onPreview={card.onPreview}
                  icons={card.icons}
                  isNew={card.isNew}
                  clicks={card.clicks}
                />
              ))}
          </Row>
          <Row fillWidth horizontal="between" vertical="start"></Row>
        </Column>
      </Column>
    </Flex>
  );
}
type CardContainerProps = {
  title: string;
  isNew?: boolean;
  clicks?: number;
  description: string;
  tags?: string[];
  icons?: React.ReactNode[];
  onPreview?: () => void;
};

function CardContainer({
  title,
  isNew = false,
  clicks = 0,
  description,
  tags = [],
  icons = [],
  onPreview,
}: CardContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex>
        <ContextMenu
          placement="bottom-start"
          dropdown={
            <Column gap="2" padding="4" minWidth={10}>
              <Option
                hasPrefix={
                  <Icon size="xs" name="edit" onBackground="neutral-weak" />
                }
                label="Edit"
                value="edit"
                style={{
                  cursor: "pointer",
                  color: "#fafafa",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fafafa")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              />

              <Line marginY="2" />
              <Option
                hasPrefix={<PiTrash color="#222" />}
                danger
                label="Delete"
                value="delete"
                style={{
                  cursor: "pointer",
                  color: "#fafafa",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fafafa")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              />
            </Column>
          }
        >
          <Card
            radius="l-4"
            direction="column"
            border="neutral-alpha-medium"
            paddingBottom="12"
            maxWidth={20}
            cursor="interactive"
            overflow="hidden"
          >
            <Column
              paddingTop="24"
              style={{ backgroundColor: "#fff" }}
              gap="12"
            >
              <Row
                fillWidth
                gap="8"
                vertical="center"
                horizontal="between"
                paddingX="24"
              >
                <Text
                  variant="label-strong-xl"
                  className={interTight.className}
                >
                  <Row gap="8">
                    <Text
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0d0d0e 0%, #131315 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {title}
                    </Text>
                    {isNew && (
                      <Tag
                        variant="neutral"
                        className={interTight.className}
                        style={{
                          backgroundColor: "#131315",
                          color: "#fff",
                          fontWeight: 500,
                          paddingInline: "4px",
                          paddingBlock: "2px",
                        }}
                        data-border="rounded"
                      >
                        <Text
                          variant="label-strong-xs"
                          style={{ color: "#fafafa", fontSize: "10px" }}
                        >
                          New
                        </Text>
                      </Tag>
                    )}
                  </Row>
                </Text>
                <Tag
                  variant="neutral"
                  className={interTight.className}
                  size="s"
                  data-border="conservative"
                >
                  <Row center gap="4">
                    <Text variant="label-default-xs">{clicks}</Text>
                    <TbClick />
                  </Row>
                </Tag>
              </Row>
              <Column fillWidth gap="8" paddingX="24">
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {description}
                </Text>
              </Column>
              <Row
                gap="4"
                vertical="center"
                textVariant="label-default-s"
                onBackground="neutral-medium"
                paddingX="24"
              >
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    variant="neutral"
                    className={interTight.className}
                    data-border="rounded"
                    style={{ backgroundColor: "#fafafa" }}
                  >
                    <Text
                      variant="label-default-xs"
                      style={{
                        fontSize: "12px",
                        backgroundImage:
                          "linear-gradient(to bottom, #4e4e54ff 0%, #6e6e76ff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {tag}
                    </Text>
                  </Tag>
                ))}
              </Row>
              <Line background="neutral-alpha-medium" height={0.005} />
            </Column>

            <Row
              fillWidth
              paddingX="24"
              horizontal="between"
              vertical="center"
              paddingTop="12"
            >
              <Row fitWidth gap="2" vertical="center" horizontal="start">
                {icons.map((icon, i) => (
                  <IconButton
                    key={i}
                    variant="tertiary"
                    style={{ color: "#131315dd" }}
                    size="s"
                  >
                    {icon}
                  </IconButton>
                ))}
              </Row>
              <Text
                onBackground="neutral-weak"
                variant="body-default-xs"
                style={{ cursor: onPreview ? "pointer" : undefined }}
                onClick={onPreview}
              >
                <Row gap="4" center>
                  <Text onClick={() => setIsOpen(true)}>Preview prompt</Text>
                  <BsArrowRight />
                </Row>
              </Text>
            </Row>
          </Card>
        </ContextMenu>
      </Flex>

      {/* rdf */}
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
      >
        <CodeBlock
          copyButton={false}
          codes={[
            {
              code: `// JavaScript

      add<Rowprompt here
      `,
              language: "javascript",
              label: "Prompt",
            },
            {
              code: `<!-- Date of Creation -->
add date of creation here

      `,
              language: "html",
              label: "✷ Date of Creation",
            },
            {
              code: `/* Author */
      add author name here
      `,
              language: "css",
              label: "✷ Author",
            },
          ]}
        />
      </Dialog>
    </>
  );
}

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DrawerDemo } from "@/components/custom-drawer";
import { useState } from "react";

export function PopoverDemo() {
  return (
    <div style={{ zIndex: 999999999 }}>
      <Popover>
        <PopoverTrigger asChild>
          <IconButton
            variant="secondary"
            style={{ backgroundColor: "#33333311" }}
          >
            <TbPrompt size={14} fontWeight={0} />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Dimensions</h4>
              <p className="text-muted-foreground text-sm">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  defaultValue="25px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input
                  id="maxHeight"
                  defaultValue="none"
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function OtherOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const options = [
    { label: "Apple", value: "apple", description: "Fruit" },
    { label: "Banana", value: "banana", description: "Fruit" },
    { label: "Carrot", value: "carrot", description: "Vegetable" },
    { label: "Broccoli", value: "broccoli", description: "Vegetable" },
    { label: "Orange", value: "orange", description: "Fruit" },
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DropdownWrapper
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      minHeight={200}
      trigger={
        <ToggleButton
          size="m"
          style={{
            border: "1px solid #33333322",
            paddingBlock: "17px",
          }}
          data-border="rounded"
          className={interTight.className}
          onClick={() => setIsOpen((v) => !v)}
        >
          <Row center gap="4">
            <PiDotsThreeCircle />
            Others
            <PiArrowDown />
          </Row>
        </ToggleButton>
      }
      dropdown={
        <Column fillWidth minWidth={12}>
          <Column
            padding="4"
            fillWidth
            position="sticky"
            top="0"
            background="page"
            zIndex={1}
          >
            <Input
              height="s"
              id="search-dropdown"
              placeholder="Search"
              hasPrefix={<Icon name="search" size="xs" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ zIndex: "99999999999" }}
            />
          </Column>
          <Column fillWidth gap="2" padding="4">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Option
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  description={option.description}
                  selected={option.value === selected}
                  onClick={handleSelect}
                />
              ))
            ) : (
              <Flex fillWidth center paddingX="16" paddingY="32">
                <Text>No results found</Text>
              </Flex>
            )}
          </Column>
        </Column>
      }
    />
  );
}
