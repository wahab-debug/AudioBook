import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator, RotateCcw } from "lucide-react";

export default function PriceCalculator() {
  const [length, setLength] = useState("");
  const [quality, setQuality] = useState("standard");
  const [narrator, setNarrator] = useState("experienced");
  const [market, setMarket] = useState("mid");
  const [results, setResults] = useState<{
    priceRange: string;
    basePrice: number;
    qualityMultiplier: number;
    narratorMultiplier: number;
  } | null>(null);

  const calculate = () => {
    const audioLength = parseFloat(length) || 0;

    if (audioLength <= 0) {
      alert('Please enter audiobook length');
      return;
    }

    let basePrice = 8; // Base price per hour

    // Quality multipliers
    const qualityMultipliers: Record<string, number> = {
      'basic': 0.7,
      'standard': 1.0,
      'premium': 1.4
    };

    // Narrator multipliers
    const narratorMultipliers: Record<string, number> = {
      'new': 0.8,
      'experienced': 1.0,
      'celebrity': 1.8
    };

    // Market multipliers
    const marketMultipliers: Record<string, number> = {
      'budget': 0.8,
      'mid': 1.0,
      'premium': 1.3
    };

    const qualityMult = qualityMultipliers[quality];
    const narratorMult = narratorMultipliers[narrator];
    const marketMult = marketMultipliers[market];

    const finalPrice = basePrice * qualityMult * narratorMult * marketMult * audioLength;
    const lowPrice = Math.round(finalPrice * 0.9);
    const highPrice = Math.round(finalPrice * 1.1);

    setResults({
      priceRange: `$${lowPrice} - $${highPrice}`,
      basePrice,
      qualityMultiplier: qualityMult,
      narratorMultiplier: narratorMult
    });
  };

  const reset = () => {
    setLength("");
    setQuality("standard");
    setNarrator("experienced");
    setMarket("mid");
    setResults(null);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audiobook Price Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect price for your audiobook
          </p>
        </div>

        <Card className="calculator-card max-w-2xl mx-auto" data-testid="price-calculator">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Audiobook Length (hours)
              </Label>
              <Input
                type="number"
                placeholder="Enter length in hours"
                min="0"
                step="0.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="calculator-input"
                data-testid="input-length"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Production Quality
              </Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="calculator-input" data-testid="select-quality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (Home Recording)</SelectItem>
                  <SelectItem value="standard">Standard (Professional Recording)</SelectItem>
                  <SelectItem value="premium">Premium (Studio Quality)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Narrator Experience
              </Label>
              <Select value={narrator} onValueChange={setNarrator}>
                <SelectTrigger className="calculator-input" data-testid="select-narrator">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Narrator</SelectItem>
                  <SelectItem value="experienced">Experienced Narrator</SelectItem>
                  <SelectItem value="celebrity">Celebrity/Famous Narrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Market Position
              </Label>
              <Select value={market} onValueChange={setMarket}>
                <SelectTrigger className="calculator-input" data-testid="select-market">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget-Friendly</SelectItem>
                  <SelectItem value="mid">Mid-Market</SelectItem>
                  <SelectItem value="premium">Premium Pricing</SelectItem>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Price Range</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary" data-testid="price-range">
                  {results.priceRange}
                </div>
                <div className="text-sm text-gray-600 mt-2">Based on your specifications</div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Price Breakdown</h4>
                <div className="text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Base price per hour:</span>
                    <span data-testid="base-price">${results.basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality multiplier:</span>
                    <span data-testid="quality-multiplier">{results.qualityMultiplier}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Narrator multiplier:</span>
                    <span data-testid="narrator-multiplier">{results.narratorMultiplier}x</span>
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
