"use client";

import { useState, useCallback } from "react";

export function useSavedDeals() {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [pending, setPending] = useState<Set<string>>(new Set());

  const toggle = useCallback(async (dealId: string) => {
    if (pending.has(dealId)) return;
    const isSaved = saved.has(dealId);

    setPending((p) => new Set(p).add(dealId));
    // Optimistic update
    setSaved((s) => {
      const next = new Set(s);
      if (isSaved) next.delete(dealId); else next.add(dealId);
      return next;
    });

    try {
      const res = await fetch(
        isSaved ? `/api/save-deal?deal_id=${dealId}` : "/api/save-deal",
        {
          method: isSaved ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: isSaved ? undefined : JSON.stringify({ deal_id: dealId }),
        }
      );
      if (!res.ok) throw new Error("Failed");
    } catch {
      // Revert on failure
      setSaved((s) => {
        const next = new Set(s);
        if (isSaved) next.add(dealId); else next.delete(dealId);
        return next;
      });
    } finally {
      setPending((p) => { const next = new Set(p); next.delete(dealId); return next; });
    }
  }, [saved, pending]);

  return { saved, toggle, isSaved: (id: string) => saved.has(id) };
}
