export default function SocialSharing() {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://audiobookment.com/';
  const title = "Audiobook Calculators";
  
  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      icon: "fab fa-facebook-f",
      bgColor: "bg-blue-600 hover:bg-blue-700",
      testId: "share-facebook"
    },
    {
      name: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      icon: "fab fa-x-twitter",
      bgColor: "bg-black hover:bg-gray-800",
      testId: "share-twitter"
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${currentUrl}`)}`,
      icon: "fab fa-whatsapp",
      bgColor: "bg-green-600 hover:bg-green-700",
      testId: "share-whatsapp"
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      icon: "fab fa-telegram-plane",
      bgColor: "bg-blue-500 hover:bg-blue-600",
      testId: "share-telegram"
    },
    {
      name: "Reddit",
      url: `http://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`,
      icon: "fab fa-reddit-alien",
      bgColor: "bg-orange-600 hover:bg-orange-700",
      testId: "share-reddit"
    }
  ];

  return (
    <section className="py-12 bg-white border-t">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Share these audiobook calculators and help others optimize their listening experience!
        </h3>
        <div className="flex justify-center space-x-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.bgColor} text-white p-3 rounded-full transition-colors`}
              title={`Share on ${link.name}`}
              data-testid={link.testId}
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
