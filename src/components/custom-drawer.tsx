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
  Column,
  Flex,
  IconButton,
  Input,
  Row,
  TagInput,
  Text,
  Textarea,
} from "@once-ui-system/core";
import { TbPrompt } from "react-icons/tb";

export function DrawerDemo() {
  const [tags, setTags] = React.useState<string[]>([]);

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
                {" "}
                <Column gap="20" fillWidth>
                  <Column gap="2">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Name:
                    </Text>
                    <Input id="" height="s" label="e.g. My Prompt"></Input>
                  </Column>
                  <Column gap="2">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Tags:
                    </Text>
                    <TagInput
                      id=""
                      height="s"
                      placeholder="e.g. Image Generation"
                      value={tags}
                      onChange={(newTags) => {
                        if (newTags.length <= 5) {
                          setTags(newTags);
                        }
                      }}
                    />
                  </Column>
                  <Column gap="2">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Description:
                    </Text>
                    <Textarea
                      id=""
                      label="e.g. Use this prompt to get..."
                    ></Textarea>
                  </Column>
                </Column>
                <Column fillWidth fillHeight>
                  <Textarea
                    style={{ height: "100% !important" }}
                    lines={13}
                    id=""
                    label="e.g. Hello, you are a professional assistant and..."
                    resize="none"
                  ></Textarea>
                </Column>
              </Flex>
            </Row>
            <Column fillWidth>
              {" "}
              <Button>Submit</Button>
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
