import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { BookPreview } from "@/components/book-preview";
import Image from "next/image";
import Link from "next/link";

// Sample book data - in a real app, this would come from a database
const books = [
  {
    id: "1",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverImage: "/images/books/psychology-of-money.jpg",
    price: 19.99,
    category: "Finance",
    description: "Timeless lessons on wealth, greed, and happiness. The Psychology of Money explores how money moves around in an economy and how people handle it in their personal lives.",
    fullDescription: `
      Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.

      Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don't make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.

      In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.
    `,
    publishDate: "September 8, 2020",
    publisher: "Harriman House",
    pages: 256,
    language: "English",
    isbn: "978-0857197689",
    reviews: [
      { id: "r1", rating: 5, reviewer: "John D.", comment: "One of the best books on personal finance I've ever read." },
      { id: "r2", rating: 4, reviewer: "Sarah M.", comment: "Great insights into how psychology affects our financial decisions." }
    ],
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
    fullDescription: `
      No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.

      If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.
    `,
    publishDate: "October 16, 2018",
    publisher: "Avery",
    pages: 320,
    language: "English",
    isbn: "978-0735211292",
    reviews: [
      { id: "r1", rating: 5, reviewer: "Michael T.", comment: "Changed my approach to building habits completely." },
      { id: "r2", rating: 5, reviewer: "Lisa R.", comment: "Practical advice that you can implement immediately." }
    ],
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
  // Additional books would be defined here
];

interface BookPageProps {
  params: {
    id: string;
  };
}

export default function BookPage({ params }: BookPageProps) {
  // Find the book with the matching ID
  const book = books.find((b) => b.id === params.id);

  // If no book is found, show a message
  if (!book) {
    return (
      <MainLayout>
        <div className="container px-4 md:px-6 py-12">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="mb-4">Sorry, the book you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/books">Back to Books</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/books" className="hover:text-primary">Books</Link>
          <span className="mx-2">/</span>
          <span>{book.title}</span>
        </div>

        {/* Book Details */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          {/* Book Cover */}
          <div className="relative aspect-[2/3] w-full max-w-[300px] mx-auto md:mx-0 glass-effect p-2 rounded-lg overflow-hidden">
            <div className="relative w-full h-full overflow-hidden rounded">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x600/3a3a3a/FFFFFF?text=" + encodeURIComponent(book.title);
                }}
              />
            </div>
          </div>

          {/* Book Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider px-2 py-1 rounded bg-primary/10 text-primary">
                  {book.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase glow-text mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-2xl font-bold text-primary">${book.price.toFixed(2)}</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-5 h-5 ${
                        star <= Math.round(
                          book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length
                        )
                          ? "text-primary"
                          : "text-muted"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({book.reviews.length} reviews)
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-primary text-primary-foreground glow-border">
                  Purchase for ${book.price.toFixed(2)}
                </Button>
                <BookPreview book={book} trigger={
                  <Button variant="secondary">
                    Preview Book
                  </Button>
                } />
                <Button variant="outline">
                  Add to Wishlist
                </Button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg mb-4">{book.description}</p>
                <p className="whitespace-pre-line">{book.fullDescription}</p>
              </div>
            </div>

            {/* Book Details Table */}
            <div className="mt-8 mb-8">
              <h3 className="text-xl font-bold mb-4 uppercase">Book Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">Publisher</span>
                    <span className="text-muted-foreground">{book.publisher}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">Publication Date</span>
                    <span className="text-muted-foreground">{book.publishDate}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">Pages</span>
                    <span className="text-muted-foreground">{book.pages}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">Language</span>
                    <span className="text-muted-foreground">{book.language}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">ISBN</span>
                    <span className="text-muted-foreground">{book.isbn}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">Category</span>
                    <span className="text-muted-foreground">{book.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 uppercase">Reviews</h3>
              <div className="space-y-4">
                {book.reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg glass-effect">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{review.reviewer}</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`w-4 h-4 ${star <= review.rating ? "text-primary" : "text-muted"}`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 uppercase">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books
              .filter((b) => b.id !== book.id)
              .slice(0, 4)
              .map((relatedBook) => (
                <Link key={relatedBook.id} href={`/books/${relatedBook.id}`} className="group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg card-hover-effect">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                    <Image
                      src={relatedBook.coverImage}
                      alt={relatedBook.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                      onError={(e) => {
                        // Fallback for missing images
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/400x600/3a3a3a/FFFFFF?text=" + encodeURIComponent(relatedBook.title);
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h3 className="font-bold text-sm line-clamp-1">{relatedBook.title}</h3>
                      <p className="text-xs text-muted-foreground">by {relatedBook.author}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
