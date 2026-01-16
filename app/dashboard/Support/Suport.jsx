"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Phone, HelpCircle, Send, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/Textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/sellect';
import { getFAQs, registerComplain } from '@/lib/api';
import { useAuthStore } from '@/lib/useAuthStore';
import { toast } from 'react-toastify';

export function Support() {
  const navigate = useRouter();
  const { user } = useAuthStore();
  const [issueType, setIssueType] = useState('');
  const [message, setMessage] = useState('');
  const [faqs, setFaqs] = useState([]);
const [loadingFaqs, setLoadingFaqs] = useState(true);
const [submitting, setSubmitting] = useState(false);

useEffect(() => {
  const fetchFAQs = async () => {
    setLoadingFaqs(true);
    const res = await getFAQs();

    // if (res?.status == true || res?.success == true) {
      setFaqs(res?.FAQ || []);
    // } else {
    //   toast.error(res?.message || "Failed to load FAQs");
    // }
    setLoadingFaqs(false);
  };

  fetchFAQs();
}, []);

const handleSubmitIssue = async () => {
  if (!issueType || !message) {
    toast.error('Please fill in all fields');
    return;
  }

  setSubmitting(true);

  const payload = {
    user_id: user?.id,
    type: issueType,
    complain: message,
  };

  const res = await registerComplain(payload);

  if (res?.status === true || res?.success === true) {
    toast.success(res?.message || 'Your issue has been submitted');
    setIssueType('');
    setMessage('');
  } else {
    toast.error(res?.message || 'Failed to submit issue');
  }

  setSubmitting(false);
};


  const handleWhatsApp = () => {
    window.open('https://wa.me/966501234567', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+966501234567';
  };


  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate.push('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#C7A76C] mb-8 transition-colors group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="mb-8 bg-gradient-to-br from-[#1B2A3D] to-[#1B2A3D]/90 rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A76C]/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C7A76C]/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative">
            <h1 className="text-3xl text-white mb-2">Support Center</h1>
            <p className="text-white/70">
              We're here to help with any questions or issues
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* WhatsApp Support */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-[#1B2A3D]">WhatsApp Support</h3>
              <p className="text-sm text-gray-500 mb-4">
                Chat with us instantly 
              </p>
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                Open WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* Phone Support */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#C7A76C]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-[#C7A76C]" />
              </div>
              <h3 className="mb-2 text-[#1B2A3D]">Call Support</h3>
              <p className="text-sm text-gray-500 mb-4">
                Speak directly with our team
              </p>
              <Button
                onClick={handleCall}
                className="w-full bg-gradient-to-r from-[#C7A76C] to-[#C7A76C]/90 text-white hover:shadow-lg transition-all"
              >
                +966 50 123 4567
              </Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#F2EDE3] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-8 h-8 text-[#C7A76C]" />
              </div>
              <h3 className="mb-2 text-[#1B2A3D]">Address</h3>
              <p className="text-sm text-gray-500 mb-4">
                Find answers to common questions
              </p>
              <Button
                variant="outline"
                className="w-full border-2 border-gray-200 hover:border-[#C7A76C] hover:bg-[#F2EDE3]/30"
                onClick={() => {
                  document
                    .getElementById('faq-section')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse FAQs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Issue Report Form */}
        <Card className="mb-8 border-none shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-[#1B2A3D]">Report an Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#1B2A3D] font-medium">Issue Type</label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ride Issue">Ride Issue</SelectItem>
                  <SelectItem value="Payment Issue">Payment Issue</SelectItem>
                  <SelectItem value="Package Issue">Package Issue</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#1B2A3D] font-medium">Describe Your Issue</label>
              <Textarea
                placeholder="Please provide as much detail as possible..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="bg-[#F7F7F9] border-gray-200 focus:border-[#C7A76C] focus:ring-[#C7A76C]"
              />
            </div>

            <Button
  onClick={handleSubmitIssue}
  disabled={submitting}
  className="w-full bg-gradient-to-r from-[#C7A76C] to-[#C7A76C]/90 text-white hover:shadow-lg transition-all"
>
  {submitting ? "Submitting..." : (
    <>
      <Send className="mr-2 w-4 h-4" />
      Submit Issue
    </>
  )}
</Button>

          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card id="faq-section" className="border-none shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-[#1B2A3D]">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion> */}
            {loadingFaqs ? (
  <p className="text-center py-4 text-gray-500">Loading FAQs...</p>
) : faqs.length === 0 ? (
  <p className="text-center py-4 text-gray-500">No FAQs found.</p>
) : (
  <Accordion type="single" collapsible className="w-full">
    {faqs.map((faq, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
