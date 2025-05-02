import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 hero-gradient">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 glow-text uppercase">
                  Summaries that save time. Business plans that spark action.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Access premium book summaries and categorized business idea plans.
                  Save time with concise insights and spark action with ready-to-implement business strategies.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-primary text-primary-foreground glow-border">
                  <Link href="/books">Explore Books</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl border glass-effect p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 opacity-50"></div>
                <div className="relative h-full w-full rounded-lg bg-background/30 p-6 flex items-center justify-center backdrop-blur-sm">
                  <div className="space-y-2 text-center">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                      Premium Content
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Book Summaries & Business Plans</h3>
                      <p className="text-sm text-muted-foreground">
                        Unlock a world of knowledge and business opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 relative">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl uppercase">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform offers a premium reading experience with powerful features to enhance your learning and business planning.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide text-primary">Books</CardTitle>
                <CardDescription>Full books available for individual purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Browse our collection of premium books available for individual purchase. Each book is carefully selected for its valuable insights.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                  <Link href="/books" className="flex items-center">
                    Browse Books
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide text-primary">Book Summaries</CardTitle>
                <CardDescription>Concise insights from top business books</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Get the key takeaways from bestselling books without spending hours reading. One-time payment unlocks full access.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                  <Link href="/summaries" className="flex items-center">
                    View Summaries
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide text-primary">Business Ideas</CardTitle>
                <CardDescription>Categorized into Small, Medium, and Large plans</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Browse through categorized business plans that match your ambition and resources. Each category is purchasable separately.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                  <Link href="/business-ideas" className="flex items-center">
                    Explore Ideas
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide text-primary">Premium Reading</CardTitle>
                <CardDescription>Elegant and customizable interface</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Enjoy a beautiful reading experience with font customization, dark mode, highlighting, notes, and sharing capabilities.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                  <Link href="/pricing" className="flex items-center">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl glow-text uppercase">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Choose the plan that works best for you and start exploring our premium content today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground glow-border">
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
