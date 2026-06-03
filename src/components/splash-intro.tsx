"use client";

import { type CSSProperties, useEffect, useState } from "react";

const BRAND=[
["T","-46vw","-38vh","-4.15em","-28deg"],["r","38vw","-42vh","-3.25em","24deg"],
["u","-50vw","30vh","-2.35em","18deg"],["s","46vw","34vh","-1.45em","-26deg"],
["t","0vw","-52vh","-.65em","18deg"],["F","-34vw","48vh",".25em","-22deg"],
["i","30vw","50vh","1.05em","20deg"],["r","-56vw","0vh","1.65em","30deg"],
["s","56vw","-6vh","2.45em","-30deg"],["t","10vw","56vh","3.25em","16deg"]
];

const SERVICES=["Website","Apps","Software","UI/UX","Automation","Secure","Premium","Support"];

export function SplashIntro(){
 const[show,setShow]=useState(true);
 useEffect(()=>{const t=window.setTimeout(()=>setShow(false),5600);return()=>window.clearTimeout(t)},[]);
 if(!show)return null;
 return <div className="splash-intro">
  <div className="splash-river" aria-hidden="true"/>
  <div className="splash-center">
   <p className="splash-mini">Welcome to</p>
   <h1 className="splash-brand" aria-label="TrustFirst">
    {BRAND.map(([l,sx,sy,fx,r],i)=><span key={i} className="splash-letter" style={{"--sx":sx,"--sy":sy,"--fx":fx,"--r":r,animationDelay:`${i*.09}s`} as CSSProperties}>{l}</span>)}
   </h1>
   <div className="splash-service-words">{SERVICES.map((w,i)=><span key={w} style={{animationDelay:`${1.9+i*.08}s`}}>{w}</span>)}</div>
   <b>Premium websites, apps and software systems</b>
  </div>
 </div>
}
