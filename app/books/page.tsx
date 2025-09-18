"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Search, Filter, ShoppingBag, ArrowLeft, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/Logo"



const swahiliBooks = [
  {
    id: 1,
    title: "Kiswahili Sekondari",
    author: "Prof. Mwalimu Nyerere",
    price: "TSh 15,000",
    originalPrice: "TSh 20,000",
    rating: 4.8,
    reviews: 124,
    level: "Secondary",
    language: "swahili",
    image: "/placeholder.svg?height=300&width=200&text=Kiswahili+Sekondari",
    description: "Comprehensive Kiswahili textbook for secondary school students",
  },
  {
    id: 2,
    title: "Fasihi ya Kiswahili",
    author: "Dkt. Amina Hassan",
    price: "TSh 12,000",
    originalPrice: "TSh 16,000",
    rating: 4.9,
    reviews: 89,
    level: "Advanced",
    language: "swahili",
    image: "/placeholder.svg?height=300&width=200&text=Fasihi+ya+Kiswahili",
    description: "Explore the rich world of Swahili literature and poetry",
  },
  {
    id: 3,
    title: "Sarufi ya Kiswahili",
    author: "Mwalimu Juma Bakari",
    price: "TSh 10,000",
    originalPrice: "TSh 14,000",
    rating: 4.7,
    reviews: 156,
    level: "Intermediate",
    language: "swahili",
    image: "/placeholder.svg?height=300&width=200&text=Sarufi+ya+Kiswahili",
    description: "Master Swahili grammar with practical examples and exercises",
  },
  {
    id: 4,
    title: "Kiswahili Kwa Watoto",
    author: "Bi. Fatuma Mwangi",
    price: "TSh 8,000",
    originalPrice: "TSh 12,000",
    rating: 4.6,
    reviews: 203,
    level: "Primary",
    language: "swahili",
    image: "/placeholder.svg?height=300&width=200&text=Kiswahili+Kwa+Watoto",
    description: "Fun and engaging Swahili learning book for children",
  },
  {
    id: 5,
    title: "Methali za Kiswahili",
    author: "Mzee Abdallah Salim",
    price: "TSh 9,000",
    originalPrice: "TSh 13,000",
    rating: 4.8,
    reviews: 78,
    level: "Cultural",
    language: "swahili",
    image: "/placeholder.svg?height=300&width=200&text=Methali+za+Kiswahili",
    description: "Collection of traditional Swahili proverbs and their meanings",
  },
  {
    id: 6,
    title: "Insha za Kiswahili",
    author: "Dkt. Mwangi Kiprotich",
    price: "TSh 11,000",
    originalPrice: "TSh 15,000",
    rating: 4.5,
    reviews: 92,
    level: "Secondary",
    language: "swahili",
    image: "/placeholder.svg?height=300&width=200&text=Insha+za+Kiswahili",
    description: "Improve your Swahili essay writing skills",
  },
]

const englishBooks = [
  {
    id: 7,
    title: "English Grammar in Use",
    author: "Raymond Murphy",
    price: "TSh 25,000",
    originalPrice: "TSh 30,000",
    rating: 4.9,
    reviews: 342,
    level: "Intermediate",
    language: "english",
    image: "/placeholder.svg?height=300&width=200&text=English+Grammar+in+Use",
    description: "The world's best-selling grammar book for intermediate learners",
  },
  {
    id: 8,
    title: "Oxford English Dictionary",
    author: "Oxford University Press",
    price: "TSh 35,000",
    originalPrice: "TSh 45,000",
    rating: 4.8,
    reviews: 156,
    level: "Reference",
    language: "english",
    image: "/placeholder.svg?height=300&width=200&text=Oxford+English+Dictionary",
    description: "Comprehensive English dictionary with detailed definitions",
  },
  {
    id: 9,
    title: "English Literature Classics",
    author: "William Shakespeare",
    price: "TSh 20,000",
    originalPrice: "TSh 28,000",
    rating: 4.7,
    reviews: 289,
    level: "Advanced",
    language: "english",
    image: "/placeholder.svg?height=300&width=200&text=English+Literature+Classics",
    description: "Collection of classic English literature works",
  },
  {
    id: 10,
    title: "English for Beginners",
    author: "Sarah Johnson",
    price: "TSh 15,000",
    originalPrice: "TSh 20,000",
    rating: 4.6,
    reviews: 198,
    level: "Beginner",
    language: "english",
    image: "/placeholder.svg?height=200&width=150&text=English+for+Beginners",
    description: "Perfect starting point for English language learners",
  },
  {
    id: 11,
    title: "Business English Communication",
    author: "Michael Brown",
    price: "TSh 22,000",
    originalPrice: "TSh 30,000",
    rating: 4.8,
    reviews: 134,
    level: "Professional",
    language: "english",
    image: "/placeholder.svg?height=300&width=200&text=Business+English+Communication",
    description: "Master professional English for business environments",
  },
  {
    id: 12,
    title: "English Pronunciation Guide",
    author: "Dr. Emily Watson",
    price: "TSh 18,000",
    originalPrice: "TSh 24,000",
    rating: 4.5,
    reviews: 167,
    level: "Intermediate",
    language: "english",
    image: "/placeholder.svg?height=300&width=200&text=English+Pronunciation+Guide",
    description: "Improve your English pronunciation with audio examples",
  },
   
]

const allBooks = [...swahiliBooks, ...englishBooks]
interface UserData { name: string; email: string; phone: string; photo_url?: string; }

export default function BooksPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [activeTab, setActiveTab] = useState("all")

  const getFilteredBooks = (language: string) => {
    let books = language === "all" ? allBooks : allBooks.filter((book) => book.language === language)

    books = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = selectedLevel === "all" || book.level.toLowerCase() === selectedLevel.toLowerCase()
      return matchesSearch && matchesLevel
    })

    return books.sort((a, b) => {
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
  }

  const BookCard = ({ book }: { book: (typeof allBooks)[0] }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
          <Image
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <Badge
          className={`absolute top-2 left-2 text-white ${book.language === "swahili" ? "bg-green-600" : "bg-blue-600"}`}
        >
          {book.level}
        </Badge>
        {book.originalPrice !== book.price && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">Sale</Badge>
        )}
        <Badge
          className={`absolute bottom-2 left-2 text-white text-xs ${book.language === "swahili" ? "bg-green-700" : "bg-blue-700"}`}
        >
          {book.language === "swahili" ? "Kiswahili" : "English"}
        </Badge>
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

        <Button
          className={`w-full text-white ${book.language === "swahili" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Buy Now
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 font-medium">
                Home
              </Link> 
              <Link href="/about" className="text-gray-700 hover:text-yellow-600 font-medium">
                About us
              </Link>
              <Link href="/books" className="text-yellow-600 font-medium">
                Books
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-yellow-600 font-medium">
                Gallery
              </Link>
                <Link href="/donate" className="text-gray-700 hover:text-yellow-600 font-medium">
                Donate
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-yellow-600 font-medium">
                Contact
              </Link>       
            </div>
             <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {user && (<Avatar><AvatarImage src={user.photo_url || "/placeholder-user.jpg"} alt={user.name} /><AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'JD'}</AvatarFallback></Avatar>)}
                  <Button asChild className="bg-green-600 hover:bg-green-700 text-white"><Link href="/dashboard">Go to Dashboard</Link></Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild><Link href="/login">Sign In</Link></Button>
                  <Button asChild className="bg-green-600 hover:bg-green-700 text-white"><Link href="/register">Get Started</Link></Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-4">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Educational Books Store</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Browse our complete collection of Swahili and English educational books
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
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="test prep">Test Prep</SelectItem>
                <SelectItem value="reference">Reference</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
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

        {/* Language Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all" className="text-lg">
              All Books ({allBooks.length})
            </TabsTrigger>
            <TabsTrigger value="swahili" className="text-lg">
              Kiswahili ({swahiliBooks.length})
            </TabsTrigger>
            <TabsTrigger value="english" className="text-lg">
              English ({englishBooks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredBooks("all").map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swahili">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredBooks("swahili").map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="english">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredBooks("english").map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {getFilteredBooks(activeTab).length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div><Link href="/" className="flex items-center space-x-2"><div className="w-10 h-10 bg-green-0 rounded-lg flex items-center justify-center"><img src="/images/kasomelogo.svg" alt="Kasome Logo" /></div><span className="text-2xl font-bold text-white">Kasome</span></Link><p className="text-gray-400 mt-4">Empowering students across Tanzania with quality online education.</p></div>
                  <div><h3 className="text-lg font-semibold mb-4">Courses</h3><ul className="space-y-2 text-gray-400"><li><Link href="/">Mathematics</Link></li><li><Link href="/courses/science">Science</Link></li><li><Link href="/">Languages</Link></li><li><Link href="/">Technology</Link></li></ul></div>
                  <div><h3 className="text-lg font-semibold mb-4">Support</h3><ul className="space-y-2 text-gray-400"><li><Link href="/contact">Help Center</Link></li><li><Link href="/contact">Contact Us</Link></li><li><Link href="/">FAQ</Link></li><li><Link href="/">Community</Link></li></ul></div>
                  <div><h3 className="text-lg font-semibold mb-4">Company</h3><ul className="space-y-2 text-gray-400"><li><Link href="/about">About Us</Link></li><li><Link href="/">Careers</Link></li><li><Link href="/privacy">Privacy Policy</Link></li><li><Link href="/">Terms of Service</Link></li></ul></div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"><p>&copy; {new Date().getFullYear()} Kasome. All rights reserved.</p></div>
              </div>
            </footer>
    </div>
  )
}
