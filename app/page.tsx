"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, TrendingUp, Star, ArrowRight, Play, CheckCircle, Briefcase, Lightbulb, PieChart, PlaySquare, BookCopy, X, ChevronLeft, ChevronRight } from "lucide-react";
import Logo from "@/components/Logo";
import CoursesGrid from "@/components/CoursesGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    { name: "Kiswahili Courses", students: "2,800+", rating: 4.9, color: "bg-red-500" },
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
    <section className="w-full bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
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
            <div className="absolute top-8 left-0 z-20 animate-fade-in-up"><StatCard icon={<PieChart className="h-8 w-8 text-green-600"/>} value="5K+" label="Online Courses"/></div>
            <div className="absolute top-1/3 right-0 z-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}><StatCard icon={<PlaySquare className="h-8 w-8 text-blue-600"/>} value="2K+" label="Video Courses"/></div>
            <div className="absolute bottom-8 left-1/4 z-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}><StatCard icon={<BookCopy className="h-8 w-8 text-purple-600"/>} value="250+" label="Tutors"/></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- UPDATED SLIDESHOW COMPONENT ---
function StudentSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const studentImages = [
    { src: "/images/students/student-1.jpg", name: "Amina Yusuf" },
    { src: "/images/students/student-2.jpg", name: "John Meli" },
    { src: "/images/students/student-3.jpg", name: "Grace Kimaro" },
    { src: "/images/students/student-4.jpg", name: "David Mwanri" },
    { src: "/images/students/student-5.jpg", name: "Sarah Connor" },
    { src: "/images/students/student-6.jpg", name: "Mike Ross" },
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
      ), 3000 // Change slide every 1 second
    );
    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

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
            onMouseEnter={() => resetTimeout()}
            onMouseLeave={() => {
                 timeoutRef.current = setTimeout(
                    () => setCurrentIndex((prevIndex) =>
                        prevIndex === studentImages.length - 1 ? 0 : prevIndex + 1
                    ), 1000
                );
            }}
        >
            <div className="relative group">
                <div className="relative h-96 md:h-[600px] w-full overflow-hidden rounded-lg shadow-2xl cursor-pointer" onClick={() => handleImageClick(studentImages[currentIndex].src)}>
                    {studentImages.map((image, index) => (
                        <div
                            key={index}
                            className="absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out"
                            style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                        >
                            <Image 
                                src={image.src} 
                                alt={image.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </div>
                <Button variant="ghost" size="icon" onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-4 h-12 w-12 rounded-full bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="h-6 w-6" /></Button>
                <Button variant="ghost" size="icon" onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-4 h-12 w-12 rounded-full bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="h-6 w-6" /></Button>
            </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedImage} alt="Zoomed student view" width={1000} height={1200} className="object-contain max-h-[90vh] rounded-lg shadow-2xl"/>
          </div>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:text-white hover:bg-white/20" onClick={handleCloseModal}>
            <X className="h-8 w-8"/>
          </Button>
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
              <Link href="/courses" className="text-gray-600 hover:text-gray-900">Courses</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {user && (<Avatar><AvatarImage src={user.photo_url || "/placeholder.svg"} alt={user.name} /><AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'JD'}</AvatarFallback></Avatar>)}
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
            <Card className="text-center p-6"><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4"><Users className="h-6 w-6 text-blue-600" /></div><h3 className="text-xl font-semibold mb-2">Community Support</h3><p className="text-gray-600">Join a vibrant community of learners.</p></Card>
            <Card className="text-center p-6"><div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4"><Award className="h-6 w-6 text-purple-600" /></div><h3 className="text-xl font-semibold mb-2">Skills</h3><p className="text-gray-600">Earn skills upon course completion.</p></Card>
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
      
      {/* *** NEW STUDENT SLIDESHOW SECTION ADDED HERE *** */}
      <StudentSlideshow />
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Hear from thousands of students who have transformed their careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}</div>
              <p className="text-gray-600 mb-4">"Kasome helped me master advanced mathematics. The instructors are amazing and the content is top-notch!"</p>
              <div className="flex items-center"><div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div><div><div className="font-semibold">Amina Juma</div><div className="text-sm text-gray-500">Form 6 Student</div></div></div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}</div>
              <p className="text-gray-600 mb-4">"The computer science course gave me the skills I needed to land my dream job. Highly recommended!"</p>
              <div className="flex items-center"><div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div><div><div className="font-semibold">John Mwalimu</div><div className="text-sm text-gray-500">Software Developer</div></div></div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}</div>
              <p className="text-gray-600 mb-4">"Excellent platform with great courses. The certificates helped me advance in my career."</p>
              <div className="flex items-center"><div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div><div><div className="font-semibold">Grace Kimaro</div><div className="text-sm text-gray-500">Teacher</div></div></div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div><Logo /><p className="text-gray-400 mt-4">Empowering students across Tanzania with quality online education.</p></div>
            <div><h3 className="text-lg font-semibold mb-4">Courses</h3><ul className="space-y-2 text-gray-400"><li><Link href="/courses/mathematics">Mathematics</Link></li><li><Link href="/courses/science">Science</Link></li><li><Link href="/courses/languages">Languages</Link></li><li><Link href="/courses/technology">Technology</Link></li></ul></div>
            <div><h3 className="text-lg font-semibold mb-4">Support</h3><ul className="space-y-2 text-gray-400"><li><Link href="/help">Help Center</Link></li><li><Link href="/contact">Contact Us</Link></li><li><Link href="/faq">FAQ</Link></li><li><Link href="/community">Community</Link></li></ul></div>
            <div><h3 className="text-lg font-semibold mb-4">Company</h3><ul className="space-y-2 text-gray-400"><li><Link href="/about">About Us</Link></li><li><Link href="/careers">Careers</Link></li><li><Link href="/privacy">Privacy Policy</Link></li><li><Link href="/terms">Terms of Service</Link></li></ul></div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kasome. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}