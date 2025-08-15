"use client";

import * as React from "react";
import { TbPrompt } from "react-icons/tb";
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
import { supabase } from "@/lib/supabase";

const MODEL_OPTIONS = [
  { label: "ChatGPT", value: "ChatGPT" },
  { label: "Gemini", value: "Gemini" },
  { label: "Perplexity", value: "Perplexity" },
  { label: "Android", value: "Android" },
  { label: "Apple", value: "Apple" },
  { label: "Linux", value: "Linux" },
  { label: "Code", value: "Code" },
  { label: "Others", value: "Others" }, // Added "Others" checkbox
];

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
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setCurrentUserFromSession(data.session.user.id);
      }
    };
    getSessionUser();
  }, [addToast]);

  async function insertDataToSupabase() {
    if (!promptName || !promptDescription || !promptUsage) {
      addToast({ message: "Please fill in all fields", variant: "danger" });
      return;
    }

    // Insert tags one by one into "tags" table
    for (const tag of promptTags) {
      await supabase
        .from("tags")
        .insert([{ tag_name: tag }])
        .then(({ error }) => {
          if (error) {
            console.log("Error inserting tag:", tag, error);
          }
        });
    }

    // Ensure models is stored as JSON array
    // Ensure "Others" is always included in models
    const modelsWithOthers = models.includes("Others")
      ? models
      : [...models, "Others"];

    const { error } = await supabase.from("prompts").insert([
      {
      author_id: currentUserFromSession,
      title: promptName,
      description: promptDescription,
      content: promptUsage,
      tags: promptTags,
      models: modelsWithOthers, // Should be a JSON/array column in Supabase
      },
    ]);

    if (error) {
      addToast({ message: "Error inserting data", variant: "danger" });
    } else {
      addToast({ message: "Data inserted successfully", variant: "success" });
    }
  }

  const handleModelChange = (value: string, checked: boolean) => {
    setModels((prev) =>
      checked
        ? prev.includes(value)
          ? prev
          : [...prev, value]
        : prev.filter((m) => m !== value)
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <IconButton
          variant="secondary"
          style={{ backgroundColor: "#33333311" }}
          tooltip="Add your Prompt"
          tooltipPosition="bottom"
        >
          <TbPrompt size={14} fontWeight={0} />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <div
          className="mx-auto w-full"
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
                        if (newTags.length <= 4) {
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
                      {MODEL_OPTIONS.map((model) => (
                        <Checkbox
                          key={model.value}
                          label={model.label}
                          isChecked={!!models.find((m) => m === model.value)}
                          onToggle={() =>
                            handleModelChange(
                              model.value,
                              !models.includes(model.value)
                            )
                          }
                        />
                      ))}
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
            <Column fillWidth gap="4">
              <DrawerClose asChild>
                <Button onClick={insertDataToSupabase} style={{ cursor: "pointer" }}>Submit</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline" style={{ cursor: "pointer" }}>Cancel</Button>
              </DrawerClose>
            </Column>
          </Column>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
