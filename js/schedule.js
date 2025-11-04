import { db } from './firebase-config.js';
import { doc, onSnapshot, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const USER_ID = 'local_user';
const today = new Date().toISOString().slice(0,10);
function updateSchedule(data) {
  const el = document.querySelector('[data-schedule-status]');
  if (el) el.textContent = `Focus today: ${(data.totalScreenTime||0)} min`;
}
function initSchedule() {
  const ref = doc(db, 'usage', `${USER_ID}_${today}`);
  onSnapshot(ref, (snap) => updateSchedule(snap.exists()?snap.data():{}));
}
window.addEventListener('load', initSchedule);
