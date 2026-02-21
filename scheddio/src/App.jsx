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
    id: "portal",
    title: "Client Portal",
    desc: "Clients can request shoots, review previews, and grab their finals from a clean branded portal. No email chains needed.",
    highlights: ["Branded gallery delivery", "One-click approvals", "Automatic watermarking"],
  },
  {
    id: "automation",
    title: "Workflow Automation",
    desc: "Follow-ups, delivery reminders, and invoices take care of themselves. The boring stuff between shoots just gets done.",
    highlights: ["Auto-send invoices", "Delivery reminders", "Follow-up sequences"],
  },
  {
    id: "territory",
    title: "Territory Configuration",
    desc: "Map out exactly how far your photographers can travel. Draw service zones, set radius limits, and update boundaries anytime as your coverage grows.",
    highlights: ["Draw custom service zones", "Set max travel radius", "Update boundaries in real time"],
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

const bookings = [
  { name: "The Martinez Residence", loc: "9:00 AM · 123 Oak St", color: "rgb(93,50,239)", status: "Confirmed", sc: "confirmed" },
  { name: "Luxury Condo, Unit 4B", loc: "1:30 PM · 456 Pine Ave", color: "#f59e0b", status: "Pending", sc: "pending" },
  { name: "Downtown Loft Listing", loc: "4:00 PM · 789 Main Blvd", color: "#22c55e", status: "Upcoming", sc: "upcoming" },
];

/* ── Styles ── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100%; background: #fff; overflow-x: hidden; margin: 0; padding: 0; }

  .sch { font-family: 'Sora', sans-serif; background: #fff; width: 100%; min-height: 100vh; overflow-x: hidden; color: #1a1a2e; -webkit-font-smoothing: antialiased; }

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
  .sch-logo { font-size: 21px; font-weight: 800; color: rgb(93,50,239); letter-spacing: -.5px; cursor: pointer; }
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
    padding: 100px 72px 80px; position: relative; overflow: hidden; gap: 40px;
  }

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

  /* Hero Right */
  .sch-hero-right { flex: 1; display: flex; justify-content: center; align-items: center; position: relative; z-index: 2; }

  .sch-mockup-wrap {
    position: relative; width: 540px;
    opacity: 0; transform: translateY(30px);
    transition: opacity .9s cubic-bezier(.16,1,.3,1) .28s, transform .9s cubic-bezier(.16,1,.3,1) .28s;
  }
  .sch-mockup-wrap.in { opacity: 1; transform: translateY(0); }

  .sch-mockup-glow {
    position: absolute; inset: -30px;
    background: radial-gradient(ellipse, rgba(93,50,239,.11), transparent 64%);
    border-radius: 46px; filter: blur(30px); pointer-events: none;
  }

  .sch-mockup {
    background: #fff; border-radius: 18px;
    box-shadow: 0 28px 60px rgba(0,0,0,.11), 0 6px 16px rgba(0,0,0,.05);
    border: 1px solid rgba(0,0,0,.07);
    display: flex; overflow: hidden; height: 384px;
    animation: float 5.8s ease-in-out infinite;
  }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }

  /* Mock Sidebar */
  .sch-mock-sidebar {
    width: 52px; background: #f5f5f9; border-right: 1px solid #eee;
    display: flex; flex-direction: column; align-items: center;
    padding: 20px 0; gap: 14px; flex-shrink: 0;
  }
  .sch-mock-icon { width: 28px; height: 28px; border-radius: 8px; background: #e1e1eb; transition: background .2s; }
  .sch-mock-icon.active { background: rgb(93,50,239); box-shadow: 0 2px 8px rgba(93,50,239,.3); }
  .sch-mock-icon.avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, rgb(93,50,239), rgb(150,110,255)); }

  /* Mock Main */
  .sch-mock-main { flex: 1; padding: 22px; display: flex; flex-direction: column; gap: 14px; overflow: hidden; }

  .sch-mock-topbar { display: flex; justify-content: space-between; align-items: flex-start; }
  .sch-mock-topbar-title { font-size: 15px; font-weight: 700; color: #1a1a2e; }
  .sch-mock-topbar-sub { font-size: 11px; color: #999; margin-top: 2px; }
  .sch-mock-chip { font-size: 11px; font-weight: 600; color: #fff; background: rgb(93,50,239); padding: 5px 12px; border-radius: 14px; }

  .sch-mock-stats { display: flex; gap: 8px; }
  .sch-mock-stat { flex: 1; background: #f7f7fb; border-radius: 10px; padding: 12px 14px; border: 1px solid #eff0f2; }
  .sch-mock-stat-val { font-size: 19px; font-weight: 800; color: #1a1a2e; letter-spacing: -.5px; }
  .sch-mock-stat-label { font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: .5px; margin-top: 3px; font-weight: 500; }

  .sch-mock-bookings { flex: 1; display: flex; flex-direction: column; gap: 6px; overflow: hidden; }
  .sch-mock-booking {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; background: #fafafa;
    border: 1px solid #f0f0f2; border-radius: 8px; transition: all .2s;
  }
  .sch-mock-booking:hover { border-color: rgba(93,50,239,.2); background: rgba(93,50,239,.025); }
  .sch-mock-booking-bar { width: 3px; height: 30px; border-radius: 2px; flex-shrink: 0; }
  .sch-mock-booking-info { flex: 1; min-width: 0; }
  .sch-mock-booking-name { font-size: 12px; font-weight: 600; color: #1a1a2e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sch-mock-booking-loc { font-size: 10px; color: #999; margin-top: 2px; }
  .sch-mock-booking-status { font-size: 10px; font-weight: 600; padding: 4px 9px; border-radius: 6px; white-space: nowrap; }
  .confirmed { background: rgba(34,197,94,.1); color: #16a34a; }
  .pending { background: rgba(245,158,11,.1); color: #d97706; }
  .upcoming { background: rgba(93,50,239,.1); color: rgb(93,50,239); }

  /* ═══════════════════════ TRUST BAR ═══════════════════════ */
  .sch-trust { padding: 48px 60px; text-align: center; }
  .sch-trust p { font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; margin-bottom: 24px; }
  .sch-trust-logos { display: flex; justify-content: center; align-items: center; gap: 52px; flex-wrap: wrap; }
  .sch-trust-logo { font-size: 17px; font-weight: 700; color: #c8c8d0; letter-spacing: -.3px; transition: color .3s; cursor: default; }
  .sch-trust-logo:hover { color: #aaa; }

  /* ═══════════════════════ SECTION BASE ═══════════════════════ */
  .sch-section { padding: 104px 72px; position: relative; }
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
    display: flex; align-items: center; gap: 56px;
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
    width: 100%; max-width: 480px;
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

  /* ── Client Portal / Gallery Mockup ── */
  .sch-gallery { animation: breathe 6s ease-in-out infinite; }
  .sch-gallery-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; border-bottom: 1px solid #f0f0f3;
  }
  .sch-gallery-title { font-size: 14px; font-weight: 700; color: #1a1a2e; }
  .sch-gallery-count { font-size: 11px; color: #999; margin-left: 8px; font-weight: 500; }
  .sch-gallery-upload {
    font-size: 11px; font-weight: 600; color: rgb(93,50,239); background: rgba(93,50,239,.08);
    padding: 5px 12px; border-radius: 6px; cursor: pointer;
  }
  .sch-gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 16px 20px; }
  .sch-gallery-thumb {
    position: relative; border-radius: 10px; overflow: hidden;
    aspect-ratio: 4/3; cursor: pointer; transition: all .25s;
  }
  .sch-gallery-thumb:hover { transform: scale(1.03); }
  .sch-gallery-thumb.selected { outline: 2.5px solid rgb(93,50,239); outline-offset: -2.5px; }
  .sch-gallery-img {
    width: 100%; height: 100%; object-fit: cover;
  }
  .sch-gallery-badge {
    position: absolute; bottom: 6px; left: 6px;
    font-size: 9px; font-weight: 700; padding: 3px 7px; border-radius: 4px;
    text-transform: uppercase; letter-spacing: .3px;
  }
  .sch-gallery-badge.approved { background: rgba(34,197,94,.9); color: #fff; }
  .sch-gallery-badge.review { background: rgba(245,158,11,.9); color: #fff; }
  .sch-gallery-badge.new { background: rgba(93,50,239,.9); color: #fff; }

  .sch-gallery-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 20px; border-top: 1px solid #f0f0f3; background: #fafafa;
  }
  .sch-gallery-bar-stat { font-size: 11px; color: #888; }
  .sch-gallery-bar-stat strong { color: #1a1a2e; font-weight: 700; }
  .sch-gallery-bar-btn {
    font-size: 11px; font-weight: 600; color: #fff; background: rgb(93,50,239);
    padding: 5px 14px; border-radius: 6px;
  }

  /* ── Workflow / Pipeline Mockup ── */
  .sch-pipe { padding: 28px 20px 24px; }
  .sch-pipe-label { font-size: 12px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; text-align: center; }
  .sch-pipe-sub { font-size: 10px; color: #999; margin-bottom: 24px; text-align: center; }

  .sch-pipe-flow { display: flex; align-items: center; gap: 0; padding: 0 8px; }
  .sch-pipe-step {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;
    position: relative; z-index: 1;
  }
  .sch-pipe-node {
    width: 46px; height: 46px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; font-size: 16px;
    transition: all .3s;
  }
  .sch-pipe-node.done { background: rgba(34,197,94,.12); color: #16a34a; border: 2px solid rgba(34,197,94,.3); }
  .sch-pipe-node.active { background: rgba(93,50,239,.12); color: rgb(93,50,239); border: 2px solid rgba(93,50,239,.3); animation: pulse 2.2s ease-in-out infinite; }
  .sch-pipe-node.waiting { background: #f5f5f9; color: #ccc; border: 2px solid #eee; }
  .sch-pipe-step-label { font-size: 10px; font-weight: 600; color: #555; text-align: center; line-height: 1.3; }

  .sch-pipe-connector {
    width: 100%; height: 3px; background: #eee; position: relative;
    flex-shrink: 1; min-width: 20px; border-radius: 2px; overflow: hidden;
    margin: 0 -4px; align-self: flex-start; margin-top: 22px;
  }
  .sch-pipe-connector.active::after {
    content: ''; position: absolute; top: 0; left: 0; height: 100%; width: 40px;
    background: linear-gradient(90deg, transparent, rgb(93,50,239), transparent);
    border-radius: 2px;
    animation: pipeline-flow 2s ease-in-out infinite;
  }
  .sch-pipe-connector.done { background: rgba(34,197,94,.3); }

  .sch-pipe-events { margin-top: 24px; display: flex; flex-direction: column; gap: 6px; padding: 0 4px; }
  .sch-pipe-event {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px; background: #f7f7fb; border-radius: 8px;
    border: 1px solid #f0f0f3;
  }
  .sch-pipe-event-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .sch-pipe-event-text { font-size: 11px; color: #666; flex: 1; }
  .sch-pipe-event-time { font-size: 10px; color: #bbb; font-weight: 500; white-space: nowrap; }

  @keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.012)} }
  @keyframes pipeline-flow { 0%{left:-40px} 100%{left:100%} }

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
  .sch-stats { padding: 84px 60px; background: #fff; }
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
    padding: 128px 60px; text-align: center; position: relative;
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
  .sch-footer { background: #0f0f1a; padding: 50px 60px; display: flex; justify-content: space-between; align-items: center; }
  .sch-footer-logo { font-size: 19px; font-weight: 800; color: #fff; }
  .sch-footer-links { display: flex; gap: 28px; }
  .sch-footer-links a { color: #5a5a6a; text-decoration: none; font-size: 13px; font-weight: 500; transition: color .2s; }
  .sch-footer-links a:hover { color: #fff; }
  .sch-footer-copy { font-size: 12px; color: #484860; }

  /* ═══════════════════════ RESPONSIVE ═══════════════════════ */
  @media (max-width: 960px) {
    .sch-hero { flex-direction: column; padding: 130px 40px 64px; text-align: center; gap: 44px; }
    .sch-hero-left { flex: none; max-width: 100%; }
    .sch-hero-sub { max-width: 100%; }
    .sch-hero-btns { justify-content: center; }
    .sch-hero-right { flex: none; width: 100%; justify-content: center; }
    .sch-mockup-wrap { width: 100%; max-width: 520px; }
    .sch-hero-h1 { font-size: 44px; }
    .sch-nav { padding: 18px 32px; }
    .sch-nav.scrolled { padding: 12px 32px; }
    .sch-showcase-row, .sch-showcase-row.reverse { flex-direction: column; gap: 36px; }
    .sch-showcase-text { text-align: center; }
    .sch-showcase-desc { max-width: 100%; }
    .sch-showcase-highlights { align-items: center; }
    .sch-showcase-card { max-width: 420px; }
    .sch-showcase { gap: 72px; }
  }
  @media (max-width: 720px) {
    .sch-section { padding: 72px 32px; }
    .sch-stats-grid { flex-wrap: wrap; gap: 14px; }
    .sch-stat-item { flex: 1 1 calc(50% - 7px); }
    .sch-steps { flex-direction: column; gap: 36px; align-items: center; }
    .sch-step-connector { display: none; }
    .sch-step { max-width: 280px; }
    .sch-section-title { font-size: 34px; }
    .sch-cta { padding: 80px 32px; }
    .sch-cta-title { font-size: 34px; }
    .sch-footer { flex-direction: column; gap: 20px; text-align: center; }
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
        <div className="sch-logo">Scheddio</div>
        <ul className="sch-nav-links">
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">About</a></li>
        </ul>
        <button className="sch-nav-cta">Get Started Free</button>
      </nav>

      {/* ── Hero ── */}
      <section className="sch-hero">
        <div className="sch-blob sch-blob-1" />
        <div className="sch-blob sch-blob-2" />
        <div className="sch-blob sch-blob-3" />

        <div className="sch-hero-left">
          <div className={`sch-badge ${mounted ? "in" : ""}`}>
            <span className="sch-badge-dot" /> New: smarter scheduling is here
          </div>
          <h1 className={`sch-hero-h1 ${mounted ? "in" : ""}`}>
            The CRM that keeps<br /><span className="sch-gradient">photographers booked.</span>
          </h1>
          <p className={`sch-hero-sub ${mounted ? "in" : ""}`}>
            Manage your real estate shoots, clients, and workflows in one streamlined platform. Less admin headache, more time behind the lens.
          </p>
          <div className={`sch-hero-btns ${mounted ? "in" : ""}`}>
            <button className="sch-btn-primary">Start for free →</button>
            <button className="sch-btn-ghost">Watch demo</button>
          </div>
        </div>

        <div className="sch-hero-right">
          <div className={`sch-mockup-wrap ${mounted ? "in" : ""}`}>
            <div className="sch-mockup-glow" />
            <div className="sch-mockup">
              {/* Sidebar */}
              <div className="sch-mock-sidebar">
                <div className="sch-mock-icon active" />
                <div className="sch-mock-icon" />
                <div className="sch-mock-icon" />
                <div className="sch-mock-icon" />
                <div style={{ flex: 1 }} />
                <div className="sch-mock-icon avatar" />
              </div>
              {/* Main */}
              <div className="sch-mock-main">
                <div className="sch-mock-topbar">
                  <div>
                    <div className="sch-mock-topbar-title">Today's Schedule</div>
                    <div className="sch-mock-topbar-sub">Tuesday, Jan 28</div>
                  </div>
                  <div className="sch-mock-chip">3 shoots</div>
                </div>
                <div className="sch-mock-stats">
                  <div className="sch-mock-stat">
                    <div className="sch-mock-stat-val" style={{ color: "#22c55e" }}>$4,280</div>
                    <div className="sch-mock-stat-label">Revenue</div>
                  </div>
                  <div className="sch-mock-stat">
                    <div className="sch-mock-stat-val" style={{ color: "rgb(93,50,239)" }}>7</div>
                    <div className="sch-mock-stat-label">This Week</div>
                  </div>
                  <div className="sch-mock-stat">
                    <div className="sch-mock-stat-val">2</div>
                    <div className="sch-mock-stat-label">Pending</div>
                  </div>
                </div>
                <div className="sch-mock-bookings">
                  {bookings.map((b, i) => (
                    <div key={i} className="sch-mock-booking">
                      <div className="sch-mock-booking-bar" style={{ background: b.color }} />
                      <div className="sch-mock-booking-info">
                        <div className="sch-mock-booking-name">{b.name}</div>
                        <div className="sch-mock-booking-loc">{b.loc}</div>
                      </div>
                      <div className={`sch-mock-booking-status ${b.sc}`}>{b.status}</div>
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
        <p>Trusted by photographers working with</p>
        <div className="sch-trust-logos">
          {["Zillow", "Realogy", "eXp World", "Century 21", "Compass"].map(l => (
            <span key={l} className="sch-trust-logo">{l}</span>
          ))}
        </div>
      </div>

      {/* ── Features / Showcase ── */}
      <section className="sch-section sch-features" ref={featRef}>
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
                  <span className="sch-sched-month">January 2026</span>
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
                  {[26,27,28,29,30].map(n => (
                    <span key={n} className={`sch-sched-num ${n === 27 ? "today" : ""}`}>{n}</span>
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

          {/* ── Row 2: Client Portal (reversed) ── */}
          <div ref={feat2Ref} className={`sch-showcase-row reverse ${feat2Vis ? "in" : ""}`}>
            <div className="sch-showcase-text">
              <div className="sch-showcase-tag">Portal</div>
              <h3 className="sch-showcase-title">{features[1].title}</h3>
              <p className="sch-showcase-desc">{features[1].desc}</p>
              <ul className="sch-showcase-highlights">
                {features[1].highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
            <div className="sch-showcase-mockup">
              <div className="sch-showcase-card sch-gallery">
                <div className="sch-showcase-card-glow" />
                <div className="sch-gallery-header">
                  <div style={{display:"flex",alignItems:"baseline"}}>
                    <span className="sch-gallery-title">Property Gallery</span>
                    <span className="sch-gallery-count">24 photos</span>
                  </div>
                  <span className="sch-gallery-upload">+ Upload</span>
                </div>
                <div className="sch-gallery-grid">
                  <div className="sch-gallery-thumb selected">
                    <div className="sch-gallery-img" style={{background:"linear-gradient(135deg, #e8dff5 0%, #c4b5e0 100%)"}} />
                    <span className="sch-gallery-badge approved">Approved</span>
                  </div>
                  <div className="sch-gallery-thumb">
                    <div className="sch-gallery-img" style={{background:"linear-gradient(135deg, #d4e7fe 0%, #a8c8f0 100%)"}} />
                    <span className="sch-gallery-badge approved">Approved</span>
                  </div>
                  <div className="sch-gallery-thumb">
                    <div className="sch-gallery-img" style={{background:"linear-gradient(135deg, #fde8d0 0%, #f0c89a 100%)"}} />
                    <span className="sch-gallery-badge review">In Review</span>
                  </div>
                  <div className="sch-gallery-thumb">
                    <div className="sch-gallery-img" style={{background:"linear-gradient(135deg, #d5f5e3 0%, #a3e4bc 100%)"}} />
                    <span className="sch-gallery-badge new">New</span>
                  </div>
                </div>
                <div className="sch-gallery-bar">
                  <span className="sch-gallery-bar-stat"><strong>18</strong> approved · <strong>4</strong> in review · <strong>2</strong> new</span>
                  <span className="sch-gallery-bar-btn">Send to Client</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Row 3: Workflow Automation ── */}
          <div ref={feat3Ref} className={`sch-showcase-row ${feat3Vis ? "in" : ""}`}>
            <div className="sch-showcase-text">
              <div className="sch-showcase-tag">Automation</div>
              <h3 className="sch-showcase-title">{features[2].title}</h3>
              <p className="sch-showcase-desc">{features[2].desc}</p>
              <ul className="sch-showcase-highlights">
                {features[2].highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
            <div className="sch-showcase-mockup">
              <div className="sch-showcase-card">
                <div className="sch-showcase-card-glow" />
                <div className="sch-pipe">
                  <div className="sch-pipe-label">Workflow: Post-Shoot Delivery</div>
                  <div className="sch-pipe-sub">Automatically triggered after shoot completion</div>
                  <div className="sch-pipe-flow">
                    <div className="sch-pipe-step">
                      <div className="sch-pipe-node done">✓</div>
                      <div className="sch-pipe-step-label">Shoot<br/>Complete</div>
                    </div>
                    <div className="sch-pipe-connector done" />
                    <div className="sch-pipe-step">
                      <div className="sch-pipe-node done">✓</div>
                      <div className="sch-pipe-step-label">Auto<br/>Edit</div>
                    </div>
                    <div className="sch-pipe-connector active" />
                    <div className="sch-pipe-step">
                      <div className="sch-pipe-node active">→</div>
                      <div className="sch-pipe-step-label">Deliver &<br/>Invoice</div>
                    </div>
                  </div>
                  <div className="sch-pipe-events">
                    <div className="sch-pipe-event">
                      <div className="sch-pipe-event-dot" style={{background:"#22c55e"}} />
                      <span className="sch-pipe-event-text">Photos edited and watermarked</span>
                      <span className="sch-pipe-event-time">2 min ago</span>
                    </div>
                    <div className="sch-pipe-event">
                      <div className="sch-pipe-event-dot" style={{background:"rgb(93,50,239)"}} />
                      <span className="sch-pipe-event-text">Gallery link sent to client</span>
                      <span className="sch-pipe-event-time">Just now</span>
                    </div>
                    <div className="sch-pipe-event">
                      <div className="sch-pipe-event-dot" style={{background:"#f59e0b"}} />
                      <span className="sch-pipe-event-text">Invoice #1042 queued for delivery</span>
                      <span className="sch-pipe-event-time">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ── Row 4: Territory Configuration (reversed) ── */}
          <div ref={feat4Ref} className={`sch-showcase-row reverse ${feat4Vis ? "in" : ""}`}>
            <div className="sch-showcase-text">
              <div className="sch-showcase-tag">Territory</div>
              <h3 className="sch-showcase-title">{features[3].title}</h3>
              <p className="sch-showcase-desc">{features[3].desc}</p>
              <ul className="sch-showcase-highlights">
                {features[3].highlights.map((h, i) => <li key={i}>{h}</li>)}
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
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="sch-section sch-how" ref={howRef}>
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
      </section>

      {/* ── Stats ── */}
      <section className="sch-stats" ref={statsRef}>
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
      </section>

      {/* ── Testimonial ── */}
      <section className="sch-section sch-testimonial" ref={testRef}>
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
      </section>

      {/* ── CTA ── */}
      <section className="sch-cta" ref={ctaRef}>
        <div className="sch-cta-blob-1" />
        <div className="sch-cta-blob-2" />
        <div className={`sch-cta-content ${ctaVis ? "in" : ""}`}>
          <h2 className="sch-cta-title">Ready to transform<br />your photography business?</h2>
          <p className="sch-cta-sub">Join thousands of photographers who've already made the switch. Start free, no credit card required.</p>
          <button className="sch-btn-white">Get started for free →</button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="sch-footer">
        <div className="sch-footer-logo">Scheddio</div>
        <div className="sch-footer-links">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <div className="sch-footer-copy">© 2026 Scheddio. All rights reserved.</div>
      </footer>
    </div>
  );
}