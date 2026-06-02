"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const FEATURES = [
  {
    icon: "🔍",
    title: "Verified Deal Feed",
    description: "Every deal is confirmed by our AI agents and community before publication. Live status, last-verified timestamp, and confidence score on every listing.",
    highlight: "94% accuracy rate",
  },
  {
    icon: "🧮",
    title: "True Cost Calculator",
    description: "See the real all-in price before you book. Hidden fees, baggage costs, resort fees, transfers, and cashback offsets — all modelled automatically.",
    highlight: "Avg £127 in hidden fees exposed",
  },
  {
    icon: "💰",
    title: "Cashback Intelligence",
    description: "Instantly surface available cashback rates and voucher codes for every merchant, updated daily across Quidco, TopCashback, and Rakuten.",
    highlight: "Up to 12% back on hotels",
  },
  {
    icon: "🗺️",
    title: "Tourism Card Calculator",
    description: "Enter your planned attractions and we tell you exactly whether the city card saves you money — and by how much.",
    highlight: "20+ cities covered",
  },
  {
    icon: "🏆",
    title: "Loyalty Optimiser",
    description: "Track your Avios, Miles, and hotel points. Get personalised redemption recommendations and transfer bonus alerts so points never expire unused.",
    highlight: "Live now",
  },
  {
    icon: "🤝",
    title: "Community Intelligence",
    description: "Real travelers submit deals, hacks, and scam alerts. A trust-scored reputation system ensures quality. The more people contribute, the smarter it gets.",
    highlight: "12K+ active contributors",
  },
];

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3">
            Why Travel OS
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-4">
            Every tool a smart traveler needs
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Unlike Booking.com or Skyscanner, we earn when <em>you save</em> — not when you book. That changes everything.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(124,58,237,0.10)" }}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-violet-200 cursor-default"
            >
              <motion.div
                className="text-3xl mb-4 inline-block"
                whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{feature.description}</p>
              <span className="inline-block rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-semibold text-violet-600">
                {feature.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
