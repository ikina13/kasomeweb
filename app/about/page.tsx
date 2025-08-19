import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap, MapPin, Award, Target, Heart, Lightbulb } from "lucide-react"
import Logo from "@/components/Logo"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Students Reached", value: "500,000+", color: "text-blue-600" },
    { icon: BookOpen, label: "Video Lessons", value: "10,000+", color: "text-green-600" },
    { icon: GraduationCap, label: "Expert Teachers", value: "200+", color: "text-purple-600" },
    { icon: MapPin, label: "Regions Covered", value: "All Tanzania", color: "text-orange-600" },
  ]

  const partners = [
   // { name: "Tanzania Coat of Arms", logo: "/placeholder.svg?height=60&width=60&text=TZ" },
    { name: "Ministry of Education", logo: "/images/partner1.png" },
    { name: "UKaid", logo: "/images/partner2.png" },
    { name: "Ford Foundation", logo: "/images/partner3.png" },
    { name: "USAID", logo: "/images/partner4.png" },
 //   { name: "Plus TV", logo: "/placeholder.svg?height=60&width=60&text=Plus" },
    { name: "Zuku", logo: "/images/partner5.png" },
  ]

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
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Kasome</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kasome makes high-quality lessons available to students via their mobile devices
            <br />
            Safe access to evening or after-school
          </p>
        </div>
      </section>

      {/* What is Kasome Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Kasome?</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Kasome is an online video library that students can use as tuition sessions, these videos will be
                  produced by the project and uploaded to our website and App. The aim is to make secondary studies easy
                  to be accessible and understood by connecting the very best teachers, who have excellent experience
                  and are highly professional, to students all over Tanzania, through online video technology.
                </p>
                <p>
                  In 2020, during the COVID-19 pandemic, Kasome was officially recognized and trusted by the Tanzania
                  Institute of Education (TIE) to support remote learning. Kasome's content was broadcast nationally
                  through various TV channels such as TBC, Azam TV, ZUKU, Uganda TV, etc, helping the government address
                  the education crisis during school closures.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/about1.jpg"
                alt="Kasome team members"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who are we Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/images/about2.jpg"
                alt="Total Startupper Awards 2019"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who are we?</h2>
              <p className="text-gray-600 leading-relaxed">
                Our success is driven by high level expertise from our supportive team of staff and their commitment
                towards getting results through the right way by operating responsibly, executing with excellence,
                applying innovative technologies and capturing new opportunities for creative teaching and learning
                environments for profitable growth and success of our esteemed students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem We Are Solving Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem We Are Solving</h2>
              <p className="text-gray-600 leading-relaxed">
                For over a decade now out of five hundred 500,000 students more than 75% students sitting for the form
                four final national examination every year fail and get zero to their Mathematics subject and more than
                40,000 students fail all the subject and can not continue to further education, this is according to
                National Examination Council of Tanzania ( NECTA ). Major contributing factors of failure include a
                shortage of teachers, inaccessibility to tuition centers and after school programs, safety concerns
                especially for girls, and lack of learning resources. Kasome decided to step up and support children in
                secondary school and prepare them to pass their final examination since this exam is the back born that
                determine the future of all children.
              </p>
            </div>
            <div className="relative">
              <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-0 rounded-lg flex items-center justify-center">
                 <img src="/images/kasomelogo.svg" alt="Kasome Logo" />
              </div>
              <span className="text-2xl font-bold text-white-900">Kasome</span>
            </Link>
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

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">Delivering the highest quality education content</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">Making education available to every student</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Using technology to transform learning</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Impact</h3>
              <p className="text-gray-600">Creating lasting change in communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-xl text-gray-600">Working together to transform education</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-12 w-auto   hover:opacity-100 transition-opacity"
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
              <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-0 rounded-lg flex items-center justify-center">
                 <img src="/images/kasomelogo.svg" alt="Kasome Logo" />
              </div>
              <span className="text-2xl font-bold text-white-900">Kasome</span>
            </Link>
              <p className="text-gray-400 mb-4">
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
