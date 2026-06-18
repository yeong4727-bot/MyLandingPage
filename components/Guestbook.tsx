"use client";

import { useEffect, useState } from "react";
import { GuestbookForm } from "@/components/GuestbookForm";
import { GuestbookList } from "@/components/GuestbookList";
import { supabase } from "@/lib/supabase";
import type { GuestbookEntry } from "@/types/guestbook";

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadEntries() {
    setIsLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("guestbook")
      .select("id, name, message, avatar_url, created_at")
      .order("created_at", { ascending: false });

    setIsLoading(false);

    if (error) {
      setErrorMessage(`목록을 불러오지 못했습니다: ${error.message}`);
      return;
    }

    setEntries(data || []);
  }

  useEffect(() => {
    loadEntries();
  }, []);

  function handleCreated(entry: GuestbookEntry) {
    setEntries((currentEntries) => [entry, ...currentEntries]);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.18fr)]">
      <GuestbookForm onCreated={handleCreated} />

      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-stone-500">Messages</p>
            <h2 className="mt-1 text-2xl font-bold text-stone-950">
              방문자의 기록
            </h2>
          </div>
          <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm font-bold text-stone-500">
            {entries.length}개
          </span>
        </div>

        {errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <GuestbookList entries={entries} isLoading={isLoading} />
      </div>
    </section>
  );
}
