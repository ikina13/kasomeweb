"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Clock } from "lucide-react"
import Logo from "@/components/Logo"

export default function ContactPage() {

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+255 123 456 789", "+255 987 654 321"],
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@kasome.co.tz", "support@kasome.co.tz"],
      color: "text-blue-600",
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: ["Dar es Salaam, Tanzania", "Kinondoni District"],
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"],
      color: "text-orange-600",
    },
  ]

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/p/Kasomecom-100064024906154/",
      handle: "@kasome",
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/kasome_online/",
      handle: "@kasome_online",
      color: "text-pink-600 hover:text-pink-700",
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      url: "https://wa.me/255749655855",
      handle: "+255749655855",
      color: "text-green-600 hover:text-green-700",
    },
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
              <Link href="/about" className="text-gray-600 hover:text-yellow-500">
                About
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-yellow-500">
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

      {/* Centered Contact Info */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're here to help! Reach out to us through any of the following channels.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <info.icon className={`h-6 w-6 mt-1 ${info.color}`} />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <p className="mb-6 opacity-90">
                  Stay connected with us on social media for updates and educational content.
                </p>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-colors"
                    >
                      <social.icon className="h-5 w-5" />
                      <div>
                        <span className="font-medium">{social.name}</span>
                        <span className="text-sm opacity-75 ml-2">{social.handle}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I access courses?</h3>
                <p className="text-gray-600 text-sm">
                  Simply register for an account and browse our extensive library of video lessons.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Are courses free?</h3>
                <p className="text-gray-600 text-sm">
                  We offer both free and premium courses to suit different learning needs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I access on mobile?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! Our platform is optimized for mobile devices and we have a mobile app.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer certificates?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, we provide certificates of completion for finished courses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Logo className="mb-4" />
              <p className="text-gray-400 mb-4">
                Making high-quality education accessible to every student in Tanzania through innovative technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Kasome. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}