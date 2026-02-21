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
  { icon: "📅", title: "Smart Scheduling", desc: "Your availability gets matched to what agents actually need. No more ping-ponging back and forth just to lock in a time slot." },
  { icon: "👤", title: "Client Portal", desc: "Clients can request shoots, review previews, and grab their finals from a clean branded portal. No email chains needed." },
  { icon: "⚡", title: "Workflow Automation", desc: "Follow-ups, delivery reminders, and invoices take care of themselves. The boring stuff between shoots just gets done." },
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

  /* ═══════════════════════ FEATURES ═══════════════════════ */
  .sch-features { background: #fff; }
  .sch-features::after {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(93,50,239,.055) 1px, transparent 1px);
    background-size: 48px 48px; pointer-events: none; opacity: .6;
  }
  .sch-features-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 22px; margin-top: 58px; max-width: 1060px; position: relative; z-index: 1; }

  .sch-feat-card {
    background: rgba(255,255,255,.95); border: 1px solid #eeeef1; border-radius: 18px;
    padding: 34px 28px; position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    opacity: 0; transform: translateY(30px);
    transition: all .6s cubic-bezier(.16,1,.3,1);
  }
  .sch-feat-card:nth-child(1) { transition-delay: .2s; }
  .sch-feat-card:nth-child(2) { transition-delay: .32s; }
  .sch-feat-card:nth-child(3) { transition-delay: .44s; }
  .sch-feat-card.in { opacity: 1; transform: translateY(0); }

  .sch-feat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, rgb(93,50,239), rgb(150,100,255));
    opacity: 0; transition: opacity .3s;
  }
  .sch-feat-card.in:hover {
    transition-delay: 0s; transition-duration: .28s;
    transform: translateY(-4px);
    box-shadow: 0 18px 44px rgba(0,0,0,.08);
    border-color: rgba(93,50,239,.2);
  }
  .sch-feat-card.in:hover::before { opacity: 1; }

  .sch-feat-icon { width: 48px; height: 48px; background: rgba(93,50,239,.08); border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 21px; margin-bottom: 20px; }
  .sch-feat-title { font-size: 17px; font-weight: 700; color: #0f0f1a; margin-bottom: 10px; letter-spacing: -.3px; }
  .sch-feat-desc { font-size: 14px; color: #6b6b7d; line-height: 1.65; flex: 1; }

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
  }
  @media (max-width: 720px) {
    .sch-section { padding: 72px 32px; }
    .sch-features-grid { grid-template-columns: 1fr; }
    .sch-feat-card:nth-child(2) { margin-top: 0; }
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
  }
`;

/* ── Component ── */
export default function Scheddio() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [featRef, featVis] = useInView();
  const [howRef, howVis] = useInView();
  const [statsRef, statsVis] = useInView();
  const [testRef, testVis] = useInView();
  const [ctaRef, ctaVis] = useInView();

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

      {/* ── Features ── */}
      <section className="sch-section sch-features" ref={featRef}>
        <div className={`sch-section-head ${featVis ? "in" : ""}`}>
          <div className="sch-section-tag">Features</div>
          <h2 className="sch-section-title">Everything you need<br />to grow your business.</h2>
          <p className="sch-section-sub">Built specifically for real estate photographers who want to spend less time managing and more time creating.</p>
        </div>
        <div className="sch-features-grid">
          {features.map((f, i) => (
            <div key={i} className={`sch-feat-card ${featVis ? "in" : ""}`}>
              <div className="sch-feat-icon">{f.icon}</div>
              <h3 className="sch-feat-title">{f.title}</h3>
              <p className="sch-feat-desc">{f.desc}</p>
            </div>
          ))}
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