import { db } from './firebase-config.js';
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const USER_ID = 'local_user';

function formatMinutes(mins) {
  const h = Math.floor(mins/60);
  const m = mins%60;
  return h>0 ? `${h}h ${m}m` : `${m}m`;
}

function updateUI(data) {
  const mins = data.totalScreenTime || 0;
  const el = document.querySelector('[data-screen-time]');
  if (el) el.textContent = formatMinutes(mins);

  const fs = data.focusSessions || Math.round((mins/25));
  const fsEl = document.querySelector('[data-focus-sessions]');
  if (fsEl) fsEl.textContent = `${fs}`;

  const scoreEl = document.querySelector('[data-productive-score]');
  if (scoreEl) scoreEl.textContent = `${data.productiveScore || 0}%`;
}

export function initRealtimeListeners(userId=USER_ID) {
  const today = new Date().toISOString().slice(0,10);
  const ref = doc(db,'usage',`${userId}_${today}`);
  return onSnapshot(ref,(snap)=>{
    if(!snap.exists()) return;
    updateUI(snap.data());
  });
}

window.addEventListener('load',()=>{ try{initRealtimeListeners();}catch(e){console.warn(e);} });
