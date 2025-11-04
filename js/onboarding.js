import { db } from './firebase-config.js';
import { doc, onSnapshot, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const USER_ID = 'local_user';
const today = new Date().toISOString().slice(0,10);
function initOnboarding() {
  const goalEl = document.querySelector('[data-onboarding-goal]');
  const ref = doc(db, 'usage', `${USER_ID}_${today}`);
  onSnapshot(ref, (snap) => {
    const d = snap.exists()?snap.data():{};
    if (goalEl) goalEl.textContent = `Today's goal: ${(d.dailyGoal||120)} min`;
  });
}
window.addEventListener('load', initOnboarding);
