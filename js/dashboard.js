import { db } from './firebase-config.js';
import { doc, onSnapshot, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const USER_ID = 'local_user';
const today = new Date().toISOString().slice(0,10);
function updateDashboard(data) {
  const st = document.querySelector('[data-screen-time]');
  const fs = document.querySelector('[data-focus-sessions]');
  const ps = document.querySelector('[data-productive-score]');
  if (st) st.textContent = (data.totalScreenTime || 0) + ' min';
  if (fs) fs.textContent = (data.focusSessions || 0);
  if (ps) ps.textContent = (data.productiveScore || 0) + '%';
}

function initDashboard() {
  const ref = doc(db, 'usage', `${USER_ID}_${today}`);
  onSnapshot(ref, (snap) => updateDashboard(snap.exists() ? snap.data() : {}));
}

window.addEventListener('load', initDashboard);
