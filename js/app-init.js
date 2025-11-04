import './firebase-config.js';
import './tracker.js';
import { initRealtimeListeners } from './listeners.js';

window.addEventListener('load',()=>{ initRealtimeListeners('local_user'); });
