if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const t=e=>s(e,d),f={module:{uri:d},exports:o,require:t};i[d]=Promise.all(n.map((e=>f[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Ck5fsk2d.js",revision:null},{url:"assets/index-DPdqNT3r.css",revision:null},{url:"index.html",revision:"e1567f489b4a01d8fe33f62772b37e1a"},{url:"registerSW.js",revision:"98062444a5af1b2e991fc2363bfb1b59"},{url:"favicon.ico",revision:"8460d11424ea8d8d3d92ed6aff1d1d6b"},{url:"pwa-192x192.png",revision:"2985da5343ff12ef44abded21aa7b16d"},{url:"pwa-512x512.png",revision:"f15b01548367f5c85d9120413317ace8"},{url:"manifest.webmanifest",revision:"ef3f87f6403d4552ccb47518725ed9af"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
