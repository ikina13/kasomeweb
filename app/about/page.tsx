"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  BookOpen,
  GraduationCap,
  MapPin,
  Award,
  Target,
  Lightbulb,
  TrendingUp,
  Heart,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  AlertTriangle,
  Tv,
  UserCheck,
} from "lucide-react"
import Logo from "@/components/Logo"

interface UserData { name: string; email: string; phone: string; photo_url?: string; }
 
export default function AboutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const stats = [
    { icon: Users, label: "Students Reached", value: "1502+", color: "text-blue-600" },
    { icon: BookOpen, label: "Video Lessons", value: "2250+", color: "text-green-600" },
    { icon: GraduationCap, label: "Expert Teachers", value: "16+", color: "text-purple-600" },
    { icon: MapPin, label: "Regions Covered", value: "All Tanzania", color: "text-orange-600" },
  ]

  const challenges = [
    {
      icon: UserCheck,
      title: "Shortage of Qualified Teachers",
      description: "Limited number of experienced teachers in secondary schools across Tanzania",
    },
    {
      icon: MapPin,
      title: "Inaccessible Tuition Centers",
      description: "Many students cannot reach or afford private tuition and after-school programs",
    },
    {
      icon: Shield,
      title: "Safety Concerns",
      description: "Especially for girls traveling to distant learning centers",
    },
    {
      icon: BookOpen,
      title: "Lack of Learning Resources",
      description: "Insufficient affordable and reliable educational materials",
    },
  ]

  const partners = [
    { name: "Ministry of Education", logo: "/images/partner1.png" },{ name: "Ford Foundation", logo: "/images/partner3.png" }, { name: "UKaid", logo: "/images/partner2.png" }, { name: "USAID", logo: "/images/partner4.jpeg" }, { name: "Zuku", logo: "/images/partner5.png" },{ name: "upendo", logo: "/images/partner6.png" },
]


  const broadcastPartners = ["TBC", "Azam TV", "ZUKU", "UpendoTV"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
       <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 font-medium">
                Home
              </Link> 
              <Link href="/about" className="text-yellow-700  font-medium">
                About us
              </Link>
              <Link href="/books" className="text-gray-700 hover:text-yellow-600 font-medium">
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

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800"
          style={{
            backgroundImage: `url("")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-4">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Kasome</h1>
          <p className="text-xl text-white text-opacity-90 leading-relaxed">
            Transforming secondary education in Tanzania by making high-quality learning resources accessible,
            affordable, and effective for every student.
          </p>
        </div>
      </section>

      {/* What is Kasome Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">What is Kasome?</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Kasome is an <strong className="text-gray-900">online video learning library</strong> that provides
                  students with high-quality tuition sessions anytime, anywhere. Our platform produces and uploads
                  professionally recorded lessons to our website and mobile app, making secondary education more
                  accessible and easier to understand.
                </p>
                <p>
                  By connecting Tanzania's most experienced and professional teachers with students through online video
                  technology, Kasome helps bridge the education gap and ensures that every learner has the opportunity
                  to succeed.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  <Tv className="h-4 w-4 mr-1" />
                  Video Library
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Globe className="h-4 w-4 mr-1" />
                  Online Platform
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Expert Teachers
                </Badge>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-sm opacity-90">Access Anytime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-sm opacity-90">Mobile Friendly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">HD</div>
                    <div className="text-sm opacity-90">Video Quality</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">TZ</div>
                    <div className="text-sm opacity-90">Nationwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold mb-2">2020</div>
                  <div className="text-xl opacity-90">COVID-19 Response</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm">Officially recognized by TIE</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm">National TV broadcast</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm">Remote learning support</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 rounded-lg p-3 mr-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In <strong className="text-gray-900">2020</strong>, during the COVID-19 pandemic, Kasome was
                  officially
                  <strong className="text-green-600">
                    {" "}
                    recognized and trusted by the Tanzania Institute of Education (TIE)
                  </strong>{" "}
                  to support remote learning.
                </p>
                <p>
                  Our content was broadcast nationally through multiple TV channels—including{" "}
                  <strong className="text-gray-900">{broadcastPartners.join(", ")}</strong>
                  —to help the government respond to the education crisis caused by school closures.
                </p>
                <p>
                  This milestone strengthened our mission to provide{" "}
                  <strong className="text-gray-900">long-term educational solutions</strong> for Tanzanian students
                  beyond the pandemic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
              Kasome's success is powered by a dedicated team of experts who are passionate about transforming education
              in Tanzania. We believe in operating responsibly, executing with excellence, applying innovative
              technologies, and seizing opportunities to create inspiring learning environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Responsible</h3>
                <p className="text-sm text-gray-600">Operating with integrity and accountability</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-sm text-gray-600">Executing with the highest standards</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-purple-100 rounded-full p-3 w-fit mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">Applying cutting-edge technologies</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Opportunity</h3>
                <p className="text-sm text-gray-600">Creating inspiring learning environments</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Our commitment is not only to provide knowledge but also to nurture creativity, confidence, and academic
              success for every student who joins Kasome.
            </p>
          </div>
        </div>
      </section>

      {/* Problem We Are Solving Section */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Problem We Are Solving</h2>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white shadow-lg border-l-4 border-red-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 rounded-full p-3 mr-4">
                    <TrendingUp className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-red-600">75%</h3>
                    <p className="text-gray-600">Mathematics Failure Rate</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  For over a decade, more than 75% of the 500,000 students sitting for Tanzania's national Form Four
                  examinations have failed Mathematics.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-l-4 border-orange-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-orange-600">40,000+</h3>
                    <p className="text-gray-600">Complete Failures</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Over 40,000 students fail all subjects each year—making it impossible for them to continue their
                  education.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 italic">Source: NECTA</p>
          </div>

          {/* Key Challenges */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Key Challenges Behind This Crisis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Shortage of qualified teachers</h4>
                      <p className="text-gray-600 text-sm">
                        Limited number of experienced educators to serve the growing student population
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 rounded-full p-2 flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Inaccessibility to tuition centers</h4>
                      <p className="text-gray-600 text-sm">
                        Limited access to after-school programs and additional learning support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Safety concerns, especially for girls</h4>
                      <p className="text-gray-600 text-sm">
                        Security issues preventing students from accessing educational opportunities
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lack of affordable learning resources</h4>
                      <p className="text-gray-600 text-sm">
                        Limited access to quality, affordable educational materials and resources
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-green-50 border-l-4 border-green-500">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Solution</h3>
                  <p className="text-gray-700 leading-relaxed">
                    At Kasome, we have stepped in to bridge this gap by equipping secondary school students with the
                    resources, lessons, and guidance they need to pass their final examinations—an exam that defines
                    their future.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-4">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl leading-relaxed mb-8">
            To transform secondary education in Tanzania by making high-quality learning resources accessible,
            affordable, and effective for every student.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <Globe className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Accessible</h3>
              <p className="text-sm opacity-90">Available anytime, anywhere</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <Heart className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Affordable</h3>
              <p className="text-sm opacity-90">Cost-effective for all families</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <Target className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Effective</h3>
              <p className="text-sm opacity-90">Proven results and outcomes</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg font-medium">Equal access to quality education for every student</p>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making education accessible across Tanzania</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
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


      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are already improving their grades with Kasome
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Start Learning Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
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
