"use client";

import Link from "next/link";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for book summaries
const summaries = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Productivity",
    description: "An easy and proven way to build good habits and break bad ones.",
    image: "/books/atomic-habits.jpg",
    readTime: "15 min",
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    description: "Rules for focused success in a distracted world.",
    image: "/books/deep-work.jpg",
    readTime: "18 min",
  },
  {
    id: 3,
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    description: "Notes on startups, or how to build the future.",
    image: "/books/zero-to-one.jpg",
    readTime: "20 min",
  },
  {
    id: 4,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    description: "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
    image: "/books/lean-startup.jpg",
    readTime: "17 min",
  },
  {
    id: 5,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    description: "A groundbreaking tour of the mind and explains the two systems that drive the way we think.",
    image: "/books/thinking-fast-slow.jpg",
    readTime: "22 min",
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    description: "Timeless lessons on wealth, greed, and happiness.",
    image: "/books/psychology-money.jpg",
    readTime: "16 min",
  },
];

export default function SummariesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Book Summaries</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Get the key insights from bestselling books in just minutes. One-time payment unlocks full access.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link href="/pricing">Unlock All Summaries</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Summaries Section */}
      <section className="w-full py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Categories</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="productivity">Productivity</TabsTrigger>
                <TabsTrigger value="psychology">Psychology</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaries.map((summary) => (
                  <Card key={summary.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                    <div className="aspect-[4/3] bg-muted/50 relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                        <span className="text-lg font-semibold text-muted-foreground">{summary.title}</span>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{summary.title}</CardTitle>
                          <CardDescription>{summary.author}</CardDescription>
                        </div>
                        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                          {summary.readTime}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{summary.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/summaries/${summary.id}`}>Read Summary</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="business" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaries
                  .filter((summary) => summary.category === "Business")
                  .map((summary) => (
                    <Card key={summary.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                      <div className="aspect-[4/3] bg-muted/50 relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                          <span className="text-lg font-semibold text-muted-foreground">{summary.title}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{summary.title}</CardTitle>
                            <CardDescription>{summary.author}</CardDescription>
                          </div>
                          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                            {summary.readTime}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{summary.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/summaries/${summary.id}`}>Read Summary</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="productivity" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaries
                  .filter((summary) => summary.category === "Productivity")
                  .map((summary) => (
                    <Card key={summary.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                      <div className="aspect-[4/3] bg-muted/50 relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                          <span className="text-lg font-semibold text-muted-foreground">{summary.title}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{summary.title}</CardTitle>
                            <CardDescription>{summary.author}</CardDescription>
                          </div>
                          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                            {summary.readTime}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{summary.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/summaries/${summary.id}`}>Read Summary</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="psychology" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaries
                  .filter((summary) => summary.category === "Psychology")
                  .map((summary) => (
                    <Card key={summary.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                      <div className="aspect-[4/3] bg-muted/50 relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                          <span className="text-lg font-semibold text-muted-foreground">{summary.title}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{summary.title}</CardTitle>
                            <CardDescription>{summary.author}</CardDescription>
                          </div>
                          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                            {summary.readTime}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{summary.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/summaries/${summary.id}`}>Read Summary</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="finance" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaries
                  .filter((summary) => summary.category === "Finance")
                  .map((summary) => (
                    <Card key={summary.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                      <div className="aspect-[4/3] bg-muted/50 relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                          <span className="text-lg font-semibold text-muted-foreground">{summary.title}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{summary.title}</CardTitle>
                            <CardDescription>{summary.author}</CardDescription>
                          </div>
                          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                            {summary.readTime}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{summary.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/summaries/${summary.id}`}>Read Summary</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
}
