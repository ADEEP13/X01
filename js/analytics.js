import { db } from './firebase-config.js';
import { doc, onSnapshot, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const USER_ID = 'local_user';
const today = new Date().toISOString().slice(0,10);
function updateAnalytics(data) {
  const chart = document.querySelector('[data-weekly-chart]');
  const summary = document.querySelector('[data-analytics-summary]');
  if (summary) summary.textContent = `Total Time: ${(data.totalScreenTime||0)} min`;
  if (chart) chart.textContent = `Weekly progress ${(data.weeklyProgressPercent||0)}%`;
}

function initAnalytics() {
  const ref = doc(db, 'usage', `${USER_ID}_${today}`);
  onSnapshot(ref, (snap) => updateAnalytics(snap.exists()?snap.data():{}));
}

window.addEventListener('load', initAnalytics);
