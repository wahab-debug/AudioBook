import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SocialSharing from "@/components/social-sharing";
import Home from "@/pages/home";
import FinishedHourCalculator from "@/pages/finished-hour-calculator";
import TimeLeftCalculator from "@/pages/time-left-calculator";
import PriceCalculator from "@/pages/price-calculator";
import TimePerDayCalculator from "@/pages/time-per-day-calculator";
import TimeToPageCalculator from "@/pages/time-to-page-calculator";
import PercentageCalculator from "@/pages/percentage-calculator";
import LengthCalculator from "@/pages/length-calculator";
import SpeedCalculator from "@/pages/speed-calculator";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/finished-hour" component={FinishedHourCalculator} />
      <Route path="/time-left" component={TimeLeftCalculator} />
      <Route path="/price" component={PriceCalculator} />
      <Route path="/time-per-day" component={TimePerDayCalculator} />
      <Route path="/time-to-page" component={TimeToPageCalculator} />
      <Route path="/percentage" component={PercentageCalculator} />
      <Route path="/length" component={LengthCalculator} />
      <Route path="/speed" component={SpeedCalculator} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-slate-50">
          <Navigation />
          <main>
            <Router />
          </main>
          <SocialSharing />
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
