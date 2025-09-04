import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  GraduationCap,
  MapPin,
  Award,
  Target,
  Lightbulb,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  AlertTriangle,
  Tv,
  UserCheck,
} from "lucide-react"
import Logo from "@/components/Logo"

export default function AboutPage() {
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
    { name: "Ministry of Education", logo: "/images/partner1.png" },
    { name: "UKaid", logo: "/images/partner2.png" },
    { name: "Ford Foundation", logo: "/images/partner3.png" },
    { name: "USAID", logo: "/images/partner4.png" },
    { name: "Zuku", logo: "/images/partner5.png" },
  ]

  const broadcastPartners = ["TBC", "Azam TV", "ZUKU", "UpendoTV"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo />
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-yellow-500">
                Home
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-yellow-500">
                About us
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-yellow-500">
                Contact
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-yellow-500">
                Login
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 rounded-lg p-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kasome's success is powered by a dedicated team of experts who are passionate about transforming education
              in Tanzania.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Operating Responsibly</h3>
              <p className="text-gray-600 text-sm">Ethical practices in all our operations</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Executing Excellence</h3>
              <p className="text-gray-600 text-sm">Delivering the highest quality content</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovative Technology</h3>
              <p className="text-gray-600 text-sm">Applying cutting-edge solutions</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Creative Learning</h3>
              <p className="text-gray-600 text-sm">Inspiring educational environments</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Our commitment is not only to provide knowledge but also to nurture{" "}
              <strong className="text-green-600">creativity</strong>,{" "}
              <strong className="text-blue-600">confidence</strong>, and{" "}
              <strong className="text-purple-600">academic success</strong> for every student who joins Kasome.
            </p>
          </div>
        </div>
      </section>

      {/* Problem We Are Solving Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-lg p-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem We Are Solving</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              For over a decade, Tanzania has faced a critical education crisis that demands immediate action.
            </p>
          </div>

          {/* Crisis Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">75%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Mathematics Failure Rate</div>
                <div className="text-gray-600">Out of 500,000 students taking Form Four examinations annually</div>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">40,000+</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Complete Failures</div>
                <div className="text-gray-600">Students who fail all subjects and cannot continue education</div>
              </CardContent>
            </Card>
          </div>

          {/* Key Challenges */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Contributing Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-red-100 rounded-lg p-3 mr-4 flex-shrink-0">
                        <challenge.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                        <p className="text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Our Solution */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Kasome's Solution</h3>
            <p className="text-lg leading-relaxed">
              At Kasome, we have stepped in to bridge this gap by equipping secondary school students with the
              resources, lessons, and guidance they need to pass their final examinations—an exam that defines their
              future.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-lg p-3">
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-xl text-gray-800 leading-relaxed">
                To transform secondary education in Tanzania by making high-quality learning resources
                <strong className="text-green-600"> accessible</strong>,
                <strong className="text-blue-600"> affordable</strong>, and
                <strong className="text-purple-600"> effective</strong> for every student.
              </p>
              <div className="mt-6">
                <Badge className="bg-green-600 text-white text-lg px-4 py-2">Equal Access to Quality Education</Badge>
              </div>
            </div>
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-xl text-gray-600">Working together to transform education</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-12 w-auto hover:opacity-100 transition-opacity"
                />
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Logo />
              <p className="text-gray-400 mb-4 mt-4">
                Making high-quality education accessible to every student in Tanzania through innovative technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Kasome. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
