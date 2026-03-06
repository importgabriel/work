import { useState, useEffect, useRef } from "react";

/* ── Scroll-trigger hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Animated counter ── */
function Counter({ to, prefix = "", suffix = "", animate }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const isDecimal = to % 1 !== 0;

  useEffect(() => {
    if (!animate || started.current) return;
    started.current = true;
    let rafId;
    const start = performance.now();
    const dur = 1600;
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setVal(isDecimal ? parseFloat((ease * to).toFixed(1)) : Math.round(ease * to));
      if (t < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [animate, to, isDecimal]);

  return <>{prefix}{isDecimal ? val.toFixed(1) : val.toLocaleString()}{suffix}</>;
}

/* ── Data ── */
const features = [
  {
    id: "scheduling",
    title: "Smart Scheduling",
    desc: "Your availability gets matched to what agents actually need. No more ping-ponging back and forth just to lock in a time slot.",
    highlights: ["Auto-sync with your calendar", "Color-coded shoot types", "Instant booking confirmations"],
  },
  {
    id: "team",
    title: "Team Collaboration",
    desc: "Coordinate your entire crew from one place. See who's available, assign shoots, and track everyone's workload in real time.",
    highlights: ["Live availability status", "Drag-and-drop assignments", "Role-based permissions"],
  },
  {
    id: "territory",
    title: "Customizable Map Regions",
    desc: "Map out exactly where your team operates. Draw service zones, set radius limits, and update boundaries anytime as your coverage grows.",
    highlights: ["Draw custom service zones", "Set max travel radius", "Update boundaries in real time"],
  },
  {
    id: "ai",
    title: "AI Business Growth",
    desc: "Smart insights powered by AI that help you optimize pricing, find new markets, and grow revenue — automatically.",
    highlights: ["AI pricing recommendations", "Market opportunity alerts", "Revenue growth tracking"],
  },
  {
    id: "online-bookings",
    title: "Online Bookings",
    desc: "Track how many clients successfully self-book services using your online form — no assistance needed. Monitor completion rates in real time.",
    highlights: ["Self-service booking portal", "Real-time completion tracking", "Detailed user interaction logs"],
  },
  {
    id: "booking-distribution",
    title: "Booking Distribution",
    desc: "See the split between manual and online bookings at a glance. Understand trends over time so you can optimize your booking flow.",
    highlights: ["Manual vs online breakdown", "14-day trend analysis", "Actionable booking insights"],
  },
  {
    id: "media-storage",
    title: "Media Storage",
    desc: "Keep tabs on your storage usage, project delivery stats, and file uploads — all from one dashboard. Never worry about running out of space.",
    highlights: ["Visual storage overview", "Project completion trends", "Active client tracking"],
  },
];

const steps = [
  { title: "Create your profile", desc: "Sign up and set your availability, services, and pricing in under 5 minutes." },
  { title: "Start getting booked", desc: "Agents discover you on the platform and book shoots directly. No cold calls needed." },
  { title: "Deliver & get paid", desc: "Upload photos, send for approval, and receive payment. The whole process runs itself." },
];

const stats = [
  { to: 12400, prefix: "", suffix: "+", label: "Photographers on platform" },
  { to: 98, prefix: "", suffix: "%", label: "Client satisfaction rate" },
  { to: 3, prefix: "", suffix: "x", label: "Faster booking average" },
  { to: 2.4, prefix: "$", suffix: "M", label: "Revenue facilitated" },
];

/* ── Styles ── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100%; background: #fff; overflow-x: hidden; margin: 0; padding: 0; }

  .sch { font-family: 'Sora', sans-serif; background: #fff; width: 100%; min-height: 100vh; overflow-x: hidden; color: #1a1a2e; -webkit-font-smoothing: antialiased; }

  /* ── Center-column container ── */
  .sch-container { max-width: 1140px; margin: 0 auto; width: 100%; padding-left: 60px; padding-right: 60px; }

  /* ═══════════════════════ NAV ═══════════════════════ */
  .sch-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 22px 56px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all .4s cubic-bezier(.16,1,.3,1);
  }
  .sch-nav.scrolled {
    background: rgba(255,255,255,.88);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    padding: 15px 56px;
    box-shadow: 0 1px 0 rgba(0,0,0,.06);
  }
  .sch-logo { cursor: pointer; display: flex; align-items: center; }
  .sch-logo-img { height: 32px; width: auto; display: block; }
  .sch-nav-links { list-style: none; display: flex; gap: 32px; }
  .sch-nav-links a { text-decoration: none; color: #5a5a6a; font-size: 14px; font-weight: 500; transition: color .2s; }
  .sch-nav-links a:hover { color: rgb(93,50,239); }
  .sch-nav-cta {
    background: rgb(93,50,239); color: #fff; border: none;
    padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: all .25s;
  }
  .sch-nav-cta:hover { background: rgb(72,30,210); box-shadow: 0 4px 16px rgba(93,50,239,.4); transform: translateY(-1px); }

  /* ═══════════════════════ HERO ═══════════════════════ */
  .sch-hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 100px 0 80px; position: relative; overflow: hidden;
  }
  .sch-hero .sch-container { display: flex; align-items: center; gap: 48px; }

  /* Blobs */
  .sch-blob { position: absolute; border-radius: 50%; pointer-events: none; }
  .sch-blob-1 {
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(93,50,239,.15), transparent 64%);
    top: -200px; right: -140px; filter: blur(72px);
    animation: blob1 10s ease-in-out infinite;
  }
  .sch-blob-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(150,110,255,.12), transparent 64%);
    bottom: -120px; left: -130px; filter: blur(58px);
    animation: blob2 13s ease-in-out infinite;
  }
  .sch-blob-3 {
    width: 260px; height: 260px;
    background: radial-gradient(circle, rgba(93,50,239,.09), transparent 64%);
    top: 52%; right: 14%; filter: blur(44px);
    animation: blob3 8s ease-in-out infinite;
  }
  @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-26px,16px) scale(1.05)} 70%{transform:translate(16px,-12px) scale(.97)} }
  @keyframes blob2 { 0%,100%{transform:translate(0,0)} 38%{transform:translate(20px,-16px) scale(1.03)} 72%{transform:translate(-14px,20px) scale(.96)} }
  @keyframes blob3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(14px,-18px) scale(1.04)} }

  /* Hero Left */
  .sch-hero-left { flex: 0 0 490px; position: relative; z-index: 2; }

  .sch-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(93,50,239,.07); border: 1px solid rgba(93,50,239,.15);
    border-radius: 20px; padding: 6px 14px 6px 10px;
    font-size: 13px; color: rgb(93,50,239); font-weight: 500;
    margin-bottom: 28px;
    opacity: 0; transform: translateY(14px);
    transition: all .65s cubic-bezier(.16,1,.3,1);
  }
  .sch-badge.in { opacity: 1; transform: translateY(0); }
  .sch-badge-dot { width: 7px; height: 7px; background: rgb(93,50,239); border-radius: 50%; animation: pulse 2.2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.82)} }

  .sch-hero-h1 {
    font-size: 57px; font-weight: 800; line-height: 1.07;
    letter-spacing: -2.6px; color: #0f0f1a; margin-bottom: 22px;
    opacity: 0; transform: translateY(22px);
    transition: all .72s cubic-bezier(.16,1,.3,1) .13s;
  }
  .sch-hero-h1.in { opacity: 1; transform: translateY(0); }
  .sch-gradient {
    background: linear-gradient(135deg, rgb(93,50,239) 0%, rgb(138,92,255) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .sch-hero-sub {
    font-size: 17px; color: #6b6b7d; line-height: 1.68; max-width: 430px;
    margin-bottom: 34px; font-weight: 400;
    opacity: 0; transform: translateY(18px);
    transition: all .72s cubic-bezier(.16,1,.3,1) .25s;
  }
  .sch-hero-sub.in { opacity: 1; transform: translateY(0); }

  .sch-hero-btns {
    display: flex; gap: 12px; align-items: center;
    opacity: 0; transform: translateY(16px);
    transition: all .72s cubic-bezier(.16,1,.3,1) .37s;
  }
  .sch-hero-btns.in { opacity: 1; transform: translateY(0); }

  .sch-btn-primary {
    background: rgb(93,50,239); color: #fff; border: none;
    padding: 14px 28px; border-radius: 10px; font-size: 15px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: all .25s cubic-bezier(.16,1,.3,1);
    box-shadow: 0 2px 8px rgba(93,50,239,.25);
  }
  .sch-btn-primary:hover { background: rgb(72,30,210); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(93,50,239,.4); }

  .sch-btn-ghost {
    background: transparent; color: #444; border: 1.5px solid #dde;
    padding: 13px 22px; border-radius: 10px; font-size: 15px; font-weight: 500;
    cursor: pointer; font-family: inherit; transition: all .25s;
  }
  .sch-btn-ghost:hover { border-color: rgb(93,50,239); color: rgb(93,50,239); background: rgba(93,50,239,.04); }

  /* Pricing badges */
  .sch-hero-perks {
    display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px;
    opacity: 0; transform: translateY(14px);
    transition: all .72s cubic-bezier(.16,1,.3,1) .47s;
  }
  .sch-hero-perks.in { opacity: 1; transform: translateY(0); }
  .sch-hero-perk {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500; color: #555;
  }
  .sch-hero-perk svg { color: #22c55e; flex-shrink: 0; }

  /* Hero Right */
  .sch-hero-right { flex: 1; display: flex; justify-content: center; align-items: center; position: relative; z-index: 2; }

  .sch-mockup-wrap {
    position: relative; width: 580px;
    opacity: 0; transform: translateY(30px);
    transition: opacity .9s cubic-bezier(.16,1,.3,1) .28s, transform .9s cubic-bezier(.16,1,.3,1) .28s;
  }
  .sch-mockup-wrap.in { opacity: 1; transform: translateY(0); }

  /* Hero image */
  .sch-hero-img {
    width: 100%; max-width: 580px; height: auto;
    border-radius: 16px;
    display: block;
  }
  /* ═══════════════════════ TRUST BAR ═══════════════════════ */
  .sch-trust { padding: 48px 0; text-align: center; }
  .sch-trust p { font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; margin-bottom: 24px; }
  .sch-trust-logos { display: flex; justify-content: center; align-items: center; gap: 52px; flex-wrap: wrap; }
  .sch-trust-logo { font-size: 17px; font-weight: 700; color: #c8c8d0; letter-spacing: -.3px; transition: color .3s; cursor: default; }
  .sch-trust-logo:hover { color: #aaa; }

  /* ═══════════════════════ SECTION BASE ═══════════════════════ */
  .sch-section { padding: 104px 0; position: relative; }
  .sch-section-head {
    display: flex; flex-direction: column; gap: 14px; max-width: 520px;
    opacity: 0; transform: translateY(22px);
    transition: all .72s cubic-bezier(.16,1,.3,1);
  }
  .sch-section-head.in { opacity: 1; transform: translateY(0); }
  .sch-section-tag {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; color: rgb(93,50,239); font-weight: 600;
    text-transform: uppercase; letter-spacing: 1.6px;
  }
  .sch-section-tag::before { content: ''; width: 18px; height: 2px; background: rgb(93,50,239); border-radius: 1px; }
  .sch-section-title { font-size: 43px; font-weight: 800; color: #0f0f1a; letter-spacing: -1.9px; line-height: 1.14; }
  .sch-section-sub { font-size: 16px; color: #6b6b7d; line-height: 1.65; max-width: 440px; }

  /* ═══════════════════════ FEATURES / SHOWCASE ═══════════════════════ */
  .sch-features { background: #fff; }
  .sch-features::after {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(93,50,239,.055) 1px, transparent 1px);
    background-size: 48px 48px; pointer-events: none; opacity: .6;
  }

  /* Showcase layout */
  .sch-showcase { display: flex; flex-direction: column; gap: 96px; margin-top: 64px; position: relative; z-index: 1; }

  .sch-showcase-row {
    display: flex; align-items: center; gap: 64px;
    opacity: 0; transform: translateY(30px);
    transition: all .72s cubic-bezier(.16,1,.3,1);
  }
  .sch-showcase-row.in { opacity: 1; transform: translateY(0); }
  .sch-showcase-row.reverse { flex-direction: row-reverse; }

  .sch-showcase-text { flex: 1; min-width: 0; }
  .sch-showcase-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; color: rgb(93,50,239); font-weight: 700;
    text-transform: uppercase; letter-spacing: 1.6px; margin-bottom: 14px;
  }
  .sch-showcase-tag::before { content: ''; width: 14px; height: 2px; background: rgb(93,50,239); border-radius: 1px; }
  .sch-showcase-title { font-size: 32px; font-weight: 800; color: #0f0f1a; letter-spacing: -1.2px; line-height: 1.18; margin-bottom: 14px; }
  .sch-showcase-desc { font-size: 15px; color: #6b6b7d; line-height: 1.7; margin-bottom: 22px; max-width: 420px; }
  .sch-showcase-highlights { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .sch-showcase-highlights li {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: #444; font-weight: 500;
  }
  .sch-showcase-highlights li::before {
    content: ''; width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
    background: rgba(93,50,239,.1);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 10l3 3 5-5' stroke='%235D32EF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }

  .sch-showcase-mockup { flex: 1; display: flex; justify-content: center; min-width: 0; }

  /* Shared mockup card */
  .sch-showcase-card {
    width: 100%; max-width: 540px;
    background: #fff; border-radius: 18px;
    box-shadow: 0 24px 56px rgba(0,0,0,.10), 0 4px 12px rgba(0,0,0,.04);
    border: 1px solid rgba(0,0,0,.06); overflow: hidden;
    position: relative;
  }
  .sch-showcase-card-glow {
    position: absolute; inset: -24px;
    background: radial-gradient(ellipse, rgba(93,50,239,.09), transparent 64%);
    border-radius: 40px; filter: blur(26px); pointer-events: none;
  }

  /* ── Scheduling Mockup ── */
  .sch-sched { animation: float 5.8s ease-in-out infinite; }
  .sch-sched-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; border-bottom: 1px solid #f0f0f3;
  }
  .sch-sched-month { font-size: 14px; font-weight: 700; color: #1a1a2e; }
  .sch-sched-toggle { display: flex; gap: 0; border-radius: 8px; overflow: hidden; border: 1px solid #eee; }
  .sch-sched-toggle span {
    font-size: 11px; font-weight: 600; padding: 5px 12px; color: #999; cursor: pointer; transition: all .2s;
  }
  .sch-sched-toggle span.active { background: rgb(93,50,239); color: #fff; }

  .sch-sched-days { display: flex; padding: 10px 20px 6px; gap: 0; }
  .sch-sched-day {
    flex: 1; text-align: center; font-size: 10px; font-weight: 600;
    text-transform: uppercase; letter-spacing: .5px; color: #bbb;
  }
  .sch-sched-day.today { color: rgb(93,50,239); }

  .sch-sched-nums { display: flex; padding: 2px 20px 12px; gap: 0; }
  .sch-sched-num {
    flex: 1; text-align: center; font-size: 13px; font-weight: 600; color: #555;
    padding: 4px 0;
  }
  .sch-sched-num.today {
    background: rgb(93,50,239); color: #fff; border-radius: 8px;
    box-shadow: 0 2px 8px rgba(93,50,239,.35);
  }

  .sch-sched-slots { padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 6px; }
  .sch-sched-slot {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px; background: #fafafa; border-radius: 10px;
    border: 1px solid #f0f0f3; transition: all .2s;
  }
  .sch-sched-slot:hover { border-color: rgba(93,50,239,.2); background: rgba(93,50,239,.02); }
  .sch-sched-slot-bar { width: 3px; height: 28px; border-radius: 2px; flex-shrink: 0; }
  .sch-sched-slot-time { font-size: 11px; font-weight: 700; color: #1a1a2e; min-width: 52px; }
  .sch-sched-slot-name { font-size: 12px; color: #666; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sch-sched-slot-pill {
    font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 6px; white-space: nowrap;
  }

  @keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.012)} }

  /* ── Team Collaboration Mockup ── */
  .sch-team { animation: breathe 6s ease-in-out infinite; }
  .sch-team-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; border-bottom: 1px solid #f0f0f3;
  }
  .sch-team-title { font-size: 14px; font-weight: 700; color: #1a1a2e; }
  .sch-team-count { font-size: 11px; color: #999; margin-left: 8px; font-weight: 500; }
  .sch-team-add {
    font-size: 11px; font-weight: 600; color: rgb(93,50,239); background: rgba(93,50,239,.08);
    padding: 5px 12px; border-radius: 6px;
  }
  .sch-team-list { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
  .sch-team-member {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; background: #fafafa; border-radius: 10px;
    border: 1px solid #f0f0f3; transition: all .2s;
  }
  .sch-team-member:hover { border-color: rgba(93,50,239,.2); background: rgba(93,50,239,.02); }
  .sch-team-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .sch-team-info { flex: 1; min-width: 0; }
  .sch-team-name { font-size: 13px; font-weight: 600; color: #1a1a2e; }
  .sch-team-role { font-size: 10px; color: #999; margin-top: 2px; }
  .sch-team-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .sch-team-status {
    display: flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 6px;
  }
  .sch-team-status.available { background: rgba(34,197,94,.1); color: #16a34a; }
  .sch-team-status.busy { background: rgba(245,158,11,.1); color: #d97706; }
  .sch-team-status.offline { background: #f0f0f2; color: #999; }
  .sch-team-status-dot { width: 6px; height: 6px; border-radius: 50%; }
  .sch-team-status.available .sch-team-status-dot { background: #22c55e; }
  .sch-team-status.busy .sch-team-status-dot { background: #f59e0b; }
  .sch-team-status.offline .sch-team-status-dot { background: #ccc; }
  .sch-team-jobs { font-size: 10px; color: #888; }
  .sch-team-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 20px; border-top: 1px solid #f0f0f3; background: #fafafa;
  }
  .sch-team-bar-stat { font-size: 11px; color: #888; }
  .sch-team-bar-stat strong { color: #1a1a2e; font-weight: 700; }
  .sch-team-bar-btn {
    font-size: 11px; font-weight: 600; color: #fff; background: rgb(93,50,239);
    padding: 5px 14px; border-radius: 6px;
  }

  /* ── AI Business Growth Mockup ── */
  .sch-ai { animation: breathe 6s ease-in-out infinite; animation-delay: -1s; position: relative; }
  .sch-ai-overlay {
    position: absolute; inset: 0; z-index: 3;
    background: rgba(255,255,255,.55); backdrop-filter: blur(2px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border-radius: 18px;
  }
  .sch-ai-badge {
    background: linear-gradient(135deg, rgb(93,50,239), rgb(138,92,255));
    color: #fff; font-size: 13px; font-weight: 700;
    padding: 10px 24px; border-radius: 24px;
    box-shadow: 0 4px 20px rgba(93,50,239,.35);
    letter-spacing: .3px;
  }
  .sch-ai-badge-sub { font-size: 11px; color: #6b6b7d; margin-top: 8px; font-weight: 500; }
  .sch-ai-inner { padding: 20px; }
  .sch-ai-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .sch-ai-title { font-size: 14px; font-weight: 700; color: #1a1a2e; }
  .sch-ai-chip {
    font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 12px;
    background: rgba(93,50,239,.1); color: rgb(93,50,239);
  }
  .sch-ai-metrics { display: flex; gap: 10px; margin-bottom: 16px; }
  .sch-ai-metric {
    flex: 1; background: #f7f7fb; border-radius: 10px; padding: 14px;
    border: 1px solid #eff0f2; text-align: center;
  }
  .sch-ai-metric-val { font-size: 22px; font-weight: 800; letter-spacing: -.5px; }
  .sch-ai-metric-label { font-size: 9px; color: #999; text-transform: uppercase; letter-spacing: .4px; margin-top: 3px; font-weight: 500; }
  .sch-ai-recs { display: flex; flex-direction: column; gap: 6px; }
  .sch-ai-rec {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; background: #fafafa; border-radius: 8px;
    border: 1px solid #f0f0f3; font-size: 12px; color: #444;
  }
  .sch-ai-rec-icon {
    width: 28px; height: 28px; border-radius: 8px; display: flex;
    align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0;
  }
  .sch-ai-rec-text { flex: 1; font-weight: 500; }

  /* ── Territory / Map Mockup ── */
  .sch-map { overflow: hidden; }
  .sch-map-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px; border-bottom: 1px solid #f0f0f3;
  }
  .sch-map-title { font-size: 14px; font-weight: 700; color: #1a1a2e; }
  .sch-map-tools { display: flex; gap: 6px; }
  .sch-map-tool {
    width: 30px; height: 30px; border-radius: 7px; display: flex;
    align-items: center; justify-content: center; font-size: 13px;
    background: #f5f5f9; border: 1px solid #eee; color: #888; cursor: pointer;
    transition: all .2s;
  }
  .sch-map-tool.active { background: rgba(93,50,239,.1); border-color: rgba(93,50,239,.25); color: rgb(93,50,239); }

  .sch-map-canvas {
    position: relative; height: 260px;
    background: linear-gradient(180deg, #e8eef8 0%, #dce5f2 100%);
    overflow: hidden;
  }
  .sch-map-svg { position: absolute; inset: 0; width: 100%; height: 100%; }

  /* Zone overlay – SVG-based, positioned over the map */
  .sch-map-zone-svg {
    animation: zone-breathe 4s ease-in-out infinite;
    transform-origin: center center;
  }
  @keyframes zone-breathe {
    0%,100%{transform:scale(1);opacity:.85}
    50%{transform:scale(1.015);opacity:1}
  }

  /* SVG zone handle dots */
  .sch-map-handle { cursor: grab; transition: r .15s; }
  .sch-map-handle:hover { r: 7; }
  .sch-map-canvas.dragging { cursor: grabbing; }
  .sch-map-canvas.dragging .sch-map-handle { cursor: grabbing; }

  /* Bottom bar */
  .sch-map-bar {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 20px; border-top: 1px solid #f0f0f3; background: #fafafa;
  }
  .sch-map-bar-zone {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; color: #555; font-weight: 500;
  }
  .sch-map-bar-dot {
    width: 8px; height: 8px; border-radius: 50%; background: rgb(93,50,239);
    box-shadow: 0 0 0 3px rgba(93,50,239,.15);
  }
  .sch-map-bar-radius {
    font-size: 11px; color: #888; margin-left: auto;
  }
  .sch-map-bar-radius strong { color: rgb(93,50,239); font-weight: 700; }
  .sch-map-bar-btn {
    font-size: 11px; font-weight: 600; color: #fff; background: rgb(93,50,239);
    padding: 5px 14px; border-radius: 6px; margin-left: 6px;
  }

  /* ═══════════════════════ ONLINE BOOKINGS ═══════════════════════ */
  .sch-showcase-card.sch-bookings,
  .sch-showcase-card.sch-distrib,
  .sch-showcase-card.sch-storage { max-width: 100%; }
  .sch-showcase-row:has(.sch-bookings) .sch-showcase-mockup,
  .sch-showcase-row:has(.sch-distrib) .sch-showcase-mockup,
  .sch-showcase-row:has(.sch-storage) .sch-showcase-mockup { flex: 2; }
  .sch-bookings { overflow: hidden; }
  .sch-bookings-layout { display: flex; gap: 0; height: 100%; }
  .sch-bookings-table { flex: 1.8; padding: 20px; overflow: hidden; min-width: 0; }
  .sch-bookings-sidebar { flex: 1; padding: 20px; border-left: 1px solid #f0f0f3; background: #fafbfc; min-width: 220px; }

  .sch-bookings-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .sch-bookings-title { font-size: 15px; font-weight: 700; color: #1a1a2e; }
  .sch-bookings-refresh {
    display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600;
    color: #555; background: #fff; border: 1px solid #e0e0e5; border-radius: 7px;
    padding: 5px 12px; cursor: pointer;
  }

  .sch-bookings-tbl { width: 100%; border-collapse: collapse; }
  .sch-bookings-tbl th {
    font-size: 10px; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: .5px;
    padding: 0 8px 8px; border-bottom: 1px solid #f0f0f3; text-align: left;
  }
  .sch-bookings-tbl td {
    padding: 10px 8px; border-bottom: 1px solid #f5f5f7;
    font-size: 11px; color: #444; white-space: nowrap;
  }

  .sch-bookings-user { display: flex; align-items: center; gap: 8px; }
  .sch-bookings-avatar {
    width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .sch-bookings-user-info { min-width: 0; }
  .sch-bookings-user-name { font-weight: 600; color: #1a1a2e; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sch-bookings-user-email { font-size: 9px; color: #999; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sch-bookings-user-id { font-size: 9px; color: #bbb; }

  .sch-bookings-pill {
    display: inline-flex; padding: 3px 8px; border-radius: 10px; font-size: 10px; font-weight: 600;
  }
  .sch-bookings-pill.completed { background: rgba(34,197,94,.1); color: #16a34a; }
  .sch-bookings-pill.pending { background: rgba(245,158,11,.1); color: #d97706; }

  .sch-bookings-view {
    display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 500; color: #888; cursor: pointer;
  }

  .sch-bookings-pagination {
    display: flex; align-items: center; justify-content: center; gap: 4px; margin-top: 12px;
  }
  .sch-bookings-pagination span {
    font-size: 9px; color: #777; padding: 3px 7px; border-radius: 4px; cursor: pointer;
  }
  .sch-bookings-pagination span.active { background: rgb(93,50,239); color: #fff; }
  .sch-bookings-showing { font-size: 9px; color: #999; margin-top: 6px; }

  /* Completion sidebar */
  .sch-completion-title { font-size: 14px; font-weight: 700; color: #1a1a2e; margin-bottom: 2px; }
  .sch-completion-sub { font-size: 10px; color: #999; margin-bottom: 16px; }

  .sch-completion-cards { display: flex; gap: 10px; margin-bottom: 16px; }
  .sch-completion-card {
    flex: 1; padding: 10px 12px; border-radius: 10px; background: #fff; border: 1px solid #f0f0f3;
  }
  .sch-completion-card-label { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #888; font-weight: 500; margin-bottom: 4px; }
  .sch-completion-card-val { font-size: 22px; font-weight: 800; }
  .sch-completion-card-pct { font-size: 9px; color: #999; }

  .sch-donut-wrap { display: flex; justify-content: center; margin-bottom: 12px; }
  .sch-donut-legend { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 6px; }
  .sch-donut-legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #666; font-weight: 500; }
  .sch-donut-legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  .sch-donut-total { text-align: center; font-size: 10px; color: #888; display: flex; align-items: center; justify-content: center; gap: 4px; }

  /* ═══════════════════════ BOOKING DISTRIBUTION ═══════════════════════ */
  .sch-distrib { overflow: hidden; }
  .sch-distrib-layout { display: flex; gap: 0; height: 100%; }
  .sch-distrib-left { flex: 1; padding: 24px; border-right: 1px solid #f0f0f3; }
  .sch-distrib-right { flex: 1.5; padding: 24px; }

  .sch-distrib-title { font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 2px; }
  .sch-distrib-sub { font-size: 10px; color: #999; margin-bottom: 20px; }

  .sch-distrib-stats { display: flex; gap: 20px; margin-top: 14px; margin-bottom: 10px; }
  .sch-distrib-stat { display: flex; align-items: center; gap: 6px; }
  .sch-distrib-stat-dot { width: 8px; height: 8px; border-radius: 50%; }
  .sch-distrib-stat-label { font-size: 10px; color: #888; font-weight: 500; }
  .sch-distrib-stat-val { font-size: 18px; font-weight: 800; color: #1a1a2e; }
  .sch-distrib-stat-pct { font-size: 9px; color: #999; }
  .sch-distrib-total { font-size: 12px; color: #666; font-weight: 600; margin-top: 6px; display: flex; justify-content: space-between; border-top: 1px solid #f0f0f3; padding-top: 10px; }

  .sch-distrib-trend-title { font-size: 14px; font-weight: 700; color: #1a1a2e; margin-bottom: 2px; }
  .sch-distrib-trend-sub { font-size: 10px; color: #999; margin-bottom: 16px; }
  .sch-distrib-trend-legend { display: flex; gap: 14px; justify-content: flex-end; margin-bottom: 12px; }
  .sch-distrib-trend-legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #666; font-weight: 500; }
  .sch-distrib-trend-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

  /* ═══════════════════════ MEDIA STORAGE ═══════════════════════ */
  .sch-storage { overflow: hidden; }
  .sch-storage-top { display: flex; gap: 12px; padding: 20px 20px 0; }
  .sch-storage-stat-card {
    flex: 1; padding: 14px 16px; border-radius: 12px; background: #fff; border: 1px solid #f0f0f3;
    display: flex; align-items: center; justify-content: space-between;
  }
  .sch-storage-stat-label { font-size: 10px; color: #888; font-weight: 500; }
  .sch-storage-stat-val { font-size: 22px; font-weight: 800; color: #1a1a2e; margin-top: 2px; }
  .sch-storage-stat-icon {
    width: 32px; height: 32px; border-radius: 8px; display: flex;
    align-items: center; justify-content: center; font-size: 14px;
  }

  .sch-storage-bottom { display: flex; gap: 0; margin-top: 16px; }
  .sch-storage-chart { flex: 1; padding: 20px; }
  .sch-storage-overview { flex: 1; padding: 20px; border-left: 1px solid #f0f0f3; }

  .sch-storage-chart-title { font-size: 14px; font-weight: 700; color: #1a1a2e; margin-bottom: 2px; }
  .sch-storage-chart-sub { font-size: 10px; color: #999; margin-bottom: 4px; }
  .sch-storage-chart-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #22c55e; margin-bottom: 12px; }

  .sch-storage-overview-title { font-size: 14px; font-weight: 700; color: #1a1a2e; margin-bottom: 16px; }
  .sch-storage-usage { text-align: center; font-size: 11px; color: #888; margin-bottom: 4px; }
  .sch-storage-remaining { text-align: center; font-size: 10px; color: #bbb; margin-bottom: 14px; }

  .sch-storage-info-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border-radius: 10px; background: #f9f9fb; margin-bottom: 6px;
  }
  .sch-storage-info-left { display: flex; align-items: center; gap: 10px; }
  .sch-storage-info-icon {
    width: 30px; height: 30px; border-radius: 8px; display: flex;
    align-items: center; justify-content: center; font-size: 13px;
  }
  .sch-storage-info-label { font-size: 11px; font-weight: 600; color: #1a1a2e; }
  .sch-storage-info-sub { font-size: 9px; color: #999; }
  .sch-storage-info-val { font-size: 18px; font-weight: 800; color: #1a1a2e; }

  /* ═══════════════════════ HOW IT WORKS ═══════════════════════ */
  .sch-how { background: linear-gradient(180deg, #fff 0%, #f4f2ff 100%); }
  .sch-how .sch-section-head { align-items: center; text-align: center; max-width: 100%; }

  .sch-steps { display: flex; margin-top: 64px; max-width: 860px; margin-left: auto; margin-right: auto; }
  .sch-step {
    flex: 1; position: relative; text-align: center; padding: 0 18px;
    opacity: 0; transform: translateY(22px);
    transition: all .6s cubic-bezier(.16,1,.3,1);
  }
  .sch-step:nth-child(1) { transition-delay: .18s; }
  .sch-step:nth-child(2) { transition-delay: .32s; }
  .sch-step:nth-child(3) { transition-delay: .46s; }
  .sch-step.in { opacity: 1; transform: translateY(0); }

  .sch-step-connector {
    position: absolute; top: 21px;
    left: calc(50% + 23px); right: calc(-50% + 23px);
    height: 2px; background: linear-gradient(90deg, rgb(93,50,239), rgba(93,50,239,.1));
  }
  .sch-step-num {
    width: 42px; height: 42px; background: rgb(93,50,239); color: #fff;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 17px; font-weight: 700; margin: 0 auto 24px;
    position: relative; z-index: 1;
    box-shadow: 0 4px 16px rgba(93,50,239,.38);
  }
  .sch-step-title { font-size: 16px; font-weight: 700; color: #0f0f1a; margin-bottom: 8px; }
  .sch-step-desc { font-size: 13px; color: #6b6b7d; line-height: 1.6; }

  /* ═══════════════════════ STATS ═══════════════════════ */
  .sch-stats { padding: 84px 0; background: #fff; }
  .sch-stats-grid {
    display: flex; gap: 20px; max-width: 980px; margin: 0 auto;
    opacity: 0; transform: translateY(20px);
    transition: all .6s cubic-bezier(.16,1,.3,1);
  }
  .sch-stats-grid.in { opacity: 1; transform: translateY(0); }

  .sch-stat-item {
    flex: 1; text-align: center; padding: 42px 24px; border-radius: 18px;
    background: #fafafa; border: 1px solid #eeeef1;
    opacity: 0; transform: translateY(18px);
    transition: all .6s cubic-bezier(.16,1,.3,1);
  }
  .sch-stat-item:nth-child(1) { transition-delay: 0s; }
  .sch-stat-item:nth-child(2) { transition-delay: .1s; }
  .sch-stat-item:nth-child(3) { transition-delay: .2s; }
  .sch-stat-item:nth-child(4) { transition-delay: .3s; }
  .sch-stat-item.in { opacity: 1; transform: translateY(0); }

  .sch-stat-number {
    font-size: 40px; font-weight: 800; letter-spacing: -1.2px; line-height: 1;
    margin-bottom: 8px;
    background: linear-gradient(135deg, rgb(93,50,239), rgb(138,92,255));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .sch-stat-label { font-size: 13px; color: #6b6b7d; font-weight: 500; }

  /* ═══════════════════════ TESTIMONIAL ═══════════════════════ */
  .sch-testimonial { background: #f5f4ff; }
  .sch-test-card {
    max-width: 700px; margin: 0 auto; background: #fff;
    border-radius: 24px; padding: 50px; position: relative;
    box-shadow: 0 8px 36px rgba(0,0,0,.06); border: 1px solid #eee;
    opacity: 0; transform: translateY(24px);
    transition: all .72s cubic-bezier(.16,1,.3,1);
  }
  .sch-test-card.in { opacity: 1; transform: translateY(0); }
  .sch-test-quote {
    position: absolute; top: 6px; left: 38px;
    font-size: 120px; color: rgb(93,50,239); opacity: .08;
    font-family: Georgia, 'Times New Roman', serif; line-height: 1; pointer-events: none;
  }
  .sch-test-stars { color: #f59e0b; font-size: 15px; letter-spacing: 3px; margin-bottom: 18px; }
  .sch-test-text { font-size: 19px; color: #2a2a3c; line-height: 1.75; font-style: italic; margin-bottom: 32px; font-weight: 400; }
  .sch-test-author { display: flex; align-items: center; gap: 14px; }
  .sch-test-avatar {
    width: 46px; height: 46px; border-radius: 50%;
    background: linear-gradient(135deg, rgb(93,50,239), rgb(150,110,255));
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-weight: 700; font-size: 15px; flex-shrink: 0;
  }
  .sch-test-name { font-size: 15px; font-weight: 700; color: #1a1a2e; }
  .sch-test-role { font-size: 13px; color: #888; margin-top: 2px; }

  /* ═══════════════════════ CTA ═══════════════════════ */
  .sch-cta {
    padding: 128px 0; text-align: center; position: relative;
    background: linear-gradient(140deg, rgb(72,34,226) 0%, rgb(93,50,239) 42%, rgb(118,72,250) 100%);
    overflow: hidden;
  }
  .sch-cta-blob-1 {
    position: absolute; width: 540px; height: 540px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,.09), transparent 64%);
    top: -240px; left: -180px;
  }
  .sch-cta-blob-2 {
    position: absolute; width: 440px; height: 440px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,.07), transparent 64%);
    bottom: -180px; right: -140px;
  }
  .sch-cta-content {
    position: relative; z-index: 1;
    opacity: 0; transform: translateY(24px);
    transition: all .72s cubic-bezier(.16,1,.3,1);
  }
  .sch-cta-content.in { opacity: 1; transform: translateY(0); }
  .sch-cta-title { font-size: 47px; font-weight: 800; color: #fff; letter-spacing: -2.1px; line-height: 1.13; margin-bottom: 20px; }
  .sch-cta-sub { font-size: 17px; color: rgba(255,255,255,.7); max-width: 460px; margin: 0 auto 38px; line-height: 1.65; }
  .sch-btn-white {
    background: #fff; color: rgb(93,50,239); border: none;
    padding: 16px 34px; border-radius: 10px; font-size: 16px; font-weight: 700;
    cursor: pointer; font-family: inherit; transition: all .25s;
    box-shadow: 0 4px 24px rgba(0,0,0,.16);
  }
  .sch-btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,0,0,.24); }

  /* ═══════════════════════ FOOTER ═══════════════════════ */
  .sch-footer { background: #0f0f1a; padding: 50px 0; }
  .sch-footer .sch-container { display: flex; justify-content: space-between; align-items: center; }
  .sch-footer-logo { display: flex; align-items: center; }
  .sch-footer-logo .sch-logo-img { height: 28px; }
  .sch-footer-links { display: flex; gap: 28px; }
  .sch-footer-links a { color: #5a5a6a; text-decoration: none; font-size: 13px; font-weight: 500; transition: color .2s; }
  .sch-footer-links a:hover { color: #fff; }
  .sch-footer-copy { font-size: 12px; color: #484860; }

  /* ═══════════════════════ RESPONSIVE ═══════════════════════ */
  @media (max-width: 960px) {
    .sch-container { padding-left: 32px; padding-right: 32px; }
    .sch-hero { padding-top: 130px; padding-bottom: 64px; }
    .sch-hero .sch-container { flex-direction: column; text-align: center; gap: 44px; }
    .sch-hero-left { flex: none; max-width: 100%; }
    .sch-hero-sub { max-width: 100%; }
    .sch-hero-btns { justify-content: center; }
    .sch-hero-perks { justify-content: center; }
    .sch-hero-right { flex: none; width: 100%; justify-content: center; }
    .sch-mockup-wrap { width: 100%; max-width: 520px; }
    .sch-hero-h1 { font-size: 44px; }
    .sch-nav { padding: 18px 32px; }
    .sch-nav.scrolled { padding: 12px 32px; }
    .sch-showcase-row, .sch-showcase-row.reverse { flex-direction: column; gap: 36px; }
    .sch-showcase-text { text-align: center; }
    .sch-showcase-desc { max-width: 100%; }
    .sch-showcase-highlights { align-items: center; }
    .sch-showcase-card { max-width: 480px; }
    .sch-showcase-card.sch-bookings,
    .sch-showcase-card.sch-distrib,
    .sch-showcase-card.sch-storage { max-width: 100%; }
    .sch-bookings-layout { flex-direction: column; }
    .sch-bookings-sidebar { border-left: none; border-top: 1px solid #f0f0f3; }
    .sch-distrib-layout { flex-direction: column; }
    .sch-distrib-left { border-right: none; border-bottom: 1px solid #f0f0f3; }
    .sch-storage-top { flex-wrap: wrap; }
    .sch-storage-stat-card { flex: 1 1 calc(50% - 8px); }
    .sch-storage-bottom { flex-direction: column; }
    .sch-storage-overview { border-left: none; border-top: 1px solid #f0f0f3; }
    .sch-showcase { gap: 72px; }
  }
  @media (max-width: 720px) {
    .sch-container { padding-left: 20px; padding-right: 20px; }
    .sch-section { padding: 72px 0; }
    .sch-stats-grid { flex-wrap: wrap; gap: 14px; }
    .sch-stat-item { flex: 1 1 calc(50% - 7px); }
    .sch-steps { flex-direction: column; gap: 36px; align-items: center; }
    .sch-step-connector { display: none; }
    .sch-step { max-width: 280px; }
    .sch-section-title { font-size: 34px; }
    .sch-cta { padding: 80px 0; }
    .sch-cta-title { font-size: 34px; }
    .sch-footer .sch-container { flex-direction: column; gap: 20px; text-align: center; }
    .sch-nav-links { display: none; }
    .sch-trust-logos { gap: 28px; }
    .sch-showcase-title { font-size: 26px; }
    .sch-showcase-card { max-width: 340px; }
    .sch-showcase { gap: 56px; }
    .sch-pipe-flow { gap: 0; }
    .sch-pipe-node { width: 38px; height: 38px; font-size: 14px; }
    .sch-pipe-connector { margin-top: 18px; }
  }
`;

/* ── Component ── */

export default function Scheddio() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [featRef, featVis] = useInView();
  const [feat1Ref, feat1Vis] = useInView(0.15);
  const [feat2Ref, feat2Vis] = useInView(0.15);
  const [feat3Ref, feat3Vis] = useInView(0.15);
  const [feat4Ref, feat4Vis] = useInView(0.15);
  const [feat5Ref, feat5Vis] = useInView(0.15);
  const [feat6Ref, feat6Vis] = useInView(0.15);
  const [feat7Ref, feat7Vis] = useInView(0.15);
  const [howRef, howVis] = useInView();
  const [statsRef, statsVis] = useInView();
  const [testRef, testVis] = useInView();
  const [ctaRef, ctaVis] = useInView();

  /* ── Zone drag state ── */
  const zoneSvgRef = useRef(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [zonePoints, setZonePoints] = useState([
    [290,18],[350,15],[362,110],[358,185],
    [320,225],[255,240],[210,200],[250,120],
  ]);
  const zonePoly = zonePoints.map(p => p.join(",")).join(" ");

  useEffect(() => {
    if (dragIdx === null) return;
    const svg = zoneSvgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    const onMove = (e) => {
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const svgP = pt.matrixTransform(ctm.inverse());
      setZonePoints(prev => {
        const next = [...prev];
        next[dragIdx] = [Math.round(svgP.x), Math.round(svgP.y)];
        return next;
      });
    };
    const onUp = () => setDragIdx(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragIdx]);

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="sch">
      <style>{CSS}</style>

      {/* ── Nav ── */}
      <nav className={`sch-nav ${scrollY > 50 ? "scrolled" : ""}`}>
        <div className="sch-logo"><img src="/logo/LOGOS/Logo Color No Background (1122 x 1122).png" alt="Scheddio" className="sch-logo-img" /></div>
        <ul className="sch-nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <button className="sch-nav-cta">Get Started Free</button>
      </nav>

      {/* ── Hero ── */}
      <section className="sch-hero">
        <div className="sch-blob sch-blob-1" />
        <div className="sch-blob sch-blob-2" />
        <div className="sch-blob sch-blob-3" />

        <div className="sch-container">
          <div className="sch-hero-left">
            <div className={`sch-badge ${mounted ? "in" : ""}`}>
              <span className="sch-badge-dot" /> 10 free projects to start
            </div>
            <h1 className={`sch-hero-h1 ${mounted ? "in" : ""}`}>
              Real Estate Photography,<br /><span className="sch-gradient">Simplified. $3/project.</span>
            </h1>
            <p className={`sch-hero-sub ${mounted ? "in" : ""}`}>
              Scheduling, delivery, and client management for real estate photographers — all in one platform. Start shooting, stop managing.
            </p>
            <div className={`sch-hero-btns ${mounted ? "in" : ""}`}>
              <button className="sch-btn-primary">Start Free — 10 Projects on Us →</button>
              <button className="sch-btn-ghost">See How It Works</button>
            </div>
            <div className={`sch-hero-perks ${mounted ? "in" : ""}`}>
              <span className="sch-hero-perk">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                $3 per project
              </span>
              <span className="sch-hero-perk">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                No credit card required
              </span>
              <span className="sch-hero-perk">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Cancel anytime
              </span>
            </div>
          </div>

          <div className="sch-hero-right">
            <div className={`sch-mockup-wrap ${mounted ? "in" : ""}`}>
              <img src="/header.png" alt="Scheddio platform" className="sch-hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="sch-trust">
        <div className="sch-container">
          <p>Trusted by photographers working with</p>
          <div className="sch-trust-logos">
            {["Zillow", "Realogy", "eXp World", "Century 21", "Compass"].map(l => (
              <span key={l} className="sch-trust-logo">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features / Showcase ── */}
      <section id="features" className="sch-section sch-features" ref={featRef}>
        <div className="sch-container">
          <div className={`sch-section-head ${featVis ? "in" : ""}`}>
            <div className="sch-section-tag">Features</div>
            <h2 className="sch-section-title">Everything you need<br />to grow your business.</h2>
            <p className="sch-section-sub">Built specifically for real estate photographers who want to spend less time managing and more time creating.</p>
          </div>

          <div className="sch-showcase">
            {/* ── Row 1: Smart Scheduling ── */}
            <div ref={feat1Ref} className={`sch-showcase-row ${feat1Vis ? "in" : ""}`}>
              <div className="sch-showcase-text">
                <div className="sch-showcase-tag">Scheduling</div>
                <h3 className="sch-showcase-title">{features[0].title}</h3>
                <p className="sch-showcase-desc">{features[0].desc}</p>
                <ul className="sch-showcase-highlights">
                  {features[0].highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="sch-showcase-mockup">
                <div className="sch-showcase-card sch-sched">
                  <div className="sch-showcase-card-glow" />
                  <div className="sch-sched-header">
                    <span className="sch-sched-month">March 2026</span>
                    <div className="sch-sched-toggle">
                      <span>Day</span>
                      <span className="active">Week</span>
                      <span>Month</span>
                    </div>
                  </div>
                  <div className="sch-sched-days">
                    {["Mon","Tue","Wed","Thu","Fri"].map(d => (
                      <span key={d} className={`sch-sched-day ${d === "Tue" ? "today" : ""}`}>{d}</span>
                    ))}
                  </div>
                  <div className="sch-sched-nums">
                    {[2,3,4,5,6].map(n => (
                      <span key={n} className={`sch-sched-num ${n === 3 ? "today" : ""}`}>{n}</span>
                    ))}
                  </div>
                  <div className="sch-sched-slots">
                    <div className="sch-sched-slot">
                      <div className="sch-sched-slot-bar" style={{background:"rgb(93,50,239)"}} />
                      <div className="sch-sched-slot-time">9:00 AM</div>
                      <div className="sch-sched-slot-name">Martinez Residence</div>
                      <span className="sch-sched-slot-pill confirmed">Confirmed</span>
                    </div>
                    <div className="sch-sched-slot">
                      <div className="sch-sched-slot-bar" style={{background:"#f59e0b"}} />
                      <div className="sch-sched-slot-time">1:30 PM</div>
                      <div className="sch-sched-slot-name">Luxury Condo 4B</div>
                      <span className="sch-sched-slot-pill pending">Pending</span>
                    </div>
                    <div className="sch-sched-slot">
                      <div className="sch-sched-slot-bar" style={{background:"#22c55e"}} />
                      <div className="sch-sched-slot-time">4:00 PM</div>
                      <div className="sch-sched-slot-name">Downtown Loft</div>
                      <span className="sch-sched-slot-pill upcoming">Upcoming</span>
                    </div>
                    <div className="sch-sched-slot">
                      <div className="sch-sched-slot-bar" style={{background:"rgb(93,50,239)"}} />
                      <div className="sch-sched-slot-time">6:00 PM</div>
                      <div className="sch-sched-slot-name">Sunset Villa Shoot</div>
                      <span className="sch-sched-slot-pill confirmed">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Row 2: Team Collaboration (reversed) ── */}
            <div ref={feat2Ref} className={`sch-showcase-row reverse ${feat2Vis ? "in" : ""}`}>
              <div className="sch-showcase-text">
                <div className="sch-showcase-tag">Collaboration</div>
                <h3 className="sch-showcase-title">{features[1].title}</h3>
                <p className="sch-showcase-desc">{features[1].desc}</p>
                <ul className="sch-showcase-highlights">
                  {features[1].highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="sch-showcase-mockup">
                <div className="sch-showcase-card sch-team">
                  <div className="sch-showcase-card-glow" />
                  <div className="sch-team-header">
                    <div style={{display:"flex",alignItems:"baseline"}}>
                      <span className="sch-team-title">Team Members</span>
                      <span className="sch-team-count">5 active</span>
                    </div>
                    <span className="sch-team-add">+ Invite</span>
                  </div>
                  <div className="sch-team-list">
                    {[
                      { initials: "JR", name: "James Rivera", role: "Lead Photographer", bg: "linear-gradient(135deg, rgb(93,50,239), rgb(138,92,255))", status: "available", statusLabel: "Available", jobs: "4 shoots this week" },
                      { initials: "SC", name: "Sarah Chen", role: "Drone Operator", bg: "linear-gradient(135deg, #10b981, #34d399)", status: "busy", statusLabel: "On Shoot", jobs: "2 shoots today" },
                      { initials: "MK", name: "Marcus King", role: "Video Specialist", bg: "linear-gradient(135deg, #f59e0b, #fbbf24)", status: "available", statusLabel: "Available", jobs: "3 shoots this week" },
                      { initials: "AP", name: "Ana Perez", role: "Photo Editor", bg: "linear-gradient(135deg, #e74c8b, #f472b6)", status: "offline", statusLabel: "Offline", jobs: "12 edits pending" },
                    ].map((m, i) => (
                      <div key={i} className="sch-team-member">
                        <div className="sch-team-avatar" style={{background: m.bg}}>{m.initials}</div>
                        <div className="sch-team-info">
                          <div className="sch-team-name">{m.name}</div>
                          <div className="sch-team-role">{m.role}</div>
                        </div>
                        <div className="sch-team-meta">
                          <div className={`sch-team-status ${m.status}`}>
                            <div className="sch-team-status-dot" />
                            {m.statusLabel}
                          </div>
                          <div className="sch-team-jobs">{m.jobs}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sch-team-bar">
                    <span className="sch-team-bar-stat"><strong>3</strong> available · <strong>1</strong> on shoot · <strong>1</strong> offline</span>
                    <span className="sch-team-bar-btn">Assign Shoot</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Row 3: Customizable Map Regions ── */}
            <div ref={feat3Ref} className={`sch-showcase-row ${feat3Vis ? "in" : ""}`}>
              <div className="sch-showcase-text">
                <div className="sch-showcase-tag">Map Regions</div>
                <h3 className="sch-showcase-title">{features[2].title}</h3>
                <p className="sch-showcase-desc">{features[2].desc}</p>
                <ul className="sch-showcase-highlights">
                  {features[2].highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="sch-showcase-mockup">
                <div className="sch-showcase-card sch-map">
                  <div className="sch-showcase-card-glow" />
                <div className="sch-map-header">
                  <span className="sch-map-title">Service Territory</span>
                  <div className="sch-map-tools">
                    <div className="sch-map-tool active" title="Draw zone">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>
                    </div>
                    <div className="sch-map-tool" title="Radius">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>
                    </div>
                    <div className="sch-map-tool" title="Reset">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    </div>
                  </div>
                </div>
                <div className={`sch-map-canvas${dragIdx !== null ? " dragging" : ""}`}>
                  {/* South Florida SVG Map – fully interactive */}
                  <svg ref={zoneSvgRef} className="sch-map-svg" viewBox="0 0 480 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">

                    {/* Land – South Florida peninsula */}
                    <path d="
                      M 0,0 L 340,0 L 345,8 L 348,20 L 350,40 L 352,55
                      L 355,70 L 356,85 L 358,100 L 359,115
                      L 360,130 L 362,142 L 363,155 L 362,168
                      L 358,180 L 352,192 L 344,204 L 332,214
                      L 318,222 L 300,230 L 280,237
                      L 258,242 L 235,246 L 210,248 L 185,250
                      L 160,252 L 130,254 L 100,256 L 70,258 L 40,260
                      L 0,260 Z
                    " fill="#f0ece4" stroke="#d8d0c4" strokeWidth="1"/>

                    {/* Everglades / interior wetlands */}
                    <path d="
                      M 0,60 L 120,65 L 180,80 L 220,100
                      L 260,130 L 280,160 L 270,190
                      L 240,215 L 200,235 L 160,248
                      L 100,254 L 40,258 L 0,260 Z
                    " fill="#e4e8d8" opacity=".5"/>

                    {/* Lake Okeechobee */}
                    <ellipse cx="160" cy="28" rx="38" ry="16" fill="#d0daea" stroke="#c0cfe0" strokeWidth=".5"/>

                    {/* Highways */}
                    <path d="M 320,0 L 324,30 L 328,60 L 334,90 L 340,120 L 342,150 L 340,175 L 332,200 L 318,222" fill="none" stroke="#c4b8e8" strokeWidth="2" strokeDasharray="6,3" opacity=".7"/>
                    <path d="M 280,0 L 286,35 L 294,70 L 305,105 L 312,140 L 310,170 L 300,200 L 280,230" fill="none" stroke="#c4b8e8" strokeWidth="1.5" strokeDasharray="4,3" opacity=".5"/>
                    <path d="M 348,0 L 350,40 L 354,80 L 358,115 L 360,145 L 356,178 L 344,206 L 318,225 L 280,238 L 235,248 L 185,252" fill="none" stroke="#d0c4e0" strokeWidth="1" opacity=".4"/>
                    <text x="312" y="82" fontSize="7" fill="#8878b0" fontWeight="700" fontFamily="Sora,sans-serif">I-95</text>
                    <text x="278" y="62" fontSize="6" fill="#8878b0" fontWeight="600" fontFamily="Sora,sans-serif">TPKE</text>

                    {/* Service zone – dynamic polygon */}
                    <defs>
                      <filter id="zone-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <g className="sch-map-zone-svg">
                      <polygon points={zonePoly} fill="rgba(93,50,239,.06)" stroke="rgba(93,50,239,.3)" strokeWidth="5" strokeLinejoin="round" filter="url(#zone-glow)"/>
                      <polygon points={zonePoly} fill="rgba(93,50,239,.12)" stroke="rgb(93,50,239)" strokeWidth="2" strokeDasharray="8,4" strokeLinejoin="round"/>
                    </g>

                    {/* City markers inside SVG */}
                    {[
                      [338,18,"W. Palm Beach"],[344,58,"Boca Raton"],
                      [352,100,"Ft. Lauderdale"],[354,132,"Hollywood"],
                      [350,165,"Miami",true],[320,215,"Homestead"],
                    ].map(([cx,cy,name,big],i) => (
                      <g key={i}>
                        <circle cx={cx} cy={cy} r={big?4:3} fill="#fff" stroke="rgb(93,50,239)" strokeWidth={big?2:1.5}/>
                        <text x={cx-42} y={cy+1} fontSize={big?9:7} fontWeight={big?800:700} fill="#3a3a5c" fontFamily="Sora,sans-serif" style={{textShadow:"0 0 4px #fff"}}>{name}</text>
                      </g>
                    ))}

                    {/* Draggable handles – SVG circles on zone vertices */}
                    {zonePoints.map(([cx,cy], i) => (
                      <circle key={i} className="sch-map-handle" cx={cx} cy={cy} r="5.5"
                        fill="#fff" stroke="rgb(93,50,239)" strokeWidth="2.5"
                        style={{filter:"drop-shadow(0 1px 3px rgba(93,50,239,.35))"}}
                        onMouseDown={(e) => { e.preventDefault(); setDragIdx(i); }}
                      />
                    ))}

                    {/* Pin on Miami (350,165) */}
                    <g transform="translate(350,165)">
                      {/* Pulse rings */}
                      <circle r="10" fill="none" stroke="rgba(93,50,239,.35)" strokeWidth="2">
                        <animate attributeName="r" values="8;28" dur="2.4s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values=".8;0" dur="2.4s" repeatCount="indefinite"/>
                      </circle>
                      <circle r="10" fill="none" stroke="rgba(93,50,239,.35)" strokeWidth="2">
                        <animate attributeName="r" values="8;28" dur="2.4s" begin="0.8s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values=".8;0" dur="2.4s" begin="0.8s" repeatCount="indefinite"/>
                      </circle>
                      <circle r="10" fill="none" stroke="rgba(93,50,239,.35)" strokeWidth="2">
                        <animate attributeName="r" values="8;28" dur="2.4s" begin="1.6s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values=".8;0" dur="2.4s" begin="1.6s" repeatCount="indefinite"/>
                      </circle>
                      {/* Pin dot */}
                      <circle r="8" fill="rgb(93,50,239)" stroke="#fff" strokeWidth="2" style={{filter:"drop-shadow(0 2px 6px rgba(93,50,239,.5))"}}/>
                      <path d="M-3.5,-1 L-1,3.5 L3.5,-2.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>

                    {/* Radius line from Miami westward */}
                    <line x1="350" y1="165" x2="270" y2="165" stroke="rgb(93,50,239)" strokeWidth="1.5" strokeDasharray="4,2" opacity=".6"/>
                    <rect x="260" y="154" width="28" height="14" rx="3" fill="rgba(255,255,255,.92)" stroke="rgba(93,50,239,.2)" strokeWidth=".5"/>
                    <text x="264" y="164" fontSize="8" fontWeight="700" fill="rgb(93,50,239)" fontFamily="Sora,sans-serif">25 mi</text>

                    {/* Florida Keys */}
                    <path d="M 185,252 L 165,254 L 140,255 L 115,257 L 90,258 L 70,258" fill="none" stroke="#d8d0c4" strokeWidth="3" strokeLinecap="round" opacity=".6"/>
                  </svg>
                </div>
                <div className="sch-map-bar">
                  <div className="sch-map-bar-zone">
                    <div className="sch-map-bar-dot" />
                    South Florida Zone
                  </div>
                  <span className="sch-map-bar-radius">Radius: <strong>25 mi</strong></span>
                  <span className="sch-map-bar-btn">Save Zone</span>
                </div>
              </div>
            </div>
          </div>

            {/* ── Row 4: AI Business Growth (reversed) ── */}
            <div ref={feat4Ref} className={`sch-showcase-row reverse ${feat4Vis ? "in" : ""}`}>
              <div className="sch-showcase-text">
                <div className="sch-showcase-tag">AI Powered</div>
                <h3 className="sch-showcase-title">{features[3].title}</h3>
                <p className="sch-showcase-desc">{features[3].desc}</p>
                <ul className="sch-showcase-highlights">
                  {features[3].highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="sch-showcase-mockup">
                <div className="sch-showcase-card sch-ai">
                  <div className="sch-showcase-card-glow" />
                  <div className="sch-ai-overlay">
                    <div className="sch-ai-badge">Coming Soon</div>
                    <div className="sch-ai-badge-sub">Currently in development</div>
                  </div>
                  <div className="sch-ai-inner">
                    <div className="sch-ai-header">
                      <span className="sch-ai-title">AI Growth Insights</span>
                      <span className="sch-ai-chip">Beta</span>
                    </div>
                    <div className="sch-ai-metrics">
                      <div className="sch-ai-metric">
                        <div className="sch-ai-metric-val" style={{color:"#22c55e"}}>+34%</div>
                        <div className="sch-ai-metric-label">Revenue Growth</div>
                      </div>
                      <div className="sch-ai-metric">
                        <div className="sch-ai-metric-val" style={{color:"rgb(93,50,239)"}}>12</div>
                        <div className="sch-ai-metric-label">New Leads</div>
                      </div>
                      <div className="sch-ai-metric">
                        <div className="sch-ai-metric-val" style={{color:"#f59e0b"}}>$85</div>
                        <div className="sch-ai-metric-label">Avg Project</div>
                      </div>
                    </div>
                    <div className="sch-ai-recs">
                      <div className="sch-ai-rec">
                        <div className="sch-ai-rec-icon" style={{background:"rgba(34,197,94,.1)", color:"#16a34a"}}>$</div>
                        <span className="sch-ai-rec-text">Raise twilight pricing by 15% — demand is up</span>
                      </div>
                      <div className="sch-ai-rec">
                        <div className="sch-ai-rec-icon" style={{background:"rgba(93,50,239,.1)", color:"rgb(93,50,239)"}}>+</div>
                        <span className="sch-ai-rec-text">Expand to Fort Lauderdale — 8 agents searching</span>
                      </div>
                      <div className="sch-ai-rec">
                        <div className="sch-ai-rec-icon" style={{background:"rgba(245,158,11,.1)", color:"#d97706"}}>!</div>
                        <span className="sch-ai-rec-text">Follow up with 3 inactive clients this week</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Row 5: Online Bookings ── */}
            <div ref={feat5Ref} className={`sch-showcase-row ${feat5Vis ? "in" : ""}`}>
              <div className="sch-showcase-text">
                <div className="sch-showcase-tag">Analytics</div>
                <h3 className="sch-showcase-title">{features[4].title}</h3>
                <p className="sch-showcase-desc">{features[4].desc}</p>
                <ul className="sch-showcase-highlights">
                  {features[4].highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="sch-showcase-mockup">
                <div className="sch-showcase-card sch-bookings">
                  <div className="sch-showcase-card-glow" />
                  <div className="sch-bookings-layout">
                    <div className="sch-bookings-table">
                      <div className="sch-bookings-header">
                        <span className="sch-bookings-title">User Interactions</span>
                        <span className="sch-bookings-refresh">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                          Refresh
                        </span>
                      </div>
                      <table className="sch-bookings-tbl">
                        <thead>
                          <tr><th>User</th><th>Date</th><th>Action</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                        {[
                          { init:"A", name:"Alex Rivera", email:"alex@example.com", id:322, date:"3/3/2026", action:"signup", status:"completed", bg:"#f59e0b" },
                          { init:"M", name:"Maria Santos", email:"maria@example.com", id:1838, date:"3/3/2026", action:"login", status:"completed", bg:"rgb(93,50,239)" },
                          { init:"D", name:"David Chen", email:"david@example.com", id:515, date:"3/3/2026", action:"login", status:"pending", bg:"#e74c8b" },
                          { init:"S", name:"Sofia Martinez", email:"sofia@example.com", id:800, date:"2/27/2026", action:"signup", status:"completed", bg:"#22c55e" },
                          { init:"L", name:"Liam Parker", email:"liam@example.com", id:912, date:"2/27/2026", action:"signup", status:"pending", bg:"#3b82f6" },
                        ].map((u, i) => (
                          <tr key={i}>
                            <td>
                              <div className="sch-bookings-user">
                                <div className="sch-bookings-avatar" style={{background:u.bg}}>{u.init}</div>
                                <div className="sch-bookings-user-info">
                                  <div className="sch-bookings-user-name">{u.name}</div>
                                  <div className="sch-bookings-user-email">{u.email}</div>
                                  <div className="sch-bookings-user-id">ID: {u.id}</div>
                                </div>
                              </div>
                            </td>
                            <td>{u.date}</td>
                            <td>{u.action}</td>
                            <td><span className={`sch-bookings-pill ${u.status}`}>{u.status.charAt(0).toUpperCase()+u.status.slice(1)}</span></td>
                            <td>
                              <span className="sch-bookings-view">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                View
                              </span>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                      <div className="sch-bookings-showing">Showing 1 to 20 of 288 results</div>
                      <div className="sch-bookings-pagination">
                        <span>&lt;</span><span className="active">1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>&gt;</span>
                      </div>
                    </div>
                    <div className="sch-bookings-sidebar">
                      <div className="sch-completion-title">Completion Status</div>
                      <div className="sch-completion-sub">User interaction completion overview</div>
                      <div className="sch-completion-cards">
                        <div className="sch-completion-card">
                          <div className="sch-completion-card-label">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                            Completed
                          </div>
                          <div className="sch-completion-card-val" style={{color:"#22c55e"}}>50</div>
                          <div className="sch-completion-card-pct">50% of total</div>
                        </div>
                        <div className="sch-completion-card">
                          <div className="sch-completion-card-label">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            Pending
                          </div>
                          <div className="sch-completion-card-val" style={{color:"#f59e0b"}}>50</div>
                          <div className="sch-completion-card-pct">50% of total</div>
                        </div>
                      </div>
                      <div className="sch-donut-wrap">
                        <svg width="160" height="160" viewBox="0 0 160 160">
                          <circle cx="80" cy="80" r="56" fill="none" stroke="#f59e0b" strokeWidth="22"/>
                          <circle cx="80" cy="80" r="56" fill="none" stroke="#22c55e" strokeWidth="22" strokeDasharray={`${0.5*2*Math.PI*56} ${2*Math.PI*56}`} strokeDashoffset="0" transform="rotate(-90 80 80)"/>
                          <text x="80" y="74" textAnchor="middle" fontSize="11" fill="#888" fontFamily="Sora,sans-serif" fontWeight="500">Total</text>
                          <text x="80" y="94" textAnchor="middle" fontSize="22" fill="#1a1a2e" fontFamily="Sora,sans-serif" fontWeight="800">100</text>
                        </svg>
                      </div>
                      <div className="sch-donut-legend">
                        <div className="sch-donut-legend-item"><div className="sch-donut-legend-dot" style={{background:"#22c55e"}}/> Completed</div>
                        <div className="sch-donut-legend-item"><div className="sch-donut-legend-dot" style={{background:"#f59e0b"}}/> Pending</div>
                      </div>
                      <div className="sch-donut-total">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Total Interactions: <strong>100</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Row 6: Booking Distribution (reversed) ── */}
            <div ref={feat6Ref} className={`sch-showcase-row reverse ${feat6Vis ? "in" : ""}`}>
              <div className="sch-showcase-text">
                <div className="sch-showcase-tag">Insights</div>
                <h3 className="sch-showcase-title">{features[5].title}</h3>
                <p className="sch-showcase-desc">{features[5].desc}</p>
                <ul className="sch-showcase-highlights">
                  {features[5].highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="sch-showcase-mockup">
                <div className="sch-showcase-card sch-distrib">
                  <div className="sch-showcase-card-glow" />
                  <div className="sch-distrib-layout">
                    <div className="sch-distrib-left">
                      <div className="sch-distrib-title">Booking Distribution</div>
                      <div className="sch-distrib-sub">Distribution of manual vs online bookings</div>
                      <div className="sch-donut-wrap">
                        <svg width="160" height="160" viewBox="0 0 160 160">
                          <circle cx="80" cy="80" r="56" fill="none" stroke="rgb(93,50,239)" strokeWidth="22"/>
                          <circle cx="80" cy="80" r="56" fill="none" stroke="#10b981" strokeWidth="22" strokeDasharray={`${0.472*2*Math.PI*56} ${2*Math.PI*56}`} strokeDashoffset="0" transform="rotate(-90 80 80)"/>
                          <text x="80" y="70" textAnchor="middle" fontSize="10" fill="#888" fontFamily="Sora,sans-serif" fontWeight="500">Total Bookings</text>
                          <text x="80" y="92" textAnchor="middle" fontSize="22" fill="#1a1a2e" fontFamily="Sora,sans-serif" fontWeight="800">36</text>
                        </svg>
                      </div>
                      <div className="sch-distrib-stats">
                        <div className="sch-distrib-stat">
                          <div className="sch-distrib-stat-dot" style={{background:"#10b981"}}/>
                          <div>
                            <div className="sch-distrib-stat-label">Manual Booking</div>
                            <div style={{display:"flex",alignItems:"baseline",gap:"6px"}}><span className="sch-distrib-stat-val">17</span><span className="sch-distrib-stat-pct">47.2%</span></div>
                          </div>
                        </div>
                        <div className="sch-distrib-stat">
                          <div className="sch-distrib-stat-dot" style={{background:"rgb(93,50,239)"}}/>
                          <div>
                            <div className="sch-distrib-stat-label">Online Booking</div>
                            <div style={{display:"flex",alignItems:"baseline",gap:"6px"}}><span className="sch-distrib-stat-val">19</span><span className="sch-distrib-stat-pct">52.8%</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="sch-distrib-total"><span>Total Bookings</span><strong>36</strong></div>
                    </div>
                    <div className="sch-distrib-right">
                      <div className="sch-distrib-trend-title">Booking Distribution Trends (Last 14 Days)</div>
                      <div className="sch-distrib-trend-sub">Manual vs Online booking trends over the last 14 days</div>
                      <div className="sch-distrib-trend-legend">
                        <div className="sch-distrib-trend-legend-item"><div className="sch-distrib-trend-legend-dot" style={{background:"rgb(93,50,239)"}}/> Manual Booking</div>
                        <div className="sch-distrib-trend-legend-item"><div className="sch-distrib-trend-legend-dot" style={{background:"#10b981"}}/> Online Booking</div>
                      </div>
                      <svg viewBox="0 0 440 180" style={{width:"100%",height:"auto"}}>
                        {[0,1,2,3,4,5].map(i=><g key={i}><line x1="40" y1={20+i*28} x2="430" y2={20+i*28} stroke="#f0f0f3" strokeWidth="1"/><text x="30" y={24+i*28} textAnchor="end" fontSize="9" fill="#bbb" fontFamily="Sora,sans-serif">{5-i}</text></g>)}
                        {["Feb 18","Feb 19","Feb 20","Feb 21","Feb 22","Feb 23","Feb 24","Feb 25","Feb 26","Feb 27","Feb 28","Mar 1","Mar 2","Mar 3","Mar 4"].map((d,i)=><text key={d} x={44+i*26.5} y={172} textAnchor="middle" fontSize="7" fill="#bbb" fontFamily="Sora,sans-serif">{d}</text>)}
                        <path d="M44,104 L70.5,76 L97,76 L123.5,132 L150,104 L176.5,132 L203,76 L229.5,48 L256,104 L282.5,132 L309,104 L335.5,132 L362,76 L388.5,104 L415,48" fill="none" stroke="rgb(93,50,239)" strokeWidth="2"/>
                        <path d="M44,104 L70.5,76 L97,76 L123.5,132 L150,104 L176.5,132 L203,76 L229.5,48 L256,104 L282.5,132 L309,104 L335.5,132 L362,76 L388.5,104 L415,48 L415,160 L44,160Z" fill="rgba(93,50,239,.08)"/>
                        <path d="M44,76 L70.5,76 L97,48 L123.5,76 L150,132 L176.5,104 L203,48 L229.5,76 L256,76 L282.5,104 L309,76 L335.5,48 L362,76 L388.5,48 L415,48" fill="none" stroke="#10b981" strokeWidth="2"/>
                        <path d="M44,76 L70.5,76 L97,48 L123.5,76 L150,132 L176.5,104 L203,48 L229.5,76 L256,76 L282.5,104 L309,76 L335.5,48 L362,76 L388.5,48 L415,48 L415,160 L44,160Z" fill="rgba(16,185,129,.08)"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Row 7: Media Storage Statistics ── */}
            <div ref={feat7Ref} className={`sch-showcase-row ${feat7Vis ? "in" : ""}`}>
              <div className="sch-showcase-text">
                <div className="sch-showcase-tag">Storage</div>
                <h3 className="sch-showcase-title">{features[6].title}</h3>
                <p className="sch-showcase-desc">{features[6].desc}</p>
                <ul className="sch-showcase-highlights">
                  {features[6].highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="sch-showcase-mockup">
                <div className="sch-showcase-card sch-storage">
                  <div className="sch-showcase-card-glow" />
                  <div className="sch-storage-top">
                    {[
                      {label:"Total Projects",val:"178",icon:"\u{1F4C2}",bg:"rgba(93,50,239,.08)",color:"rgb(93,50,239)"},
                      {label:"Pending Projects",val:"15",icon:"\u{23F3}",bg:"rgba(245,158,11,.08)",color:"#f59e0b"},
                      {label:"Delivered Projects",val:"163",icon:"\u2705",bg:"rgba(34,197,94,.08)",color:"#22c55e"},
                      {label:"Storage Used",val:"31.02 GB",icon:"\u{1F4BE}",bg:"rgba(232,62,140,.08)",color:"#e74c8b"},
                    ].map((s,i)=>(
                      <div key={i} className="sch-storage-stat-card">
                        <div>
                          <div className="sch-storage-stat-label">{s.label}</div>
                          <div className="sch-storage-stat-val">{s.val}</div>
                        </div>
                        <div className="sch-storage-stat-icon" style={{background:s.bg,color:s.color,fontSize:"18px"}}>{s.icon}</div>
                      </div>
                    ))}
                  </div>
                  <div className="sch-storage-bottom">
                    <div className="sch-storage-chart">
                      <div className="sch-storage-chart-title">Project Completion Trend</div>
                      <div className="sch-storage-chart-sub">Monthly project completions over the past year</div>
                      <div className="sch-storage-chart-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
                        +18%
                      </div>
                      <svg viewBox="0 0 380 140" style={{width:"100%",height:"auto"}}>
                        {[0,20,40,60,80].map((v,i)=><g key={i}><line x1="30" y1={120-i*25} x2="370" y2={120-i*25} stroke="#f0f0f3" strokeWidth="1"/><text x="24" y={124-i*25} textAnchor="end" fontSize="8" fill="#bbb" fontFamily="Sora,sans-serif">{v}</text></g>)}
                        {["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"].map((m,i)=><text key={m} x={42+i*28.8} y={135} textAnchor="middle" fontSize="7" fill="#bbb" fontFamily="Sora,sans-serif">{m}</text>)}
                        <defs><linearGradient id="storageGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" stopOpacity=".4"/><stop offset="100%" stopColor="#22c55e" stopOpacity="0"/></linearGradient></defs>
                        <path d="M42,118 L70.8,118 L99.6,116 L128.4,114 L157.2,110 L186,98 L214.8,68 L243.6,38 L272.4,32 L301.2,45 L330,70 L358.8,65" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M42,118 L70.8,118 L99.6,116 L128.4,114 L157.2,110 L186,98 L214.8,68 L243.6,38 L272.4,32 L301.2,45 L330,70 L358.8,65 L358.8,120 L42,120Z" fill="url(#storageGrad)" opacity=".3"/>
                      </svg>
                    </div>
                    <div className="sch-storage-overview">
                      <div className="sch-storage-overview-title">Storage Overview</div>
                      <div className="sch-donut-wrap">
                        <svg width="120" height="120" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="44" fill="none" stroke="#f0f0f3" strokeWidth="14"/>
                          <circle cx="60" cy="60" r="44" fill="none" stroke="#a855f7" strokeWidth="14" strokeDasharray={`${0.62*2*Math.PI*44} ${2*Math.PI*44}`} strokeDashoffset="0" transform="rotate(-90 60 60)" strokeLinecap="round"/>
                          <text x="60" y="56" textAnchor="middle" fontSize="16" fill="#1a1a2e" fontFamily="Sora,sans-serif" fontWeight="800">62%</text>
                          <text x="60" y="70" textAnchor="middle" fontSize="9" fill="#999" fontFamily="Sora,sans-serif">Used</text>
                        </svg>
                      </div>
                      <div className="sch-storage-usage">31.02 GB / 50.00 GB</div>
                      <div className="sch-storage-remaining">18.98 GB remaining</div>
                      {[
                        {icon:"\u{1F465}",label:"Active Clients",sub:"Currently working with",val:"26"},
                        {icon:"\u{1F4C5}",label:"This Month",sub:"Projects completed",val:"2"},
                        {icon:"\u2B06\uFE0F",label:"Files Uploaded",sub:"This week",val:"820"},
                      ].map((r,i)=>(
                        <div key={i} className="sch-storage-info-row">
                          <div className="sch-storage-info-left">
                            <div className="sch-storage-info-icon" style={{background:"#f4f2ff",fontSize:"16px"}}>{r.icon}</div>
                            <div>
                              <div className="sch-storage-info-label">{r.label}</div>
                              <div className="sch-storage-info-sub">{r.sub}</div>
                            </div>
                          </div>
                          <div className="sch-storage-info-val">{r.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="about" className="sch-section sch-how" ref={howRef}>
        <div className="sch-container">
          <div className={`sch-section-head ${howVis ? "in" : ""}`}>
            <div className="sch-section-tag">How It Works</div>
            <h2 className="sch-section-title">Up and running<br />in minutes.</h2>
          </div>
          <div className="sch-steps">
            {steps.map((s, i) => (
              <div key={i} className={`sch-step ${howVis ? "in" : ""}`}>
                {i < 2 && <div className="sch-step-connector" />}
                <div className="sch-step-num">{i + 1}</div>
                <h3 className="sch-step-title">{s.title}</h3>
                <p className="sch-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="sch-stats" ref={statsRef}>
        <div className="sch-container">
          <div className={`sch-stats-grid ${statsVis ? "in" : ""}`}>
            {stats.map((s, i) => (
              <div key={i} className={`sch-stat-item ${statsVis ? "in" : ""}`}>
                <div className="sch-stat-number">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} animate={statsVis} />
                </div>
                <div className="sch-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="sch-section sch-testimonial" ref={testRef}>
        <div className="sch-container">
        <div className={`sch-test-card ${testVis ? "in" : ""}`}>
          <div className="sch-test-quote">"</div>
          <div className="sch-test-stars">★★★★★</div>
          <p className="sch-test-text">
            Scheddio completely changed how I run my photography business. I went from spending 10 hours a week on admin to maybe 2. My calendar is fuller than ever, and I actually enjoy the process now.
          </p>
          <div className="sch-test-author">
            <div className="sch-test-avatar">BG</div>
            <div>
              <div className="sch-test-name">Brian Gutierrez</div>
              <div className="sch-test-role">Real Estate Photographer · Miami, FL</div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sch-cta" ref={ctaRef}>
        <div className="sch-cta-blob-1" />
        <div className="sch-cta-blob-2" />
        <div className="sch-container">
          <div className={`sch-cta-content ${ctaVis ? "in" : ""}`}>
            <h2 className="sch-cta-title">Ready to transform<br />your photography business?</h2>
            <p className="sch-cta-sub">Join thousands of photographers who've already made the switch. Start free, no credit card required.</p>
            <button className="sch-btn-white">Start Free — 10 Projects on Us →</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="sch-footer">
        <div className="sch-container">
          <div className="sch-footer-logo"><img src="/logo/LOGOS/Logo White (1121x1122).png" alt="Scheddio" className="sch-logo-img" /></div>
          <div className="sch-footer-links">
            <a href="#features">Features</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <div className="sch-footer-copy">© 2026 Scheddio. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}