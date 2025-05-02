import { MainLayout } from "@/components/main-layout";
import { BookCard } from "@/components/book-card";
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
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/images/books/atomic-habits.jpg",
    price: 24.99,
    category: "Self-Improvement",
    description: "An easy and proven way to build good habits and break bad ones. Atomic Habits offers a proven framework for improving every day through tiny changes in behavior.",
  },
  {
    id: "3",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "/images/books/deep-work.jpg",
    price: 22.99,
    category: "Productivity",
    description: "Rules for focused success in a distracted world. Deep Work is an indispensable guide to anyone seeking focused success in a distracted world.",
  },
  {
    id: "4",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "/images/books/thinking-fast-slow.jpg",
    price: 29.99,
    category: "Psychology",
    description: "A groundbreaking tour of the mind explaining the two systems that drive the way we think—System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
  },
  {
    id: "5",
    title: "Zero to One",
    author: "Peter Thiel",
    coverImage: "/images/books/zero-to-one.jpg",
    price: 21.99,
    category: "Business",
    description: "Notes on startups, or how to build the future. Zero to One presents at once an optimistic view of the future of progress in America and a new way of thinking about innovation.",
  },
  {
    id: "6",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverImage: "/images/books/sapiens.jpg",
    price: 27.99,
    category: "History",
    description: "A brief history of humankind. Sapiens spans the whole of human history, from the very first humans to walk the earth to the radical breakthroughs of the cognitive revolution.",
  },
];

export default function BooksPage() {
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

          {/* Filter/Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm">
                All Categories
              </Button>
              <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm">
                Business
              </Button>
              <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm">
                Psychology
              </Button>
              <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm">
                Self-Improvement
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="bg-background border rounded-md px-2 py-1 text-sm">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
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
