<script lang="ts">
  import { route } from "@mateothegreat/svelte5-router";
  import { authClient } from "../lib/auth-client";
  import { fade, fly } from "svelte/transition";

  const session = authClient.useSession();

  const quickActions = [
    {
      title: "Campus Map",
      description: "Find departments, offices, and facilities instantly.",
      href: "/map",
      icon: "map",
    },
    {
      title: "Clubs",
      description: "Discover communities, projects, and student initiatives.",
      href: "/clubs",
      icon: "users",
    },
    {
      title: "Events",
      description: "Track workshops, competitions, and campus activities.",
      href: "/events",
      icon: "calendar",
    },
    {
      title: "Books",
      description: "Buy, sell, and explore shared study resources.",
      href: "/books",
      icon: "book",
    },
    {
      title: "Notices",
      description: "Get latest campus announcements in one place.",
      href: "/notices",
      icon: "notice",
    },
    {
      title: "Global Search",
      description: "Search everything from one smart command bar.",
      href: "/search?q=dean%20office",
      icon: "search",
    },
  ] as const;

  const stats = [
    { label: "Mapped Campus Spots", value: "100+" },
    { label: "Student Utility Modules", value: "8" },
    { label: "Unified Search Domains", value: "5" },
  ];

  function iconType(actionIcon: (typeof quickActions)[number]["icon"]) {
    return actionIcon;
  }
</script>

<div class="relative min-h-[calc(100vh-4rem)] overflow-hidden">
  <div
    class="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue-300/15 blur-3xl"
  ></div>

  <section
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16"
  >
    <div
      class="rounded-4xl border border-cyan-100/80 bg-white/70 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_-45px_rgba(2,132,199,0.85)]"
    >
      <div
        class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center"
      >
        <div class="space-y-8" in:fly={{ y: 12, duration: 350 }}>
          <p
            class="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-700 shadow-sm"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Student Productivity Layer
          </p>

          <div class="space-y-4">
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]"
            >
              Your Campus,
              <span
                class="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600"
                >fully connected</span
              >
            </h1>
            <p
              class="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              Smart Pulchowk brings maps, clubs, books, events, and notices into
              one fast interface so students can move quicker and plan better.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              use:route
              href="/map"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-white font-bold bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
            >
              Open Map
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {#if $session.isPending}
              <div
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/90 border border-slate-200 text-slate-700 font-bold min-w-44"
              >
                <div
                  class="w-5 h-5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin"
                ></div>
              </div>
            {:else if $session.data?.user}
              <a
                use:route
                href="/dashboard"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/90 border border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-all hover:-translate-y-0.5"
              >
                Go to Dashboard
              </a>
            {:else}
              <a
                href="/register"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/90 border border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-all hover:-translate-y-0.5"
              >
                Create Account
              </a>
            {/if}
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl"
            in:fade={{ duration: 450 }}
          >
            {#each stats as stat}
              <div
                class="rounded-2xl border border-cyan-100/70 bg-white/85 backdrop-blur-sm p-4 shadow-sm"
              >
                <p class="text-2xl font-black text-slate-900">{stat.value}</p>
                <p class="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            {/each}
          </div>
        </div>

        <div
          class="rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl p-4 sm:p-5 shadow-[0_25px_70px_-45px_rgba(8,47,73,0.8)]"
          in:fly={{ y: 20, duration: 380 }}
        >
          <div
            class="rounded-2xl border border-cyan-100/90 bg-[radial-gradient(130%_120%_at_10%_0%,rgba(14,165,233,0.14),rgba(255,255,255,0.9)_48%,rgba(59,130,246,0.1)_100%)] p-5"
          >
            <p
              class="text-xs font-black uppercase tracking-[0.2em] text-cyan-700"
            >
              Live Control Panel
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-900">
              Campus Mission Control
            </h2>
            <p class="mt-2 text-sm text-slate-600">
              Start from one screen, then branch into the module you need in
              seconds.
            </p>

            <div class="mt-5 space-y-3">
              <a
                use:route
                href="/search?q=dean%20office"
                class="group flex items-center justify-between rounded-xl bg-white/90 border border-slate-200 px-4 py-3 hover:bg-cyan-50 transition"
              >
                <div>
                  <p class="text-sm font-black text-slate-900">
                    Try global search
                  </p>
                  <p class="text-xs text-slate-500">
                    Example: dean office, robotics, notices
                  </p>
                </div>
                <svg
                  class="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a
                use:route
                href="/events"
                class="group flex items-center justify-between rounded-xl bg-white/90 border border-slate-200 px-4 py-3 hover:bg-cyan-50 transition"
              >
                <div>
                  <p class="text-sm font-black text-slate-900">
                    Check upcoming events
                  </p>
                  <p class="text-xs text-slate-500">
                    Workshops, talks, and technical meetups
                  </p>
                </div>
                <svg
                  class="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-18 lg:pb-24">
    <div class="mb-7">
      <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        Explore Modules
      </p>
      <h2 class="mt-2 text-3xl sm:text-4xl font-black text-slate-900">
        Everything you need for campus life
      </h2>
    </div>

    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
      {#each quickActions as action, index (action.title)}
        <a
          use:route
          href={action.href}
          class="group relative overflow-hidden rounded-2xl border border-cyan-100/80 bg-white/80 backdrop-blur-sm p-5 transition-all hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_20px_45px_-35px_rgba(2,132,199,0.85)]"
          in:fly={{ y: 10, duration: 320, delay: index * 30 }}
        >
          <div
            class="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-cyan-500/70 via-blue-500/65 to-indigo-500/55"
          ></div>
          <div class="relative flex items-start justify-between gap-3 mt-2">
            <div
              class="w-11 h-11 rounded-xl bg-white/90 border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm group-hover:text-cyan-700 group-hover:border-cyan-200 transition-colors"
            >
              {#if iconType(action.icon) === "map"}
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.7 8.3A5.7 5.7 0 116.3 8.3c0 4.9 5.7 10.7 5.7 10.7s5.7-5.8 5.7-10.7z"
                  /><circle cx="12" cy="8.3" r="2.2" /></svg
                >
              {:else if iconType(action.icon) === "users"}
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a4 4 0 00-5-3.87M17 20H7m10 0v-2c0-.65-.12-1.28-.34-1.87M7 20H2v-2a4 4 0 015-3.87M7 20v-2c0-.65.12-1.28.34-1.87M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  /></svg
                >
              {:else if iconType(action.icon) === "calendar"}
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10m-13 9h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v11a2 2 0 002 2z"
                  /></svg
                >
              {:else if iconType(action.icon) === "book"}
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.25v13.5m0-13.5c-1.9-1.45-4.5-2.25-7.25-2.25v13.5c2.75 0 5.35.8 7.25 2.25m0-13.5c1.9-1.45 4.5-2.25 7.25-2.25v13.5c-2.75 0-5.35.8-7.25 2.25"
                  /></svg
                >
              {:else if iconType(action.icon) === "notice"}
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 3h7l4 4v13a1 1 0 01-1 1H8a2 2 0 01-2-2V5a2 2 0 012-2z"
                  /><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 3v5h5M10 12h6M10 16h6"
                  /></svg
                >
              {:else}
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-5.2-5.2M16 10.8a5.2 5.2 0 11-10.4 0 5.2 5.2 0 0110.4 0z"
                  /></svg
                >
              {/if}
            </div>
            <svg
              class="w-4 h-4 text-slate-300 group-hover:text-cyan-700 transition mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <h3 class="relative mt-4 text-lg font-black text-slate-900">
            {action.title}
          </h3>
          <p class="relative mt-1.5 text-sm text-slate-600 leading-relaxed">
            {action.description}
          </p>
        </a>
      {/each}
    </div>
  </section>
</div>
