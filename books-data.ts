import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";
import book5 from "@/assets/book-5.jpg";
import book6 from "@/assets/book-6.jpg";
import book7 from "@/assets/book-7.jpg";
import book8 from "@/assets/book-8.jpg";

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  cover: string;
  description: string;
  featured?: boolean;
  bestseller?: boolean;
};

export const categories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Sci-Fi",
  "Romance",
  "Business",
  "Biography",
  "Adventure",
] as const;

export const books: Book[] = [
  { id: "1", title: "The Midnight Library", author: "Matt Haig", price: 18.99, rating: 4.7, reviews: 1243, category: "Fiction", cover: book1, description: "Between life and death there is a library, and within that library, the shelves go on forever.", featured: true, bestseller: true },
  { id: "2", title: "Atomic Habits", author: "James Clear", price: 22.5, rating: 4.9, reviews: 8421, category: "Non-Fiction", cover: book8, description: "Tiny changes, remarkable results. An easy & proven way to build good habits.", featured: true, bestseller: true },
  { id: "3", title: "Project Hail Mary", author: "Andy Weir", price: 24.0, rating: 4.8, reviews: 5210, category: "Sci-Fi", cover: book6, description: "A lone astronaut must save humanity from extinction.", featured: true },
  { id: "4", title: "Beach Read", author: "Emily Henry", price: 15.99, rating: 4.5, reviews: 3120, category: "Romance", cover: book5, description: "A romance writer who no longer believes in love and a literary writer stuck in a rut.", featured: true },
  { id: "5", title: "Sapiens", author: "Yuval Noah Harari", price: 19.99, rating: 4.6, reviews: 9842, category: "Non-Fiction", cover: book2, description: "A brief history of humankind." },
  { id: "6", title: "Wild", author: "Cheryl Strayed", price: 16.5, rating: 4.4, reviews: 2210, category: "Adventure", cover: book7, description: "From lost to found on the Pacific Crest Trail." },
  { id: "7", title: "Normal People", author: "Sally Rooney", price: 14.99, rating: 4.3, reviews: 1820, category: "Fiction", cover: book3, description: "A story of mutual fascination, friendship and love." },
  { id: "8", title: "The Alchemist", author: "Paulo Coelho", price: 12.99, rating: 4.7, reviews: 12500, category: "Fiction", cover: book4, description: "A magical story about following your dreams.", bestseller: true },
  { id: "9", title: "Dune", author: "Frank Herbert", price: 21.0, rating: 4.8, reviews: 7200, category: "Sci-Fi", cover: book1, description: "The epic that launched a thousand worlds." },
  { id: "10", title: "Becoming", author: "Michelle Obama", price: 23.5, rating: 4.9, reviews: 6320, category: "Biography", cover: book8, description: "An intimate, powerful, and inspiring memoir." },
  { id: "11", title: "Zero to One", author: "Peter Thiel", price: 17.99, rating: 4.5, reviews: 2950, category: "Business", cover: book2, description: "Notes on startups, or how to build the future." },
  { id: "12", title: "It Ends with Us", author: "Colleen Hoover", price: 13.99, rating: 4.6, reviews: 8800, category: "Romance", cover: book5, description: "A heart-wrenching novel about love, family, and resilience." },
];

export const testimonials = [
  { name: "Sarah Chen", role: "Avid Reader", quote: "BookNest has completely changed how I discover new books. The recommendations are spot-on.", avatar: "SC" },
  { name: "Marcus Reid", role: "Author", quote: "A beautifully crafted experience. It feels like wandering into a curated bookstore at midnight.", avatar: "MR" },
  { name: "Priya Patel", role: "Book Club Lead", quote: "Fast shipping, fair prices, and the wishlist feature is a game changer for our monthly picks.", avatar: "PP" },
];
