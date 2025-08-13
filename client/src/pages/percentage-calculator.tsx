import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator, RotateCcw } from "lucide-react";
import { formatTime, timeToMinutes } from "@/lib/calculator-utils";

export default function PercentageCalculator() {
  const [totalHours, setTotalHours] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");
  const [listenedHours, setListenedHours] = useState("");
  const [listenedMinutes, setListenedMinutes] = useState("");
  const [results, setResults] = useState<{
    percentage: number;
    remainingTime: string;
    remainingPercentage: number;
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
    
    const percentage = Math.round((listenedTime / totalTime) * 100);
    const remainingPercentage = 100 - percentage;
    const remainingTime = totalTime - listenedTime;
    const remainingHours = Math.floor(remainingTime / 60);
    const remainingMins = remainingTime % 60;

    setResults({
      percentage,
      remainingTime: formatTime(remainingHours, remainingMins),
      remainingPercentage
    });
  };

  const reset = () => {
    setTotalHours("");
    setTotalMinutes("");
    setListenedHours("");
    setListenedMinutes("");
    setResults(null);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audiobook Percentage Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Track your progress with ease
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="percentage-calculator">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Results</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-primary" data-testid="completion-percentage">
                  {results.percentage}%
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-primary h-4 rounded-full transition-all duration-300" 
                  style={{ width: `${results.percentage}%` }}
                  data-testid="progress-bar"
                ></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-700" data-testid="remaining-time">
                    {results.remainingTime}
                  </div>
                  <div className="text-xs text-gray-500">Time Remaining</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600" data-testid="remaining-percentage">
                    {results.remainingPercentage}%
                  </div>
                  <div className="text-xs text-gray-500">Remaining</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
