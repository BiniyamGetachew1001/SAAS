"use client";

import { useState, useEffect, useCallback } from "react";
import { MainLayout } from "@/components/main-layout";
import { BookCard } from "@/components/book-card";
import { BookSearch, BookFilters } from "@/components/book-search";
import { Button } from "@/components/ui/button";

// Sample book data
const books = [
  {
    id: "1",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverImage: "/images/books/psychology-of-money.jpg",
    price: 19.99,
    category: "Finance",
    description: "Timeless lessons on wealth, greed, and happiness. The Psychology of Money explores how money moves around in an economy and how people handle it in their personal lives.",
    previewPages: [
      `<h1>Chapter 1: No One's Crazy</h1>
      <p>Let me tell you about a problem. It might make you feel better about what you do with your money, and less judgmental about what other people do with theirs.</p>
      <p>People do some crazy things with money. But no one is crazy.</p>
      <p>Here's the thing: People from different generations, raised by different parents who earned different incomes and held different values, in different parts of the world, born into different economies, experiencing different job markets with different incentives and different degrees of luck, learn very different lessons.</p>`,

      `<h1>Chapter 2: Luck & Risk</h1>
      <p>The line between "inspiringly bold" and "foolishly reckless" can be a millimeter thick and only visible with hindsight.</p>
      <p>Risk and luck are doppelgangers. This is not an easy message to get across. We tend to view success as evidence of skill and failure as evidence of error.</p>
      <p>The difficulty in identifying what is luck, what is skill, and what is risk is one of the biggest problems we face when trying to learn about the best way to manage money.</p>`,

      `<h1>Chapter 3: Never Enough</h1>
      <p>There is no reason to risk what you have and need for what you don't have and don't need.</p>
      <p>The hardest financial skill is getting the goalpost to stop moving. It gets dangerous when the taste of having more—more money, more power, more prestige—increases ambition faster than satisfaction.</p>
      <p>Modern capitalism is a pro at two things: generating wealth and generating envy. Perhaps they go hand in hand; wanting to surpass your peers can be the fuel of hard work.</p>`
    ]
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/images/books/atomic-habits.jpg",
    price: 24.99,
    category: "Self-Improvement",
    description: "An easy and proven way to build good habits and break bad ones. Atomic Habits offers a proven framework for improving every day through tiny changes in behavior.",
    previewPages: [
      `<h1>Introduction: My Story</h1>
      <p>On the final day of my sophomore year of high school, I was hit in the face with a baseball bat. As my classmate took a full swing, the bat slipped out of his hands and came flying toward me before striking me directly between the eyes. I collapsed to the ground, blood pouring from above my nose.</p>
      <p>The impact of the hit fractured my skull and sent fragments of bone into my brain. After eight hours of emergency surgery, I woke up to learn that I had been placed into a medically induced coma and had experienced significant memory loss. I forgot most of the previous school year and struggled to recognize friends and family members. When I returned to high school, I discovered that I needed to relearn how to study effectively.</p>`,

      `<h1>Chapter 1: The Surprising Power of Atomic Habits</h1>
      <p>It is so easy to overestimate the importance of one defining moment and underestimate the value of making small improvements on a daily basis. Too often, we convince ourselves that massive success requires massive action.</p>
      <p>Meanwhile, improving by 1 percent isn't particularly notable—sometimes it isn't even noticeable—but it can be far more meaningful, especially in the long run. The difference a tiny improvement can make over time is astounding.</p>
      <p>Here's how the math works out: if you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done. Conversely, if you get 1 percent worse each day for one year, you'll decline nearly down to zero. What starts as a small win or a minor setback accumulates into something much more.</p>`,

      `<h1>Chapter 2: How Your Habits Shape Your Identity (and Vice Versa)</h1>
      <p>Changing our habits is challenging for two reasons: (1) we try to change the wrong thing and (2) we try to change our habits in the wrong way.</p>
      <p>Many people begin the process of changing their habits by focusing on what they want to achieve. This leads us to outcome-based habits. The alternative is to build identity-based habits. With this approach, we start by focusing on who we wish to become.</p>
      <p>Behind every system of actions are a system of beliefs. The system of a democracy is founded on beliefs like freedom, majority rule, and social equality. The system of a dictatorship has a very different set of beliefs like absolute authority and strict obedience. You can imagine many ways to try to get more people to vote in a democracy, but such behavior change would never get off the ground in a dictatorship. That's not the identity of the system.</p>`
    ]
  },
  {
    id: "3",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "/images/books/deep-work.jpg",
    price: 22.99,
    category: "Productivity",
    description: "Rules for focused success in a distracted world. Deep Work is an indispensable guide to anyone seeking focused success in a distracted world.",
    previewPages: [
      `<h1>Introduction</h1>
      <p>In the early fall of 2012, I traveled to Zurich to visit the Euler Archives. The archives are named after the great Swiss mathematician Leonhard Euler, and they're located in the basement of a university library. I was there to browse through the letters Euler sent to other mathematicians of his era.</p>
      <p>Euler was prolific. He produced so many important papers that the St. Petersburg Academy, where he worked, had a backlog that kept publishing his results for thirty years after his death. What struck me about Euler's letters was their deliberateness. In an era when communication was slow and expensive, Euler made the most of each letter, carefully working through multiple mathematical concepts and results.</p>`,

      `<h1>Chapter 1: Deep Work Is Valuable</h1>
      <p>In this new economy, three groups will have a particular advantage: those who can work well and creatively with intelligent machines, those who are the best at what they do, and those with access to capital.</p>
      <p>Two core abilities for thriving in the new economy:</p>
      <p>1. The ability to quickly master hard things.</p>
      <p>2. The ability to produce at an elite level, in terms of both quality and speed.</p>`
    ]
  },
  {
    id: "4",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "/images/books/thinking-fast-slow.jpg",
    price: 29.99,
    category: "Psychology",
    description: "A groundbreaking tour of the mind explaining the two systems that drive the way we think—System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    previewPages: [
      `<h1>Introduction</h1>
      <p>Every author, I suppose, has in mind a setting in which readers of his or her work could benefit from having read it. Mine is the proverbial office water-cooler, where opinions are shared and gossip is exchanged. I hope to enrich the vocabulary that people use when they talk about the judgments and choices of others, the company's new policies, or a colleague's investment decisions.</p>
      <p>Why be concerned with gossip? Because it is much easier, as well as far more enjoyable, to identify and label the mistakes of others than to recognize our own. Questioning what we believe and want is difficult at the best of times, and especially difficult when we most need to do it, but we can benefit from the informed opinions of others.</p>`,

      `<h1>Part 1: Two Systems</h1>
      <p>To observe your mind in automatic mode, glance at the image below:</p>
      <p>[Image of an angry woman]</p>
      <p>Your mind automatically assumed the woman is angry, and you likely predicted that she is about to say some very unkind words. A premonition of what she was going to do next came to mind automatically. You did not intend to assess her mood or to anticipate what she might do, and your reaction to the picture did not have the feel of something you did. It just happened to you. It was an instance of fast thinking.</p>`
    ]
  },
  {
    id: "5",
    title: "Zero to One",
    author: "Peter Thiel",
    coverImage: "/images/books/zero-to-one.jpg",
    price: 21.99,
    category: "Business",
    description: "Notes on startups, or how to build the future. Zero to One presents at once an optimistic view of the future of progress in America and a new way of thinking about innovation.",
    previewPages: [
      `<h1>Preface: Zero to One</h1>
      <p>Every moment in business happens only once. The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won't make a search engine. And the next Mark Zuckerberg won't create a social network. If you are copying these guys, you aren't learning from them.</p>
      <p>Of course, it's easier to copy a model than to make something new. Doing what we already know how to do takes the world from 1 to n, adding more of something familiar. But every time we create something new, we go from 0 to 1. The act of creation is singular, as is the moment of creation, and the result is something fresh and strange.</p>`,

      `<h1>Chapter 1: The Challenge of the Future</h1>
      <p>Whenever I interview someone for a job, I like to ask this question: "What important truth do very few people agree with you on?"</p>
      <p>This question sounds easy because it's straightforward. Actually, it's very hard to answer. It's intellectually difficult because the knowledge that everyone is taught in school is by definition agreed upon. And it's psychologically difficult because anyone trying to answer must say something she knows to be unpopular. Brilliant thinking is rare, but courage is in even shorter supply than genius.</p>`
    ]
  },
  {
    id: "6",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverImage: "/images/books/sapiens.jpg",
    price: 27.99,
    category: "History",
    description: "A brief history of humankind. Sapiens spans the whole of human history, from the very first humans to walk the earth to the radical breakthroughs of the cognitive revolution.",
    previewPages: [
      `<h1>Part One: The Cognitive Revolution</h1>
      <p>About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. The story of these fundamental features of our universe is called physics.</p>
      <p>About 300,000 years after their appearance, matter and energy started to coalesce into complex structures, called atoms, which then combined into molecules. The story of atoms, molecules and their interactions is called chemistry.</p>
      <p>About 3.8 billion years ago, on a planet called Earth, certain molecules combined to form particularly large and intricate structures called organisms. The story of organisms is called biology.</p>`,

      `<h1>Chapter 1: An Animal of No Significance</h1>
      <p>Humans first evolved in East Africa about 2.5 million years ago from an earlier genus of apes called Australopithecus, which means 'Southern Ape'. About 2 million years ago, some of these archaic men and women left their homeland to journey through and settle vast areas of North Africa, Europe and Asia. Since survival in the snowy forests of northern Europe required different traits than those needed to stay alive in Indonesia's steaming jungles, human populations evolved in different directions. The result was several distinct species, to each of which scientists have assigned a pompous Latin name.</p>`
    ]
  },
];

export default function BooksPage() {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<BookFilters>({
    category: "all",
    priceRange: "all",
    sortBy: "newest"
  });

  // Extract unique categories from books
  const categories = Array.from(new Set(books.map(book => book.category)));

  // Handle search and filtering
  const handleSearch = useCallback((query: string, filters: BookFilters) => {
    setSearchQuery(query);
    setActiveFilters(filters);

    let results = [...books];

    // Filter by search query
    if (query) {
      const searchTerms = query.toLowerCase().split(" ");
      results = results.filter(book => {
        const searchableText = `${book.title} ${book.author} ${book.description} ${book.category}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Filter by category
    if (filters.category !== "all") {
      results = results.filter(book =>
        book.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under-10":
          results = results.filter(book => book.price < 10);
          break;
        case "10-20":
          results = results.filter(book => book.price >= 10 && book.price <= 20);
          break;
        case "20-30":
          results = results.filter(book => book.price > 20 && book.price <= 30);
          break;
        case "over-30":
          results = results.filter(book => book.price > 30);
          break;
      }
    }

    // Sort results
    switch (filters.sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      // For "newest", we'll use the default order (assuming it's already sorted by newest)
    }

    setFilteredBooks(results);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 hero-gradient">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl uppercase glow-text">
              Premium Books Collection
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[700px]">
              Explore our curated collection of premium books. Purchase individually or subscribe for unlimited access.
            </p>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl uppercase">
              Available Books
            </h2>
            <p className="text-muted-foreground mt-2">
              Each book can be purchased individually or accessed through our subscription plans.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <BookSearch onSearch={handleSearch} categories={categories} />
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium mb-2">No books found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>

          {/* Search Results Summary */}
          {searchQuery && (
            <div className="mt-4 text-sm text-muted-foreground">
              Found {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
              {searchQuery ? ` for "${searchQuery}"` : ''}
              {activeFilters.category !== 'all' ? ` in ${activeFilters.category}` : ''}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl uppercase">
              Get Unlimited Access
            </h2>
            <p className="text-muted-foreground text-lg max-w-[700px]">
              Subscribe to our premium plan and get unlimited access to all books and summaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button className="bg-primary text-primary-foreground glow-border">
                View Subscription Plans
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
