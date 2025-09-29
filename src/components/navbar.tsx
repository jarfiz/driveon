"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const user = session?.user;

  async function handleSignOut() {
    try {
      await authClient.signOut();
      router.push("/sign-in");
    } catch (err) {
      console.error("Sign out failed", err);
    }
  }

  return (
    <header className="bg-background border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-semibold">
              Driveon
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              <Link
                href="/browse"
                className="px-3 py-2 text-sm hover:underline"
              >
                Browse
              </Link>
              <Link
                href="/pricing"
                className="px-3 py-2 text-sm hover:underline"
              >
                Pricing
              </Link>
              <Link href="/about" className="px-3 py-2 text-sm hover:underline">
                About
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-center px-4">
            <div className="hidden w-full max-w-md md:block">
              <Input placeholder="Search vehicles, locations..." />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <Avatar>
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={50}
                          height={50}
                        />
                      ) : (
                        <AvatarFallback>
                          {user.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="text-destructive mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button
              className="p-2 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Menu />
            </button>
          </div>
        </div>

        {open && (
          <div className="py-2 md:hidden">
            <nav className="flex flex-col gap-2">
              <Link href="/browse" className="px-3 py-2">
                Browse
              </Link>
              <Link href="/pricing" className="px-3 py-2">
                Pricing
              </Link>
              <Link href="/about" className="px-3 py-2">
                About
              </Link>
              {!user ? (
                <>
                  <Link href="/sign-in" className="px-3 py-2">
                    Login
                  </Link>
                  <Link href="/sign-up" className="px-3 py-2">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 text-left"
                  >
                    Logout
                  </button>
                  <Link href="/dashboard" className="px-3 py-2">
                    Account
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
