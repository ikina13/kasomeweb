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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  ArrowLeft,
  Users,
  BookOpen,
  Award,
  CreditCard,
  Smartphone,
  Tv,
  Wifi,
  Megaphone,
  Target,
  Globe,
  GraduationCap,
} from "lucide-react"
import Logo from "@/components/Logo"
import { useToast } from "@/hooks/use-toast"

const donationBooks = [
  {
    id: 1,
    title: "Internet Access Book",
    price: "$50",
    priceValue: "50",
    description: "Helps connect schools to reliable internet so students can access Kasome freely",
    icon: Wifi,
    impact: "Connects 1 school to internet",
    color: "bg-blue-600",
    image: "/placeholder.svg?height=200&width=150&text=Internet+Access",
  },
  {
    id: 2,
    title: "Awareness & Outreach Book",
    price: "$100",
    priceValue: "100",
    description: "Supports advertising to reach more parents and students across Tanzania",
    icon: Megaphone,
    impact: "Reaches 500+ families",
    color: "bg-green-600",
    image: "/placeholder.svg?height=200&width=150&text=Awareness+Campaign",
  },
  {
    id: 3,
    title: "Smart TV Installation Book",
    price: "$1000",
    priceValue: "1000",
    description: "Contributes to Smart TV installations in public secondary schools",
    icon: Tv,
    impact: "Installs 2 Smart TVs in 1 school",
    color: "bg-yellow-600",
    image: "/placeholder.svg?height=200&width=150&text=Smart+TV+Setup",
  },
]

const customDonationOptions = [
  { value: "25", label: "$25", description: "Basic support contribution" },
  { value: "75", label: "$75", description: "Standard support contribution" },
  { value: "150", label: "$150", description: "Premium support contribution" },
  { value: "500", label: "$500", description: "Generous support contribution" },
  { value: "custom", label: "Custom Amount", description: "Choose your own amount" },
]

const impactStats = [
  { icon: Users, value: "1502+", label: "Students Reached" },
  { icon: GraduationCap, value: "10+", label: "Schools Connected" },
  { icon: Award, value: "85%", label: "Improved Pass Rates" },
]

const initiatives = [
  {
    icon: Megaphone,
    title: "Awareness & Outreach",
    description:
      "Many parents and students are not yet aware of Kasome's solutions. Your donation will help us invest in advertising and awareness campaigns, ensuring that more families across Tanzania know about Kasome and can benefit from our resources.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Tv,
    title: "Smart TVs in Schools",
    description:
      "We plan to distribute two Smart TV screens in each public secondary school, beginning in Dar es Salaam. These screens will allow students to watch Kasome lessons during and after school hours, completely free of charge.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Wifi,
    title: "Internet Access for Schools",
    description:
      "To ensure students can use our video lessons without barriers, we aim to provide internet connectivity to 60 public secondary schools. This will unlock new opportunities for learning, especially for those who cannot afford private tuition.",
    color: "bg-blue-100 text-blue-600",
  },
]

interface UserData { name: string; email: string; phone: string; photo_url?: string; }

export default function DonatePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedBook, setSelectedBook] = useState<(typeof donationBooks)[0] | null>(null)
  const [selectedAmount, setSelectedAmount] = useState("100")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("mobile")
  const [showCustomDonation, setShowCustomDonation] = useState(false)
  const { toast } = useToast()

  const handlePurchase = () => {
    let amount = ""
    let itemName = ""

    if (selectedBook) {
      amount = selectedBook.priceValue
      itemName = selectedBook.title
    } else if (showCustomDonation) {
      amount = selectedAmount === "custom" ? customAmount : selectedAmount
      itemName = "Custom Donation"
    }

    if (!amount) {
      toast({
        title: "Missing Information",
        description: "Please select a donation option and amount.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Thank You for Your Support!",
      description: `Your donation of $${amount} for "${itemName}" has been processed. You'll receive a confirmation email shortly with your impact report.`,
    })

    // Reset form
    setSelectedBook(null)
    setSelectedAmount("100")
    setCustomAmount("")
    setShowCustomDonation(false)
  }

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
              <Link href="/books" className="text-gray-700 hover:text-yellow-600 font-medium">
                Books
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-yellow-600 font-medium">
                Gallery
              </Link>
                <Link href="/donate" className="text-yellow-700">
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


      {/* Hero Section */}
      <div className="relative py-20 bg-green-700">
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("data:' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Crect width='11' height='4' rx='2'/%3E%3Crect x='15' y='0' width='11' height='4' rx='2'/%3E%3Crect x='30' y='0' width='11' height='4' rx='2'/%3E%3Crect x='45' y='0' width='11' height='4' rx='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Support Kasome – Donate Today</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            At Kasome, we believe every student deserves a fair chance to succeed. Yet, thousands of students across
            Tanzania struggle to access quality education due to a shortage of teachers, limited resources, and the high
            cost of tuition centers.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Making Education Accessible</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            By supporting Kasome, you are helping us make secondary education more accessible and effective for millions
            of children. Our video learning library connects students to Tanzania's best teachers—anytime and
            anywhere—through easy-to-understand online lessons.
          </p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact So Far</h2>
            <p className="text-xl text-gray-600">See how your donations are making a difference</p>
          </div>
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

      {/* How Your Donation Helps */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Your Donation Helps</h2>
            <p className="text-xl text-gray-600">Your contributions will directly support three major initiatives</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${initiative.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <initiative.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{initiative.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{initiative.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Donate Through Books Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Donate Through Books 📚</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've made giving simple, relatable, and impactful. You can "buy books" at different price points as your
              donation. Each "book" represents a step toward transforming education in Tanzania.
            </p>
          </div>

          {!selectedBook && !showCustomDonation ? (
            // Book Selection Grid
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {donationBooks.map((book) => (
                  <Card
                    key={book.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => setSelectedBook(book)}
                  >
                    <div className="relative">
                      <Image
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div
                        className={`absolute top-4 right-4 ${book.color} text-white px-3 py-1 rounded-full font-bold`}
                      >
                        {book.price}
                      </div>
                      <div
                        className={`absolute top-4 left-4 w-12 h-12 ${book.color} rounded-full flex items-center justify-center`}
                      >
                        <book.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3">{book.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{book.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {book.impact}
                        </Badge>
                      </div>
                      <Button className={`w-full ${book.color} hover:opacity-90 text-white`}>
                        <Heart className="mr-2 h-4 w-4" />
                        Donate {book.price}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Custom Donation Option */}
              <div className="text-center">
                <div className="inline-block bg-white rounded-lg p-8 shadow-lg">
                  <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Own Amount</h3>
                  <p className="text-gray-600 mb-6">
                    Want to contribute a different amount? Create your custom donation to support our mission.
                  </p>
                  <Button
                    onClick={() => setShowCustomDonation(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Custom Donation
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Donation Form
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedBook(null)
                    setShowCustomDonation(false)
                  }}
                  className="text-green-600 hover:text-green-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Choose Different Option
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Selected Option Display */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {selectedBook ? (
                        <>
                          <selectedBook.icon className="h-6 w-6 text-green-600 mr-2" />
                          Selected Donation Book
                        </>
                      ) : (
                        <>
                          <Target className="h-6 w-6 text-green-600 mr-2" />
                          Custom Donation
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedBook ? (
                      <div className="flex space-x-4">
                        <Image
                          src={selectedBook.image || "/placeholder.svg"}
                          alt={selectedBook.title}
                          width={120}
                          height={160}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{selectedBook.title}</h3>
                          <div className="flex space-x-2 mb-3">
                            <Badge className={selectedBook.color}>{selectedBook.price}</Badge>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {selectedBook.impact}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{selectedBook.description}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Custom Donation</h3>
                        <p className="text-gray-600">
                          Choose your own amount to support Kasome's mission of making education accessible to all
                          students in Tanzania.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Donation Amount and Payment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-6 w-6 text-green-600 mr-2" />
                      {selectedBook ? "Confirm Your Donation" : "Choose Your Amount"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!selectedBook && (
                      <RadioGroup value={selectedAmount} onValueChange={setSelectedAmount}>
                        {customDonationOptions.map((amount) => (
                          <div
                            key={amount.value}
                            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                          >
                            <RadioGroupItem value={amount.value} id={amount.value} />
                            <Label htmlFor={amount.value} className="flex-1 cursor-pointer">
                              <div className="font-semibold">{amount.label}</div>
                              <div className="text-sm text-gray-600">{amount.description}</div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {!selectedBook && selectedAmount === "custom" && (
                      <div>
                        <Label htmlFor="customAmount">Custom Amount ($)</Label>
                        <Input
                          id="customAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    )}

                    {/* Payment Method */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value="mobile" id="mobile" />
                          <Label htmlFor="mobile" className="flex items-center cursor-pointer">
                            <Smartphone className="h-5 w-5 mr-2 text-green-600" />
                            Mobile Money (M-Pesa, Tigo Pesa, Airtel Money)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center cursor-pointer">
                            <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                            Credit/Debit Card
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Donation Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Donation Summary</h3>
                      <div className="flex justify-between items-center">
                        <span>Item:</span>
                        <span className="font-medium">{selectedBook ? selectedBook.title : "Custom Donation"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Amount:</span>
                        <span className="font-bold text-green-600">
                          $
                          {selectedBook
                            ? selectedBook.priceValue
                            : selectedAmount === "custom"
                              ? customAmount || "0"
                              : selectedAmount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span>Payment Method:</span>
                        <span className="capitalize">
                          {paymentMethod === "mobile" ? "Mobile Money" : "Credit Card"}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handlePurchase}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                      size="lg"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Complete Donation
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Your donation is secure and will be processed immediately. You'll receive a confirmation email
                      with your impact report.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Impact Message */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-12 w-12 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us in Transforming Education</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Your donation, no matter the size, creates real impact. Together, we can empower students, reduce failure
            rates, and build a brighter future for Tanzania.
          </p>
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-green-800 font-medium">
              Every book you "buy" brings us closer to making quality education accessible for all.
            </p>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories of Impact</h2>
            <p className="text-xl text-gray-600">See how donations are changing lives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <Image src="/placeholder-user.jpg" alt="User" width={48} height={48} className="rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">Amina Hassan</h4>
                    <p className="text-sm text-gray-600">Form 4 Student, Dar es Salaam</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Thanks to the Smart TV in our school, I can now watch lessons from the best teachers in Tanzania. My
                  grades have improved so much!"
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <Image src="/placeholder-user.jpg" alt="User" width={48} height={48} className="rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">John Mwangi</h4>
                    <p className="text-sm text-gray-600">Teacher, Mwanza</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The internet connection has transformed our school. Students can now access quality lessons even when
                  I'm not available. It's incredible!"
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <Image src="/placeholder-user.jpg" alt="User" width={48} height={48} className="rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">Sarah Kimani</h4>
                    <p className="text-sm text-gray-600">Parent, Arusha</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "I learned about Kasome through their awareness campaign. Now my daughter can study with the best
                  teachers without expensive tuition fees."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
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
