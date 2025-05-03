"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl md:text-2xl">BookInsight</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/books"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/books" || pathname.startsWith("/books/") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Books
            </Link>
            <Link
              href="/summaries"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/summaries" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Book Summaries
            </Link>
            <Link
              href="/business-ideas"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/business-ideas" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Business Ideas
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/pricing" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/contact" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />

          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Button asChild variant="outline" className="hidden md:flex mr-2">
                    <Link href="/admin/content">Content Management</Link>
                  </Button>
                  <Button asChild variant="outline" className="hidden md:flex mr-2">
                    <Link href="/admin/mcp">MCP Dashboard</Link>
                  </Button>
                </>
              )}
              <Button onClick={logout} variant="ghost" className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild className="hidden md:flex">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/books">Books</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/summaries">Book Summaries</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/business-ideas">Business Ideas</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/pricing">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>

              {user ? (
                <>
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/content">Content Management</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/mcp">MCP Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login">Sign In</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
