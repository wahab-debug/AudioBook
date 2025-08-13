import { Link } from "wouter";
import { Clock, HourglassIcon, DollarSign, Calendar, FileText, Percent, Ruler, Gauge } from "lucide-react";

export default function CalculatorGrid() {
  const calculators = [
    {
      href: "/finished-hour",
      icon: Clock,
      title: "Finished Hour Calculator",
      description: "Find out exactly when you'll finish your audiobook",
      testId: "grid-finished-hour"
    },
    {
      href: "/time-left",
      icon: HourglassIcon,
      title: "Time Left Calculator",
      description: "Know exactly how much listening time remains",
      testId: "grid-time-left"
    },
    {
      href: "/price",
      icon: DollarSign,
      title: "Price Calculator",
      description: "Find the perfect price for your audiobook",
      testId: "grid-price"
    },
    {
      href: "/time-per-day",
      icon: Calendar,
      title: "Time Per Day Calculator",
      description: "Plan your listening for perfect timing",
      testId: "grid-time-per-day"
    },
    {
      href: "/time-to-page",
      icon: FileText,
      title: "Time to Page Calculator",
      description: "Convert audiobook time to page numbers",
      testId: "grid-time-to-page"
    },
    {
      href: "/percentage",
      icon: Percent,
      title: "Percentage Calculator",
      description: "Track your progress with ease",
      testId: "grid-percentage"
    },
    {
      href: "/length",
      icon: Ruler,
      title: "Length Calculator",
      description: "Estimate your listening time accurately",
      testId: "grid-length"
    },
    {
      href: "/speed",
      icon: Gauge,
      title: "Speed Calculator",
      description: "Optimize your playback speed and save time",
      testId: "grid-speed"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {calculators.map((calc) => {
        const IconComponent = calc.icon;
        return (
          <Link key={calc.href} href={calc.href} data-testid={calc.testId}>
            <div className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-primary mb-3">
                <IconComponent className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{calc.title}</h3>
              <p className="text-gray-600 text-sm">{calc.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
