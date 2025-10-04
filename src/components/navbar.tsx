"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, Search, Truck } from "lucide-react";
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
    <header className="bg-background/60 sticky top-0 z-50 border-b shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Truck className="text-primary h-6 w-6" />
              <span className="text-lg font-semibold tracking-tight">
                Driveon
              </span>
            </Link>
          </div>

          {/* center search (visible on md+) - two separate inputs with gap; hidden on mobile */}
          <div className="flex flex-1 justify-center">
            <div className="hidden w-full max-w-3xl items-center gap-3 md:flex">
              <div className="flex-1">
                <label className="sr-only">From</label>
                <Input
                  placeholder="Your location"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-0"
                />
              </div>

              <div className="flex-1">
                <label className="sr-only">What are you looking for</label>
                <Input
                  placeholder="Find vehicle you want"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-0"
                />
              </div>

              <div>
                <Button size="sm" className="rounded-md px-3 py-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* intentionally hide any compact search on small screens */}
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="hidden sm:inline-flex">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center rounded-full p-0 transition-transform hover:scale-[1.02]"
                    aria-label="Open account menu"
                  >
                    <Avatar className="ring-border h-10 w-10 ring-1">
                      {user.image ? (
                        <AvatarImage
                          src={user.image}
                          alt={user.name || "User"}
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
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
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
              className="hover:bg-muted/50 rounded-md p-2 transition-colors md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <Menu />
            </button>
          </div>
        </div>

        {open && (
          <div className="py-3 md:hidden">
            <nav className="bg-popover/70 flex flex-col gap-2 rounded-lg border p-3 shadow-sm">
              <Link
                href="/browse"
                className="hover:bg-muted/50 rounded px-3 py-2"
              >
                Browse
              </Link>
              <Link
                href="/pricing"
                className="hover:bg-muted/50 rounded px-3 py-2"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="hover:bg-muted/50 rounded px-3 py-2"
              >
                About
              </Link>
              {!user ? (
                <>
                  <Link
                    href="/sign-in"
                    className="hover:bg-muted/50 rounded px-3 py-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="hover:bg-muted/50 rounded px-3 py-2"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignOut}
                    className="hover:bg-muted/50 rounded px-3 py-2 text-left"
                  >
                    Logout
                  </button>
                  <Link
                    href="/dashboard"
                    className="hover:bg-muted/50 rounded px-3 py-2"
                  >
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
