import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { formatTime, timeToMinutes } from "@/lib/calculator-utils";
import PageSocialSharing from "@/components/page-social-sharing";

export default function TimeLeftCalculator() {
  const [totalHours, setTotalHours] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");
  const [listenedHours, setListenedHours] = useState("");
  const [listenedMinutes, setListenedMinutes] = useState("");
  const [speed, setSpeed] = useState("1.0");
  const [results, setResults] = useState<{
    timeLeft: string;
    percentage: number;
  } | null>(null);

  const calculate = () => {
    const tH = parseInt(totalHours) || 0;
    const tM = parseInt(totalMinutes) || 0;
    const lH = parseInt(listenedHours) || 0;
    const lM = parseInt(listenedMinutes) || 0;

    if (tH === 0 && tM === 0) {
      alert('Please enter total audiobook time');
      return;
    }

    const totalTime = timeToMinutes(tH, tM);
    const listenedTime = timeToMinutes(lH, lM);
    const remainingTime = totalTime - listenedTime;

    if (remainingTime <= 0) {
      setResults({
        timeLeft: 'Complete!',
        percentage: 100
      });
    } else {
      const adjustedRemainingTime = Math.round(remainingTime / parseFloat(speed));
      const hours = Math.floor(adjustedRemainingTime / 60);
      const minutes = adjustedRemainingTime % 60;
      const percentage = Math.round((listenedTime / totalTime) * 100);

      setResults({
        timeLeft: formatTime(hours, minutes),
        percentage
      });
    }
  };

  const reset = () => {
    setTotalHours("");
    setTotalMinutes("");
    setListenedHours("");
    setListenedMinutes("");
    setSpeed("1.0");
    setResults(null);
  };

  const exampleData = [
    { totalLength: "10 hours", timeListened: "3 hours", speed: "1.0x", timeLeft: "7 hours" },
    { totalLength: "10 hours", timeListened: "3 hours", speed: "1.5x", timeLeft: "4 hours, 40 mins" },
    { totalLength: "8 hours", timeListened: "5 hours", speed: "1.25x", timeLeft: "2 hours, 24 mins" },
    { totalLength: "12 hours", timeListened: "6 hours", speed: "2.0x", timeLeft: "3 hours" },
  ];

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audiobook Time Left Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Know exactly how much listening time remains
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="time-left-calculator">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Total Audiobook Time
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Hours"
                  min="0"
                  value={totalHours}
                  onChange={(e) => setTotalHours(e.target.value)}
                  className="calculator-input"
                  data-testid="input-total-hours"
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  min="0"
                  max="59"
                  value={totalMinutes}
                  onChange={(e) => setTotalMinutes(e.target.value)}
                  className="calculator-input"
                  data-testid="input-total-minutes"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Time Listened
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Hours"
                  min="0"
                  value={listenedHours}
                  onChange={(e) => setListenedHours(e.target.value)}
                  className="calculator-input"
                  data-testid="input-listened-hours"
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  min="0"
                  max="59"
                  value={listenedMinutes}
                  onChange={(e) => setListenedMinutes(e.target.value)}
                  className="calculator-input"
                  data-testid="input-listened-minutes"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Playback Speed
              </Label>
              <Select value={speed} onValueChange={setSpeed}>
                <SelectTrigger className="calculator-input" data-testid="select-speed">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="0.75">0.75x</SelectItem>
                  <SelectItem value="1.0">1.0x (Normal)</SelectItem>
                  <SelectItem value="1.25">1.25x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="1.75">1.75x</SelectItem>
                  <SelectItem value="2.0">2.0x</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={calculate} className="calculator-button flex-1" data-testid="button-calculate">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
              <Button onClick={reset} variant="secondary" className="flex-1" data-testid="button-reset">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          {results && (
            <div className="mt-8 results-card" data-testid="results">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="time-left">
                    {results.timeLeft}
                  </div>
                  <div className="text-sm text-gray-600">Time Left</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600" data-testid="percentage-completed">
                    {results.percentage}%
                  </div>
                  <div className="text-sm text-gray-600">Percentage Completed</div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card className="mt-12 calculator-card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            How to Check Time Listened and Total Time
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">1</div>
              <p className="text-gray-700">Tap on the <strong>3 Dot (Menu) → Player Settings</strong></p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">2</div>
              <p className="text-gray-700">Select <strong>Time Listened/ Total Time</strong> option in the <strong>Player Settings</strong> section</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">3</div>
              <p className="text-gray-700">The audiobook player progress bar will now show both times.</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-4">Example Calculations for Time Left</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Total Length</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Time Listened</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Playback Speed</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Time Left</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleData.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{row.totalLength}</td>
                      <td className="py-3 px-4">{row.timeListened}</td>
                      <td className="py-3 px-4">{row.speed}</td>
                      <td className="py-3 px-4 font-semibold text-primary">{row.timeLeft}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Related Calculators */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Like This Calculator? Explore The Rest Now!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/finished-hour">
              <div className="block bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors" data-testid="related-finished-hour">
                <h4 className="font-medium text-primary">Finished Hour Calculator</h4>
                <p className="text-sm text-gray-600">Find out exactly when you'll finish your book</p>
              </div>
            </Link>
            <Link href="/percentage">
              <div className="block bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors" data-testid="related-percentage">
                <h4 className="font-medium text-primary">Percentage Calculator</h4>
                <p className="text-sm text-gray-600">Track your progress with ease</p>
              </div>
            </Link>
            <Link href="/speed">
              <div className="block bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors" data-testid="related-speed">
                <h4 className="font-medium text-primary">Speed Calculator</h4>
                <p className="text-sm text-gray-600">Optimize speed and save time</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="mt-12">
          <PageSocialSharing 
            title="Audiobook Time Left Calculator"
            description="Know exactly how much listening time remains with accurate progress tracking"
            pageType="calculator"
          />
        </div>
      </div>
    </div>
  );
}
