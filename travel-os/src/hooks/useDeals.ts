"use client";

import { useState, useEffect, useCallback } from "react";

interface Deal {
  id: string;
  title: string;
  dealType: string;
  status: string;
  priceFrom: number;
  currency: string;
  [key: string]: unknown;
}

interface UseDealsOptions {
  type?: string;
  origin?: string;
  status?: string;
  limit?: number;
}

export function useDeals(options: UseDealsOptions = {}) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options.type) params.set("type", options.type);
      if (options.origin) params.set("origin", options.origin);
      if (options.status) params.set("status", options.status);
      if (options.limit) params.set("limit", String(options.limit));

      const res = await fetch(`/api/deals?${params}`);
      if (!res.ok) throw new Error("Failed to fetch deals");
      const data = await res.json();
      setDeals(data.deals);
      setTotal(data.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [options.type, options.origin, options.status, options.limit]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { deals, total, loading, error, refetch: fetch_ };
}
