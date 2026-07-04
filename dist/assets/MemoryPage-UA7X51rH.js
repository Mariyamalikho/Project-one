import{a as s,u as c,j as e,G as d,H as r}from"./index-r6nc2Ojz.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=s("FileAudio",[["path",{d:"M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"rslqgf"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",key:"9f7x3i"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=s("FileImage",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"10",cy:"12",r:"2",key:"737tya"}],["path",{d:"m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",key:"wt3hpn"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=s("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=s("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]),x={image:h,audio:n,text:o,corrupt:p};function y(){const{state:i}=c();return e.jsxs("section",{children:[e.jsx("h1",{className:"page-title",children:"Memory Archive"}),e.jsxs("div",{className:"mb-5 holo-panel p-4 text-sm text-slate-300",children:[e.jsx("p",{className:"font-display text-cyan",children:"Hidden collectible routes"}),e.jsx("p",{className:"mt-2",children:d.join(" / ")})]}),e.jsx("div",{className:"grid gap-4 md:grid-cols-2",children:r.map(a=>{const t=i.unlockedMemories.includes(a.id),l=x[a.kind];return e.jsxs("article",{className:`holo-panel overflow-hidden ${t?"":"opacity-60"}`,children:[e.jsx("div",{className:"h-36 border-b border-white/10",style:{background:t?a.image??"linear-gradient(135deg,#111827,#31f7ff22)":"repeating-linear-gradient(90deg,#111,#111 8px,#191919 8px,#191919 16px)"}}),e.jsxs("div",{className:"p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 text-cyan",children:[e.jsx(l,{size:18}),e.jsx("span",{className:"text-xs uppercase tracking-[0.24em]",children:a.kind})]}),e.jsx("h2",{className:"mt-3 font-display text-2xl",children:t?a.title:"Encrypted Fragment"}),e.jsx("p",{className:"mt-3 text-slate-300",children:t?a.body:"Collect this memory during story choices to decrypt the file."})]})]},a.id)})})]})}export{y as MemoryPage};
