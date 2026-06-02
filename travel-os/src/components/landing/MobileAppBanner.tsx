"use client";

import { motion } from "framer-motion";

const FEATURES_LIST = [
  "Compare flights, trains, buses & ferries",
  "Real-time cashback activation",
  "Offline deal alerts",
  "1-tap price history charts",
];

const MOCK_RESULTS = [
  { airline: "easyJet", price: "£49", tag: "BEST DEAL" },
  { airline: "Ryanair", price: "£52", tag: "" },
  { airline: "Vueling", price: "£71", tag: "" },
];

export default function MobileAppBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-pink-600 py-16 sm:py-20">
      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute bottom-0 -left-10 h-60 w-60 rounded-full bg-pink-400 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Get the Travel OS app
            </h2>
            <p className="text-lg text-white/80 mb-6 max-w-md">
              Find the best travel deals from A to B, anywhere in the world, on your mobile or tablet.
              Compare flights, hotels, cashback &amp; hacks all in one search.
            </p>

            {/* App store buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                {
                  label: "Download on the",
                  store: "App Store",
                  path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
                },
                {
                  label: "Get it on",
                  store: "Google Play",
                  path: "M3.18 23.76c.31.17.66.22 1.02.14l12.56-7.17L13.5 12l-10.32 11.76zM20.5 10.28l-2.61-1.49-3.77 3.27 3.77 3.27 2.64-1.51c.75-.43.75-1.11-.03-1.54zM2.1.34C1.82.61 1.65 1.03 1.65 1.58v20.84c0 .55.17.97.46 1.23l.07.06 11.67-11.67v-.28L2.1.34zm11.4 11.4L2.23.47l12.56 7.17-3.29 4.1z",
                },
              ].map((btn, i) => (
                <motion.a
                  key={btn.store}
                  href="#"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current flex-shrink-0">
                    <path d={btn.path} />
                  </svg>
                  <div>
                    <div className="text-[10px] text-white/70 leading-none">{btn.label}</div>
                    <div className="text-sm font-bold leading-tight">{btn.store}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Features list */}
            <ul className="space-y-2">
              {FEATURES_LIST.map((feat, i) => (
                <motion.li
                  key={feat}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-2 text-sm text-white/80"
                >
                  <span className="text-pink-300">✓</span>
                  {feat}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Animated phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main phone — entrance + continuous float */}
              <motion.div
                initial={{ opacity: 0, y: 60, rotate: 6 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 rounded-[2.5rem] border-4 border-white/20 bg-white/10 backdrop-blur-sm p-3 shadow-2xl w-56"
              >
                {/* Float animation wrapper */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                <div className="rounded-[2rem] bg-white overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-black text-sm">TravelOS</span>
                      <span className="text-white/80 text-xs">✈</span>
                    </div>
                    <div className="bg-white/20 rounded-xl px-3 py-2">
                      <div className="text-white/60 text-xs">Where to?</div>
                      <div className="text-white text-sm font-semibold">London → Barcelona</div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    {MOCK_RESULTS.map((r, i) => (
                      <motion.div
                        key={r.airline}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                      >
                        <span className="text-xs font-semibold text-gray-700">{r.airline}</span>
                        <div className="flex items-center gap-1.5">
                          {r.tag && (
                            <span className="rounded-full bg-violet-100 text-violet-600 text-[9px] font-bold px-1.5 py-0.5">{r.tag}</span>
                          )}
                          <span className="text-sm font-black text-gray-900">{r.price}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                </motion.div>
              </motion.div>

              {/* Shadow phone */}
              <motion.div
                initial={{ opacity: 0, y: 60, rotate: 6 }}
                whileInView={{ opacity: 0.6, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-4 -right-4 z-0 rounded-[2.5rem] border-4 border-white/10 bg-white/5 w-56 h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
