"use client";

import React from "react";
import { syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderOpenIcon } from "lucide-react";

import { Tree, TreeItem, TreeItemLabel } from "../originui/tree";

export interface Item {
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
}

export default function Sidebar({ items }: SidebarProps) {
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

  // All colors except fonts are set to transparent
  return (
    <div className="flex h-full flex-col gap-2 *:first:grow bg-transparent">
      <div>
        <Tree
          className="relative before:absolute before:inset-0 before:-ms-1 before:bg-transparent bg-transparent"
          indent={indent}
          tree={tree}
          aria-disabled={true}
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: "inherit",
          }}
        >
          {tree.getItems().map((item) => {
            return (
              <TreeItem
                key={item.getId()}
                item={item}
                aria-disabled={true}
                className=""
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  color: "inherit",
                }}
              >
                <TreeItemLabel
                  className="before:bg-transparent relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    color: "inherit",
                  }}
                >
                  <span
                    className="flex items-center gap-2"
                    style={{ backgroundColor: "transparent" }}
                  >
                    {item.isFolder() ? (
                      <FolderOpenIcon
                        className="pointer-events-none size-4"
                        style={{
                          backgroundColor: "transparent",
                          color: "inherit",
                        }}
                      />
                    ) : (
                      <FileIcon
                        className="pointer-events-none size-4"
                        style={{
                          backgroundColor: "transparent",
                          color: "inherit",
                        }}
                      />
                    )}
                    {item.getItemName()}
                  </span>
                </TreeItemLabel>
              </TreeItem>
            );
          })}
        </Tree>
      </div>
    </div>
  );
}
