import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator, RotateCcw } from "lucide-react";
import { formatTime, timeToMinutes } from "@/lib/calculator-utils";

export default function SpeedCalculator() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [targetHours, setTargetHours] = useState("");
  const [targetMinutes, setTargetMinutes] = useState("");
  const [results, setResults] = useState<{
    optimalSpeed: string;
    timeSavedTotal: string;
    actualListeningTime: string;
  } | null>(null);

  const calculate = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const tH = parseInt(targetHours) || 0;
    const tM = parseInt(targetMinutes) || 0;

    if ((h === 0 && m === 0) || (tH === 0 && tM === 0)) {
      alert('Please enter both audiobook length and target time');
      return;
    }

    const totalTime = timeToMinutes(h, m);
    const targetTime = timeToMinutes(tH, tM);

    if (targetTime >= totalTime) {
      alert('Target time should be less than audiobook length');
      return;
    }

    const requiredSpeed = totalTime / targetTime;
    const timeSaved = totalTime - targetTime;
    const savedHours = Math.floor(timeSaved / 60);
    const savedMins = timeSaved % 60;

    setResults({
      optimalSpeed: requiredSpeed.toFixed(2) + 'x',
      timeSavedTotal: formatTime(savedHours, savedMins),
      actualListeningTime: formatTime(tH, tM)
    });
  };

  const reset = () => {
    setHours("");
    setMinutes("");
    setTargetHours("");
    setTargetMinutes("");
    setResults(null);
  };

  const speedComparisonData = [
    { speed: "1.0x", eightHour: "8h 00m", twelveHour: "12h 00m", timeSaved: "--" },
    { speed: "1.25x", eightHour: "6h 24m", twelveHour: "9h 36m", timeSaved: "1h 36m" },
    { speed: "1.5x", eightHour: "5h 20m", twelveHour: "8h 00m", timeSaved: "2h 40m" },
    { speed: "1.75x", eightHour: "4h 34m", twelveHour: "6h 51m", timeSaved: "3h 26m" },
    { speed: "2.0x", eightHour: "4h 00m", twelveHour: "6h 00m", timeSaved: "4h 00m" },
  ];

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audiobook Speed Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Optimize your playback speed and save time
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="speed-calculator">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Audiobook Length
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Hours"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="calculator-input"
                  data-testid="input-hours"
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="calculator-input"
                  data-testid="input-minutes"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Target Completion Time
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Target Hours"
                  min="0"
                  value={targetHours}
                  onChange={(e) => setTargetHours(e.target.value)}
                  className="calculator-input"
                  data-testid="input-target-hours"
                />
                <Input
                  type="number"
                  placeholder="Target Minutes"
                  min="0"
                  max="59"
                  value={targetMinutes}
                  onChange={(e) => setTargetMinutes(e.target.value)}
                  className="calculator-input"
                  data-testid="input-target-minutes"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimal Speed Results</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary" data-testid="optimal-speed">
                  {results.optimalSpeed}
                </div>
                <div className="text-sm text-gray-600">Recommended playback speed</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600" data-testid="time-saved-total">
                    {results.timeSavedTotal}
                  </div>
                  <div className="text-xs text-gray-500">Total time saved</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700" data-testid="actual-listening-time">
                    {results.actualListeningTime}
                  </div>
                  <div className="text-xs text-gray-500">Actual listening time</div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Speed Comparison Table */}
        <Card className="mt-12 calculator-card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Speed Comparison Chart</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Speed</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">8-Hour Book</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">12-Hour Book</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Time Saved (8hr)</th>
                </tr>
              </thead>
              <tbody>
                {speedComparisonData.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-semibold">{row.speed}</td>
                    <td className="py-3 px-4">{row.eightHour}</td>
                    <td className="py-3 px-4">{row.twelveHour}</td>
                    <td className={`py-3 px-4 ${row.timeSaved !== '--' ? 'text-green-600' : ''}`}>
                      {row.timeSaved}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
