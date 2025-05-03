"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookPreview } from "@/components/book-preview";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  category: string;
  description: string;
  previewPages?: string[];
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className="overflow-hidden flex flex-col h-full border transition-shadow duration-200 hover:shadow-md"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <div className="absolute top-2 right-2 z-20">
            <span className="inline-block bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md">
              ${book.price.toFixed(2)}
            </span>
          </div>
          {book.coverImage ? (
            <div className="relative w-full h-full overflow-hidden">
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
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">{book.title}</span>
            </div>
          )}
        </div>
        <CardContent
          className="flex-grow flex flex-col p-4 relative"
        >
          <div className="mb-2">
            <span className="text-xs text-primary/80 uppercase tracking-wider">
              {book.category}
            </span>
          </div>
          <h3 className="font-bold text-lg mb-1 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
          <p className="text-sm line-clamp-3 text-muted-foreground mt-auto">
            {book.description}
          </p>
        </CardContent>
        <CardFooter
          className="p-4 pt-0 flex flex-col sm:flex-row gap-2 relative"
        >
          <Button
            asChild
            className="w-full sm:w-auto bg-primary text-primary-foreground"
          >
            <Link href={`/books/${book.id}`}>
              Purchase
            </Link>
          </Button>
          <BookPreview
            book={book}
            trigger={
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Preview
              </Button>
            }
          />
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Link href={`/books/${book.id}`}>
              Details
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
