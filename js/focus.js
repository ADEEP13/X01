import { db } from './firebase-config.js';
import { doc, onSnapshot, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const USER_ID = 'local_user';
const today = new Date().toISOString().slice(0,10);
async function loadFocusSessions() {
  const container = document.querySelector('[data-focus-history]');
  if (!container) return;
  const snap = await getDocs(collection(db, 'sessions', USER_ID, 'list'));
  container.innerHTML = '';
  snap.forEach(docu => {
    const s = docu.data();
    const el = document.createElement('div');
    el.textContent = `${s.startTime || ''} - ${s.duration || 0} min`;
    container.appendChild(el);
  });
}

function listenFocusSummary() {
  const ref = doc(db, 'usage', `${USER_ID}_${today}`);
  onSnapshot(ref, (snap) => {
    const data = snap.exists()?snap.data():{};
    const fs = document.querySelector('[data-focus-sessions]');
    if (fs) fs.textContent = (data.focusSessions||0);
  });
}

window.addEventListener('load', ()=>{ listenFocusSummary(); loadFocusSessions(); });
