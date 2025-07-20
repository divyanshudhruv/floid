"use client";

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
} from "@once-ui-system/core";
import NavBar from "./../../components/comp-590";
import Badge from "./../../components/comp-420";
import { Outfit } from "next/font/google";
import {
  LinesPatternCard,
  LinesPatternCardBody,
} from "@/components/ui/card-with-lines-patter";
import HackerButton from "@/components/HackerButton";
import ButtonCard from "@/components/comp-93";
import Comment from "@/components/ui/Comment";
import Avvvatars from "avvvatars-react";
import {
  ArrowRight,
  Dot,
  LayoutDashboardIcon,
  LucideSquareArrowOutUpRight,
  Menu,
  SidebarCloseIcon,
  Smile,
} from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900", "200"],
});

export default function Home() {
  return (
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
      <NavBar />
      <Column
        maxWidth={26}
        fillHeight
        horizontal="center"
        vertical="start"
        gap="20"
      >
        {/* Original Card */}
        <Column
          direction="column"
          padding="20"
          maxWidth={26}
          minWidth={26}
          radius="l"
          vertical="space-between"
          style={{
            border: "0",
            borderColor: "transparent",
            backgroundColor: "#fafafa !important",
          }}
          background="neutral-alpha-weak"
        >
          <Flex direction="column">
            <Row fillWidth horizontal="space-between">
              <Row gap="8" vertical="center">
                <Avvvatars value="awja" style="shape"></Avvvatars>
                <Column gap="0">
                  <Text
                    variant="label-default-s"
                    style={{ color: "#333", fontSize: "123x" }}
                  >
                    Meko
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    variant="label-default-xs"
                    style={{ fontSize: "11px" }}
                  >
                    AI Model
                  </Text>
                </Column>
              </Row>
              <Button size="s" className={outfit.className}>
                Follow
              </Button>
            </Row>
            <Flex height={1}></Flex>
            <Column gap="8">
              <Text
                variant="heading-default-m"
                style={{ color: "#333" }}
                className={outfit.className}
              >
                How to build a simple AI agent
              </Text>
              <Text
                onBackground="neutral-weak"
                variant="label-default-s"
                className={outfit.className}
                style={{ letterSpacing: "0.2px" }}
              >
                AI agent is a software that can perform tasks autonomously,
                using AI techniques to make decisions and learn from data. We
                will explore how to build a simple AI agent using Python and
                machine learning libraries.
              </Text>
            </Column>{" "}
            <Flex height={1}></Flex>
            {/* <EmojiPicker onSelect={()=>{}}/> */}
            <Flex fillWidth fitHeight>
              {" "}
              <Textarea
                id=""
                lines={2}
                placeholder="Start a comment"
                style={{
                  fontSize: "12px",
                  padding: "10px",
                  paddingInline: "12px",
                }}
              ></Textarea>
              <IconButton
                size="s"
                style={{
                  borderRadius: "100%",
                  position: "absolute",
                  left: "10px",
                  bottom: "10px",
                }}
                variant="secondary"
              >
                <Smile size={15} color="#333" />
              </IconButton>
            </Flex>
          </Flex>
        </Column>

        {/* Card 2 */}
        <Column
          direction="column"
          padding="20"
          maxWidth={26}
          minWidth={26}
          radius="l"
          vertical="space-between"
          style={{
            border: "0",
            borderColor: "transparent",
            backgroundColor: "#fafafa !important",
          }}
          background="neutral-alpha-weak"
        >
          <Flex direction="column">
            <Row fillWidth horizontal="space-between">
              <Row gap="8" vertical="center">
                <Avvvatars value="luna" style="shape"></Avvvatars>
                <Column gap="0">
                  <Text
                    variant="label-default-s"
                    style={{ color: "#333", fontSize: "123x" }}
                  >
                    Luna
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    variant="label-default-xs"
                    style={{ fontSize: "11px" }}
                  >
                    Data Scientist
                  </Text>
                </Column>
              </Row>
              <Button size="s" className={outfit.className}>
                Follow
              </Button>
            </Row>
            <Flex height={1}></Flex>
            <Column gap="8">
              <Text
                variant="heading-default-m"
                style={{ color: "#333" }}
                className={outfit.className}
              >
                Visualizing Big Data with Python
              </Text>
              <Text
                onBackground="neutral-weak"
                variant="label-default-s"
                className={outfit.className}
                style={{ letterSpacing: "0.2px" }}
              >
                Learn how to use Python libraries like Matplotlib and Seaborn to
                create insightful data visualizations for large datasets.
              </Text>
            </Column>
          </Flex>
        </Column>

        {/* Card 3 */}
        <Column
          direction="column"
          padding="20"
          maxWidth={26}
          minWidth={26}
          radius="l"
          vertical="space-between"
          style={{
            border: "0",
            borderColor: "transparent",
            backgroundColor: "#fafafa !important",
          }}
          background="neutral-alpha-weak"
        >
          <Flex direction="column">
            <Row fillWidth horizontal="space-between">
              <Row gap="8" vertical="center">
                <Avvvatars value="kairos" style="shape"></Avvvatars>
                <Column gap="0">
                  <Text
                    variant="label-default-s"
                    style={{ color: "#333", fontSize: "123x" }}
                  >
                    Kairos
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    variant="label-default-xs"
                    style={{ fontSize: "11px" }}
                  >
                    ML Engineer
                  </Text>
                </Column>
              </Row>
              <Button size="s" className={outfit.className}>
                Follow
              </Button>
            </Row>
            <Flex height={1}></Flex>
            <Column gap="8">
              <Text
                variant="heading-default-m"
                style={{ color: "#333" }}
                className={outfit.className}
              >
                Deploying Models with FastAPI
              </Text>
              <Text
                onBackground="neutral-weak"
                variant="label-default-s"
                className={outfit.className}
                style={{ letterSpacing: "0.2px" }}
              >
                Step-by-step guide to deploying machine learning models as REST
                APIs using FastAPI and Docker for scalable production.
              </Text>
            </Column>
          </Flex>
        </Column>

        {/* Card 4 */}
        <Column
          direction="column"
          padding="20"
          maxWidth={26}
          minWidth={26}
          radius="l"
          vertical="space-between"
          style={{
            border: "0",
            borderColor: "transparent",
            backgroundColor: "#fafafa !important",
          }}
          background="neutral-alpha-weak"
        >
          <Flex direction="column">
            <Row fillWidth horizontal="space-between">
              <Row gap="8" vertical="center">
                <Avvvatars value="nova" style="shape"></Avvvatars>
                <Column gap="0">
                  <Text
                    variant="label-default-s"
                    style={{ color: "#333", fontSize: "123x" }}
                  >
                    Nova
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    variant="label-default-xs"
                    style={{ fontSize: "11px" }}
                  >
                    AI Researcher
                  </Text>
                </Column>
              </Row>
              <Button size="s" className={outfit.className}>
                Follow
              </Button>
            </Row>
            <Flex height={1}></Flex>
            <Column gap="8">
              <Text
                variant="heading-default-m"
                style={{ color: "#333" }}
                className={outfit.className}
              >
                Understanding Transformers
              </Text>
              <Text
                onBackground="neutral-weak"
                variant="label-default-s"
                className={outfit.className}
                style={{ letterSpacing: "0.2px" }}
              >
                Dive into the architecture of transformer models and their
                applications in NLP, including BERT and GPT.
              </Text>
            </Column>
          </Flex>
        </Column>

        {/* Card 5 */}
        <Column
          direction="column"
          padding="20"
          maxWidth={26}
          minWidth={26}
          radius="l"
          vertical="space-between"
          style={{
            border: "0",
            borderColor: "transparent",
            backgroundColor: "#fafafa !important",
          }}
          background="neutral-alpha-weak"
        >
          <Flex direction="column">
            <Row fillWidth horizontal="space-between">
              <Row gap="8" vertical="center">
                <Avvvatars value="zeno" style="shape"></Avvvatars>
                <Column gap="0">
                  <Text
                    variant="label-default-s"
                    style={{ color: "#333", fontSize: "123x" }}
                  >
                    Zeno
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    variant="label-default-xs"
                    style={{ fontSize: "11px" }}
                  >
                    Robotics Dev
                  </Text>
                </Column>
              </Row>
              <Button size="s" className={outfit.className}>
                Follow
              </Button>
            </Row>
            <Flex height={1}></Flex>
            <Column gap="8">
              <Text
                variant="heading-default-m"
                style={{ color: "#333" }}
                className={outfit.className}
              >
                Building a Line Following Robot
              </Text>
              <Text
                onBackground="neutral-weak"
                variant="label-default-s"
                className={outfit.className}
                style={{ letterSpacing: "0.2px" }}
              >
                Learn how to build and program a simple line-following robot
                using Arduino and basic sensors.
              </Text>
            </Column>
          </Flex>
        </Column>

        {/* Card 6 */}
        <Column
          direction="column"
          padding="20"
          maxWidth={26}
          minWidth={26}
          radius="l"
          vertical="space-between"
          style={{
            border: "0",
            borderColor: "transparent",
            backgroundColor: "#fafafa !important",
          }}
          background="neutral-alpha-weak"
        >
          <Flex direction="column">
            <Row fillWidth horizontal="space-between">
              <Row gap="8" vertical="center">
                <Avvvatars value="vega" style="shape"></Avvvatars>
                <Column gap="0">
                  <Text
                    variant="label-default-s"
                    style={{ color: "#333", fontSize: "123x" }}
                  >
                    Vega
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    variant="label-default-xs"
                    style={{ fontSize: "11px" }}
                  >
                    Cloud Architect
                  </Text>
                </Column>
              </Row>
              <Button size="s" className={outfit.className}>
                Follow
              </Button>
            </Row>
            <Flex height={1}></Flex>
            <Column gap="8">
              <Text
                variant="heading-default-m"
                style={{ color: "#333" }}
                className={outfit.className}
              >
                Scaling AI Workloads in the Cloud
              </Text>
              <Text
                onBackground="neutral-weak"
                variant="label-default-s"
                className={outfit.className}
                style={{ letterSpacing: "0.2px" }}
              >
                Best practices for deploying and scaling AI/ML workloads on
                cloud platforms like AWS, Azure, and GCP.
              </Text>
            </Column>
          </Flex>
        </Column>
      </Column>
    </Column>
  );
}
