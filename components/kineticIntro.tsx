"use client";

/**
 * KineticIntro — single-file kinetic typography loader.
 * Deps: react, gsap, tailwindcss (v4). Drop into a Next.js / Vite app and render <KineticIntro />.
 *
 * Layout model
 *  - The stage is `fixed inset-0` → always the full width/height of the viewport.
 *  - Atmosphere (light, dots, vignette, scanlines, grain, flash, FX canvas, HUD, loader) is full-bleed.
 *  - Typography lives in a 16:10 "frame" (the original design canvas) that is contained & centred, and is
 *    itself a size container, so every `cqw` size / % position from the original design is preserved at
 *    any aspect ratio. The orb/trail canvas is full-screen and maps its 0–1 coordinates onto that frame.
 *  - `?debug` in the URL shows a timeline scrubber. Click the stage (or the button) to replay.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ────────────────────────────────────────────────────────────────────────── config */

export type KineticConfig = {
  trailLength: number;
  glitchIntensity: number;
};

export const DEFAULT_CONFIG: KineticConfig = { trailLength: 28, glitchIntensity: 1 };

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Instrument+Serif:ital@1&family=Space+Mono:wght@400;700&display=swap');";

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

/* ────────────────────────────────────────────────────────────────────────── glitch fx */

function sliceBands(node: HTMLElement, intensity = 1) {
  const tl = gsap.timeline();
  for (let i = 0; i < 5; i++) {
    tl.set(
      node,
      {
        x: () => (Math.random() - 0.5) * 220 * intensity,
        skewX: () => (Math.random() - 0.5) * 7,
        filter: `blur(${Math.random() * 8 * intensity}px)`,
      },
      i * 0.035
    );
  }
  tl.set(node, { x: 0, skewX: 0, filter: "blur(0px)" }, 0.2);
  return tl;
}

function fractureToShards(node: HTMLElement, intensity = 1) {
  return gsap.to(node, {
    x: "12%",
    y: "-10%",
    rotate: -2.5,
    scale: 0.96,
    opacity: 0.18,
    filter: `blur(${4 * intensity}px)`,
    duration: 0.32,
    ease: "power3.in",
  });
}

/* ────────────────────────────────────────────────────────────────────────── orb + trail + canvas */

type OrbState = { x: number; y: number; radius: number; stretch: number; alpha: number };

/** Where the 0–1 "design frame" sits inside the full-screen canvas (CSS px). */
type View = { ox: number; oy: number; fw: number; fh: number };

class Orb {
  state: OrbState = { x: -0.04, y: 0.32, radius: 0.035, stretch: 1, alpha: 1 };

  draw(ctx: CanvasRenderingContext2D, v: View, time: number) {
    const s = this.state;
    const breath = 1 + Math.sin(time * Math.PI * 4.8) * 0.035;
    const x = v.ox + s.x * v.fw + Math.sin(time * 19) * 1.5;
    const y = v.oy + s.y * v.fh + Math.cos(time * 13) * 1.2;
    const r = Math.max(1, s.radius * v.fh * breath);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = s.alpha;

    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4.5);
    g.addColorStop(0, "#D9FFFF");
    g.addColorStop(0.12, "#6EE7FF");
    g.addColorStop(0.35, "rgba(34,211,238,.55)");
    g.addColorStop(1, "rgba(34,211,238,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, r * 4.5 * s.stretch, (r * 4.5) / Math.sqrt(Math.max(0.2, s.stretch)), 0, 0, Math.PI * 2);
    ctx.fill();

    const core = ctx.createRadialGradient(x, y, 0, x, y, r);
    core.addColorStop(0, "#D9FFFF");
    core.addColorStop(1, "#22D3EE");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Trail {
  private points: { x: number; y: number }[] = [];
  constructor(private max = 28) {}

  push(x: number, y: number) {
    this.points.push({ x, y });
    if (this.points.length > this.max) this.points.shift();
  }

  draw(ctx: CanvasRenderingContext2D, v: View) {
    if (this.points.length < 2) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 1; i < this.points.length; i++) {
      const a = this.points[i - 1];
      const b = this.points[i];
      const p = i / this.points.length;
      ctx.strokeStyle = `rgba(110,231,255,${p * 0.72})`;
      ctx.lineWidth = Math.max(0.25, p * 4);
      ctx.beginPath();
      ctx.moveTo(v.ox + a.x * v.fw, v.oy + a.y * v.fh);
      ctx.lineTo(v.ox + b.x * v.fw, v.oy + b.y * v.fh);
      ctx.stroke();
      if (i % 3 === 0) {
        ctx.fillStyle = `rgba(217,255,255,${p * 0.6})`;
        ctx.beginPath();
        ctx.arc(v.ox + b.x * v.fw, v.oy + b.y * v.fh, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

function makeNoiseTile(size = 256): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const image = ctx.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const v = Math.random() * 255;
    image.data[i] = image.data[i + 1] = image.data[i + 2] = v;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}

class FxCanvas {
  readonly orb = new Orb();
  private ctx: CanvasRenderingContext2D | null;
  private trail: Trail;
  private noise = [makeNoiseTile(), makeNoiseTile(), makeNoiseTile()];
  private noiseFrame = 0;
  private active = true;
  private view: View = { ox: 0, oy: 0, fw: 1, fh: 1 };
  private ro: ResizeObserver;

  constructor(
    private canvas: HTMLCanvasElement,
    private frame: HTMLElement,
    trailLength = 28
  ) {
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.trail = new Trail(trailLength);
    this.resize();
    window.addEventListener("resize", this.resize);
    this.ro = new ResizeObserver(this.resize);
    this.ro.observe(canvas);
    gsap.ticker.add(this.render);
  }

  setActive(active: boolean) {
    this.active = active;
  }

  /** Frame-relative x that sits just past the right edge of the screen. */
  rightEdgeX() {
    return (this.canvas.clientWidth - this.view.ox) / this.view.fw + 0.05;
  }

  /** Frame-relative x that sits just past the left edge of the screen. */
  leftEdgeX() {
    return -this.view.ox / this.view.fw - 0.04;
  }

  private resize = () => {
    const c = this.canvas.getBoundingClientRect();
    const f = this.frame.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.max(1, Math.round(c.width * dpr));
    this.canvas.height = Math.max(1, Math.round(c.height * dpr));
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.view = { ox: f.left - c.left, oy: f.top - c.top, fw: Math.max(1, f.width), fh: Math.max(1, f.height) };
  };

  private render = (time: number) => {
    if (!this.active || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    this.trail.push(this.orb.state.x, this.orb.state.y);
    this.trail.draw(ctx, this.view);
    this.orb.draw(ctx, this.view, time);

    // Subtle film-grain overlay; tile changes are intentionally low-frequency.
    if (Math.floor(time * 12) !== this.noiseFrame) {
      this.noiseFrame = Math.floor(time * 12);
      ctx.save();
      ctx.globalAlpha = 0.045;
      ctx.globalCompositeOperation = "screen";
      ctx.drawImage(this.noise[this.noiseFrame % this.noise.length], 0, 0, w, h);
      ctx.restore();
    }
  };

  destroy() {
    gsap.ticker.remove(this.render);
    window.removeEventListener("resize", this.resize);
    this.ro.disconnect();
  }
}

/* ────────────────────────────────────────────────────────────────────────── timeline */

type TimelineRefs = {
  stage: HTMLElement;
  line1: HTMLElement;
  line2: HTMLElement;
  blown: HTMLElement;
  away: HTMLElement;
  flash: HTMLElement;
  hairline: HTMLElement;
  fx: FxCanvas;
  onLabel: (label: string) => void;
  config: KineticConfig;
};

function buildTimeline({ stage, line1, line2, blown, away, flash, hairline, fx, onLabel, config }: TimelineRefs) {
  const orb = fx.orb;
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

  const label = (name: string, copy: string) => {
    tl.addLabel(name);
    tl.call(() => onLabel(copy));
  };

  gsap.set(stage, { yPercent: 0 });
  gsap.set([line1, line2, blown, away], { autoAlpha: 0 });
  gsap.set(hairline, { scaleX: 0, transformOrigin: "center" });
  gsap.set(flash, { autoAlpha: 0 });
  gsap.set(line1, { x: "-4%", y: "32%" });
  gsap.set(line2, { x: "10.5%", y: "44%" });
  gsap.set(blown, { x: "10.5%", y: "39%", clipPath: "inset(0 100% 0 0)" });
  gsap.set(away, { x: "10.5%", y: "48%", clipPath: "inset(0 100% 0 0)" });

  // Park the orb just off-screen on (re)start.
  tl.set(orb.state, { x: () => fx.leftEdgeX(), y: 0.32, radius: 0.035, stretch: 1, alpha: 1 }, 0);

  // Opening
  label("opening", "WELCOME");
  tl.to(line1, { autoAlpha: 1, x: "10.5%", duration: 0.35, ease: "expo.out" }, 0);
  tl.call(() => {
    orb.state.x = 0.105;
    orb.state.y = 0.32;
    orb.state.radius = 0.035;
  }, [], 0.35);
  tl.to(line1, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "none" }, 0.38);
  tl.to(orb.state, { x: () => fx.rightEdgeX(), y: -0.05, stretch: 3.2, duration: 0.45, ease: "power3.in" }, 1.55);
  tl.to(orb.state, { x: 0.12, y: 0.44, stretch: 0.6, duration: 0.28, ease: "power4.out" }, 2.0);

  // Second line
  label("second-line", "MY PORTFOLIO");
  tl.to(line2, { autoAlpha: 1, duration: 0.01 }, 2.08);
  tl.to(line2, { clipPath: "inset(0 0% 0 0)", duration: 0.38, ease: "none" }, 2.45);
  tl.to(orb.state, { x: 0.49, y: 0.44, stretch: 1, duration: 0.45 }, 2.45);

  // Name reveal
  label("name-reveal", "INTRODUCING");
  tl.to(blown, { autoAlpha: 0.6, clipPath: "inset(0 0% 0 0)", filter: "blur(5px)", duration: 0.07 }, 3.4);
  tl.to(flash, { autoAlpha: 0.85, duration: 0.025, yoyo: true, repeat: 1 }, 3.47);
  tl.to(blown, { autoAlpha: 1, filter: "blur(0px)", x: "10.5%", y: "39%", duration: 0.12 }, 3.6);
  tl.to(orb.state, { x: 0.99, y: 0.4, radius: 0.08, stretch: 1, duration: 0.12 }, 3.6);
  tl.to(away, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", filter: "blur(0px)", duration: 0.24 }, 3.95);
  tl.add(() => sliceBands(blown, config.glitchIntensity), 4.25);
  tl.add(() => fractureToShards(away, config.glitchIntensity), 4.45);

  // Welcome complete
  label("welcome-complete", "WELCOME TO MY PORTFOLIO");
  tl.to(hairline, { scaleX: 1, duration: 0.25, ease: "expo.out" }, 4.9);
  tl.to(orb.state, { x: 0.88, y: 0.48, radius: 0.035, stretch: 1, duration: 0.25 }, 4.9);

  // Fade welcome text out
  tl.to([line1, line2, blown, away, hairline], { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" }, 5.25);

  tl.to(orb.state, { alpha: 0, duration: 0.35 }, 5.65);
  tl.call(() => {
    orb.state.alpha = 0;
  }, [], 6.1);
  tl.to(stage, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, 6.1);

  return tl;
}

/* ────────────────────────────────────────────────────────────────────────── HUD */

function Hud({ label, start = false }: { label: string; start?: boolean }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!start) return;
    const started = performance.now();
    let raf = 0;
    const tick = () => {
      setElapsed((performance.now() - started) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start]);

  const remaining = Math.max(0, 90 - elapsed);
  const mm = Math.floor(remaining / 60).toString().padStart(2, "0");
  const ss = Math.floor(remaining % 60).toString().padStart(2, "0");
  const cc = Math.floor((remaining % 1) * 100).toString().padStart(2, "0");

  return (
    <div className="text-right font-['Space_Mono',monospace] tracking-[.08em] text-[rgba(216,216,204,.75)] [font-size:calc(min(1cqw,1.6cqh)*1.05)] max-sm:[font-size:1.5cqw]">
      {/* <div className="mb-[.45em] text-[.8em]">{label}</div>
      <div className="flex items-center gap-[1em]">
        <span className="text-[.8em] text-[#D9F038]">
          <i className="mr-[.35em] inline-block size-[.45em] rounded-full bg-current shadow-[0_0_7px_currentColor]" /> REC
        </span>
        <span>
          {mm}:{ss}.{cc}
        </span>
      </div> */}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── component */

// Shared class fragments (kept as constants so the JSX stays readable).
const COPY = "absolute whitespace-nowrap opacity-0 will-change-[transform,filter,clip-path] text-[#F8F8F0]";
const SANS = `${COPY} font-semibold font-[Arial,Helvetica,sans-serif] text-[4.2cqw] leading-[1.7] tracking-[-.02em]`;
const DISPLAY = `${COPY} font-['Archivo',Impact,sans-serif] text-[14.2cqw] font-black leading-[.86] tracking-[-.065em]`;
const FILL = "absolute inset-0 pointer-events-none";

export default function KineticIntro({
  config = DEFAULT_CONFIG,
  showReplayButton = true,
  onComplete,
}: {
  config?: KineticConfig;
  showReplayButton?: boolean;
  onComplete?: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const blownRef = useRef<HTMLDivElement>(null);
  const awayRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [hudLabel, setHudLabel] = useState("WELCOME");
  const [started, setStarted] = useState(false);
  const [debug, setDebug] = useState(false);
  const [frame, setFrame] = useState(0);

  const replay = useCallback(() => {
    if (!timelineRef.current) return;
    setStarted(true);
    timelineRef.current.restart();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDebug(params.has("debug"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let fx: FxCanvas | null = null;
    let ctx: gsap.Context | null = null;
    let frameTicker = 0;
    let completed = false;
    const complete = () => {
      if (completed || cancelled) return;
      completed = true;
      onComplete?.();
    };

    const init = async () => {
      await document.fonts.ready;
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      const frameEl = frameRef.current;
      if (cancelled || !stage || !canvas || !frameEl) return;

      fx = new FxCanvas(canvas, frameEl, config.trailLength);

      ctx = gsap.context(() => {
        timeline = buildTimeline({
          stage,
          line1: line1Ref.current!,
          line2: line2Ref.current!,
          blown: blownRef.current!,
          away: awayRef.current!,
          flash: flashRef.current!,
          hairline: hairlineRef.current!,
          fx: fx!,
          onLabel: setHudLabel,
          config,
        });
        timeline.eventCallback("onComplete", complete);
        timelineRef.current = timeline;

        if (reduced) {
          gsap.set(stage, { yPercent: -100 });
          timeline.progress(1).pause();
          complete();
        } else if (onComplete) {
          setStarted(true);
          fx?.setActive(true);
          timeline.play();
        } else {
          observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                setStarted(true);
                timeline?.play();
              } else {
                timeline?.pause();
              }
              fx?.setActive(entry.isIntersecting);
            },
            { threshold: [0, 0.6, 1] }
          );
          observer.observe(stage);
        }
      }, stage);

      if (params.has("debug")) {
        frameTicker = window.setInterval(() => setFrame(Math.round((timeline?.time() ?? 0) * 30)), 1000 / 12);
        (window as Window & { __kinetic?: gsap.core.Timeline }).__kinetic = timeline ?? undefined;
      }
    };

    init();

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (frameTicker) window.clearInterval(frameTicker);
      timeline?.kill();
      fx?.destroy();
      ctx?.revert();
      timelineRef.current = null;
    };
  }, [config, onComplete]);

  return (
    <section className="text-[#F8F8F0]">
      <style>{FONT_IMPORT}</style>
      <h2 className="sr-only">Welcome to my portfolio. I&apos;m Prince Owire, a frontend developer.</h2>

      {/* Stage — full viewport, size container */}
      <div
        ref={stageRef}
        aria-hidden="true"
        role="presentation"
        onClick={replay}
        className="fixed inset-0 isolate cursor-pointer overflow-hidden bg-[#050504] [container-type:size]"
      >
        <div className="absolute -inset-[10%] -z-[2] bg-[radial-gradient(ellipse_at_48%_43%,rgba(255,255,240,.06)_0,rgba(255,255,240,.025)_35%,transparent_56%)]" />

        <div className="pointer-events-none absolute inset-x-[3%] inset-y-[4%] bg-[radial-gradient(circle,rgba(255,255,255,.22)_0_1px,transparent_1.4px)] bg-[length:3.3%_8%] opacity-55 [mask-image:linear-gradient(90deg,black,transparent_35%,transparent_70%,black)] max-sm:bg-[length:4%_9%]" />

        <div className="absolute right-[4.5%] top-[4.5%] z-[9]">
          <Hud label={hudLabel} start={started} />
        </div>

        {/* Design frame — 16:10, contained + centred, also a size container so cqw matches the original */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            ref={frameRef}
            className="relative h-[min(62.5cqw,100cqh)] w-[min(100cqw,160cqh)] [container-type:size]"
          >
            <div className="absolute inset-0">
              <div ref={line1Ref} className={`${SANS} left-[10.5%] top-[19%] [clip-path:inset(0_0_0_0)]`}>
                WELCOME TO
              </div>
              <div ref={line2Ref} className={`${SANS} left-[10.5%] top-[31%]`}>
                MY PORTFOLIO
              </div>
              <div ref={blownRef} className={`${DISPLAY} top-[34%]`}>
                I&apos;M PRINCE
              </div>
              <div ref={awayRef} className={`${DISPLAY} top-[47%]`}>
                OWIRE
              </div>
            </div>
            <div
              ref={hairlineRef}
              className="absolute left-[9%] right-[10%] top-[61%] z-[2] h-px scale-x-0 bg-[#F8F8F0] shadow-[0_0_8px_rgba(255,255,240,.5)]"
            />
          </div>
        </div>

        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[4] size-full mix-blend-screen" />

        <div ref={flashRef} className={`${FILL} z-[5] bg-[#EDEBD0] opacity-0`} />
        <div className={`${FILL} z-[6] bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,.28)_78%,#000_100%)]`} />
        <div
          className={`${FILL} z-[7] bg-[repeating-linear-gradient(to_bottom,transparent_0_1px,rgba(255,255,255,.7)_2px,transparent_3px)] opacity-[.03]`}
        />
        <div className={`${FILL} z-[8] opacity-[.06]`} style={{ backgroundImage: GRAIN_URL }} />

        {debug && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-[2%] bottom-12 z-20 flex items-center gap-3 bg-black/80 px-2.5 py-2 font-['Space_Mono',monospace] text-[10px] text-[#D9F038] max-sm:text-[8px]"
          >
            <span>FRAME {frame.toString().padStart(3, "0")} / 207</span>
            <input
              aria-label="Scrub animation timeline"
              type="range"
              min="0"
              max="6.9"
              step={1 / 30}
              value={timelineRef.current?.time() ?? 0}
              className="flex-1 accent-[#D9F038]"
              onChange={(e) => {
                timelineRef.current?.pause().time(Number(e.target.value));
                setFrame(Math.round(Number(e.target.value) * 30));
              }}
            />
            <button className="cursor-pointer border border-[#626b2a] px-2 py-[3px]" onClick={replay}>
              REPLAY
            </button>
          </div>
        )}
      </div>

      {showReplayButton && (
        <button
          onClick={replay}
          className="fixed bottom-4 right-4 z-30 flex cursor-pointer items-center gap-2 font-['Space_Mono',monospace] text-[11px] uppercase tracking-[.12em] text-white/55"
        >
          <span className="text-[18px] text-[#D9F038]">↻</span> Replay intro
        </button>
      )}
    </section>
  );
}