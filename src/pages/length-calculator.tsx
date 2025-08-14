import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator, RotateCcw } from "lucide-react";
import { formatTime } from "@/lib/calculator-utils";

export default function LengthCalculator() {
  const [wordCount, setWordCount] = useState("");
  const [readingSpeed, setReadingSpeed] = useState("150");
  const [narratorPace, setNarratorPace] = useState("1.0");
  const [results, setResults] = useState<{
    estimatedLength: string;
    wpm: number;
    baseReadingTime: string;
    narratorAdjustment: string;
  } | null>(null);

  const calculate = () => {
    const words = parseInt(wordCount) || 0;

    if (words <= 0) {
      alert('Please enter word count');
      return;
    }

    const wpm = parseInt(readingSpeed);
    const pace = parseFloat(narratorPace);

    const baseMinutes = words / wpm;
    const adjustedMinutes = Math.round(baseMinutes * pace);
    const hours = Math.floor(adjustedMinutes / 60);
    const minutes = adjustedMinutes % 60;

    const baseHours = Math.floor(baseMinutes / 60);
    const baseMins = Math.round(baseMinutes % 60);

    setResults({
      estimatedLength: formatTime(hours, minutes),
      wpm,
      baseReadingTime: formatTime(baseHours, baseMins),
      narratorAdjustment: (pace * 100).toFixed(0) + '%'
    });
  };

  const reset = () => {
    setWordCount("");
    setReadingSpeed("150");
    setNarratorPace("1.0");
    setResults(null);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audiobook Length Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Estimate your listening time accurately
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="length-calculator">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Word Count
              </Label>
              <Input
                type="number"
                placeholder="Enter total word count"
                min="1"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                className="calculator-input"
                data-testid="input-word-count"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Average Reading Speed (Words per minute)
              </Label>
              <Select value={readingSpeed} onValueChange={setReadingSpeed}>
                <SelectTrigger className="calculator-input" data-testid="select-reading-speed">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="130">Slow (130 WPM)</SelectItem>
                  <SelectItem value="150">Average (150 WPM)</SelectItem>
                  <SelectItem value="180">Fast (180 WPM)</SelectItem>
                  <SelectItem value="200">Very Fast (200 WPM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Narrator Pace
              </Label>
              <Select value={narratorPace} onValueChange={setNarratorPace}>
                <SelectTrigger className="calculator-input" data-testid="select-narrator-pace">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.9">Slow Narrator (90%)</SelectItem>
                  <SelectItem value="1.0">Normal Narrator (100%)</SelectItem>
                  <SelectItem value="1.1">Fast Narrator (110%)</SelectItem>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Audiobook Length</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary" data-testid="estimated-length">
                  {results.estimatedLength}
                </div>
                <div className="text-sm text-gray-600">Total listening time</div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Calculation Details</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Words per minute:</span>
                    <span data-testid="calc-wpm">{results.wpm} WPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base reading time:</span>
                    <span data-testid="base-reading-time">{results.baseReadingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Narrator adjustment:</span>
                    <span data-testid="narrator-adjustment">{results.narratorAdjustment}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
