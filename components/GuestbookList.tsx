"use client";

import { createAvatarUrl } from "@/lib/avatar";
import type { GuestbookEntry } from "@/types/guestbook";

type GuestbookListProps = {
  entries: GuestbookEntry[];
  isLoading: boolean;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function GuestbookList({ entries, isLoading }: GuestbookListProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-stone-200 bg-white/80 p-6 text-sm font-semibold text-stone-500 shadow-soft">
        방명록을 불러오는 중입니다...
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-white/70 p-8 text-center shadow-soft">
        <p className="text-lg font-bold text-stone-900">아직 글이 없어요.</p>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          첫 메시지를 남기면 이곳에 최신순으로 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <article
          key={entry.id}
          className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-soft backdrop-blur"
        >
          <div className="flex items-start gap-4">
            <img
              src={entry.avatar_url || createAvatarUrl(entry.name)}
              alt={`${entry.name} avatar`}
              className="h-12 w-12 shrink-0 rounded-full border border-stone-200 bg-stone-100"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="break-words text-base font-bold text-stone-950">
                  {entry.name}
                </h3>
                <time
                  dateTime={entry.created_at}
                  className="text-xs font-semibold text-stone-400"
                >
                  {formatDate(entry.created_at)}
                </time>
              </div>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-stone-600">
                {entry.message}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
