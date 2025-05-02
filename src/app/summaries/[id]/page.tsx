"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bookmark, ChevronLeft, Share2, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

// Mock data for book summaries
const summaries = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Productivity",
    description: "An easy and proven way to build good habits and break bad ones.",
    image: "/books/atomic-habits.jpg",
    readTime: "15 min",
    content: `
      # Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones

      ## Key Takeaways

      - Small habits can have a remarkable impact on your life when compounded over time.
      - Focus on systems rather than goals to achieve lasting change.
      - The Four Laws of Behavior Change provide a framework for creating good habits and breaking bad ones.
      - Identity-based habits are more effective than outcome-based habits.

      ## Summary

      ### The Power of Atomic Habits

      James Clear defines atomic habits as small changes or habits that are part of a larger system. He argues that the effects of your habits multiply as you repeat them, making small improvements add up to remarkable results over time. The author emphasizes that if you can get 1% better each day for one year, you'll end up 37 times better by the end.

      ### The Four Laws of Behavior Change

      Clear presents a framework for building better habits based on four laws:

      1. **Make it Obvious** - Design your environment to make cues for good habits visible and cues for bad habits invisible.
      2. **Make it Attractive** - Pair an action you want to do with an action you need to do.
      3. **Make it Easy** - Reduce friction for good habits and increase friction for bad habits.
      4. **Make it Satisfying** - Make the immediate reward of a good habit satisfying to increase the odds of repeating it.

      ### Identity-Based Habits

      One of the most powerful insights in the book is the importance of focusing on identity rather than outcomes. Clear suggests that the most effective way to change your habits is to focus on who you wish to become, not what you want to achieve.

      > "The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become."

      ### The Habit Loop

      Clear explains the habit loop—cue, craving, response, reward—and how understanding this loop can help you build better habits:

      - **Cue**: The trigger that initiates behavior
      - **Craving**: The motivational force behind every habit
      - **Response**: The actual habit you perform
      - **Reward**: The end goal of every habit

      ### Practical Applications

      The book provides numerous practical strategies for implementing these laws, such as:

      - Habit stacking: Building new habits onto existing ones
      - Implementation intentions: Planning when and where you will perform a new habit
      - Habit tracking: Using a visual measurement to maintain your habits
      - The two-minute rule: Scaling down habits to start with a two-minute version

      ## Conclusion

      Atomic Habits offers a proven framework for improving every day, focusing on small changes that compound into remarkable results. By understanding the fundamental principles of habit formation, you can design a system that works for your specific goals and challenges.
    `,
  },
  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    description: "Rules for focused success in a distracted world.",
    image: "/books/deep-work.jpg",
    readTime: "18 min",
    content: `
      # Deep Work: Rules for Focused Success in a Distracted World

      ## Key Takeaways

      - Deep work is the ability to focus without distraction on a cognitively demanding task.
      - The ability to perform deep work is becoming increasingly rare and valuable in our economy.
      - To master deep work, you must deliberately practice and build your concentration like a muscle.
      - Implementing specific routines and rituals can help protect your ability to do deep work.

      ## Summary

      ### The Concept of Deep Work

      Cal Newport defines deep work as "professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit." This is contrasted with shallow work, which consists of non-cognitively demanding, logistical tasks, often performed while distracted.

      Newport argues that deep work is increasingly valuable in our economy, yet increasingly rare due to the prevalence of open offices, instant messaging, social media, and the culture of connectivity.

      ### The Rules of Deep Work

      #### Rule #1: Work Deeply

      Newport suggests different approaches to scheduling deep work:
      
      - **Monastic**: Eliminating or radically minimizing shallow obligations
      - **Bimodal**: Dedicating clearly defined stretches to deep work while leaving the rest open for everything else
      - **Rhythmic**: Creating a regular habit of deep work
      - **Journalistic**: Fitting deep work wherever you can into your schedule

      #### Rule #2: Embrace Boredom

      The ability to concentrate intensely is a skill that must be trained. Newport suggests:
      
      - Taking breaks from focus, not from distraction
      - Practicing productive meditation
      - Structuring your deep thinking

      #### Rule #3: Quit Social Media

      Not all network tools are created equal. Newport proposes the craftsman approach to tool selection:
      
      - Identify the core factors that determine success in your professional and personal life
      - Only adopt a tool if its positive impacts substantially outweigh its negative impacts

      #### Rule #4: Drain the Shallows

      Minimize shallow work to make room for more deep work:
      
      - Schedule every minute of your day
      - Quantify the depth of every activity
      - Ask your boss for a shallow work budget
      - Finish your work by 5:30 (fixed-schedule productivity)

      ### The Deep Work Hypothesis

      Newport's central thesis is that "the ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy. As a consequence, the few who cultivate this skill, and then make it the core of their working life, will thrive."

      ## Conclusion

      Deep Work provides a compelling case for the importance of focused, distraction-free work in achieving meaningful success in today's economy. By implementing the strategies outlined in the book, readers can cultivate the ability to concentrate intensely and produce work of exceptional quality and value.
    `,
  },
];

export default function SummaryPage() {
  const params = useParams();
  const id = params.id as string;
  const summary = summaries.find((s) => s.id === id) || summaries[0];

  const [fontSize, setFontSize] = useState("medium");
  const [fontFamily, setFontFamily] = useState("sans");
  const [isPaginated, setIsPaginated] = useState(false);
  const { setTheme, theme } = useTheme();

  return (
    <MainLayout>
      <div className="container px-4 py-8 md:px-6">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/summaries">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Summaries
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{summary.title}</h1>
          <p className="text-muted-foreground">
            By {summary.author} • {summary.readTime} read
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_250px]">
          <div>
            <Card className="p-6">
              <div className="mb-6 flex justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <article
                className={`prose prose-neutral dark:prose-invert max-w-none ${
                  fontSize === "small"
                    ? "prose-sm"
                    : fontSize === "large"
                    ? "prose-lg"
                    : ""
                } ${
                  fontFamily === "serif"
                    ? "font-serif"
                    : fontFamily === "mono"
                    ? "font-mono"
                    : "font-sans"
                }`}
                dangerouslySetInnerHTML={{
                  __html: summary.content
                    .replace(/^#{1}\s+(.+)$/gm, "<h1>$1</h1>")
                    .replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>")
                    .replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>")
                    .replace(/^#{4}\s+(.+)$/gm, "<h4>$1</h4>")
                    .replace(/^#{5}\s+(.+)$/gm, "<h5>$1</h5>")
                    .replace(/^#{6}\s+(.+)$/gm, "<h6>$1</h6>")
                    .replace(/^\s*>\s*(.+)$/gm, "<blockquote><p>$1</p></blockquote>")
                    .replace(/^\s*-\s+(.+)$/gm, "<li>$1</li>")
                    .replace(/<li>(.+)<\/li>/g, "<ul><li>$1</li></ul>")
                    .replace(/<\/ul>\s*<ul>/g, "")
                    .replace(/\n\n/g, "</p><p>")
                    .replace(/\n/g, "<br>"),
                }}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-medium">Reading Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">View Mode</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Scroll</span>
                    <Switch
                      checked={isPaginated}
                      onCheckedChange={setIsPaginated}
                    />
                    <span className="text-sm text-muted-foreground">Pages</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Font Size</span>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Font Family</span>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sans">Sans Serif</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="mono">Monospace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 text-lg font-medium">Related Summaries</h3>
              <div className="space-y-4">
                {summaries
                  .filter((s) => s.id !== id)
                  .map((s) => (
                    <div key={s.id} className="space-y-1">
                      <Link
                        href={`/summaries/${s.id}`}
                        className="font-medium hover:underline"
                      >
                        {s.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {s.author} • {s.readTime}
                      </p>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
