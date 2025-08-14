"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Checkbox,
  Column,
  Flex,
  IconButton,
  Input,
  Row,
  TagInput,
  Text,
  Textarea,
  useToast,
} from "@once-ui-system/core";
import { TbPrompt } from "react-icons/tb";

import { supabase } from "@/lib/supabase";

export function DrawerDemo() {
  const { addToast } = useToast();
  const [models, setModels] = React.useState<string[]>([]);
  const [promptName, setPromptName] = React.useState<string>("");
  const [promptDescription, setPromptDescription] = React.useState<string>("");
  const [promptTags, setPromptTags] = React.useState<string[]>(["AI"]);
  const [promptUsage, setPromptUsage] = React.useState<string>("");


  const [currentUserFromSession, setCurrentUserFromSession] =
    React.useState<any>(null);
  React.useEffect(() => {
    const getSessionUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("Session data:", data, "Error:", error);
      if (data?.session?.user) {
        setCurrentUserFromSession(data.session.user.id);
      } else {
        addToast({ message: "No user session found", variant: "danger" });
      }
    };
    getSessionUser();
  }, [addToast]);

  async function insertDataToSupabase(){
    console.log("Insert data:", {
      promptName,
      promptDescription,
      promptUsage,
      promptTags,
      models,
      currentUserFromSession,
    });
    if (!promptName || !promptDescription || !promptUsage) {
      addToast({ message: "Please fill in all fields", variant: "danger" });
      return;
    }

    const { data, error } = await supabase
      .from("prompts")
      .insert([
      {
        author_id: currentUserFromSession,
        title: promptName,
        description: promptDescription,
        content: promptUsage,
        tags: promptTags,
        models: models,
      },
      ]);

    console.log("Supabase insert result:", { data, error });

    if (error) {
      addToast({ message: "Error inserting data", variant: "danger" });
    } else {
      addToast({ message: "Data inserted successfully", variant: "success" });
    }
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <IconButton
          variant="secondary"
          style={{ backgroundColor: "#33333311" }}
        >
          <TbPrompt size={14} fontWeight={0} />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <div
          className="mx-auto w-full "
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DrawerHeader>
            <DrawerTitle>Add your Prompt</DrawerTitle>
            <DrawerDescription>Set your prompt here.</DrawerDescription>
          </DrawerHeader>
          <Column gap="16" width={50} fillWidth>
            <Row fillWidth gap="12" horizontal="center" fillHeight>
              <Flex fillWidth gap="20">
                <Column gap="20" fillWidth>
                  <Column gap="2">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Name:
                    </Text>
                    <Input
                      id="prompt-name"
                      height="s"
                      label="e.g. My Prompt"
                      value={promptName}
                      onChange={(e) => setPromptName(e.target.value)}
                    />
                  </Column>
                  <Column gap="2">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Tags:
                    </Text>
                    <TagInput
                      id="prompt-tags"
                      height="s"
                      placeholder="e.g. Image Generation"
                      value={promptTags}
                      onChange={(newTags) => {
                        if (newTags.length <= 5) {
                          setPromptTags(newTags);
                        }
                      }}
                    />
                  </Column>
                  <Column gap="2">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Description:
                    </Text>
                    <Textarea
                      id="prompt-description"
                      label="e.g. Use this prompt to get..."
                      value={promptDescription}
                      onChange={(e) => setPromptDescription(e.target.value)}
                    />
                  </Column>
                  <Column gap="8">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Select the AI models:
                    </Text>
                    <Row gap="12" wrap={true}>
                      <Checkbox
                        label="ChatGPT"
                        checked={models.includes("ChatGPT")}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setModels((prev) =>
                            checked
                              ? [...prev, "ChatGPT"]
                              : prev.filter((m) => m !== "ChatGPT")
                          );
                        }}
                      />
                      <Checkbox
                        label="Gemini"
                        checked={models.includes("Gemini")}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setModels((prev) =>
                            checked
                              ? [...prev, "Gemini"]
                              : prev.filter((m) => m !== "Gemini")
                          );
                        }}
                      />
                      <Checkbox
                        label="Perplexity"
                        checked={models.includes("Perplexity")}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setModels((prev) =>
                            checked
                              ? [...prev, "Perplexity"]
                              : prev.filter((m) => m !== "Perplexity")
                          );
                        }}
                      />
                      <Checkbox
                        label="Android"
                        checked={models.includes("Android")}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setModels((prev) =>
                            checked
                              ? [...prev, "Android"]
                              : prev.filter((m) => m !== "Android")
                          );
                        }}
                      />
                      <Checkbox
                        label="Apple"
                        checked={models.includes("Apple")}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setModels((prev) =>
                            checked
                              ? [...prev, "Apple"]
                              : prev.filter((m) => m !== "Apple")
                          );
                        }}
                      />
                      <Checkbox
                        label="Linux"
                        checked={models.includes("Linux")}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setModels((prev) =>
                            checked
                              ? [...prev, "Linux"]
                              : prev.filter((m) => m !== "Linux")
                          );
                        }}
                      />
                      <Checkbox
                        label="Others"
                        checked={models.includes("Others")}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setModels((prev) =>
                            checked
                              ? [...prev, "Others"]
                              : prev.filter((m) => m !== "Others")
                          );
                        }}
                      />
                    </Row>
                  </Column>
                </Column>
                <Column fillWidth fillHeight>
                  <Textarea
                    style={{ height: "100% !important" }}
                    lines={13}
                    id="prompt-usage"
                    label="e.g. Hello, you are a professional assistant and..."
                    resize="none"
                    value={promptUsage}
                    onChange={(e) => setPromptUsage(e.target.value)}
                  />
                </Column>
              </Flex>
            </Row>
            <Column fillWidth>
              {" "}
              <Button onClick={insertDataToSupabase}>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </Column>
          </Column>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
