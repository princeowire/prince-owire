"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MoveDownRight } from "lucide-react";
import ContourField from "./ContourField";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-paper px-[var(--page-pad)] pb-[25px] pt-[clamp(145px,16vh,190px)] max-[900px]:min-h-[850px] max-[900px]:pt-[145px] max-[760px]:min-h-0 max-[760px]:pb-[22px] max-[760px]:pt-[130px]"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-[size:clamp(46px,5vw,78px)_clamp(46px,5vw,78px)] opacity-80 [background-image:linear-gradient(to_right,rgba(9,10,11,.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(9,10,11,.035)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,transparent_5%,black_45%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_minmax(320px,.86fr)] items-center gap-[2vw] max-[900px]:grid-cols-[1fr_.72fr] max-[900px]:gap-0 max-[760px]:flex max-[760px]:flex-col max-[760px]:items-stretch">
        <div className="relative z-[2] pb-[clamp(28px,5vw,76px)] max-[760px]:pb-0">
          <motion.p
            className="mb-6 flex items-center gap-[9px] text-[9px] font-bold leading-[1.5] tracking-[.15em] text-[#4d585d]"
            variants={rise}
            initial="hidden"
            animate="show"
          >
            <span className="signal-dot" /> FRONTEND DEVELOPER{" "}
            <span className="text-cyan">/</span> 001
          </motion.p>
          <h1 className="mb-[35px] flex flex-col items-start overflow-hidden font-display text-[clamp(94px,14.4vw,224px)] font-semibold leading-[0.89] tracking-[-.07em] max-[900px]:text-[clamp(100px,16vw,150px)] max-[760px]:mb-[29px] max-[760px]:text-[clamp(94px,21vw,160px)] max-[390px]:text-[clamp(84px,20vw,100px)]">
            <motion.span
              className="block will-change-transform"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: reduce ? 0 : 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              PRINCE
            </motion.span>
            
            <motion.span
              className="block will-change-transform"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: reduce ? 0 : 0.85,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              OWIRE<span className="text-cyan">.</span>
            </motion.span>
          </h1>
          <motion.div
            className="mb-[30px] flex max-w-[470px] gap-[15px] max-[760px]:max-w-[410px]"
            variants={rise}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
          >
            <span className="mt-[10px] h-px w-[31px] flex-[0_0_31px] bg-cyan" />
            <p className="m-0 max-w-[385px] text-[clamp(13px,1.12vw,16px)] leading-[1.75] text-[#4f585e]">
              I turn interface concepts into{" "}
              <strong className="font-semibold text-ink">
                responsive, interactive web experiences.
              </strong>{" "}
              Built with intention, shaped by details.
            </p>
          </motion.div>
          <motion.div
            className="flex items-center gap-[25px] max-[390px]:gap-[15px]"
            variants={rise}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.48 }}
          >
            <a
              className="inline-flex min-h-12 items-center justify-center gap-7 bg-ink px-[19px] text-[10px] font-bold tracking-[.02em] text-white transition-[transform,background,color] duration-[250ms] hover:-translate-y-[3px] hover:bg-[#24262a] max-[390px]:gap-4 max-[390px]:px-[13px]"
              href="#work"
            >
              Explore my work <ArrowDownRight size={17} />
            </a>
            <a
              className="inline-flex items-center gap-[9px] border-b border-[#b8c0c4] pb-2 text-[10px] font-bold transition-[border-color,color] duration-200 hover:border-cyan hover:text-[#009eac] max-[390px]:text-[9px]"
              href="#contact"
            >
              Get in touch <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
        <div
          className="hero-art"
          aria-label="Abstract technical contour visualization"
        >
          <div className="art-topline">
            <span>INTERFACE / SYSTEMS</span>
            <span>06° 27′ N · 07° 30′ E</span>
          </div>
          <ContourField />
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-crosshair crosshair-a" />
          <div className="art-crosshair crosshair-b" />
          <div className="art-big-type">
            UI<span>/</span>UX
          </div>
          <div className="art-coordinate coordinate-a">
            X — 008.24
            <br />Y — 002.91
          </div>
          <div className="art-coordinate coordinate-b">CRAFT / 2026</div>
          <div className="art-caption">
            <span className="cyan-square" /> SYSTEMS THAT FEEL SIMPLE.
          </div>
        </div>
      </div>
      <div className="relative z-[1] mt-7 flex items-end justify-between gap-5 border-t border-[rgba(9,10,11,.14)] pt-[18px] max-[760px]:mt-[14px] max-[760px]:items-start">
        <div className="flex gap-[clamp(24px,5vw,80px)] max-[760px]:flex-wrap max-[760px]:gap-x-[22px] max-[760px]:gap-y-[15px]">
          <span className="flex flex-col gap-[6px] text-[9px] font-semibold tracking-[.05em] max-[760px]:text-[8px] max-[390px]:text-[7px]">
            <small className="text-[7px] tracking-[.13em] text-[#7c868b]">
              BASED IN
            </small>
            NIGERIA
          </span>
          <span className="flex flex-col gap-[6px] text-[9px] font-semibold tracking-[.05em] max-[760px]:text-[8px] max-[390px]:text-[7px]">
            <small className="text-[7px] tracking-[.13em] text-[#7c868b]">
              FOCUS
            </small>
            FRONTEND ENGINEERING
          </span>
          <span className="flex flex-col gap-[6px] text-[9px] font-semibold tracking-[.05em] max-[760px]:text-[8px] max-[390px]:text-[7px]">
            <small className="text-[7px] tracking-[.13em] text-[#7c868b]">
              CORE STACK
            </small>
            JS / REACT / NEXT.JS
          </span>
        </div>
        <a
          className="flex items-center gap-[13px] text-[8px] font-bold tracking-[.12em] max-[760px]:shrink-0 max-[760px]:self-end max-[760px]:gap-[6px] max-[760px]:text-[7px] max-[760px]:whitespace-nowrap"
          href="#capabilities"
        >
          <span className="max-[760px]:max-w-[62px] max-[760px]:leading-[1.5]">
            SCROLL TO EXPLORE
          </span>
          <MoveDownRight
            className="animate-[cue_2.2s_ease-in-out_infinite] text-[#009da9]"
            size={17}
          />
        </a>
      </div>
      <div className="absolute right-[var(--page-pad)] top-[47%] text-[8px] tracking-[.18em] text-[#7d878c] [writing-mode:vertical-rl] max-[900px]:hidden">
        01 — 05
      </div>
    </section>
  );
}
