"use client";

import { FormEvent, useState } from "react";
import { createAvatarUrl } from "@/lib/avatar";
import { supabase } from "@/lib/supabase";
import type { GuestbookEntry } from "@/types/guestbook";

type GuestbookFormProps = {
  onCreated: (entry: GuestbookEntry) => void;
};

export function GuestbookForm({ onCreated }: GuestbookFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage("메시지를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const avatarUrl = createAvatarUrl(`${trimmedName}-${Date.now()}`);
    const { data, error } = await supabase
      .from("guestbook")
      .insert({
        name: trimmedName,
        message: trimmedMessage,
        avatar_url: avatarUrl,
      })
      .select("id, name, message, avatar_url, created_at")
      .single();

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(`등록 중 문제가 생겼어요: ${error.message}`);
      return;
    }

    if (data) {
      onCreated(data);
      setName("");
      setMessage("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-soft backdrop-blur md:p-6"
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold text-emerald-700">Guestbook</p>
        <h2 className="text-2xl font-bold tracking-normal text-stone-950">
          짧은 안부를 남겨주세요
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-stone-600">이름</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={40}
            placeholder="예: 나영"
            className="mt-2 h-12 w-full rounded-md border border-stone-200 bg-stone-50 px-4 text-stone-950 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-stone-600">메시지</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={500}
            placeholder="포트폴리오를 보고 떠오른 생각을 적어주세요."
            className="mt-2 min-h-36 w-full resize-y rounded-md border border-stone-200 bg-stone-50 px-4 py-3 leading-7 text-stone-950 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 h-12 w-full rounded-md bg-stone-950 px-5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isSubmitting ? "등록 중..." : "등록하기"}
      </button>
    </form>
  );
}
