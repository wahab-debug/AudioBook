import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { addMinutesToTime, timeToMinutes } from "@/lib/calculator-utils";

export default function FinishedHourCalculator() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [startTime, setStartTime] = useState("");
  const [speed, setSpeed] = useState("1.0");
  const [finishedTime, setFinishedTime] = useState("");

  const calculate = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;

    if ((h === 0 && m === 0) || !startTime) {
      alert('Please enter audiobook length and start time');
      return;
    }

    const totalMinutes = timeToMinutes(h, m);
    const listeningMinutes = Math.round(totalMinutes / parseFloat(speed));
    const finishTime = addMinutesToTime(startTime, listeningMinutes);
    
    setFinishedTime(finishTime);
  };

  const reset = () => {
    setHours("");
    setMinutes("");
    setStartTime("");
    setSpeed("1.0");
    setFinishedTime("");
  };

  const exampleData = [
    { startTime: "9:00 AM", length: "8 hours", speed: "1.0x", finishTime: "5:00 PM" },
    { startTime: "9:00 AM", length: "8 hours", speed: "1.5x", finishTime: "2:20 PM" },
    { startTime: "9:00 AM", length: "8 hours", speed: "2.0x", finishTime: "1:00 PM" },
    { startTime: "12:00 PM", length: "10 hours", speed: "1.0x", finishTime: "10:00 PM" },
    { startTime: "12:00 PM", length: "10 hours", speed: "1.25x", finishTime: "7:48 PM" },
  ];

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audiobook Finished Hour Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Find out exactly when you'll finish your audiobook
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="finished-hour-calculator">
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
                Starting Time (24-hour format)
              </Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="calculator-input"
                data-testid="input-start-time"
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

          {finishedTime && (
            <div className="mt-8 results-card" data-testid="results">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Finished Time</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary" data-testid="finished-time">
                  {finishedTime}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Example Table */}
        <Card className="mt-12 calculator-card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Sample Finish Times with Different Playback Speeds
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Start Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Audiobook Length</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Playback Speed</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Estimated Finish Time</th>
                </tr>
              </thead>
              <tbody>
                {exampleData.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{row.startTime}</td>
                    <td className="py-3 px-4">{row.length}</td>
                    <td className="py-3 px-4">{row.speed}</td>
                    <td className="py-3 px-4 font-semibold text-primary">{row.finishTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Related Calculators */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Like This Calculator? Explore The Rest Now!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/time-left">
              <div className="block bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors" data-testid="related-time-left">
                <h4 className="font-medium text-primary">Time Left Calculator</h4>
                <p className="text-sm text-gray-600">Know exactly how much listening time remains</p>
              </div>
            </Link>
            <Link href="/price">
              <div className="block bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors" data-testid="related-price">
                <h4 className="font-medium text-primary">Price Calculator</h4>
                <p className="text-sm text-gray-600">Find the perfect price for your audiobook</p>
              </div>
            </Link>
            <Link href="/time-per-day">
              <div className="block bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors" data-testid="related-time-per-day">
                <h4 className="font-medium text-primary">Time Per Day Calculator</h4>
                <p className="text-sm text-gray-600">Plan your listening for perfect timing</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
