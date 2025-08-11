"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Settings, LogOut, Edit, Save, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Logo from "@/components/Logo"

// Define a type for the user profile data based on your API response
interface UserProfile {
    id: number;
    name: string;
    phone: string;
    email: string;
    region: string | null;
    district: string | null;
    user_type: string;
    sex: string | null;
    // Add any other fields from the API you might want to display
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const router = useRouter();

  const fetchProfile = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("https://portal.kasome.com/api/users/profile", {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();
      if (response.ok && result.status === "SUCCESS") {
        setProfile(result.data);
        // Initialize edit form with fetched data
        setEditData({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
        });
      } else {
        setApiError(result.message || "Failed to fetch profile.");
      }
    } catch (error) {
      setApiError("Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }
    
    setIsSubmitting(true);
    setApiError(null);
    setApiSuccess(null);

    try {
        const response = await fetch("https://portal.kasome.com/api/users/profile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editData),
        });

        const result = await response.json();
        if (response.ok && result.status === "SUCCESS") {
            setApiSuccess(result.message || "Profile updated successfully!");
            // Refresh profile data with the newly saved data
            await fetchProfile();
            setIsEditing(false);
        } else {
            setApiError(result.message || "Failed to update profile.");
        }
    } catch (error) {
        setApiError("Could not connect to the server.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      // Reset edit form to original profile data
      setEditData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
    }
    setIsEditing(false);
    setApiError(null);
    setApiSuccess(null);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Logo />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600 font-medium">Dashboard</Link>
              <Link href="/profile" className="text-green-600 font-medium border-b-2 border-green-600">Profile</Link>
            </nav>
            <div className="flex items-center space-x-2">
             
              <Button variant="ghost" size="icon" onClick={handleLogout}><LogOut className="h-5 w-5" /></Button>
            </div>
          </div>
        </div>
      </header>

      {/* Centered Profile Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700"><Edit className="h-4 w-4 mr-2" />Edit Profile</Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : <Save className="h-4 w-4" />}
                    <span className="ml-2">Save</span>
                  </Button>
                  <Button onClick={handleCancel} variant="outline"><X className="h-4 w-4 mr-2" />Cancel</Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {profile && (
              <>
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.photo_url || "/placeholder.svg?text=AV"} />
                    <AvatarFallback className="text-3xl bg-gray-200">
                      {profile.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                    <p className="text-gray-600">{profile.email}</p>
                    <Badge className="mt-2 capitalize bg-green-100 text-green-800 hover:bg-green-200">{profile.user_type} Account</Badge>
                  </div>
                </div>

                {apiSuccess && <p className="text-sm text-green-600 p-3 bg-green-50 rounded-md">{apiSuccess}</p>}
                {apiError && <p className="text-sm text-red-600 p-3 bg-red-50 rounded-md">{apiError}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-8">
                  {/* Editable Fields */}
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                    {isEditing ? (
                      <Input id="fullName" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    {isEditing ? (
                      <Input id="email" type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                    {isEditing ? (
                      <Input id="phone" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.phone}</p>
                    )}
                  </div>
                  
                  {/* Display-Only Fields */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Region</Label>
                    <p className="mt-1 text-gray-900">{profile.region || 'Not set'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">District</Label>
                    <p className="mt-1 text-gray-900">{profile.district || 'Not set'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Gender</Label>
                    <p className="mt-1 text-gray-900 capitalize">{profile.sex || 'Not set'}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}