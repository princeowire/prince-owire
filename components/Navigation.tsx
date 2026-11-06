'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [{ label: 'About', href: '#about' }, { label: 'Skills', href: '#skills' }, { label: 'Work', href: '#work' }, { label: 'Contact', href: '#contact' }];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); return; }
      if (event.key === 'Tab') {
        const panel = document.querySelector('.mobile-menu');
        const focusable = panel?.querySelectorAll('a[href], button:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth > 760) setOpen(false); };
    window.addEventListener('keydown', onKey); window.addEventListener('resize', onResize);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open]);

  useEffect(() => {
    if (open) { wasOpenRef.current = true; return; }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      if (window.innerWidth <= 760) triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return <>
    <header className="absolute inset-x-0 top-0 z-[30] flex h-[82px] items-center justify-between border-b border-[rgba(9,10,11,.09)] px-[var(--page-pad)] max-[760px]:h-[70px]">
      <a className="flex items-center gap-[11px]" href="#home" aria-label="Prince Owire home"><span className="font-display text-[31px] font-semibold leading-none tracking-[-.06em]">P<span className="text-cyan">.</span></span><span className="flex flex-col text-[10px] font-bold leading-[1.45] tracking-[.11em]">PRINCE OWIRE <small className="text-[8px] font-medium tracking-[.1em] text-[#747e84]">FRONTEND / 001</small></span></a>
      <nav className="ml-[12%] flex gap-[clamp(22px,3vw,48px)] max-[900px]:ml-0 max-[900px]:gap-[22px] max-[760px]:hidden" aria-label="Main navigation">{links.map((link) => <a className="text-[11px] font-semibold tracking-[.02em] transition-colors duration-200 hover:text-[#009eac]" key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <a className="flex items-center gap-[9px] border-b border-ink py-2 text-[11px] font-semibold tracking-[.02em] transition-colors duration-200 hover:text-[#009eac] max-[760px]:hidden" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
      <button ref={triggerRef} className="hidden cursor-pointer border-0 bg-transparent p-2 text-inherit max-[760px]:block" aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={23} /></button>
    </header>
    {open && <div className="fixed inset-0 z-[100] flex animate-[menu-in_.3s_ease_both] flex-col bg-[#0d0f14] px-[var(--page-pad)] pb-7 pt-5 text-[#f5f8f9]" role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,.16)] pb-[18px]"><a className="flex items-center gap-[11px]" href="#home" onClick={() => setOpen(false)}><span className="font-display text-[31px] font-semibold leading-none tracking-[-.06em]">P<span className="text-cyan">.</span></span><span className="flex flex-col text-[10px] font-bold leading-[1.45] tracking-[.11em]">PRINCE OWIRE <small className="text-[8px] font-medium tracking-[.1em] text-[#8a969d]">FRONTEND / 001</small></span></a><button ref={closeRef} className="block cursor-pointer border-0 bg-transparent p-2 text-inherit" aria-label="Close navigation menu" onClick={() => setOpen(false)}><X size={24} /></button></div>
      <nav className="my-auto flex flex-col">{links.map((link, i) => {
        const linkStyle = { '--i': i, animationDelay: `calc(${i} * .07s)` } as CSSProperties;
        return <a className="grid grid-cols-[36px_1fr_24px] items-center gap-[10px] border-b border-[rgba(255,255,255,.16)] py-[18px] font-display text-[clamp(43px,12vw,66px)] tracking-[-.04em] animate-[link-in_.45s_both]" key={link.href} style={linkStyle} href={link.href} onClick={() => setOpen(false)}><span className="font-sans text-[8px] tracking-[.1em] text-cyan">0{i + 1}</span>{link.label}<ArrowUpRight className="text-cyan" size={20} /></a>;
      })}</nav>
      <p className="text-[8px] tracking-[.13em] text-[#89959c]">INTERFACE ENGINEERING · NIGERIA</p>
    </div>}
  </>;
}
