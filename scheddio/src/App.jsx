import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

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
    perspective: 1800px;
    opacity: 0; transform: translateY(30px);
    transition: opacity .9s cubic-bezier(.16,1,.3,1) .28s, transform .9s cubic-bezier(.16,1,.3,1) .28s;
  }
  .sch-mockup-wrap.in { opacity: 1; transform: translateY(0); }

  .sch-mockup-glow {
    position: absolute; inset: -30px;
    background: radial-gradient(ellipse, rgba(93,50,239,.11), transparent 64%);
    border-radius: 46px; filter: blur(30px); pointer-events: none;
  }

  /* Laptop is now rendered via WebGL (Laptop3D component) */

  /* Phone schedule items */
  .sch-ph-sched-header {
    font-size: 9px; font-weight: 700; color: #1a1a2e;
    padding-bottom: 4px; border-bottom: 1px solid #f0f0f3; margin-bottom: 2px;
  }
  .sch-ph-sched-sub { font-size: 7px; color: #999; font-weight: 500; }
  .sch-ph-sched-item {
    display: flex; gap: 6px; padding: 5px 0;
    border-bottom: 1px solid #f8f8fb;
  }
  .sch-ph-sched-time {
    font-size: 7px; font-weight: 600; color: #999; min-width: 28px;
    padding-top: 2px;
  }
  .sch-ph-sched-block {
    flex: 1; border-radius: 5px; padding: 5px 6px;
    color: #fff; font-size: 8px; font-weight: 600; line-height: 1.3;
  }
  .sch-ph-sched-block-sub { font-size: 7px; font-weight: 400; opacity: .85; margin-top: 1px; }

  /* ── Phone device frame ── */
  @keyframes float-phone {
    0%,100%{ transform: rotateY(6deg) rotateX(-2deg) translateY(0); }
    50%{ transform: rotateY(6deg) rotateX(-2deg) translateY(-8px); }
  }
  .sch-phone {
    position: absolute; bottom: -10px; right: -30px;
    width: 170px; background: #1c1c1e; border-radius: 18px; padding: 6px;
    box-shadow:
      0 24px 50px rgba(0,0,0,.25),
      -4px 8px 20px rgba(0,0,0,.10);
    transform-style: preserve-3d;
    transform: rotateY(6deg) rotateX(-2deg);
    animation: float-phone 5.8s ease-in-out infinite;
    animation-delay: -.6s;
    z-index: 2;
  }
  .sch-phone-notch {
    width: 44px; height: 12px; background: #1c1c1e; border-radius: 0 0 8px 8px;
    margin: 0 auto; position: relative; top: -6px; z-index: 2;
  }
  .sch-phone-screen {
    background: #fff; border-radius: 12px; overflow: hidden;
    padding: 6px 8px 8px; display: flex; flex-direction: column; gap: 5px;
    min-height: 260px;
  }
  .sch-ph-logo { display: flex; align-items: center; margin-bottom: 2px; }
  .sch-ph-logo-img { height: 14px; width: auto; display: block; }
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
    .sch-showcase { gap: 72px; }
    .sch-phone { width: 140px; right: -16px; bottom: -14px; }
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
    .sch-phone { display: none; }
  }
`;

/* ── Canvas helpers ── */
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function paintScreen(canvas) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const font = "-apple-system,system-ui,sans-serif";

  /* toolbar */
  ctx.fillStyle = "#1c1c1e";
  ctx.fillRect(0, 0, W, 36);
  [[14,"#ff5f57"],[30,"#febc2e"],[46,"#28c840"]].forEach(([x,c]) => {
    ctx.fillStyle = c;
    ctx.beginPath(); ctx.arc(x, 18, 5, 0, Math.PI*2); ctx.fill();
  });

  /* white content */
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 36, W, H - 36);

  /* sidebar */
  const sw = 225;
  ctx.fillStyle = "#f8f8fc"; ctx.fillRect(0, 36, sw, H - 36);
  ctx.fillStyle = "#eee"; ctx.fillRect(sw - 1, 36, 1, H - 36);

  /* logo mark — draw S-shaped icon with gradient */
  const lg = ctx.createLinearGradient(16, 52, 38, 78);
  lg.addColorStop(0, "#4A5FE0"); lg.addColorStop(0.5, "#E0734A"); lg.addColorStop(1, "#F2A93B");
  ctx.fillStyle = lg;
  ctx.beginPath(); ctx.moveTo(18, 55); ctx.lineTo(30, 55); ctx.quadraticCurveTo(33, 55, 32, 58);
  ctx.lineTo(27, 66); ctx.quadraticCurveTo(26, 68, 24, 68); ctx.lineTo(16, 68);
  ctx.quadraticCurveTo(13, 68, 14, 65); ctx.lineTo(19, 57); ctx.quadraticCurveTo(20, 55, 18, 55); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(24, 62); ctx.lineTo(36, 62); ctx.quadraticCurveTo(39, 62, 38, 65);
  ctx.lineTo(33, 73); ctx.quadraticCurveTo(32, 75, 30, 75); ctx.lineTo(18, 75);
  ctx.quadraticCurveTo(15, 75, 16, 72); ctx.lineTo(21, 64); ctx.quadraticCurveTo(22, 62, 24, 62); ctx.closePath(); ctx.fill();
  ctx.font = `bold 17px ${font}`; ctx.fillStyle = "#1a1a2e"; ctx.fillText("Scheddio", 44, 72);

  ["Scheduling","Suppliers","Services","Projects","Settings","Billing"].forEach((t, i) => {
    const y = 100 + i * 40;
    if (i === 0) { ctx.fillStyle = "rgba(93,50,239,.08)"; rrect(ctx, 10, y, sw - 20, 34, 7); ctx.fill(); }
    ctx.fillStyle = i === 0 ? "rgb(93,50,239)" : "#ccc";
    ctx.beginPath(); ctx.arc(26, y + 17, 5, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = i === 0 ? "rgb(93,50,239)" : "#888";
    ctx.font = `${i === 0 ? "bold" : "500"} 14px ${font}`;
    ctx.fillText(t, 40, y + 22);
  });

  /* main header */
  const mx = sw + 18, mw = W - mx - 18;
  ctx.font = `bold 18px ${font}`; ctx.fillStyle = "#1a1a2e"; ctx.fillText("March 2026", mx, 68);

  ctx.font = `600 11px ${font}`;
  let bx = W - 18;
  [{t:"Month",a:false},{t:"Week",a:true},{t:"Day",a:false}].forEach(b => {
    const tw = ctx.measureText(b.t).width + 18; bx -= tw + 5;
    if (b.a) { ctx.fillStyle = "rgb(93,50,239)"; rrect(ctx, bx, 52, tw, 26, 5); ctx.fill(); ctx.fillStyle = "#fff"; }
    else { ctx.strokeStyle = "#eee"; ctx.lineWidth = 1; rrect(ctx, bx, 52, tw, 26, 5); ctx.stroke(); ctx.fillStyle = "#999"; }
    ctx.fillText(b.t, bx + 9, 69);
  });

  /* calendar */
  const timeW = 50, calX = mx + timeW, calW = mw - timeW, calY = 90;
  const colW = calW / 7, rowH = 60;
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], dates = [2,3,4,5,6,7,8];

  days.forEach((d, i) => {
    const cx = calX + i * colW + colW / 2;
    const isT = d === "Tue";
    ctx.textAlign = "center";
    ctx.font = `500 11px ${font}`; ctx.fillStyle = isT ? "rgb(93,50,239)" : "#999"; ctx.fillText(d, cx, calY + 14);
    ctx.font = `${isT ? "bold" : "500"} 15px ${font}`; ctx.fillStyle = isT ? "rgb(93,50,239)" : "#333"; ctx.fillText(String(dates[i]), cx, calY + 34);
    ctx.textAlign = "left";
  });

  const gridY = calY + 48;
  ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM"].forEach((t, r) => {
    const y = gridY + r * rowH;
    ctx.font = `500 10px ${font}`; ctx.fillStyle = "#bbb"; ctx.fillText(t, mx, y + 12);
    ctx.strokeStyle = "#f0f0f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(calX, y); ctx.lineTo(calX + calW, y); ctx.stroke();
  });

  [[0,1,"Martinez","rgb(93,50,239)"],[0,3,"Oak Villa","#10b981"],
   [1,0,"Twilight","#e74c8b"],[1,2,"Condo 4B","rgb(93,50,239)"],[1,4,"Sunset","#f59e0b"],
   [2,1,"Drone","#6366f1"],[2,3,"Penthouse","#e74c8b"],[2,5,"Garden","#10b981"],
   [3,0,"Loft","#10b981"],[3,2,"Listing","#f59e0b"],
   [4,3,"Review","rgb(93,50,239)"],[4,4,"Studio","#6366f1"],
   [5,0,"Downtown","rgb(93,50,239)"],[5,1,"Exterior","#f59e0b"]
  ].forEach(([r,c,n,col]) => {
    const x = calX + c * colW + 3, y = gridY + r * rowH + 4, w = colW - 6, h = rowH - 12;
    ctx.fillStyle = col; rrect(ctx, x, y, w, h, 5); ctx.fill();
    ctx.font = `bold 10px ${font}`; ctx.fillStyle = "#fff"; ctx.fillText(n, x + 6, y + 16);
  });

  /* stats */
  const sY = H - 55;
  ctx.fillStyle = "#f8f8fc"; ctx.fillRect(mx - 18, sY, mw + 36, 55);
  ctx.textAlign = "center";
  [["$4,280","Revenue","#22c55e"],["14","Shoots","rgb(93,50,239)"],["2","Pending","#1a1a2e"]].forEach(([v,l,c], i) => {
    const x = mx + i * (mw / 3) + mw / 6;
    ctx.font = `bold 16px ${font}`; ctx.fillStyle = c; ctx.fillText(v, x, sY + 22);
    ctx.font = `500 10px ${font}`; ctx.fillStyle = "#999"; ctx.fillText(l, x, sY + 38);
  });
  ctx.textAlign = "left";
}

function paintKeyboard(canvas) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = "#232326"; ctx.fillRect(0, 0, W, H);

  /* key well */
  const wp = 30, ww = W - wp*2, wh = H * 0.56;
  ctx.fillStyle = "#1a1a1c"; rrect(ctx, wp, wp, ww, wh, 10); ctx.fill();

  const kp = 12, kx0 = wp + kp, kaw = ww - kp*2, kg = 4;
  const rows = [[14,[13]],[14,[0,13]],[13,[0,12]],[12,[0,11]]];
  const nRows = rows.length + 1;
  const rh = (wh - kp*2 - (nRows-1)*3) / nRows;

  rows.forEach(([n, wide], ri) => {
    const y = wp + kp + ri * (rh + 3);
    const nw = (kaw - (n-1)*kg) / (n + wide.length*0.6);
    let x = kx0;
    for (let k = 0; k < n; k++) {
      const kw = wide.includes(k) ? nw*1.6 : nw;
      const g = ctx.createLinearGradient(x,y,x,y+rh);
      g.addColorStop(0,"#505054"); g.addColorStop(0.4,"#414145"); g.addColorStop(1,"#3b3b3f");
      ctx.fillStyle = g; rrect(ctx,x,y,kw,rh-4,3); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.07)"; ctx.fillRect(x+1,y,kw-2,1.5);
      ctx.fillStyle = "#252528"; rrect(ctx,x,y+rh-6,kw,3,1.5); ctx.fill();
      x += kw + kg;
    }
  });

  /* spacebar row */
  const sy = wp + kp + rows.length*(rh+3);
  const sizes = [1.5,1.5,5,1.5,1.5], total = sizes.reduce((a,b)=>a+b,0);
  let sx = kx0;
  sizes.forEach(s => {
    const kw = (kaw - (sizes.length-1)*kg)*s/total;
    const g = ctx.createLinearGradient(sx,sy,sx,sy+rh);
    g.addColorStop(0,"#505054"); g.addColorStop(0.4,"#414145"); g.addColorStop(1,"#3b3b3f");
    ctx.fillStyle = g; rrect(ctx,sx,sy,kw,rh-4,3); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.07)"; ctx.fillRect(sx+1,sy,kw-2,1.5);
    ctx.fillStyle = "#252528"; rrect(ctx,sx,sy+rh-6,kw,3,1.5); ctx.fill();
    sx += kw + kg;
  });

  /* trackpad */
  const tw = 200, th = 120, tx = (W-tw)/2, ty = wp + wh + 35;
  const tg = ctx.createLinearGradient(tx,ty,tx,ty+th);
  tg.addColorStop(0,"#3a3a3d"); tg.addColorStop(1,"#323235");
  ctx.fillStyle = tg; rrect(ctx,tx,ty,tw,th,8); ctx.fill();
  ctx.strokeStyle = "#444448"; ctx.lineWidth = 1; rrect(ctx,tx,ty,tw,th,8); ctx.stroke();
}

/* ── WebGL Laptop ── */
function Laptop3D() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const W = 580, H = 460;

    /* scene + camera */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, W / H, 0.1, 100);
    camera.position.set(0, 3.2, 9.5);
    camera.lookAt(0, 1.4, 0);

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);

    /* lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(5, 10, 7); scene.add(dir);
    const fill = new THREE.DirectionalLight(0xd0c0ff, 0.35);
    fill.position.set(-5, 3, -3); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.3);
    rim.position.set(0, -2, 8); scene.add(rim);

    /* materials */
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x303034, metalness: 0.75, roughness: 0.32 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1e, metalness: 0.65, roughness: 0.4 });

    /* screen texture */
    const scrC = document.createElement("canvas"); scrC.width = 1024; scrC.height = 700;
    paintScreen(scrC);
    const scrTex = new THREE.CanvasTexture(scrC);
    scrTex.colorSpace = THREE.SRGBColorSpace;

    /* keyboard texture */
    const kbC = document.createElement("canvas"); kbC.width = 1024; kbC.height = 640;
    paintKeyboard(kbC);
    const kbTex = new THREE.CanvasTexture(kbC);
    kbTex.colorSpace = THREE.SRGBColorSpace;

    /* laptop group */
    const laptop = new THREE.Group();

    /* ── base slab ── */
    const bw = 5, bh = 0.12, bd = 3.2;
    const base = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), bodyMat);
    base.position.y = bh / 2;
    laptop.add(base);

    /* keyboard face on top */
    const kbFace = new THREE.Mesh(
      new THREE.PlaneGeometry(bw - 0.15, bd - 0.15),
      new THREE.MeshBasicMaterial({ map: kbTex })
    );
    kbFace.rotation.x = -Math.PI / 2;
    kbFace.position.y = bh + 0.001;
    laptop.add(kbFace);

    /* ── screen pivot at back edge ── */
    const pivot = new THREE.Group();
    pivot.position.set(0, bh, -bd / 2);

    const sh = 3.3, sd = 0.06;
    const lid = new THREE.Mesh(new THREE.BoxGeometry(bw, sh, sd), darkMat);
    lid.position.y = sh / 2;
    pivot.add(lid);

    /* screen face */
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(bw - 0.2, sh - 0.15),
      new THREE.MeshBasicMaterial({ map: scrTex })
    );
    face.position.set(0, sh / 2 + 0.02, sd / 2 + 0.001);
    pivot.add(face);

    /* tilt back ~20° from vertical (110° from base) */
    pivot.rotation.x = -(20 * Math.PI / 180);
    laptop.add(pivot);

    /* ── hinge cylinder ── */
    const hinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, bw - 0.4, 16),
      bodyMat
    );
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, bh, -bd / 2);
    laptop.add(hinge);

    /* slight Y rotation for depth */
    laptop.rotation.y = 0.12;
    scene.add(laptop);

    /* ── animate ── */
    const clock = new THREE.Clock();
    let frame;
    (function loop() {
      frame = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      laptop.position.y = Math.sin(t * 0.8) * 0.05;
      laptop.rotation.y = 0.12 + Math.sin(t * 0.5) * 0.015;
      renderer.render(scene, camera);
    })();

    return () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (o.material.map) o.material.map.dispose();
          o.material.dispose();
        }
      });
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} style={{ width: 580, height: 460 }} />;
}

/* ── Component ── */
export default function Scheddio() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [featRef, featVis] = useInView();
  const [feat1Ref, feat1Vis] = useInView(0.15);
  const [feat2Ref, feat2Vis] = useInView(0.15);
  const [feat3Ref, feat3Vis] = useInView(0.15);
  const [feat4Ref, feat4Vis] = useInView(0.15);
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
        <div className="sch-logo"><img src="logo.jpg" alt="Scheddio" className="sch-logo-img" /></div>
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
              <div className="sch-mockup-glow" />
              {/* 3D Laptop (WebGL) */}
              <Laptop3D />
              {/* Phone — daily schedule */}
              <div className="sch-phone">
                <div className="sch-phone-notch" />
                <div className="sch-phone-screen">
                  <div className="sch-ph-logo"><img src="/logo.jpg" alt="Scheddio" className="sch-ph-logo-img" /></div>
                  <div className="sch-ph-sched-header">
                    Today <span className="sch-ph-sched-sub">Tue, Mar 3</span>
                  </div>
                  {[
                    { time: "8:00", name: "Martinez Residence", sub: "123 Oak St, Miami", color: "rgb(93,50,239)" },
                    { time: "10:00", name: "Drone Aerial Shoot", sub: "Brickell Ave, Unit 12", color: "#6366f1" },
                    { time: "12:00", name: "Sunset Villa Listing", sub: "456 Palm Dr", color: "#f59e0b" },
                    { time: "2:00", name: "Downtown Loft", sub: "789 Main Blvd", color: "#10b981" },
                    { time: "4:00", name: "Exterior Reshoot", sub: "321 Pine Ave", color: "#e74c8b" },
                  ].map((item, i) => (
                    <div key={i} className="sch-ph-sched-item">
                      <div className="sch-ph-sched-time">{item.time}</div>
                      <div className="sch-ph-sched-block" style={{background: item.color}}>
                        {item.name}
                        <div className="sch-ph-sched-block-sub">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
          <div className="sch-footer-logo"><img src="/logo-white.svg" alt="Scheddio" className="sch-logo-img" /></div>
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