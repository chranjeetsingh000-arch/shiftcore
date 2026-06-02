export type DealStatus = "LIVE" | "COOLING" | "EXPIRED" | "UNVERIFIED";
export type DealType =
  | "flight"
  | "hotel"
  | "train"
  | "package"
  | "voucher"
  | "cashback";

export interface Deal {
  id: string;
  title: string;
  description: string;
  dealType: DealType;
  status: DealStatus;
  priceFrom: number;
  currency: string;
  originalPrice?: number;
  savingsPercent?: number;
  originCodes: string[];
  destinationCodes: string[];
  destinations: string[];
  conditions: string[];
  cashbackAvailable?: string;
  bookingUrl: string;
  verifiedCount: number;
  lastVerifiedMinutesAgo: number;
  expiresIn?: string;
  contributor: string;
  badge?: string;
}

export interface TourismCard {
  id: string;
  city: string;
  country: string;
  cardName: string;
  prices: { tier: string; price: number; duration: string }[];
  currency: string;
  includes: string[];
  topAttractions: { name: string; price: number; included: boolean }[];
  transport: boolean;
  freeCancellation: boolean;
  rating: number;
}

export interface CashbackOffer {
  id: string;
  merchant: string;
  category: string;
  rate: string;
  platform: string;
  verified: boolean;
  lastChecked: string;
  link: string;
  minSpend?: number;
}

export const DEALS: Deal[] = [
  {
    id: "1",
    title: "London → Tokyo Return",
    description:
      "British Airways return flights including 1 checked bag. Flexible dates available across April–May.",
    dealType: "flight",
    status: "LIVE",
    priceFrom: 489,
    currency: "GBP",
    originalPrice: 890,
    savingsPercent: 45,
    originCodes: ["LHR", "LGW"],
    destinationCodes: ["NRT", "HND"],
    destinations: ["Tokyo, Japan"],
    conditions: [
      "Travel Apr 3 – May 31",
      "Book by Mar 15",
      "Includes 1×23kg bag",
    ],
    cashbackAvailable: "Up to £18 cashback via TopCashback",
    bookingUrl: "#",
    verifiedCount: 94,
    lastVerifiedMinutesAgo: 12,
    expiresIn: "2 days",
    contributor: "DealHunter_Maya",
    badge: "🔥 Hot",
  },
  {
    id: "2",
    title: "Manchester → Barcelona Return",
    description:
      "Ryanair return. Hand luggage only. Multiple departure times available.",
    dealType: "flight",
    status: "LIVE",
    priceFrom: 38,
    currency: "GBP",
    originalPrice: 119,
    savingsPercent: 68,
    originCodes: ["MAN"],
    destinationCodes: ["BCN"],
    destinations: ["Barcelona, Spain"],
    conditions: ["Hand luggage only", "Travel May–Jun", "No seat selection"],
    cashbackAvailable: undefined,
    bookingUrl: "#",
    verifiedCount: 241,
    lastVerifiedMinutesAgo: 3,
    expiresIn: "18 hours",
    contributor: "FlightWatch_UK",
    badge: "⚡ Flash",
  },
  {
    id: "3",
    title: "London → New York Return",
    description:
      "Virgin Atlantic return, premium economy upgrade available for +£120. Direct flights both ways.",
    dealType: "flight",
    status: "LIVE",
    priceFrom: 319,
    currency: "GBP",
    originalPrice: 620,
    savingsPercent: 49,
    originCodes: ["LHR"],
    destinationCodes: ["JFK", "EWR"],
    destinations: ["New York, USA"],
    conditions: [
      "Travel Jun–Aug",
      "Book at least 3 weeks ahead",
      "1×23kg bag included",
    ],
    cashbackAvailable: "£24 cashback via Quidco",
    bookingUrl: "#",
    verifiedCount: 178,
    lastVerifiedMinutesAgo: 28,
    expiresIn: "5 days",
    contributor: "TransatDeals",
    badge: undefined,
  },
  {
    id: "4",
    title: "4★ Hotel Barcelona — City Centre",
    description:
      "Includes breakfast. 500m from La Sagrada Família. Free cancellation until 48h before.",
    dealType: "hotel",
    status: "LIVE",
    priceFrom: 62,
    currency: "GBP",
    originalPrice: 148,
    savingsPercent: 58,
    originCodes: [],
    destinationCodes: ["BCN"],
    destinations: ["Barcelona, Spain"],
    conditions: [
      "Per night, 2 adults",
      "Breakfast included",
      "Free cancellation",
      "No resort fee",
    ],
    cashbackAvailable: "8.5% cashback via TopCashback",
    bookingUrl: "#",
    verifiedCount: 67,
    lastVerifiedMinutesAgo: 45,
    expiresIn: "3 days",
    contributor: "HotelHunter_Priya",
    badge: "✅ Verified",
  },
  {
    id: "5",
    title: "London → Paris Eurostar Return",
    description:
      "Standard Premier seats. Door-to-door often faster than flying. Includes 2×checked bags.",
    dealType: "train",
    status: "LIVE",
    priceFrom: 78,
    currency: "GBP",
    originalPrice: 180,
    savingsPercent: 57,
    originCodes: ["STP"],
    destinationCodes: ["PAR"],
    destinations: ["Paris, France"],
    conditions: ["Travel Apr–Jun", "Standard Premier class", "Non-refundable"],
    cashbackAvailable: "10% cashback via Quidco",
    bookingUrl: "#",
    verifiedCount: 312,
    lastVerifiedMinutesAgo: 8,
    expiresIn: "1 day",
    contributor: "TrainDeals_EU",
    badge: "🚄 Train",
  },
  {
    id: "6",
    title: "20% off Booking.com — Selected Hotels",
    description:
      "Genius Level 2+ members get 20% off 5,000+ hotels globally. Stack with cashback for maximum saving.",
    dealType: "voucher",
    status: "LIVE",
    priceFrom: 0,
    currency: "GBP",
    originalPrice: undefined,
    savingsPercent: 20,
    originCodes: [],
    destinationCodes: [],
    destinations: ["Worldwide"],
    conditions: [
      "Genius Level 2+ required",
      "Selected properties only",
      "Stacks with cashback",
    ],
    cashbackAvailable: "Plus up to 12% cashback via TopCashback",
    bookingUrl: "#",
    verifiedCount: 892,
    lastVerifiedMinutesAgo: 60,
    expiresIn: "Ongoing",
    contributor: "VoucherVault",
    badge: "🎫 Code",
  },
  {
    id: "7",
    title: "Edinburgh → Amsterdam Return",
    description:
      "KLM direct return. Includes 1 cabin bag. Multiple date options through summer.",
    dealType: "flight",
    status: "COOLING",
    priceFrom: 94,
    currency: "GBP",
    originalPrice: 210,
    savingsPercent: 55,
    originCodes: ["EDI"],
    destinationCodes: ["AMS"],
    destinations: ["Amsterdam, Netherlands"],
    conditions: ["Travel May–Jul", "1×cabin bag", "Seat selection extra"],
    cashbackAvailable: "£6 cashback via Rakuten",
    bookingUrl: "#",
    verifiedCount: 44,
    lastVerifiedMinutesAgo: 180,
    expiresIn: "Expires soon",
    contributor: "ScotDeals",
    badge: undefined,
  },
  {
    id: "8",
    title: "5★ Maldives All-Inclusive — 7 Nights",
    description:
      "Water villa, all meals, water sports included. Flights not included. Shoulder season pricing.",
    dealType: "package",
    status: "LIVE",
    priceFrom: 1890,
    currency: "GBP",
    originalPrice: 3200,
    savingsPercent: 41,
    originCodes: [],
    destinationCodes: ["MLE"],
    destinations: ["Maldives"],
    conditions: [
      "Per person based on 2",
      "Flights not included",
      "Travel Sep–Oct",
      "All-inclusive",
    ],
    cashbackAvailable: "Up to £95 cashback via TopCashback",
    bookingUrl: "#",
    verifiedCount: 28,
    lastVerifiedMinutesAgo: 90,
    expiresIn: "4 days",
    contributor: "LuxuryDeals_James",
    badge: "🌴 Luxury",
  },
];

export const TOURISM_CARDS: TourismCard[] = [
  {
    id: "london",
    city: "London",
    country: "UK",
    cardName: "London Pass",
    currency: "GBP",
    prices: [
      { tier: "1 Day", price: 79, duration: "1 day" },
      { tier: "2 Days", price: 99, duration: "2 days" },
      { tier: "3 Days", price: 119, duration: "3 days" },
      { tier: "6 Days", price: 159, duration: "6 days" },
    ],
    includes: [
      "Tower of London",
      "Westminster Abbey",
      "St. Paul's Cathedral",
      "Kensington Palace",
      "Tower Bridge Exhibition",
      "Hampton Court Palace",
      "+80 more attractions",
    ],
    topAttractions: [
      { name: "Tower of London", price: 34, included: true },
      { name: "Westminster Abbey", price: 29, included: true },
      { name: "St. Paul's Cathedral", price: 23, included: true },
      { name: "Kensington Palace", price: 22, included: true },
      { name: "Tower Bridge Exhibition", price: 12, included: true },
    ],
    transport: false,
    freeCancellation: true,
    rating: 4.3,
  },
  {
    id: "paris",
    city: "Paris",
    country: "France",
    cardName: "Paris Museum Pass",
    currency: "EUR",
    prices: [
      { tier: "2 Days", price: 55, duration: "2 days" },
      { tier: "4 Days", price: 70, duration: "4 days" },
      { tier: "6 Days", price: 85, duration: "6 days" },
    ],
    includes: [
      "Louvre Museum",
      "Musée d'Orsay",
      "Versailles",
      "Pompidou Centre",
      "Sainte-Chapelle",
      "+50 museums & monuments",
    ],
    topAttractions: [
      { name: "Louvre Museum", price: 22, included: true },
      { name: "Musée d'Orsay", price: 16, included: true },
      { name: "Versailles", price: 21, included: true },
      { name: "Pompidou Centre", price: 15, included: true },
      { name: "Sainte-Chapelle", price: 13, included: true },
    ],
    transport: false,
    freeCancellation: false,
    rating: 4.5,
  },
  {
    id: "barcelona",
    city: "Barcelona",
    country: "Spain",
    cardName: "Barcelona Card",
    currency: "EUR",
    prices: [
      { tier: "3 Days", price: 45, duration: "3 days" },
      { tier: "4 Days", price: 55, duration: "4 days" },
      { tier: "5 Days", price: 60, duration: "5 days" },
    ],
    includes: [
      "Unlimited metro & buses",
      "Airport bus (Aerobús)",
      "MNAC Museum",
      "Barcelona History Museum",
      "Discounts at 100+ venues",
    ],
    topAttractions: [
      { name: "Sagrada Família", price: 26, included: false },
      { name: "Park Güell", price: 10, included: false },
      { name: "MNAC Museum", price: 12, included: true },
      { name: "Picasso Museum", price: 14, included: false },
      { name: "Unlimited transport", price: 12, included: true },
    ],
    transport: true,
    freeCancellation: true,
    rating: 4.1,
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    cardName: "Amsterdam City Card",
    currency: "EUR",
    prices: [
      { tier: "24 Hours", price: 65, duration: "1 day" },
      { tier: "48 Hours", price: 85, duration: "2 days" },
      { tier: "72 Hours", price: 100, duration: "3 days" },
      { tier: "96 Hours", price: 115, duration: "4 days" },
    ],
    includes: [
      "Unlimited public transport",
      "Rijksmuseum",
      "Van Gogh Museum",
      "Stedelijk Museum",
      "Anne Frank House (reservation required)",
      "+40 museums free",
    ],
    topAttractions: [
      { name: "Rijksmuseum", price: 22.5, included: true },
      { name: "Van Gogh Museum", price: 22, included: true },
      { name: "Stedelijk Museum", price: 20, included: true },
      { name: "Unlimited transport", price: 9, included: true },
      { name: "Anne Frank House", price: 16, included: true },
    ],
    transport: true,
    freeCancellation: false,
    rating: 4.6,
  },
];

export const CASHBACK_OFFERS: CashbackOffer[] = [
  {
    id: "1",
    merchant: "Booking.com",
    category: "Hotels",
    rate: "Up to 12%",
    platform: "TopCashback",
    verified: true,
    lastChecked: "2 hours ago",
    link: "#",
  },
  {
    id: "2",
    merchant: "Expedia",
    category: "Hotels & Flights",
    rate: "Up to 8%",
    platform: "Quidco",
    verified: true,
    lastChecked: "3 hours ago",
    link: "#",
  },
  {
    id: "3",
    merchant: "Trainline",
    category: "Rail",
    rate: "Up to 3.5%",
    platform: "TopCashback",
    verified: true,
    lastChecked: "1 hour ago",
    link: "#",
  },
  {
    id: "4",
    merchant: "DFDS Ferries",
    category: "Ferries",
    rate: "Up to 5%",
    platform: "Quidco",
    verified: true,
    lastChecked: "5 hours ago",
    link: "#",
  },
  {
    id: "5",
    merchant: "Rentalcars.com",
    category: "Car Hire",
    rate: "Up to 9%",
    platform: "Rakuten",
    verified: true,
    lastChecked: "4 hours ago",
    link: "#",
  },
  {
    id: "6",
    merchant: "Eurostar",
    category: "Rail",
    rate: "Up to 10%",
    platform: "Quidco",
    verified: true,
    lastChecked: "2 hours ago",
    link: "#",
  },
];
