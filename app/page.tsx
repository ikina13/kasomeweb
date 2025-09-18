"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ShoppingCart,Heart,Users, Award, TrendingUp, Star, ArrowRight, Globe, Clock, Briefcase, Lightbulb, PieChart, PlaySquare, BookCopy, X, ChevronLeft, ChevronRight } from "lucide-react";
import Logo from "@/components/Logo";
import CoursesGrid from "@/components/CoursesGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"

// Import for particles
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ PARTICLES COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function ParticlesComponent() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    style: { position: "absolute" as const, width: "100%", height: "100%" },
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#16a34a" },
      links: { color: "#22c55e", distance: 150, enable: true, opacity: 0.5, width: 1 },
      collisions: { enable: true },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: { default: "bounce" as const },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80,
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" as const },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      // @ts-ignore
      options={particlesOptions}
      init={particlesInit}
    />
  );
}


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ REUSABLE COMPONENTS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
interface NewHeroProps {
  studentImageUrl: string;
  onFreeTrialClick: () => void;
}

const subjects = [
    { name: "Secondary & High school courses", students: "2,300+", rating: 4.7, color: "bg-emerald-500" },
    { name: "English Courses", students: "3,200+", rating: 4.8, color: "bg-orange-500" },
    { name: "Swahili Courses", students: "2,800+", rating: 4.9, color: "bg-red-500" },
    
]

const partners = [
    { name: "Ministry of Education", logo: "/images/partner1.png" },{ name: "Ford Foundation", logo: "/images/partner3.png" }, { name: "UKaid", logo: "/images/partner2.png" }, { name: "USAID", logo: "/images/partner4.jpeg" }, { name: "Zuku", logo: "/images/partner5.png" },{ name: "upendo", logo: "/images/partner6.png" },
]

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
  <Card className="bg-white/80 backdrop-blur-md shadow-lg border-gray-200/50">
    <CardContent className="p-4 flex items-center gap-4">
      {icon}
      <div>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </CardContent>
  </Card>
);

function NewHero({ studentImageUrl, onFreeTrialClick }: NewHeroProps) {
  return (
    <section className="relative w-full bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticlesComponent />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Up Your <span className="text-green-600">Skills</span> To Advance Your <span className="text-green-600">Career Path</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Discover thousands of courses from expert instructors. Build your skills, advance your career, and achieve your goals with our comprehensive online learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" onClick={onFreeTrialClick} className="bg-white/50 border-gray-300 hover:bg-white text-gray-800">
                Get free trial
              </Button>
            </div>
            <div className="mt-12 flex justify-center lg:justify-start items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-yellow-500" /><span>Public Speaking</span></div>
              <div className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-red-500" /><span>Career-Oriented</span></div>
              <div className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-blue-500" /><span>Creative Thinking</span></div>
            </div>
          </div>
          <div className="relative h-96 lg:h-[500px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-green-500 rounded-full blur-2xl opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src={studentImageUrl} alt="Student with books" width={250} height={250} className="object-contain drop-shadow-2xl z-10" priority />
            </div>
            <div className="absolute top-8 left-0 z-20 animate-fade-in-up"><StatCard icon={<PieChart className="h-8 w-8 text-green-600"/>} value="243" label="Online Courses"/></div>
            <div className="absolute top-1/3 right-0 z-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}><StatCard icon={<PlaySquare className="h-8 w-8 text-green-600"/>} value="2250" label="Video Courses"/></div>
            <div className="absolute bottom-8 left-1/4 z-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}><StatCard icon={<BookCopy className="h-8 w-8 text-green-600"/>} value="16" label="Tutors"/></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudentSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const studentImages = [
    { src: "/images/students/student-1.jpg", name: "Amina Yusuf" }, { src: "/images/students/student-2.jpg", name: "John Meli" }, { src: "/images/students/student-3.jpg", name: "Grace Kimaro" }, { src: "/images/students/student-4.jpg", name: "David Mwanri" }, { src: "/images/students/student-5.jpg", name: "Sarah Connor" }, { src: "/images/students/student-6.jpg", name: "Mike Ross" },
  ];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) =>
          prevIndex === studentImages.length - 1 ? 0 : prevIndex + 1
      ), 3000
    );
    return () => {
      resetTimeout();
    };
  }, [currentIndex, studentImages.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? studentImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === studentImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleImageClick = (src: string) => setSelectedImage(src);
  const handleCloseModal = () => setSelectedImage(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the success and dedication of our learners.
          </p>
        </div>
        
        <div
          className="w-full"
          onMouseEnter={resetTimeout}
          onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => 
                setCurrentIndex((prev) => prev === studentImages.length - 1 ? 0 : prev + 1), 
              3000);
          }}
        >
            <div className="relative group">
                <div className="relative h-96 md:h-[600px] w-full overflow-hidden rounded-lg shadow-2xl cursor-pointer" onClick={() => handleImageClick(studentImages[currentIndex].src)}>
                    {studentImages.map((image, index) => (
                        <div key={index} className="absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}>
                            <Image src={image.src} alt={image.name} layout="fill" objectFit="cover" />
                        </div>
                    ))}
                </div>
                <Button variant="ghost" size="icon" onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-4 h-12 w-12 rounded-full bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="h-6 w-6" /></Button>
                <Button variant="ghost" size="icon" onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-4 h-12 w-12 rounded-full bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="h-6 w-6" /></Button>
            </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={handleCloseModal}>
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedImage} alt="Zoomed student view" width={1000} height={1200} className="object-contain max-h-[90vh] rounded-lg shadow-2xl"/>
          </div>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:text-white hover:bg-white/20" onClick={handleCloseModal}><X className="h-8 w-8"/></Button>
        </div>
      )}
    </section>
  );
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ MAIN HOME PAGE COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
interface UserData { name: string; email: string; phone: string; photo_url?: string; }

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const coursesSectionRef = useRef<HTMLElement>(null);

  const handleScrollToCourses = () => {
    coursesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUserData = localStorage.getItem('user_data');
    if (token) {
      setIsLoggedIn(true);
      if (storedUserData) {
        try { setUser(JSON.parse(storedUserData)); } 
        catch (e) {
          console.error("Failed to parse user data", e);
          localStorage.removeItem('user_data');
          localStorage.removeItem('auth_token');
          setIsLoggedIn(false);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About us</Link>
               <Link href="/books" className="text-gray-600 hover:text-gray-900">
                Books
              </Link>
               <Link href="/gallery" className="text-gray-600 hover:text-gray-900">
                Gallery
              </Link>
               <Link href="/donate" className="text-gray-600 hover:text-gray-900">
                Donate
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>

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

      <NewHero studentImageUrl="/images/girl2.png" onFreeTrialClick={handleScrollToCourses} />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Kasome?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We provide the best learning experience with cutting-edge features and expert instructors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6"><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4"><BookOpen className="h-6 w-6 text-green-600" /></div><h3 className="text-xl font-semibold mb-2">Expert Instructors</h3><p className="text-gray-600">Learn from industry professionals.</p></Card>
            <Card className="text-center p-6"><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4"><Globe className="h-6 w-6 text-blue-600" /></div><h3 className="text-xl font-semibold mb-2">Learn Anywhere</h3><p className="text-gray-600">Access courses from any device, anywhere in the world.</p></Card>
            <Card className="text-center p-6"><div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4"><Clock className="h-6 w-6 text-purple-600" /></div><h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3><p className="text-gray-600">Study at your own pace with lifetime access to courses.</p></Card>
            <Card className="text-center p-6"><div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4"><TrendingUp className="h-6 w-6 text-orange-600" /></div><h3 className="text-xl font-semibold mb-2">Track Progress</h3><p className="text-gray-600">Monitor your learning journey.</p></Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Education?</h2>
            <p className="text-xl text-green-100 mb-8">Join thousands of students who are already excelling with Kasome. Start your journey to academic success today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register"><Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 bg-transparent">Contact Us</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What we have</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore many subjects with thousands of satisfied students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                    <div className="flex items-center"><Star className="h-4 w-4 text-yellow-400 fill-current" /><span className="ml-1 text-sm text-gray-600">{subject.rating}</span></div>
                  </div>
                  <CardTitle className="text-xl">{subject.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{subject.students} students</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* Books Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Educational Books</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your learning with our collection of educational books and support students through donations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Swahili Books Card */}
            <Link href="/books/swahili">
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-green-200 hover:border-green-300">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/book2.jpeg"
                    alt="Swahili Books"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-green-600 text-white">Swahili</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <BookOpen className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">Swahili Books</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Discover a wide collection of Swahili educational books.Perfect for learning and
                    improving your Swahili language skills.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">50+ Books Available</span>
                    <div className="flex items-center text-green-600 group-hover:text-green-700">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Shop Now</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* English Books Card */}
            <Link href="/books/english">
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-green-200 hover:border-green-300">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/book5.jpg"
                    alt="English Books"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-green-700 text-white">English</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <BookOpen className="h-6 w-6 text-green-700 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">English Books</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Explore our comprehensive collection of English educational books. From grammar to literature, find
                    everything you need.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">75+ Books Available</span>
                    <div className="flex items-center text-green-700 group-hover:text-green-800">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Shop Now</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Donate Card */}
            <Link href="/donate">
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 hover:border-green-300">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/donate.png"
                    alt="Donate Books"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-green-800 text-white">Donate</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Heart className="h-8 w-8 text-white animate-pulse" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Heart className="h-6 w-6 text-green-800 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">Donate Books</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Help students access quality education by donating books. Your contribution makes a difference in
                    someone's learning journey.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Make an Impact</span>
                    <div className="flex items-center text-green-800 group-hover:text-green-900">
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Donate Now</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section ref={coursesSectionRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Courses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our most popular courses designed to help you succeed.</p>
          </div>
          <CoursesGrid />
        </div>
      </section>
      
      <StudentSlideshow />
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Hear from thousands of students who have transformed their careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6"><div className="flex items-center mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}</div><p className="text-gray-600 mb-4">"Kasome helped me master advanced mathematics. The instructors are amazing and the content is top-notch!"</p><div className="flex items-center"><div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div><div><div className="font-semibold">Amina Juma</div><div className="text-sm text-gray-500">Form 6 Student</div></div></div></Card>
            <Card className="p-6"><div className="flex items-center mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}</div><p className="text-gray-600 mb-4">"The computer science course gave me the skills I needed to land my dream job. Highly recommended!"</p><div className="flex items-center"><div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div><div><div className="font-semibold">John Mwalimu</div><div className="text-sm text-gray-500">Software Developer</div></div></div></Card>
            <Card className="p-6"><div className="flex items-center mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}</div><p className="text-gray-600 mb-4">"Excellent platform with great courses. The certificates helped me advance in my career."</p><div className="flex items-center"><div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div><div><div className="font-semibold">Grace Kimaro</div><div className="text-sm text-gray-500">Teacher</div></div></div></Card>
          </div>
        </div>
      </section>

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