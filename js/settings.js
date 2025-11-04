import { db } from './firebase-config.js';
import { doc, onSnapshot, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const USER_ID = 'local_user';
const today = new Date().toISOString().slice(0,10);
function updateSettings(data) {
  const info = document.querySelector('[data-settings-info]');
  if (info) info.textContent = `Synced on ${new Date().toLocaleTimeString()}`;
}
function initSettings() {
  const ref = doc(db, 'usage', `${USER_ID}_${today}`);
  onSnapshot(ref, (snap) => updateSettings(snap.exists()?snap.data():{}));
}
window.addEventListener('load', initSettings);
