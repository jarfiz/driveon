"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Heart,
  Home,
  LogOut,
  Menu,
  Search,
  Truck,
  X,
} from "lucide-react";
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
    <header className="bg-background/60 sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <Link href="/" className="group flex items-center gap-2">
              <div className="from-primary to-accent rounded-lg bg-gradient-to-br p-2 transition-all group-hover:shadow-lg">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <span className="from-primary to-accent hidden bg-gradient-to-r bg-clip-text text-lg font-bold tracking-tight text-transparent sm:inline">
                VehicleShare
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/vehicles">
              <Button variant="ghost" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Browse
              </Button>
            </Link>
          </nav>

          {/* Center search (visible on md+) */}
          <div className="hidden flex-1 justify-center px-6 md:flex">
            <div className="w-full max-w-2xl">
              <div className="relative flex items-center gap-2">
                <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search vehicles..."
                  className="focus:ring-primary/50 w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2"
                />
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
              >
                <Heart className="h-5 w-5" />
              </Button>
            )}

            {!user ? (
              <>
                <Link href="/sign-in" className="hidden sm:block">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up" className="hidden sm:block">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center rounded-full p-0 transition-transform hover:scale-[1.05]"
                    aria-label="Open account menu"
                  >
                    <Avatar className="ring-border h-9 w-9 ring-2">
                      {user.image ? (
                        <Image
                          src={user.image}
                          width={100}
                          height={100}
                          alt={user.name || "User"}
                        />
                      ) : (
                        <AvatarFallback className="from-primary to-accent bg-gradient-to-br font-semibold text-white">
                          {user.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-semibold">
                    {user.name}
                  </DropdownMenuLabel>
                  <p className="mb-2 px-2 text-xs text-slate-500">
                    {user.email}
                  </p>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile" className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/bookings" className="w-full">
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu button */}
            <button
              className="hover:bg-muted/50 rounded-md p-2 transition-colors md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <div className="px-2 pb-3">
                <div className="relative flex items-center gap-2">
                  <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search vehicles..."
                    className="focus:ring-primary/50 w-full rounded-lg border border-slate-200 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2"
                  />
                </div>
              </div>

              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link href="/vehicles">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Browse Vehicles
                </Button>
              </Link>

              {!user ? (
                <>
                  <Link href="/sign-in" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up" className="w-full">
                    <Button size="sm" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/bookings" className="w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      My Bookings
                    </Button>
                  </Link>
                  <button onClick={handleSignOut} className="w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive w-full justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
