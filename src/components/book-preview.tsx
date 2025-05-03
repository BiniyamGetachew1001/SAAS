"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookPreviewProps {
  book: {
    title: string;
    author: string;
    coverImage: string;
    previewPages?: string[];
  };
  trigger?: React.ReactNode;
}

export function BookPreview({ book, trigger }: BookPreviewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const hasPreview = book.previewPages && book.previewPages.length > 0;

  const nextPage = () => {
    if (hasPreview && currentPage < book.previewPages!.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Preview Book
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>by {book.author}</DialogDescription>
        </DialogHeader>

        {hasPreview ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-full aspect-[3/4] max-w-[500px] mx-auto border border-border rounded-md overflow-hidden">
              {book.previewPages && book.previewPages[currentPage] ? (
                <div className="w-full h-full p-6 bg-card text-card-foreground overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: book.previewPages[currentPage] }} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Preview not available</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between w-full max-w-[500px]">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {book.previewPages?.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={!hasPreview || currentPage === book.previewPages!.length - 1}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-full max-w-[200px] aspect-[2/3] mb-4">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x600/3a3a3a/FFFFFF?text=" + encodeURIComponent(book.title);
                }}
              />
            </div>
            <p className="text-center text-muted-foreground">
              Preview not available for this book.
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" type="button" onClick={() => setCurrentPage(0)}>
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
