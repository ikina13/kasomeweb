"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Filter, ShoppingCart, ArrowLeft, BookOpen } from "lucide-react"
import Logo from "@/components/Logo"

const englishBooks = [
  { id: 1, title: "English Grammar in Use", author: "Raymond Murphy", price: "TSh 25,000", originalPrice: "TSh 30,000", rating: 4.9, reviews: 342, level: "Intermediate", image: "/images/book5.jpg", description: "The world's best-selling grammar book for intermediate learners", },
  { id: 2, title: "Oxford English Dictionary", author: "Oxford University Press", price: "TSh 35,000", originalPrice: "TSh 45,000", rating: 4.8, reviews: 156, level: "Reference", image: "/images/book6.jpeg", description: "Comprehensive English dictionary with detailed definitions", },
  { id: 3, title: "English Literature Classics", author: "William Shakespeare", price: "TSh 20,000", originalPrice: "TSh 28,000", rating: 4.7, reviews: 289, level: "Advanced", image: "/images/book6.jpeg", description: "Collection of classic English literature works", },
  { id: 4, title: "English for Beginners", author: "Sarah Johnson", price: "TSh 15,000", originalPrice: "TSh 20,000", rating: 4.6, reviews: 198, level: "Beginner", image: "/images/book5.jpg", description: "Perfect starting point for English language learners", },
  { id: 5, title: "Business English Communication", author: "Michael Brown", price: "TSh 22,000", originalPrice: "TSh 30,000", rating: 4.8, reviews: 134, level: "Professional", image: "/images/book6.jpeg", description: "Master professional English for business environments", },
  { id: 6, title: "English Pronunciation Guide", author: "Dr. Emily Watson", price: "TSh 18,000", originalPrice: "TSh 24,000", rating: 4.5, reviews: 167, level: "Intermediate", image: "/images/book6.jpeg", description: "Improve your English pronunciation with audio examples", },
  { id: 7, title: "IELTS Preparation Guide", author: "Cambridge Assessment", price: "TSh 28,000", originalPrice: "TSh 35,000", rating: 4.9, reviews: 245, level: "Test Prep", image: "/images/book6.jpeg", description: "Complete guide for IELTS exam preparation", },
  { id: 8, title: "Creative Writing Workshop", author: "Jane Smith", price: "TSh 19,000", originalPrice: "TSh 26,000", rating: 4.7, reviews: 112, level: "Creative", image: "/images/book5.jpg", description: "Develop your creative writing skills and techniques", },
]

export default function EnglishBooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const filteredBooks = englishBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || book.level.toLowerCase() === selectedLevel.toLowerCase()
    return matchesSearch && matchesLevel
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseInt(a.price.replace(/[^\d]/g, "")) - Number.parseInt(b.price.replace(/[^\d]/g, ""))
      case "price-high":
        return Number.parseInt(b.price.replace(/[^\d]/g, "")) - Number.parseInt(a.price.replace(/[^\d]/g, ""))
      case "rating":
        return b.rating - a.rating
      default:
        return b.reviews - a.reviews
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header -- UPDATED */}
      <div
        className="relative py-16"
        style={{
          backgroundImage: "url('/images/crback.png')",
        //  backgroundSize: 'full',
           backgroundSize: 'auto 100%', 
    
    // This ensures the image starts from the top
    backgroundPosition: 'top center', 
    
    // This will repeat the image vertically if the section is taller than the image
    backgroundRepeat: 'repeat', 
          backgroundColor: "#16a34a", // Fallback color (Tailwind's green-600)
         // backgroundRepeat: 'repeat',
        }}
      >
        {/* This div adds a dark overlay for better text readability */}
        <div className="absolute inset-0  "></div>
        
        {/* Your content needs to be relative to sit on top of the overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">English Books Collection</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Explore our extensive collection of English educational books for all proficiency levels
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="test prep">Test Prep</SelectItem>
                <SelectItem value="reference">Reference</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger><SelectValue placeholder="Sort By" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedBooks.map((book) => (
            <Card
              key={book.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Badge className="absolute top-2 left-2 bg-green-700 text-white">{book.level}</Badge>
                {book.originalPrice !== book.price && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white">Sale</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{book.description}</p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{book.reviews} reviews</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">{book.price}</span>
                    {book.originalPrice !== book.price && (
                      <span className="text-sm text-gray-500 line-through">{book.originalPrice}</span>
                    )}
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}