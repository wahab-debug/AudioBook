import { Link } from "wouter";
import { Facebook, Twitter, MessageCircle, Send, Share2, Copy, Check, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://audiobookment.com/';
  const shareText = "AudioBookment - Optimize your audiobook experience with our suite of calculators";
  
  const socialLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`,
      icon: Facebook,
      testId: "footer-share-facebook"
    },
    {
      name: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}&hashtags=audiobook,calculator,productivity`,
      icon: Twitter,
      testId: "footer-share-twitter"
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${currentUrl}`)}`,
      icon: MessageCircle,
      testId: "footer-share-whatsapp"
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: Send,
      testId: "footer-share-telegram"
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-2">AudioBookment</h3>
            <p className="text-gray-400 text-sm mb-4">Optimize your audiobook experience</p>
            <div className="flex flex-wrap space-x-6 text-sm">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-home">
                Home
              </Link>
              <Link href="/finished-hour" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-calculators">
                Calculators
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-contact">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Sharing Section */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Share AudioBookment</h4>
            <p className="text-gray-400 text-sm mb-4">Help others discover these useful audiobook tools!</p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-200 hover:scale-105"
                    title={`Share on ${link.name}`}
                    data-testid={link.testId}
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
              
              <button
                onClick={copyToClipboard}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-1"
                title="Copy link"
                data-testid="footer-copy-link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">© 2025 AudioBookment · All rights reserved.</p>
          <button 
            onClick={scrollToTop} 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            data-testid="scroll-to-top"
          >
            <ChevronUp className="h-4 w-4" />
            Go up
          </button>
        </div>
      </div>
    </footer>
  );
}
