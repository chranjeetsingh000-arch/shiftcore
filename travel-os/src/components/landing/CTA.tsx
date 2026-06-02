"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-200 p-10 sm:p-16 text-center"
        >
          {/* Animated BG decoration */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-violet-100 blur-[80px]"
          />

          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-4"
            >
              Ready to save?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 mb-4"
            >
              Join 12,000+ travelers who{" "}
              <br className="hidden sm:block" />
              never overpay
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-500 max-w-xl mx-auto mb-10"
            >
              Free forever for core features. Start finding savings in the next 60 seconds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/auth/signup"
                  className="inline-block w-full sm:w-auto rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-10 py-4 text-base font-bold text-white shadow-xl shadow-violet-200 hover:shadow-violet-300 transition-shadow"
                >
                  Get Started Free →
                </Link>
              </motion.div>
              <Link
                href="/deals"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                View live deals first
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
