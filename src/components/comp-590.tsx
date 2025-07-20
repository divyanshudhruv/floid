import {
  CompassIcon,
  FeatherIcon,
  HouseIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";

import NotificationMenu from "@/components/notification-menu";
import TeamSwitcher from "@/components/team-switcher";
import UserMenu from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Row } from "@once-ui-system/core";
import Component from "./comp-329";
const teams = ["Floid"];

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "#", label: "Dashboard", icon: HouseIcon },
  // { href: "#", label: "Explore", icon: CompassIcon },
  { href: "#", label: "Write", icon: FeatherIcon },
  { href: "#", label: "Search", icon: SearchIcon },
];

export default function NavBar() {
  return (
    <header className="border-b px-4 md:px-6 items-center">
      <Row
        className="flex h-16 items-center justify-between gap-8 "
        vertical="center"
        paddingX="l"
      >
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="flex-row items-center gap-2 py-1.5"
                        >
                          <Icon
                            size={16}
                            className="text-muted-foreground"
                            aria-hidden="true"
                          />
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <TeamSwitcher teams={[]} defaultTeam={teams[0]} />
        </div>
        {/* Middle area */}
        <Row className="flex flex-1 justify-center items-center">
          <div className="flex w-full justify-center">
            <NavigationMenu className="h-32 w-full max-w-3xl">
              <NavigationMenuList className="flex gap-2 items-center justify-center">
                {navigationLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <div key={index}>
                      <NavigationMenuLink
                        href={link.href}
                        className="flex size-8 items-center justify-center p-1.5"
                        title={link.label}
                      >
                        <Icon aria-hidden="true" />
                        <span className="sr-only">{link.label}</span>
                      </NavigationMenuLink>
                    </div>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </Row>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* <Button size="sm" className="text-sm max-sm:aspect-square max-sm:p-0">
            <PlusIcon
              className="opacity-60 sm:-ms-1"
              size={16}
              aria-hidden="true"
            />
            <span className="max-sm:sr-only">Post</span>
          </Button> */}
          <Component/>
          <NotificationMenu />
          <UserMenu />
        </div>
      </Row>
    </header>
  );
}
