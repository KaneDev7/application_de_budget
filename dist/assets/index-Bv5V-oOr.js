var C=Object.defineProperty;var O=(r,e,t)=>e in r?C(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var E=(r,e,t)=>(O(r,typeof e!="symbol"?e+"":e,t),t),F=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var c=(r,e,t)=>(F(r,e,"read from private field"),t?t.call(r):e.get(r)),D=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},l=(r,e,t,n)=>(F(r,e,"write to private field"),n?n.call(r,t):e.set(r,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const d="depense",g="income",p="budget";class b{setDataToLocalStorage(e,t){localStorage.setItem(e,JSON.stringify(t))}getDataFromLocaleStorage(e){if(e===p){const t=JSON.parse(localStorage.getItem(e))||0;return parseFloat(t)}return JSON.parse(localStorage.getItem(e))||[]}}var a,i;class S{constructor(){D(this,a,[]);D(this,i,[]);E(this,"storage",new b)}addDepense(e,t){const n={id:Date.now(),title:e,montant:t};l(this,a,this.storage.getDataFromLocaleStorage(d)),c(this,a).push(n),this.storage.setDataToLocalStorage(d,c(this,a))}addInCommes(e,t){const n={id:Date.now(),title:e,montant:t};l(this,i,this.storage.getDataFromLocaleStorage(g)),c(this,i).push(n),this.storage.setDataToLocalStorage(g,c(this,i))}iniitBudget(e){this.storage.setDataToLocalStorage(p,e)}deleteDepense(e){l(this,a,this.storage.getDataFromLocaleStorage(d)),l(this,a,[...c(this,a)].filter(t=>t.id!==e)),this.storage.setDataToLocalStorage(d,c(this,a))}deleteIncomne(e){l(this,i,this.storage.getDataFromLocaleStorage(g)),l(this,i,[...c(this,i)].filter(t=>t.id!==e)),this.storage.setDataToLocalStorage(g,c(this,i))}getTotalMoney(e=[]){return e.reduce((t,n)=>n.hasOwnProperty("montant")?t+=parseFloat(n.montant):t,0)}getTotalBudgetInfo(){const e=this.storage.getDataFromLocaleStorage(p);l(this,a,this.storage.getDataFromLocaleStorage(d)),l(this,i,this.storage.getDataFromLocaleStorage(g));const t=this.getTotalMoney(c(this,a)),n=this.getTotalMoney(c(this,i)),o=e+(n-t);return{budget:e,depenses:t,solde:o}}}a=new WeakMap,i=new WeakMap;class I{createAndInsertDataToTable(e,t){const n=window.location.pathname;if(!(t.length<1)&&e&&(n==="/"||n.includes("/index.html"))){const o=document.querySelector(`table #${e}`),s=o.querySelector("#lastTrEl");for(const u of[...t]){const f=document.createElement("tr"),y=document.createElement("td"),w=document.createElement("td"),L=document.createElement("td"),h=document.createElement("button");h.title="Supprimer",y.innerText=u.title,w.innerText=u.montant+" F CFA",h.innerText="supprimer",f.appendChild(y),f.appendChild(w),L.appendChild(h),f.appendChild(L),o.insertBefore(f,s),h.addEventListener("click",()=>this.deleteItemFromBudget(u,e))}}}deleteItemFromBudget(e,t){if(!window.confirm("Voulez-vous continuer ?"))return;const o=new S;t==="depense"?o.deleteDepense(e.id):o.deleteIncomne(e.id),window.location.reload()}insertBudgetInfos(){const e=new S().getTotalBudgetInfo(),t=document.querySelectorAll(".card_montant p");for(const n of t){const o=n.dataset.montant;e[o]?(e[o]<0?n.style.color="red":n.style.color="black",n.innerText=e[o]+" F CFA"):n.innerText="0 F CFA"}}insertErrorMessage(e){if(!e)return;const t=document.querySelector(".errorMessage");t.style.display="block",t.innerText=e}}const m=document.querySelector(".formBox form"),B=new b,M=B.getDataFromLocaleStorage(d),x=B.getDataFromLocaleStorage(g),T=new I;T.createAndInsertDataToTable(d,M);T.createAndInsertDataToTable(g,x);T.insertBudgetInfos();m==null||m.addEventListener("submit",r=>{r.preventDefault();const e=new FormData(r.target),t=e.get("title"),n=e.get("montant");if(m.id!==p&&t.trim()===""){new I().insertErrorMessage("Ce champs est obligatoire");return}const o=new S;m.id===g?o.addInCommes(t,n):m.id===d?o.addDepense(t,n):o.iniitBudget(n),window.location.href=window.location.origin});