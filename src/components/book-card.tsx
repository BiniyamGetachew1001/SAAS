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
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (limited to small angles for subtle effect)
    const rotateXValue = (mouseY / (rect.height / 2)) * -5; // Max 5 degrees
    const rotateYValue = (mouseX / (rect.width / 2)) * 5; // Max 5 degrees

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Disable 3D effect on mobile devices
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setRotateX(0);
      setRotateY(0);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="book-card-wrapper perspective-1000 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={`card-hover-effect overflow-hidden flex flex-col h-full transform-gpu transition-all duration-300 ${isHovered ? 'shadow-xl' : ''}`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <div
            className={`absolute top-2 right-2 z-20 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
            style={{ transform: `translateZ(20px)` }}
          >
            <span className="inline-block bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md backdrop-blur-sm">
              ${book.price.toFixed(2)}
            </span>
          </div>
          {book.coverImage ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className={`object-cover transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x600/3a3a3a/FFFFFF?text=" + encodeURIComponent(book.title);
                }}
              />
              <div className={`absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">{book.title}</span>
            </div>
          )}
        </div>
        <CardContent
          className="flex-grow flex flex-col p-4 relative"
          style={{ transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)' }}
        >
          <div className="mb-2">
            <span className={`text-xs text-primary/80 uppercase tracking-wider transition-all duration-300 ${isHovered ? 'text-primary font-semibold' : ''}`}>
              {book.category}
            </span>
          </div>
          <h3 className={`font-bold text-lg mb-1 line-clamp-1 transition-all duration-300 ${isHovered ? 'text-primary' : ''}`}>
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
          <p className="text-sm line-clamp-3 text-muted-foreground mt-auto">
            {book.description}
          </p>
        </CardContent>
        <CardFooter
          className="p-4 pt-0 flex flex-col sm:flex-row gap-2 relative"
          style={{ transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)' }}
        >
          <Button
            asChild
            className={`w-full sm:w-auto bg-primary text-primary-foreground transition-all duration-300 ${isHovered ? 'shadow-lg scale-105' : ''}`}
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
                className={`w-full sm:w-auto transition-all duration-300 ${isHovered ? 'shadow-md' : ''}`}
              >
                Preview
              </Button>
            }
          />
          <Button
            asChild
            variant="outline"
            className={`w-full sm:w-auto transition-all duration-300 ${isHovered ? 'bg-background/80' : ''}`}
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
