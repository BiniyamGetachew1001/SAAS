import Link from "next/link";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Fill out the form and we'll get back to you as soon as possible.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Email</h3>
                    <p className="text-muted-foreground">support@bookinsight.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Live Chat</h3>
                    <p className="text-muted-foreground">Available Monday-Friday, 9am-5pm EST</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="overflow-hidden border bg-background shadow-sm">
              <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="text-2xl font-bold">Send a Message</CardTitle>
                <CardDescription>We'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">
                      Name
                    </label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Enter the subject" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Enter your message" className="min-h-[150px]" />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
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
                Find quick answers to common questions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How do I access my purchased content?</h3>
              <p className="text-muted-foreground">
                After purchase, you'll receive immediate access to your content through your account dashboard.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Can I request a specific book summary?</h3>
              <p className="text-muted-foreground">
                Yes! Contact us with your request, and we'll prioritize it for our upcoming releases.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Do you offer corporate packages?</h3>
              <p className="text-muted-foreground">
                Yes, we offer special pricing for teams and organizations. Contact us for more information.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How can I get help with a business plan?</h3>
              <p className="text-muted-foreground">
                We offer consultation services for implementing our business plans. Reach out to discuss your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
