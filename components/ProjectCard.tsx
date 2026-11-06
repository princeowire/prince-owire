'use client';
import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, type LucideIcon } from 'lucide-react';

type Project = {
  id: string;
  name: string;
  type: string;
  year: string;
  description: string;
  stack: string[];
  live: string;
  source: string;
  visual: string;
  details: string;
};

type ProjectVisualProps = { visual: string; name: string };

function ProjectVisual({ visual, name }: ProjectVisualProps) {
  if (visual === 'euphoria') return <div className="project-visual visual-euphoria group-hover:scale-[1.025]" aria-label={`${name} preview artwork`}><div className="euphoria-top"><span>euphoria.</span><span>NEW SEASON / 001</span><span>⌕　 BAG (0)</span></div><div className="euphoria-content"><div><small>THE EVERYDAY EDIT</small><strong>Find your<br /><i>own</i> rhythm.</strong><span>DESIGNED FOR YOUR EVERYDAY.</span></div><div className="euphoria-product"><div className="product-shape"><span /></div><span className="product-label">FORM / 01<br />ESSENTIAL OBJECT</span></div></div><div className="euphoria-bottom"><span>CURATED OBJECTS FOR EVERYDAY LIFE</span><span>DISCOVER THE COLLECTION ↗</span></div></div>;
  if (visual === 'blueice') return <div className="project-visual visual-blueice group-hover:scale-[1.025]" aria-label={`${name} preview artwork`}><div className="blueice-top"><span>BLUE ICE</span><span>COOLING · COMFORT · CLARITY</span><span>MENU +</span></div><div className="blueice-content"><span>MAKE ROOM<br />FOR <b>COOL.</b></span><div className="ice-orb"><div /></div></div><div className="blueice-bottom"><span>BUILT FOR THE WAY YOU LIVE.</span><span>SCROLL TO DISCOVER ↓</span></div></div>;
  return <div className="project-visual visual-weather group-hover:scale-[1.025]" aria-label={`${name} preview artwork`}><div className="weather-top"><span>ATMOS / 01</span><span>LIVE CONDITIONS</span></div><div className="weather-content"><div><small>YOUR DAY, AT A GLANCE</small><strong>28°</strong><span>Partly cloudy</span><p>LAGOS, NG <i>06:42 PM</i></p></div><div className="weather-sun"><span /><i /><b /></div></div><div className="weather-bottom"><span>WIND 12 KM/H</span><span>HUMIDITY 74%</span><span>UV INDEX 4</span></div></div>;
}

type ProjectCardProps = {
  project: Project;
  index?: number;
  featured?: boolean;
};

export default function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  const [details, setDetails] = useState(false);
  const alignment = index === 1 ? 'ml-0 max-w-[900px]' : index === 2 ? 'ml-auto max-w-[940px]' : 'ml-auto max-w-[1100px]';
  const links: Array<[string, string, LucideIcon]> = [[project.live, 'Live site', ExternalLink], ...(project.source ? [[project.source, 'Source', Github] as [string, string, LucideIcon]] : [])];

  return <article className={`w-full ${alignment} max-[760px]:ml-0 max-[760px]:max-w-none`}>
    <a className={`group relative isolate block overflow-hidden bg-[#e8edef] after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:border after:border-[rgba(9,10,11,.08)] after:content-[''] min-[1300px]:max-h-[720px] ${featured ? 'aspect-[1.62]' : 'aspect-[1.68]'} max-[760px]:aspect-[1.2] max-[390px]:aspect-[1.05]`} href={project.live} target="_blank" rel="noreferrer" aria-label={`View ${project.name} live site`}><ProjectVisual visual={project.visual} name={project.name} /><span className="absolute bottom-4 right-4 z-[4] grid h-[42px] w-[42px] translate-y-[9px] place-items-center rounded-full bg-cyan text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"><ArrowUpRight size={21} /></span></a>
    <div className="mt-[15px] grid grid-cols-[1fr_auto] gap-[30px] border-t border-[rgba(9,10,11,.17)] pt-[25px] max-[760px]:grid-cols-1 max-[760px]:gap-[18px] max-[760px]:pt-5"><div className="max-w-[650px]"><div className="flex flex-wrap gap-[18px] text-[8px] uppercase tracking-[.12em] text-[#69747a]"><span>{project.id} / {project.type}</span><span>{project.year}</span></div><h3 className="mb-3 mt-[18px] font-display text-[clamp(40px,6vw,78px)] font-medium leading-none tracking-[-.05em] max-[760px]:mb-[10px] max-[760px]:mt-[13px] max-[760px]:text-[53px]">{project.name}<span className="text-cyan">.</span></h3><p className="m-0 max-w-[600px] text-[13px] leading-[1.8] text-[#566168] max-[760px]:text-[12px]">{project.description}</p><div className="mt-[19px] flex flex-wrap gap-[7px]">{project.stack.map((tech: string) => <span className="border border-[#d2dade] px-[9px] py-[7px] text-[8px] tracking-[.02em] text-[#536068]" key={tech}>{tech}</span>)}</div></div><div className="flex flex-col items-start gap-[13px] pt-8 max-[760px]:flex-row max-[760px]:flex-wrap max-[760px]:gap-[17px] max-[760px]:pt-0">{links.map(([href, label, Icon]) => <a className="flex items-center gap-[9px] whitespace-nowrap border-0 border-b border-[#cbd3d7] bg-transparent p-0 pb-[7px] text-[10px] font-bold hover:border-cyan hover:text-[#008e9b] max-[760px]:text-[9px]" key={label} href={href} target="_blank" rel="noreferrer">{label} <Icon size={15} /></a>)}<button className="flex cursor-pointer items-center gap-[9px] whitespace-nowrap border-0 border-b border-[#cbd3d7] bg-transparent p-0 pb-[7px] text-[10px] font-bold hover:border-cyan hover:text-[#008e9b] max-[760px]:text-[9px]" type="button" onClick={() => setDetails((value) => !value)} aria-expanded={details}>{details ? 'Less detail' : 'Build notes'} <ArrowUpRight size={15} /></button></div></div>
    {details && <div className="mt-[25px] grid grid-cols-[180px_1fr] gap-5 border-t border-[#d8dfe2] py-[22px] max-[760px]:grid-cols-1 max-[760px]:gap-[10px] max-[760px]:py-[18px]"><span className="text-[8px] tracking-[.13em] text-[#68747a]">IMPLEMENTATION NOTES</span><p className="m-0 max-w-[680px] text-[12px] leading-[1.8] text-[#4d585e]">{project.details}</p></div>}
  </article>;
}
