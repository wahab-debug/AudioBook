import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator, RotateCcw } from "lucide-react";
import { formatTime, timeToMinutes } from "@/lib/calculator-utils";

export default function TimePerDayCalculator() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [days, setDays] = useState("");
  const [speed, setSpeed] = useState("1.0");
  const [results, setResults] = useState<{
    dailyTime: string;
    actualTime: string;
    timeSavedDaily: string;
  } | null>(null);

  const calculate = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const d = parseInt(days) || 1;

    if (h === 0 && m === 0) {
      alert('Please enter audiobook length');
      return;
    }

    if (d <= 0) {
      alert('Please enter valid number of days');
      return;
    }

    const totalMinutes = timeToMinutes(h, m);
    const actualListeningMinutes = totalMinutes / parseFloat(speed);
    const dailyMinutes = actualListeningMinutes / d;
    const dailySavedMinutes = (totalMinutes / d) - dailyMinutes;

    const dailyHours = Math.floor(dailyMinutes / 60);
    const dailyMins = Math.round(dailyMinutes % 60);

    const savedHours = Math.floor(dailySavedMinutes / 60);
    const savedMins = Math.round(dailySavedMinutes % 60);

    setResults({
      dailyTime: formatTime(dailyHours, dailyMins),
      actualTime: formatTime(dailyHours, dailyMins),
      timeSavedDaily: parseFloat(speed) > 1 ? formatTime(savedHours, savedMins) : '--'
    });
  };

  const reset = () => {
    setHours("");
    setMinutes("");
    setDays("");
    setSpeed("1.0");
    setResults(null);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audiobook Time Per Day Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Plan your listening for perfect timing
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="time-per-day-calculator">
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
                Days to Complete
              </Label>
              <Input
                type="number"
                placeholder="Enter number of days"
                min="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="calculator-input"
                data-testid="input-days"
              />
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
                  <SelectItem value="1.0">1.0x</SelectItem>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Listening Schedule</h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" data-testid="daily-time">
                  {results.dailyTime}
                </div>
                <div className="text-sm text-gray-600">Time needed per day</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700" data-testid="actual-time">
                    {results.actualTime}
                  </div>
                  <div className="text-xs text-gray-500">Actual listening time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600" data-testid="time-saved-daily">
                    {results.timeSavedDaily}
                  </div>
                  <div className="text-xs text-gray-500">Time saved daily</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
