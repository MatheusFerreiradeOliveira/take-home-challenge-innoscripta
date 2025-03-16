"use client";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme } = useTheme();

  return (
    <div className="p-4 border-b shadow-sm w-full order-1 flex flex-row bg-background items-center justify-between">
      <Image
        width={200}
        height={200}
        alt="Innoscripta"
        src={theme === "light" ? "/images/logo.png" : "/images/logo-white.png"}
      />

      <div className={cn("hidden md:flex items-center flex-row gap-4")}>
        <Link
          href={"/"}
          className="border-[0.5px] px-2 py-1 border-muted-foreground rounded-md"
        >
          Home
        </Link>
        <Link
          href={"/articles-search"}
          className="border-[0.5px] px-2 py-1 border-muted-foreground rounded-md"
        >
          Articles Search
        </Link>
        <ModeToggle />
      </div>

      <Menubar className="flex md:hidden justify-center items-center">
        <MenubarMenu>
          <MenubarTrigger>
            <Menu className="text-foreground px-0" size={24} />
          </MenubarTrigger>
          <MenubarContent className="flex flex-col gap-2 items-center mr-4">
            <MenubarItem>
              <Link href={"/"}>Home</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href={"/articles-search"}>Articles Search</Link>
            </MenubarItem>
            <MenubarItem>
              <ModeToggle />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
