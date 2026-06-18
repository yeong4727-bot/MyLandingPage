import { Guestbook } from "@/components/Guestbook";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-stone-950">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">
            Portfolio Note
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-normal text-stone-950 md:text-6xl">
            작업의 온도를 남기는 작은 방명록
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 md:text-lg">
            포트폴리오를 둘러본 뒤 남기는 짧은 문장을 Supabase에 저장하고,
            최신 메시지부터 조용히 쌓아 보여줍니다.
          </p>
        </header>

        <Guestbook />
      </section>
    </main>
  );
}
