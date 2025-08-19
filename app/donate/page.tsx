"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ArrowLeft,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  CreditCard,
  Smartphone,
  ShoppingCart,
} from "lucide-react"
import Logo from "@/components/Logo"
import { useToast } from "@/hooks/use-toast"

const books = [
  { id: 1, title: "Kiswahili Sekondari - Kidato cha Kwanza", author: "Mwalimu Juma", category: "Swahili", level: "Form 1", image: "/images/book1.webp", description: "Comprehensive Kiswahili textbook for Form 1 students" },
  { id: 2, title: "English Grammar Essentials", author: "Sarah Johnson", category: "English", level: "Form 2", image: "/images/book2.jpeg", description: "Essential English grammar guide for secondary students" },
  { id: 3, title: "Hadithi za Kiswahili", author: "Bi. Amina", category: "Swahili", level: "Form 3", image: "/images/book3.jpeg", description: "Collection of Swahili stories and literature" },
  { id: 4, title: "Advanced English Literature", author: "Dr. Michael Brown", category: "English", level: "Form 4", image: "/images/book4.jpg", description: "Advanced English literature for Form 4 students" },
  { id: 5, title: "Utungaji wa Kiswahili", author: "Prof. Hassan Mwalimu", category: "Swahili", level: "Form 5", image: "/images/book5.jpg", description: "Creative writing in Kiswahili for advanced students" },
  { id: 6, title: "English Communication Skills", author: "Jane Smith", category: "English", level: "Form 6", image: "/images/book6.jpeg", description: "Professional communication skills in English" },
]

const donationAmounts = [
  { value: "100", label: "TSh 100", description: "Basic support contribution" },
  { value: "500", label: "TSh 500", description: "Standard support contribution" },
  { value: "1000", label: "TSh 1,000", description: "Premium support contribution" },
  { value: "2000", label: "TSh 2,000", description: "Generous support contribution" },
  { value: "custom", label: "Custom Amount", description: "Choose your own amount" },
]

const impactStats = [
  { icon: Users, value: "2,500+", label: "Books Purchased" },
  { icon: BookOpen, value: "15,000+", label: "Students Reached" },
  { icon: Award, value: "95%", label: "Satisfaction Rate" },
]

export default function DonatePage() {
  const [selectedBook, setSelectedBook] = useState<(typeof books)[0] | null>(null)
  const [selectedAmount, setSelectedAmount] = useState("1000")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("mobile")
  const { toast } = useToast()

  const handlePurchase = () => {
    const amount = selectedAmount === "custom" ? customAmount : selectedAmount
    if (!selectedBook || !amount) {
      toast({
        title: "Missing Information",
        description: "Please select a book and donation amount.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Thank You for Your Support!",
      description: `Your purchase of "${selectedBook.title}" for TSh ${amount} has been processed. You'll receive your book and confirmation email shortly.`,
    })

    setSelectedBook(null)
    setSelectedAmount("1000")
    setCustomAmount("")
  }

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

      {/* Hero Section -- UPDATED */}
      <div
        className="relative py-20"
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingCart className="h-16 w-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
            Support Education by Purchasing Books
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)]">
            Choose from our collection of educational books and support learning while getting quality content for yourself. Your purchase helps us continue providing educational resources.
          </p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Selection and Purchase Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!selectedBook ? (
          // Book Selection Grid
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose a Book to Support Education</h2>
              <p className="text-xl text-gray-600">
                Select any book from our collection and choose your support amount
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <Card
                  key={book.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedBook(book)}
                >
                  <div className="relative">
                    <Image src={book.image || "/placeholder.svg"} alt={book.title} width={300} height={200} className="w-full h-48 object-cover" />
                    <Badge className={`absolute top-2 left-2 ${book.category === "Swahili" ? "bg-green-600" : "bg-blue-600"} text-white`}>{book.category}</Badge>
                    <Badge className="absolute top-2 right-2 bg-gray-600 text-white">{book.level}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-sm text-gray-500 mb-4">{book.description}</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Heart className="mr-2 h-4 w-4" />
                      Select & Support
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Purchase Form
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setSelectedBook(null)} className="text-green-600 hover:text-green-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Choose Different Book
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Selected Book Display */}
              <Card>
                <CardHeader><CardTitle className="flex items-center"><BookOpen className="h-6 w-6 text-green-600 mr-2" /> Selected Book</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Image src={selectedBook.image || "/placeholder.svg"} alt={selectedBook.title} width={120} height={160} className="rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{selectedBook.title}</h3>
                      <p className="text-gray-600 mb-2">by {selectedBook.author}</p>
                      <div className="flex space-x-2 mb-3">
                        <Badge className={selectedBook.category === "Swahili" ? "bg-green-600" : "bg-blue-600"}>{selectedBook.category}</Badge>
                        <Badge variant="outline">{selectedBook.level}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{selectedBook.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Amount and Payment */}
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Heart className="h-6 w-6 text-green-600 mr-2" /> Choose Your Support Amount</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={selectedAmount} onValueChange={setSelectedAmount}>
                    {donationAmounts.map((amount) => (
                      <div key={amount.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={amount.value} id={amount.value} />
                        <Label htmlFor={amount.value} className="flex-1 cursor-pointer">
                          <div className="font-semibold">{amount.label}</div>
                          <div className="text-sm text-gray-600">{amount.description}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {selectedAmount === "custom" && (
                    <div>
                      <Label htmlFor="customAmount">Custom Amount (TSh)</Label>
                      <Input id="customAmount" type="number" placeholder="Enter amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} className="mt-1" />
                    </div>
                  )}

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="mobile" id="mobile" />
                        <Label htmlFor="mobile" className="flex items-center cursor-pointer"><Smartphone className="h-5 w-5 mr-2 text-green-600" /> Mobile Money (M-Pesa, Tigo Pesa, Airtel Money)</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer"><CreditCard className="h-5 w-5 mr-2 text-green-600" /> Credit/Debit Card</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Purchase Summary</h3>
                    <div className="flex justify-between items-center"><span>Book:</span><span className="font-medium">{selectedBook.title}</span></div>
                    <div className="flex justify-between items-center"><span>Support Amount:</span><span className="font-bold text-green-600"> TSh {selectedAmount === "custom" ? customAmount || "0" : selectedAmount}</span></div>
                    <div className="flex justify-between items-center mt-1"><span>Payment Method:</span><span className="capitalize">{paymentMethod === "mobile" ? "Mobile Money" : "Credit Card"}</span></div>
                  </div>

                  <Button onClick={handlePurchase} className="w-full bg-green-600 hover:bg-green-700 text-white py-3" size="lg">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Purchase & Support Education
                  </Button>
                  <p className="text-xs text-gray-500 text-center">Your purchase is secure and will be processed immediately. You'll receive your book access and confirmation email.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      {/* ... Other sections remain unchanged ... */}
    </div>
  )
}