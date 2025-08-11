"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Loader2, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ FEEDBACK COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function ApiFeedback({ type, message }: { type: 'success' | 'error'; message: string | null }) {
    if (!message) return null;
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
    const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';
    const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
    const Icon = isSuccess ? CheckCircle2 : AlertTriangle;

    return (
        <div className={`p-3 rounded-md border ${bgColor} ${borderColor} ${textColor}`}>
            <div className="flex items-center">
                <div className="flex-shrink-0"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                <div className="ml-3"><p className="text-sm font-medium">{message}</p></div>
            </div>
        </div>
    );
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ MAIN FORGOT PASSWORD PAGE COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'enter_phone' | 'reset_password'>('enter_phone');
  const [formData, setFormData] = useState({
    phone: "",
    code: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleGetCode = async () => {
    if (!formData.phone) {
        setApiError("Please enter your phone number.");
        return;
    }
    setIsLoading(true);
    setApiError(null);
    setApiSuccess(null);

    try {
        const response = await fetch("https://portal.kasome.com/api/users/forget/password", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ phone: formData.phone }),
        });
        const data = await response.json();
        if (response.ok && data.status === "SUCCESS") {
            setApiSuccess(data.message);
            setFormData(prev => ({ ...prev, code: data.password_token }));
            setStep('reset_password');
        } else {
            setApiError(data.message || "Failed to send code.");
        }
    } catch (error) {
        setApiError("Could not connect to the server.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        setApiError("Passwords do not match.");
        return;
    }
    if (!formData.code) {
        setApiError("Verification code is missing.");
        return;
    }
    setIsLoading(true);
    setApiError(null);
    setApiSuccess(null);

    try {
        const response = await fetch("https://portal.kasome.com/api/users/reset/password", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                reset_password_token: formData.code,
                password: formData.password,
                confirm_password: formData.confirmPassword,
            }),
        });
        const data = await response.json();
        if (response.ok && data.status === "SUCCESS") {
            setApiSuccess(data.message + " Redirecting to login...");
            setTimeout(() => router.push('/login'), 2000);
        } else {
            setApiError(data.message || "Failed to reset password.");
        }
    } catch (error) {
        setApiError("Could not connect to the server.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setStep('enter_phone');
    setFormData({ phone: "", code: "", password: "", confirmPassword: "" });
    setApiError(null);
    setApiSuccess(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">Kasome</span>
            </Link>
        </div>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
            </Link>
            <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center pt-2">
              {step === 'enter_phone' 
                ? "Enter your phone number to receive a verification code."
                : "A code has been sent to your phone. Please enter it below."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'enter_phone' && (
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="0712 345 678" 
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            required 
                        />
                    </div>
                    <Button onClick={handleGetCode} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Get Code" }
                    </Button>
                </div>
            )}

            {step === 'reset_password' && (
                 <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                        <Label htmlFor="phone-disabled">Phone Number</Label>
                        <Input id="phone-disabled" value={formData.phone} disabled className="bg-gray-100"/>
                    </div>
                    <div>
                        <Label htmlFor="code">Enter Code *</Label>
                        <Input 
                            id="code" 
                            placeholder="Enter the code sent to your phone" 
                            value={formData.code}
                            onChange={e => setFormData({...formData, code: e.target.value})}
                            required 
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">New Password *</Label>
                        <Input 
                            id="password" 
                            type="password"
                            placeholder="Create a new password" 
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            required 
                        />
                    </div>
                     <div>
                        <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                        <Input 
                            id="confirmPassword" 
                            type="password"
                            placeholder="Confirm your new password" 
                            value={formData.confirmPassword}
                            onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="flex gap-x-4 pt-2">
                        <Button type="button" variant="outline" className="w-full" onClick={handleCancel}>Cancel</Button>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Reset Password" }
                        </Button>
                    </div>
                </form>
            )}
             <div className="h-16 mt-4">
                <ApiFeedback type="success" message={apiSuccess} />
                <ApiFeedback type="error" message={apiError} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}