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
  { label: "Others", value: "Others" },
];

export function DrawerDemo() {
  const { addToast } = useToast();
  const [models, setModels] = React.useState<string[]>([]);
  const [promptName, setPromptName] = React.useState<string>("");
  const [promptDescription, setPromptDescription] = React.useState<string>("");
  const [promptTags, setPromptTags] = React.useState<string[]>(["AI"]);
  const [promptUsage, setPromptUsage] = React.useState<string>("");
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getSessionUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          addToast({
            message: "Failed to get user session",
            variant: "danger",
          });
          return;
        }
        if (data?.session?.user) {
          setCurrentUserId(data.session.user.id);
        } else {
          // No user session found, do not log repeatedly
          setCurrentUserId(null);
        }
      } catch (err) {
        addToast({
          message: "Unexpected error getting session",
          variant: "danger",
        });
      }
    };
    getSessionUser();
  }, [addToast]);

  const validateFields = () => {
    if (!promptName.trim()) {
      addToast({ message: "Prompt name is required", variant: "danger" });
      return false;
    }
    if (!promptDescription.trim()) {
      addToast({
        message: "Prompt description is required",
        variant: "danger",
      });
      return false;
    }
    if (!promptUsage.trim()) {
      addToast({ message: "Prompt usage is required", variant: "danger" });
      return false;
    }
    if (!currentUserId) {
      addToast({ message: "User not authenticated", variant: "danger" });
      return false;
    }
    return true;
  };

  const insertTags = async () => {
    for (const tag of promptTags) {
      const { error } = await supabase.from("tags").insert([{ tag_name: tag }]);
      if (error) {
        addToast({ message: `Error inserting tag: ${tag}`, variant: "danger" });
      }
    }
  };

  const insertPrompt = async () => {
    // Ensure "Others" is always included
    const modelsWithOthers = models.includes("Others")
      ? models
      : [...models, "Others"];
    const { error } = await supabase.from("prompts").insert([
      {
        author_id: currentUserId,
        title: promptName,
        description: promptDescription,
        content: promptUsage,
        tags: promptTags,
        models: modelsWithOthers,
      },
    ]);
    if (error) {
      addToast({ message: "Error inserting prompt", variant: "danger" });
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!currentUserId) {
      addToast({ message: "No user session found. Please log in.", variant: "danger" });
      return;
    }
    if (!validateFields()) return;
    setLoading(true);
    try {
      await insertTags();
      const success = await insertPrompt();
      if (success) {
        addToast({ message: "Prompt added successfully", variant: "success" });
        // Optionally reset form here
        setPromptName("");
        setPromptDescription("");
        setPromptTags(["AI"]);
        setPromptUsage("");
        setModels([]);
      }
    } catch (err) {
      addToast({
        message: "Unexpected error submitting prompt",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

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
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.backgroundColor = "#33333322";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.backgroundColor = "#33333311";
          }}

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
                      disabled={loading}
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
                        } else {
                          addToast({
                            message: "Maximum 4 tags allowed",
                            variant: "danger",
                          });
                        }
                      }}
                      disabled={loading}
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
                      disabled={loading}
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
                          disabled={loading}
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
                    disabled={loading}
                  />
                </Column>
              </Flex>
            </Row>
            <Column fillWidth gap="4">
              <DrawerClose asChild>
                <Button
                  onClick={handleSubmit}
                  style={{ cursor: "pointer" }}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  style={{ cursor: "pointer" }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </Column>
          </Column>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
