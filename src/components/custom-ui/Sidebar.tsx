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

  // Render all folders as open, and remove any click handlers that toggle open/close
  return (
    <div className="flex h-full flex-col gap-2 *:first:grow">
      <div>
        <Tree
          className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))] bg-transparent"
          indent={indent}
          tree={tree}
          aria-disabled={true}
        >
          {tree.getItems().map((item) => {
            return (
              <TreeItem
                key={item.getId()}
                item={item}
                aria-disabled={true}
                className=""
              >
                <TreeItemLabel className="before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10">
                  <span className="flex items-center gap-2">
                    {item.isFolder() ? (
                      <FolderOpenIcon className="text-muted-foreground pointer-events-none size-4" />
                    ) : (
                      <FileIcon className="text-muted-foreground pointer-events-none size-4" />
                    )}
                    {item.getItemName()}
                  </span>
                </TreeItemLabel>
              </TreeItem>
            );
          })}
        </Tree>
      </div>

      {/* <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-xs"
      >
        Basic tree with icons ∙{" "}
        <a
          href="https://headless-tree.lukasbach.com"
          className="hover:text-foreground underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          API
        </a>
      </p> */}
    </div>
  );
}
