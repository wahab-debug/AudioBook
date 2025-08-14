import { useState } from "react";
import { Facebook, Twitter, MessageCircle, Send, Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function SocialSharing() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://audiobookment.com/';
  const title = "Audiobook Calculators";
  const description = "Optimize your audiobook listening experience with precision";
  
  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      icon: Facebook,
      bgColor: "bg-blue-600 hover:bg-blue-700",
      testId: "share-facebook"
    },
    {
      name: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - ${description}`)}&url=${encodeURIComponent(currentUrl)}`,
      icon: Twitter,
      bgColor: "bg-black hover:bg-gray-800",
      testId: "share-twitter"
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${description}\n${currentUrl}`)}`,
      icon: MessageCircle,
      bgColor: "bg-green-600 hover:bg-green-700",
      testId: "share-whatsapp"
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`${title} - ${description}`)}`,
      icon: Send,
      bgColor: "bg-blue-500 hover:bg-blue-600",
      testId: "share-telegram"
    },
    {
      name: "Reddit",
      url: `http://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`,
      icon: Share2,
      bgColor: "bg-orange-600 hover:bg-orange-700",
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
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: currentUrl,
        });
      } catch (error) {
        // User cancelled the share dialog
      }
    }
  };

  return (
    <section className="py-12 bg-white border-t">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Share these audiobook calculators and help others optimize their listening experience!
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          {shareLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.bgColor} text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl`}
                title={`Share on ${link.name}`}
                data-testid={link.testId}
              >
                <IconComponent className="h-5 w-5" />
              </a>
            );
          })}
        </div>

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

        <div className="mt-6 text-sm text-gray-500">
          <p>Help others discover these useful audiobook tools!</p>
        </div>
      </div>
    </section>
  );
}
