"use client";

import { useState, useCallback } from "react";
import { CASHBACK_OFFERS } from "@/lib/data";

interface CostBreakdown {
  flightBase: number;
  flightBaggage: number;
  flightExtras: number;
  accommodation: number;
  accommodationFees: number;
  transferFrom: number;
  transferTo: number;
  localTransport: number;
  activities: number;
  food: number;
  cashbackSaving: number;
  totalBeforeCashback: number;
  totalAfterCashback: number;
  vsDisplayed: number;
}

const DESTINATIONS = [
  { value: "barcelona", label: "Barcelona 🇪🇸", flightBase: 89, transfer: 5.5, localDay: 8, foodDay: 35 },
  { value: "paris", label: "Paris 🇫🇷", flightBase: 78, transfer: 12, localDay: 7, foodDay: 45 },
  { value: "amsterdam", label: "Amsterdam 🇳🇱", flightBase: 94, transfer: 9, localDay: 8, foodDay: 40 },
  { value: "tokyo", label: "Tokyo 🇯🇵", flightBase: 489, transfer: 18, localDay: 10, foodDay: 50 },
  { value: "new_york", label: "New York 🇺🇸", flightBase: 319, transfer: 40, localDay: 15, foodDay: 80 },
  { value: "lisbon", label: "Lisbon 🇵🇹", flightBase: 68, transfer: 8, localDay: 6, foodDay: 30 },
];

const ACCOMMODATION_TYPES = [
  { value: "hostel", label: "Hostel", pricePerNight: 18, resortFee: 0 },
  { value: "budget", label: "Budget Hotel (2★)", pricePerNight: 55, resortFee: 0 },
  { value: "mid", label: "Mid-Range (3★)", pricePerNight: 90, resortFee: 0 },
  { value: "business", label: "Business (4★)", pricePerNight: 145, resortFee: 25 },
  { value: "luxury", label: "Luxury (5★)", pricePerNight: 280, resortFee: 45 },
  { value: "airbnb", label: "Airbnb / Apartment", pricePerNight: 75, resortFee: 0 },
];

function CostRow({
  label,
  amount,
  currency = "£",
  highlight = false,
  saving = false,
  sub,
}: {
  label: string;
  amount: number;
  currency?: string;
  highlight?: boolean;
  saving?: boolean;
  sub?: string;
}) {
  if (amount === 0 && !highlight) return null;
  return (
    <div
      className={`flex items-center justify-between py-2.5 ${highlight ? "border-t border-slate-700 mt-1" : "border-b border-slate-800/50"}`}
    >
      <div>
        <span
          className={`text-sm ${highlight ? "font-bold text-slate-100" : "text-slate-400"}`}
        >
          {label}
        </span>
        {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
      </div>
      <span
        className={`text-sm font-bold tabular-nums ${
          saving
            ? "text-emerald-400"
            : highlight
              ? "text-slate-100 text-base"
              : "text-slate-300"
        }`}
      >
        {saving ? "-" : ""}
        {currency}
        {amount.toFixed(0)}
      </span>
    </div>
  );
}

export default function TripCostCalculator() {
  const [destination, setDestination] = useState("barcelona");
  const [nights, setNights] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [accommodation, setAccommodation] = useState("mid");
  const [checkedBags, setCheckedBags] = useState(0);
  const [hasCashback, setHasCashback] = useState(true);
  const [calculated, setCalculated] = useState(false);
  const [breakdown, setBreakdown] = useState<CostBreakdown | null>(null);

  const calculate = useCallback(() => {
    const dest = DESTINATIONS.find((d) => d.value === destination)!;
    const acc = ACCOMMODATION_TYPES.find((a) => a.value === accommodation)!;

    const flightBase = dest.flightBase * travelers;
    const flightBaggage = checkedBags * 35 * travelers;
    const flightExtras = travelers * 8; // seat selection estimate

    const accommodationNightly = acc.pricePerNight * nights;
    const accommodationFees = acc.resortFee * nights;

    const transferFrom = dest.transfer * travelers;
    const transferTo = dest.transfer * travelers;
    const localTransport = dest.localDay * nights * travelers * 0.6;
    const activities = nights * 25 * travelers * 0.4;
    const food = dest.foodDay * nights * travelers;

    const subtotal =
      flightBase +
      flightBaggage +
      flightExtras +
      accommodationNightly +
      accommodationFees +
      transferFrom +
      transferTo +
      localTransport +
      activities +
      food;

    const cashbackSaving = hasCashback
      ? Math.round((accommodationNightly * 0.085 + flightBase * 0.02) * 10) / 10
      : 0;

    const displayedPrice = flightBase + accommodationNightly;

    setBreakdown({
      flightBase,
      flightBaggage,
      flightExtras,
      accommodation: accommodationNightly,
      accommodationFees,
      transferFrom,
      transferTo,
      localTransport,
      activities,
      food,
      cashbackSaving,
      totalBeforeCashback: subtotal,
      totalAfterCashback: subtotal - cashbackSaving,
      vsDisplayed: subtotal - cashbackSaving - displayedPrice,
    });
    setCalculated(true);
  }, [destination, nights, travelers, accommodation, checkedBags, hasCashback]);

  return (
    <section id="calculator" className="py-20 sm:py-28 border-t border-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            True Cost Calculator
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100 mb-4">
            What does your trip really cost?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Booking platforms show you flights and hotels. We show you the
            truth — including baggage fees, resort fees, transfers, and
            cashback you could be earning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Input panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <h3 className="text-lg font-bold text-slate-100">Trip Details</h3>

            {/* Destination */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.value} value={d.value} className="bg-slate-900">
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Nights + Travelers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Nights
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNights(Math.max(1, nights - 1))}
                    className="h-10 w-10 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 transition-colors font-bold text-lg flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-xl font-black text-slate-100 w-8 text-center tabular-nums">
                    {nights}
                  </span>
                  <button
                    onClick={() => setNights(Math.min(30, nights + 1))}
                    className="h-10 w-10 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 transition-colors font-bold text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Travelers
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="h-10 w-10 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 transition-colors font-bold text-lg flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-xl font-black text-slate-100 w-8 text-center tabular-nums">
                    {travelers}
                  </span>
                  <button
                    onClick={() => setTravelers(Math.min(10, travelers + 1))}
                    className="h-10 w-10 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 transition-colors font-bold text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Accommodation */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Accommodation Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ACCOMMODATION_TYPES.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAccommodation(a.value)}
                    className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                      accommodation === a.value
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-xs font-semibold">{a.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      ~£{a.pricePerNight}/night
                      {a.resortFee > 0 && (
                        <span className="text-amber-500/80">
                          {" "}
                          +£{a.resortFee} fee
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Checked bags */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Checked Bags per Person
              </label>
              <div className="flex gap-2">
                {[0, 1, 2].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCheckedBags(n)}
                    className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                      checkedBags === n
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {n === 0 ? "Carry-on" : n === 1 ? "1 bag" : "2 bags"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cashback toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`relative h-6 w-11 rounded-full transition-colors ${hasCashback ? "bg-emerald-500" : "bg-slate-700"}`}
                onClick={() => setHasCashback(!hasCashback)}
              >
                <div
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${hasCashback ? "left-6" : "left-1"}`}
                />
              </div>
              <span className="text-sm font-medium text-slate-300">
                Apply available cashback
              </span>
            </label>

            <button
              onClick={calculate}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:scale-[1.02]"
            >
              Calculate True Trip Cost →
            </button>
          </div>

          {/* Results panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            {!calculated || !breakdown ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="text-5xl mb-4">🧮</div>
                <h3 className="text-lg font-bold text-slate-300 mb-2">
                  Fill in your trip details
                </h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  We&apos;ll calculate the true all-in cost including every fee
                  the booking platform doesn&apos;t show you.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-4">
                  True Cost Breakdown
                </h3>

                {/* Warning banner */}
                {breakdown.vsDisplayed > 0 && (
                  <div className="flex items-start gap-3 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 mb-5">
                    <span className="text-lg">⚠️</span>
                    <div>
                      <p className="text-sm font-bold text-amber-400">
                        £{breakdown.vsDisplayed.toFixed(0)} more than advertised
                      </p>
                      <p className="text-xs text-amber-400/70 mt-0.5">
                        Booking platforms typically show only flight + hotel
                        base rate. Your real cost includes all items below.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Flights
                  </p>
                  <CostRow label="Flight base (cheapest found)" amount={breakdown.flightBase} />
                  <CostRow label="Checked baggage fees" amount={breakdown.flightBaggage} sub={checkedBags > 0 ? `${checkedBags} bag × ${travelers} traveler × ~£35` : undefined} />
                  <CostRow label="Seat selection (estimate)" amount={breakdown.flightExtras} />

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mt-4 mb-2">
                    Accommodation
                  </p>
                  <CostRow label={`${nights} nights × base rate`} amount={breakdown.accommodation} />
                  <CostRow label="Resort / destination fees" amount={breakdown.accommodationFees} sub={breakdown.accommodationFees > 0 ? "Often not shown at search stage" : undefined} />

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mt-4 mb-2">
                    Getting Around
                  </p>
                  <CostRow label="Airport transfers (×2)" amount={breakdown.transferFrom + breakdown.transferTo} />
                  <CostRow label="Local transport (estimate)" amount={breakdown.localTransport} />

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mt-4 mb-2">
                    On the Ground
                  </p>
                  <CostRow label="Activities / attractions" amount={breakdown.activities} />
                  <CostRow label="Food & drink (estimate)" amount={breakdown.food} />

                  <CostRow
                    label="Subtotal before savings"
                    amount={breakdown.totalBeforeCashback}
                    highlight
                  />

                  {breakdown.cashbackSaving > 0 && (
                    <CostRow
                      label="💰 Cashback saving"
                      amount={breakdown.cashbackSaving}
                      saving
                      sub="Via TopCashback / Quidco"
                    />
                  )}

                  <div className="mt-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-400">
                        True Total Cost
                      </span>
                      <span className="text-2xl font-black text-emerald-400">
                        £{breakdown.totalAfterCashback.toFixed(0)}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400/60 mt-1.5">
                      Per person: £
                      {(breakdown.totalAfterCashback / travelers).toFixed(0)}
                    </p>
                  </div>
                </div>

                {/* Cashback tip */}
                <div className="mt-5 rounded-xl border border-slate-700 bg-slate-800/40 p-4">
                  <p className="text-xs font-semibold text-slate-300 mb-2">
                    💡 Available cashback for this trip
                  </p>
                  {CASHBACK_OFFERS.slice(0, 3).map((offer) => (
                    <div
                      key={offer.id}
                      className="flex items-center justify-between py-1.5 border-b border-slate-700/40 last:border-0"
                    >
                      <div>
                        <span className="text-xs font-medium text-slate-300">
                          {offer.merchant}
                        </span>
                        <span className="text-[10px] text-slate-500 ml-2">
                          via {offer.platform}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">
                        {offer.rate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
