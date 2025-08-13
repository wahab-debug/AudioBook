import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator, RotateCcw } from "lucide-react";
import { timeToMinutes } from "@/lib/calculator-utils";

export default function TimeToPageCalculator() {
  const [totalPages, setTotalPages] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [currentHours, setCurrentHours] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState("");
  const [results, setResults] = useState<{
    currentPage: number;
    pagesPerHour: number;
  } | null>(null);

  const calculate = () => {
    const pages = parseInt(totalPages) || 0;
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const cH = parseInt(currentHours) || 0;
    const cM = parseInt(currentMinutes) || 0;

    if (pages <= 0 || (h === 0 && m === 0)) {
      alert('Please enter total pages and audiobook length');
      return;
    }

    const totalTime = timeToMinutes(h, m);
    const currentTime = timeToMinutes(cH, cM);
    
    const pagesPerMinute = pages / totalTime;
    const currentPage = Math.round(currentTime * pagesPerMinute);
    const pagesPerHour = Math.round(pagesPerMinute * 60);

    setResults({
      currentPage: Math.min(currentPage, pages),
      pagesPerHour
    });
  };

  const reset = () => {
    setTotalPages("");
    setHours("");
    setMinutes("");
    setCurrentHours("");
    setCurrentMinutes("");
    setResults(null);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audiobook Time to Page Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Convert audiobook time to page numbers
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="time-to-page-calculator">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Total Book Pages
              </Label>
              <Input
                type="number"
                placeholder="Enter total pages"
                min="1"
                value={totalPages}
                onChange={(e) => setTotalPages(e.target.value)}
                className="calculator-input"
                data-testid="input-total-pages"
              />
            </div>

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
                Current Listening Time
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Hours"
                  min="0"
                  value={currentHours}
                  onChange={(e) => setCurrentHours(e.target.value)}
                  className="calculator-input"
                  data-testid="input-current-hours"
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  min="0"
                  max="59"
                  value={currentMinutes}
                  onChange={(e) => setCurrentMinutes(e.target.value)}
                  className="calculator-input"
                  data-testid="input-current-minutes"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Conversion Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="current-page">
                    {results.currentPage}
                  </div>
                  <div className="text-sm text-gray-600">Current Page</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600" data-testid="pages-per-hour">
                    {results.pagesPerHour}
                  </div>
                  <div className="text-sm text-gray-600">Pages per Hour</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
