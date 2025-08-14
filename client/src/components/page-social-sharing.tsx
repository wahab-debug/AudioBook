import { useState } from "react";
import { Facebook, Twitter, MessageCircle, Send, Share2, Copy, Check, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PageSocialSharingProps {
  title: string;
  description: string;
  pageType?: string;
}

export default function PageSocialSharing({ 
  title, 
  description, 
  pageType = "calculator" 
}: PageSocialSharingProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://audiobookment.com/';
  const fullTitle = `${title} | AudioBookment`;
  const shareText = `${fullTitle} - ${description}`;
  
  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`,
      icon: Facebook,
      bgColor: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-blue-600",
      testId: "share-facebook"
    },
    {
      name: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}&hashtags=audiobook,calculator,productivity`,
      icon: Twitter,
      bgColor: "bg-black hover:bg-gray-800",
      textColor: "text-gray-800",
      testId: "share-twitter"
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${currentUrl}`)}`,
      icon: MessageCircle,
      bgColor: "bg-green-600 hover:bg-green-700",
      textColor: "text-green-600",
      testId: "share-whatsapp"
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: Send,
      bgColor: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-blue-500",
      testId: "share-telegram"
    },
    {
      name: "Reddit",
      url: `http://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(fullTitle)}`,
      icon: Share2,
      bgColor: "bg-orange-600 hover:bg-orange-700",
      textColor: "text-orange-600",
      testId: "share-reddit"
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

  const handleNativeShare = async () => {
    if (typeof window !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: fullTitle,
          text: description,
          url: currentUrl,
        });
        toast({
          title: "Shared successfully!",
          description: "Thank you for sharing this calculator.",
        });
      } catch (error) {
        // User cancelled the share dialog or sharing failed
      }
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
          <Share2 className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Share This {pageType.charAt(0).toUpperCase() + pageType.slice(1)}
        </h3>
        <p className="text-gray-600">
          Help others discover this useful audiobook tool!
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center gap-3">
          {shareLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.bgColor} text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg group`}
                title={`Share on ${link.name}`}
                data-testid={link.testId}
              >
                <IconComponent className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        {/* Copy Link and Native Share */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            data-testid="copy-link-button"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>

          {typeof window !== 'undefined' && 'share' in navigator && (
            <Button
              onClick={handleNativeShare}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              data-testid="native-share-button"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          )}
        </div>

        {/* URL Display */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <Link2 className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <code className="text-sm text-gray-700 truncate flex-1 font-mono">
            {currentUrl}
          </code>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Share this calculator to help others optimize their audiobook experience</p>
      </div>
    </Card>
  );
}