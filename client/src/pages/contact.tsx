import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Send, RotateCcw, CheckCircle, Heart, Lightbulb, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your feedback. We'll get back to you soon.",
      });
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const reset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setShowSuccess(false);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">We Want to Hear from You!</h1>
          <p className="text-lg text-gray-600">
            We're constantly working to improve our audiobook calculators and would love to hear your thoughts. 
            Whether you've found the calculators helpful, have suggestions for new tools, or ideas on how we can make 
            the current ones even better, we're all ears!
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="contact-form">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Share Your Feedback or Ideas</h2>
          
          <div className="mb-8 space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                <Heart className="h-3 w-3" />
              </div>
              <p className="text-gray-700"><strong>Loved using our calculators?</strong> Let us know what worked best for you!</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                <Lightbulb className="h-3 w-3" />
              </div>
              <p className="text-gray-700"><strong>Got ideas for a new calculator?</strong> We're always looking for new ways to enhance the audiobook experience—your suggestion could be our next big tool!</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                <Wrench className="h-3 w-3" />
              </div>
              <p className="text-gray-700"><strong>Spotted something we can improve?</strong> Whether it's a feature you'd like to see or a way to make the calculators more user-friendly, we welcome all feedback.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Your Full Name
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className="calculator-input"
                required
                data-testid="input-name"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Email Address
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className="calculator-input"
                required
                data-testid="input-email"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Subject
              </Label>
              <Input
                type="text"
                name="subject"
                placeholder="Enter message subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="calculator-input"
                required
                data-testid="input-subject"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Message
              </Label>
              <Textarea
                name="message"
                rows={6}
                placeholder="Share your feedback, suggestions, or ideas..."
                value={formData.message}
                onChange={handleInputChange}
                className="calculator-input"
                required
                data-testid="textarea-message"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                className="calculator-button flex-1"
                disabled={contactMutation.isPending}
                data-testid="button-send"
              >
                {contactMutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                onClick={reset} 
                variant="secondary" 
                className="flex-1"
                data-testid="button-reset"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Form
              </Button>
            </div>
          </form>

          {showSuccess && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg" data-testid="success-message">
              <div className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">Thank you for your message!</h3>
                <p className="text-green-700">We appreciate your feedback and will get back to you soon.</p>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Feel free to reach out! We're committed to making these tools as useful as possible for audiobook lovers like you!
          </p>
        </div>
      </div>
    </div>
  );
}
