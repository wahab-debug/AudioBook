import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Calculator, RotateCcw } from "lucide-react";
import CalculatorGrid from "@/components/calculator-grid";
import { formatTime, timeToMinutes } from "@/lib/calculator-utils";

export default function Home() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [speed, setSpeed] = useState([1.0]);
  const [results, setResults] = useState<{
    listeningTime: string;
    timeSaved: string;
  } | null>(null);

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value);
  };

  const adjustSpeed = (delta: number) => {
    const newSpeed = Math.max(0.5, Math.min(2.0, speed[0] + delta));
    setSpeed([Number(newSpeed.toFixed(1))]);
  };

  const calculate = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;

    if (h === 0 && m === 0) {
      alert('Please enter audiobook length');
      return;
    }

    const totalMinutes = timeToMinutes(h, m);
    const listeningMinutes = Math.round(totalMinutes / speed[0]);
    const savedMinutes = totalMinutes - listeningMinutes;

    const listeningHours = Math.floor(listeningMinutes / 60);
    const listeningMins = listeningMinutes % 60;

    const savedHours = Math.floor(savedMinutes / 60);
    const savedMins = savedMinutes % 60;

    setResults({
      listeningTime: formatTime(listeningHours, listeningMins),
      timeSaved: speed[0] > 1 ? formatTime(savedHours, savedMins) : '--'
    });
  };

  const reset = () => {
    setHours("");
    setMinutes("");
    setSpeed([1.0]);
    setResults(null);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Audiobook Calculators</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Optimize your audiobook listening experience with precision
          </p>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Try the Most Popular Audiobook Calculator
            </h2>
            <p className="text-lg text-gray-600">
              Calculate your listening time and time saved with different playback speeds
            </p>
          </div>

          <Card className="calculator-card max-w-2xl mx-auto" data-testid="main-calculator">
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
                  Playback Speed
                </Label>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustSpeed(-0.1)}
                    className="w-10 h-10"
                    data-testid="speed-minus"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Slider
                      value={speed}
                      onValueChange={handleSpeedChange}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                      data-testid="speed-slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.5x</span>
                      <span>1.0x</span>
                      <span>1.5x</span>
                      <span>2.0x</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustSpeed(0.1)}
                    className="w-10 h-10"
                    data-testid="speed-plus"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg font-semibold text-primary" data-testid="speed-display">
                    {speed[0].toFixed(1)}x
                  </span>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary" data-testid="listening-time">
                      {results.listeningTime}
                    </div>
                    <div className="text-sm text-gray-600">Total Listening Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600" data-testid="time-saved">
                      {results.timeSaved}
                    </div>
                    <div className="text-sm text-gray-600">Time Saved</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* All Calculators Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover All Audiobook Calculators We Offer
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools for every aspect of your audiobook experience
            </p>
          </div>
          <CalculatorGrid />
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Maximize Your Audiobook Experience
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Whether you're a casual listener or an audiobook enthusiast, understanding how to manage your listening time 
            can take your audiobook experience to the next level. That's where our suite of audiobook calculators comes in. 
            Each calculator is designed to help you plan, track, and optimize your audiobook sessions with ease.
          </p>
        </div>
      </section>
    </div>
  );
}
