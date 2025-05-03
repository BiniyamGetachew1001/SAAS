"use client";

import Link from "next/link";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for business ideas
const businessIdeas = [
  {
    id: 1,
    title: "Sustainable Packaging Service",
    category: "Small",
    description: "Offer eco-friendly packaging solutions for small businesses looking to reduce their environmental impact.",
    investment: "$5,000 - $15,000",
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Virtual Event Planning",
    category: "Small",
    description: "Help businesses plan and execute virtual events, conferences, and team-building activities.",
    investment: "$2,000 - $10,000",
    difficulty: "Low",
  },
  {
    id: 3,
    title: "Niche E-commerce Store",
    category: "Medium",
    description: "Create an online store focused on a specific niche with high demand and low competition.",
    investment: "$15,000 - $50,000",
    difficulty: "Medium",
  },
  {
    id: 4,
    title: "Mobile App Development Agency",
    category: "Medium",
    description: "Start an agency specializing in developing mobile applications for businesses and startups.",
    investment: "$25,000 - $75,000",
    difficulty: "High",
  },
  {
    id: 5,
    title: "Renewable Energy Solutions",
    category: "Large",
    description: "Provide renewable energy solutions for residential and commercial properties.",
    investment: "$100,000 - $500,000",
    difficulty: "High",
  },
  {
    id: 6,
    title: "Health Tech Platform",
    category: "Large",
    description: "Develop a platform connecting healthcare providers with patients for remote consultations and monitoring.",
    investment: "$150,000 - $750,000",
    difficulty: "High",
  },
];

export default function BusinessIdeasPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Business Ideas</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Browse through categorized business plans that match your ambition and resources. Each category is purchasable separately.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link href="/pricing">Unlock All Business Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Ideas Section */}
      <section className="w-full py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Categories</TabsTrigger>
                <TabsTrigger value="small">Small</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="large">Large</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessIdeas.map((idea) => (
                  <Card key={idea.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{idea.title}</CardTitle>
                          <CardDescription>
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              idea.category === "Small"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : idea.category === "Medium"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                            } mt-2`}>
                              {idea.category}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                          {idea.difficulty}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
                      <div className="text-sm font-medium">
                        Investment: <span className="text-muted-foreground">{idea.investment}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/business-ideas/${idea.id}`}>View Business Plan</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="small" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessIdeas
                  .filter((idea) => idea.category === "Small")
                  .map((idea) => (
                    <Card key={idea.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{idea.title}</CardTitle>
                            <CardDescription>
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 mt-2">
                                {idea.category}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                            {idea.difficulty}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
                        <div className="text-sm font-medium">
                          Investment: <span className="text-muted-foreground">{idea.investment}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/business-ideas/${idea.id}`}>View Business Plan</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="medium" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessIdeas
                  .filter((idea) => idea.category === "Medium")
                  .map((idea) => (
                    <Card key={idea.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{idea.title}</CardTitle>
                            <CardDescription>
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mt-2">
                                {idea.category}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                            {idea.difficulty}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
                        <div className="text-sm font-medium">
                          Investment: <span className="text-muted-foreground">{idea.investment}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/business-ideas/${idea.id}`}>View Business Plan</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="large" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessIdeas
                  .filter((idea) => idea.category === "Large")
                  .map((idea) => (
                    <Card key={idea.id} className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 transition-all hover:shadow-md">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{idea.title}</CardTitle>
                            <CardDescription>
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 mt-2">
                                {idea.category}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                            {idea.difficulty}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
                        <div className="text-sm font-medium">
                          Investment: <span className="text-muted-foreground">{idea.investment}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/business-ideas/${idea.id}`}>View Business Plan</Link>
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
