if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const f=e=>n(e,t),d={module:{uri:t},exports:o,require:f};i[t]=Promise.all(s.map((e=>d[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Diw-0GSt.js",revision:null},{url:"assets/index-VCX-5w-j.css",revision:null},{url:"index.html",revision:"9a45bcbe8126ef89046a0faaa4aff149"},{url:"registerSW.js",revision:"98062444a5af1b2e991fc2363bfb1b59"},{url:"favicon.ico",revision:"8460d11424ea8d8d3d92ed6aff1d1d6b"},{url:"pwa-192x192.png",revision:"2985da5343ff12ef44abded21aa7b16d"},{url:"pwa-512x512.png",revision:"f15b01548367f5c85d9120413317ace8"},{url:"manifest.webmanifest",revision:"ef3f87f6403d4552ccb47518725ed9af"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
