import Link from "next/link";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Choose the plan that works best for you. No hidden fees, no contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* Book Summaries Plan */}
            <Card className="flex flex-col overflow-hidden border bg-background shadow-sm">
              <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="text-2xl font-bold">Book Summaries</CardTitle>
                <CardDescription>Access to all book summaries</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex flex-col gap-4">
                  <div className="text-4xl font-bold">$49</div>
                  <p className="text-sm text-muted-foreground">One-time payment for lifetime access</p>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Access to all book summaries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Premium reading interface</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Highlighting and notes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Regular new additions</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-2 p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href="#">Buy Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Business Ideas Plans */}
            <Card className="flex flex-col overflow-hidden border bg-background shadow-sm">
              <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="text-2xl font-bold">Business Ideas</CardTitle>
                <CardDescription>Choose your business plan category</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex flex-col gap-4">
                  <div className="text-4xl font-bold">$29 - $99</div>
                  <p className="text-sm text-muted-foreground">Price varies by category</p>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Small Business Plans - $29</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Medium Business Plans - $59</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Large Business Plans - $99</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Detailed implementation guides</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-2 p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href="/business-ideas">View Categories</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* All Access Plan */}
            <Card className="flex flex-col overflow-hidden border bg-background shadow-sm relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                Best Value
              </div>
              <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="text-2xl font-bold">All Access</CardTitle>
                <CardDescription>Complete access to everything</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex flex-col gap-4">
                  <div className="text-4xl font-bold">$149</div>
                  <p className="text-sm text-muted-foreground">One-time payment for lifetime access</p>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">All book summaries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">All business plans (all categories)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Premium reading interface</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Priority access to new content</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-2 p-6 pt-0">
                <Button asChild className="w-full bg-primary text-primary-foreground">
                  <Link href="#">Buy Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Have questions? We've got answers.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Is this a subscription?</h3>
              <p className="text-muted-foreground">
                No, all our plans are one-time payments that give you lifetime access to the content.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Can I upgrade my plan later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade from individual plans to the All Access plan by paying the difference.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How often is new content added?</h3>
              <p className="text-muted-foreground">
                We add new book summaries weekly and new business plans monthly.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee if you're not satisfied with your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
