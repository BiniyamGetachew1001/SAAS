"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface BookSearchProps {
  onSearch: (query: string, filters: BookFilters) => void;
  categories: string[];
}

export interface BookFilters {
  category: string;
  priceRange: string;
  sortBy: string;
}

export function BookSearch({ onSearch, categories }: BookSearchProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<BookFilters>({
    category: "all",
    priceRange: "all",
    sortBy: "newest"
  });

  // Apply search when filters change
  useEffect(() => {
    onSearch(query, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = (key: keyof BookFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      sortBy: "newest"
    });
    setQuery("");
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSearch} className="flex w-full gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search books by title, author, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </form>

      {showFilters && (
        <div className="rounded-lg border p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 text-xs"
            >
              Reset
              <X className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Select
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange("priceRange", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-10">Under $10</SelectItem>
                  <SelectItem value="10-20">$10 - $20</SelectItem>
                  <SelectItem value="20-30">$20 - $30</SelectItem>
                  <SelectItem value="over-30">Over $30</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="title-asc">Title: A-Z</SelectItem>
                  <SelectItem value="title-desc">Title: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
