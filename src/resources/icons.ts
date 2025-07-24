import { Feather } from "lucide-react";
import { IconType } from "react-icons";

import {
  HiOutlineRocketLaunch,
  HiOutlineMagnifyingGlass,
HiOutlineGlobeAlt,
HiOutlineFolder,
HiOutlineCloud,
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCodeBracketSquare,
  HiOutlineWindow
} from "react-icons/hi2";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  search: HiOutlineMagnifyingGlass,
  docs: HiOutlineBookOpen,
  chat: HiOutlineChatBubbleLeftRight,
  code: HiOutlineCodeBracketSquare,
  home: HiOutlineFolder,
  globe: HiOutlineGlobeAlt,
  bot: HiOutlineCloud,
  feather: HiOutlineWindow

  // Add more icons as needed

};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;