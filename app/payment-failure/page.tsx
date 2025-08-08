// app/payment-failure/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Loader2, Home, LayoutDashboard, ArrowLeft } from 'lucide-react'; // Added ArrowLeft icon
import { toast } from 'sonner';

export default function PaymentFailurePage() {
  const router = useRouter();

  useEffect(() => {
    // Show a failure toast right away
    toast.error('Payment unsuccessful', { description: 'Returning to previous page.' });

    // Set a timer to automatically go back after 2 seconds
    const redirectTimer = setTimeout(() => {
      router.back();
    }, 2000); // 2-second delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center p-4">
      <Card className={`w-full max-w-md text-center border-2 border-red-400 shadow-xl`}>
        <CardHeader className="pt-8">
          <XCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <CardTitle className="text-3xl font-bold text-red-800">Payment Unsuccessful</CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <p className="text-lg text-gray-700 mb-6">
            There was an issue with your payment. Please try again.
          </p>
          <div className="space-y-4 pt-4">
            <Loader2 className="h-8 w-8 text-red-500 animate-spin mx-auto" />
            <p className="text-sm text-gray-600">Please wait...</p>
            {/* Manual redirect button as a fallback */}
            <Button
              variant="ghost"
              className="w-full mt-4 text-gray-600 hover:text-gray-900"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Go Back Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}