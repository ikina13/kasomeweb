// app/payment-success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, Play, ArrowLeft, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

// --- Interface for your backend's payment/success API response ---
interface PaymentSuccessApiResponse {
  status: string;
  code: string;
  data: number;
  message: string;
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 'success' or 'failure' states are handled on this page
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'failure'>('loading');
  const [message, setMessage] = useState('Confirming your payment details with our system...');
  const [transId, setTransId] = useState<string | null>(null);
  const [courseIdToRedirect, setCourseIdToRedirect] = useState<string | null>(null);

  useEffect(() => {
    const transactionId = searchParams.get('TransID');
    const ccdApproval = searchParams.get('CCDapproval');
    const pnrId = searchParams.get('PnrID');
    const transactionToken = searchParams.get('TransactionToken');
    const companyRef = searchParams.get('CompanyRef');

    if (!transactionId || !transactionToken) {
      setApiStatus('failure');
      setMessage('Payment confirmation failed: Missing parameters.');
      return;
    }

    let courseId = null;
    if (companyRef) {
      const refParts = companyRef.split('-');
      if (refParts.length >= 2 && refParts[0] === 'KASOME' && refParts[1]) {
        courseId = refParts[1];
      }
    }
    setCourseIdToRedirect(courseId);

    const confirmPaymentWithBackend = async () => {
      try {
        const authToken = localStorage.getItem('auth_token');

        const response = await fetch('https://portal.kasome.com/api/users/payment/success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken ? `Bearer ${authToken}` : '',
          },
          body: JSON.stringify({
            TransID: transactionId,
            CCDapproval: ccdApproval,
            PnrID: pnrId,
            TransactionToken: transactionToken,
            CompanyRef: companyRef,
          }),
        });

        const result: PaymentSuccessApiResponse = await response.json();

        if (response.ok && result.status === 'SUCCESS') {
          setApiStatus('success');
          setMessage(result.message || 'Payment successfully confirmed!');
          toast.success('Payment Confirmed!', { description: result.message });

          setTimeout(() => {
            if (courseId) {
              router.replace(`/course/${courseId}`);
            } else {
              router.back();
            }
          }, 2000);
        } else {
          // --- FAILURE LOGIC: Set failure state on this page ---
          setApiStatus('failure');
          setMessage(result.message || 'Payment confirmation failed on the server.');
          toast.error('Confirmation Error', { description: result.message });
        }
      } catch (error: any) {
        // --- CATCH BLOCK: Set failure state on this page ---
        setApiStatus('failure');
        setMessage(`Network Error: ${error.message || 'An error occurred during confirmation.'}.`);
        toast.error('Network Error', { description: `An error occurred: ${error.message}.` });
      }
    };

    confirmPaymentWithBackend();

  }, [searchParams, router]);

  const renderIcon = () => {
    if (apiStatus === 'loading') {
      return <Loader2 className="h-16 w-16 text-yellow-500 animate-spin mx-auto mb-6" />;
    } else if (apiStatus === 'success') {
      return <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />;
    } else { // apiStatus === 'failure'
      return <XCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />;
    }
  };

  const getCardClasses = () => {
    if (apiStatus === 'success') return 'border-green-400 shadow-xl';
    if (apiStatus === 'failure') return 'border-red-400 shadow-xl';
    return 'border-yellow-400 shadow-xl'; // For the loading state
  };

  const getTitle = () => {
    if (apiStatus === 'loading') return 'Confirming Payment...';
    if (apiStatus === 'success') return 'Payment Confirmed!';
    return 'Payment Unsuccessful'; // For the failure state
  };

  const getTitleColorClass = () => {
    if (apiStatus === 'success') return 'text-green-800';
    if (apiStatus === 'failure') return 'text-red-800';
    return 'text-yellow-800'; // For the loading state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <Card className={`w-full max-w-md text-center border-2 ${getCardClasses()}`}>
        <CardHeader className="pt-8">
          {renderIcon()}
          <CardTitle className={`text-3xl font-bold ${getTitleColorClass()}`}>{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <p className="text-lg text-gray-700 mb-6">{message}</p>

          <div className="space-y-4 pt-4">
            {apiStatus === 'loading' ? (
              <div className="text-gray-600 text-base">
                <Loader2 className="h-8 w-8 text-yellow-500 animate-spin mx-auto" />
                <p className="mt-2">Please wait, confirming payment with our system...</p>
              </div>
            ) : (
              <>
                {apiStatus === 'success' ? (
                  <>
                    <p className="text-gray-600 text-base mb-4">You will be redirected automatically.</p>
                    {courseIdToRedirect ? (
                      <Link href={`/course/${courseIdToRedirect}`} passHref>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3">
                          <Play className="mr-2 h-5 w-5" /> Go to Course Now
                        </Button>
                      </Link>
                    ) : (
                      <Button onClick={() => router.back()} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
                      </Button>
                    )}
                  </>
                ) : ( // apiStatus === 'failure'
                  <>
                    <p className="text-gray-600 text-base mb-4">Your payment was not successful. Please try again.</p>
                    <Button onClick={() => router.back()} className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3">
                      <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
                    </Button>
                    <Link href="/courses" passHref>
                      <Button variant="outline" className="w-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 text-lg py-3">
                        <RefreshCcw className="mr-2 h-5 w-5" /> Browse Courses
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}