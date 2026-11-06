
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  type LucideIcon,
} from "lucide-react";
import { profile } from "../lib/site-data";

export default function ContactFooter() {
  const emailHref = profile.email
    ? `mailto:${profile.email}`
    : profile.github;

  const footerLinks: Array<[string, string, LucideIcon]> = [
    ["#work", "Work", ArrowUpRight],
    ["#about", "About", ArrowUpRight],
    ["#skills", "Skills", ArrowUpRight],
    [profile.github, "GitHub", Github],
    ...(profile.linkedin
      ? [[profile.linkedin, "LinkedIn", Linkedin] as [string, string, LucideIcon]]
      : []),
  ];

  return (
    <footer
      id="contact"
      className="relative bg-[#08090b] p-[clamp(14px,2.5vw,34px)] text-[#f5f8f9] max-[760px]:p-[10px]"
    >
      <div className="relative overflow-hidden border border-cyan p-[clamp(18px,2.2vw,32px)] max-[760px]:p-[10px]">
        <div className="relative z-[1] min-h-[650px] overflow-hidden bg-[#0e1015] px-[clamp(22px,4vw,60px)] pb-5 pt-[clamp(25px,4vw,58px)] max-[760px]:min-h-0 max-[760px]:px-4 max-[760px]:pb-4 max-[760px]:pt-5">
          {/* Header */}
          <div className="relative z-[2] flex justify-between gap-5 border-b border-[rgba(255,255,255,.17)] pb-[15px] text-[8px] tracking-[.13em] text-[#a3adb4] max-[760px]:text-[7px] max-[390px]:tracking-[.07em]">
            <span className="text-cyan">05 / YOUR MOVE</span>
            <span>AVAILABLE FOR THE RIGHT OPPORTUNITY</span>
          </div>

          {/* Main content */}
          <div className="relative z-[2] grid grid-cols-[.58fr_1.42fr] gap-[7vw] py-[clamp(70px,9vw,125px)] pb-[clamp(70px,8vw,115px)] max-[760px]:grid-cols-1 max-[760px]:gap-[50px] max-[760px]:py-[66px] max-[760px]:pb-16">
            {/* Navigation links */}
            <div>
              <p className="mb-[30px] text-[9px] font-bold leading-[1.5] tracking-[.15em] text-[#8e9ba2] max-[760px]:mb-5">
                HAVE SOMETHING IN MIND?
              </p>

              <div className="flex flex-col items-start gap-[14px] max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-x-[10px] max-[760px]:gap-y-[13px]">
                {footerLinks.map(([href, label, Icon]) => (
                  <a
                    className="group flex items-center gap-[15px] font-display text-[clamp(18px,2vw,26px)] tracking-[-.02em] text-[#a9b2b7] transition-[color,transform] duration-200 hover:translate-x-1 hover:text-white max-[760px]:text-[22px]"
                    key={label}
                    href={href}
                    target={
                      href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    {label}

                    <Icon
                      className="text-cyan opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-[760px]:opacity-100"
                      size={16}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact call to action */}
            <div className="relative z-[1]">
              <h2 className="mb-[27px] whitespace-nowrap font-display text-[clamp(62px,10.3vw,150px)] font-medium leading-[.83] tracking-[-.07em] max-[900px]:text-[clamp(60px,9.5vw,100px)] max-[760px]:whitespace-normal max-[760px]:text-[clamp(51px,11.5vw,84px)] max-[760px]:leading-[.87] max-[390px]:text-[48px]">
                LET’S BUILD
                <br />
                <span className="text-[#8b969c]">
                  WHAT’S NEXT
                  <span className="text-cyan">.</span>
                </span>
              </h2>

              <p className="mb-[26px] mt-0 max-w-[420px] text-[13px] leading-[1.8] text-[#aab4ba] max-[760px]:text-[12px]">
                Good work starts with a good conversation. If you’re
                building something thoughtful, I’d like to hear about it.
              </p>

              <a
                className="inline-flex min-h-12 items-center justify-center gap-7 bg-cyan px-[19px] text-[10px] font-bold tracking-[.02em] text-ink transition-[transform,background,color] duration-[250ms] hover:-translate-y-[3px] hover:bg-[#64edf5]"
                href={emailHref}
              >
                {profile.email
                  ? "Start a conversation"
                  : "Connect on GitHub"}

                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Decorative SVG contours */}
          <div
            className="pointer-events-none absolute inset-[22%_0_10%] opacity-[.14] max-[760px]:inset-[30%_0_15%]"
            aria-hidden="true"
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 900 260"
              preserveAspectRatio="none"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                className="text-cyan"
              >
                {Array.from({ length: 22 }, (_, i) => (
                  <path
                    key={i}
                    d={`M${-80 + i * 8} 260 C ${
                      80 + i * 10
                    } ${150 - i * 4}, ${
                      220 + i * 15
                    } ${80 + i * 2}, ${
                      360 + i * 17
                    } 0 S ${720 + i * 4} ${
                      100 + i * 2
                    }, 980 210`}
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Footer bottom */}
          <div className="relative z-[2] flex items-center justify-between gap-5 border-t border-[rgba(255,255,255,.15)] pt-[19px] max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-4">
            <a
              className="flex items-center gap-2 text-[9px] font-bold tracking-[.1em]"
              href="#home"
            >
              <span className="font-display text-[25px] tracking-[-.07em]">
                P<span className="text-cyan">.</span>
              </span>
              PRINCE OWIRE
            </a>

            <span className="text-[7px] tracking-[.12em] text-[#8b979d] max-[760px]:text-right max-[760px]:text-[6px] max-[760px]:leading-[1.7]">
              © 2026 PRINCE OWIRE — FRONTEND DEVELOPER
            </span>

            <a
              href="#home"
              className="flex items-center gap-2 text-[7px] tracking-[.12em] text-[#dce3e6] max-[760px]:col-[1/-1] max-[760px]:justify-self-start"
            >
              BACK TO TOP
              <ArrowDown
                className="rotate-[-135deg] text-cyan"
                size={15}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom caption */}
      <div className="flex justify-between px-1 pt-3 text-[7px] tracking-[.12em] text-[#657077] max-[760px]:text-[6px]">
        <span>DESIGNED WITH INTENTION.</span>
        <span>NIGERIA · 2026</span>
      </div>
    </footer>
  );
}
