"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users,
  GraduationCap,
  School,
  Award,
  Heart,
  Laptop,
  Menu,
  Home,
  LayoutGrid,
  User,
  Image as ImageIcon,
  Mail,
} from "lucide-react"
import Logo from "@/components/Logo"

interface GalleryImage {
  id: number
  src: string
  title: string
  category: string
  description: string
}

const categories = [
  { id: "all", name: "All Photos", icon: Camera },
  { id: "education", name: "Education", icon: BookOpen },
  { id: "schools", name: "Schools", icon: School },
  { id: "success", name: "Success", icon: Award },
  { id: "community", name: "Community", icon: Heart },
  { id: "training", name: "Training", icon: Users },
]

const partners = [
    { name: "Ministry of Education", logo: "/images/partner1.png" },{ name: "Ford Foundation", logo: "/images/partner3.png" }, { name: "UKaid", logo: "/images/partner2.png" }, { name: "USAID", logo: "/images/partner4.jpeg" }, { name: "Zuku", logo: "/images/partner5.png" },{ name: "upendo", logo: "/images/partner6.png" },
]

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/about1.jpg",
    title: "Students Engaged in Learning",
    category: "education",
    description: "Secondary school students actively participating in Kasome video lessons during class time.",
  },
  {
    id: 2,
    src: "/images/about2.jpg",
    title: "Professional Content Creation",
    category: "content",
    description: "Expert teachers recording high-quality educational content for the Kasome platform.",
  },
  {
    id: 3,
    src: "/images/about3.jpg",
    title: "Mobile Learning Access",
    category: "technology",
    description: "Students accessing Kasome lessons on their mobile devices anywhere, anytime.",
  },
  {
    id: 4,
    src: "/images/cover.jpg",
    title: "School Partnership Program",
    category: "schools",
    description: "Kasome team visiting partner schools to implement Smart TV learning solutions.",
  },
  {
    id: 5,
    src: "/images/student1.jpg",
    title: "Student Success Celebration",
    category: "success",
    description: "Celebrating improved exam results from students using Kasome educational resources.",
  },
  {
    id: 6,
    src: "/images/student2.jpg",
    title: "Community Outreach",
    category: "community",
    description: "Kasome team engaging with local communities to promote educational awareness.",
  },
  {
    id: 7,
    src: "/images/student3.jpg",
    title: "Teacher Training Workshop",
    category: "training",
    description: "Training sessions for educators on integrating technology in classroom teaching.",
  },
  
 
]


interface UserData { name: string; email: string; phone: string; photo_url?: string; }
export default function GalleryPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const handleSidebarClick = () => { setIsSidebarOpen(false) }

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentImageIndex(filteredImages.findIndex((img) => img.id === image.id))
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1
      setCurrentImageIndex(newIndex)
      setSelectedImage(filteredImages[newIndex])
    } else {
      const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0
      setCurrentImageIndex(newIndex)
      setSelectedImage(filteredImages[newIndex])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <Logo />
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg"
            onClick={handleSidebarClick}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg"
            onClick={handleSidebarClick}
          >
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg"
            onClick={handleSidebarClick}
          >
            <User className="h-5 w-5" />
            About us
          </Link>
          <Link
            href="/books"
            className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg"
            onClick={handleSidebarClick}
          >
            <BookOpen className="h-5 w-5" />
            Books
          </Link>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-green-700 font-semibold bg-green-50 px-4 py-2 rounded-lg"
            onClick={handleSidebarClick}
          >
            <ImageIcon className="h-5 w-5" />
            Gallery
          </Link>
          <Link
            href="/donate"
            className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg"
            onClick={handleSidebarClick}
          >
            <Heart className="h-5 w-5" />
            Donate
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg"
            onClick={handleSidebarClick}
          >
            <Mail className="h-5 w-5" />
            Contact
          </Link>
        </div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggleSidebar} />}


      {/* Header */}
       <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              <Logo />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
                Home
              </Link> 
              <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium">
                About us
              </Link>
              <Link href="/books" className="text-gray-700  hover:text-green-600 font-mediumfont-medium">
                Books
              </Link>
              <Link href="/gallery" className="text-green-700 font-medium border-b-2 border-green-700">
                Gallery
              </Link>
                <Link href="/donate" className="text-gray-700 hover:text-green-600 font-medium">
                Donate
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium">
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
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800"
          style={{
            backgroundImage: `url("")`,
            backgroundSize: "60px 60px",
          }}
        >
          
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-4">
              <Camera className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Kasome Gallery</h1>
          <p className="text-xl text-white text-opacity-90 leading-relaxed mb-8">
            Discover the impact of education transformation across Tanzania through our visual journey
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white bg-opacity-20 text-white border-white">
              <Camera className="h-4 w-4 mr-2" />
              {galleryImages.length} Photos
            </Badge>
            <Badge className="bg-white bg-opacity-20 text-white border-white">
              <BookOpen className="h-4 w-4 mr-2" />6 Categories
            </Badge>
            <Badge className="bg-white bg-opacity-20 text-white border-white">
              <Users className="h-4 w-4 mr-2" />
              1502+ Students
            </Badge>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full transition-all font-medium ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                <category.icon className="h-5 w-5 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - 2x2 Layout for Big Images */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white"
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                      <Camera className="h-8 w-8 text-gray-800" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 text-sm font-medium">
                    {categories.find((cat) => cat.id === image.category)?.name}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Full Screen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 transition-all duration-200"
            >
              <X className="h-8 w-8 text-white" />
            </button>

            {/* Navigation Arrows */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 transition-all duration-200"
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </button>
                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 transition-all duration-200"
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="w-full h-full flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden max-w-6xl max-h-[90vh]">
              {/* Image Section - Takes most space */}
              <div className="flex-1 flex items-center justify-center bg-gray-100 min-h-0">
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Info Panel - Compact side panel */}
              <div className="lg:w-80 p-6 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-green-100 text-green-800 px-3 py-1">
                      {categories.find((cat) => cat.id === selectedImage.category)?.name}
                    </Badge>
                    <span className="text-sm text-gray-500 font-medium">
                      {currentImageIndex + 1} of {filteredImages.length}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedImage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedImage.description}</p>
                </div>

                {/* Navigation Buttons */}
                {filteredImages.length > 1 && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateImage("prev")}
                        className="flex-1 hover:bg-green-50 hover:border-green-300"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateImage("next")}
                        className="flex-1 hover:bg-green-50 hover:border-green-300"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Trusted Partners */}
      <section className="py-16 bg-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-xl text-gray-600">Working together to transform education</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-12 w-auto hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

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
