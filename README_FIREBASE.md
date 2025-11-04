Detox - Firebase Integration (Added Files)
-----------------------------------------

Files added (no UI/layout changed):

- js/firebase-config.js         (paste your Firebase web config here)
- js/app.js                    (realtime UI listener helpers)
- js/usageTracker.js           (page-active usage tracker; saves to Firestore or localStorage)
- README_FIREBASE.md           (this file)

How to enable:
1. In Firebase Console, create a project and a web app. Copy the config object.
2. Paste config into js/firebase-config.js replacing REPLACE_ME fields.
3. Enable Firestore database.
4. Optionally create a test document:
   - Collection: usage
   - Document ID: local_user_YYYY-MM-DD
   - Fields: entries (map), totalScreenTime (number)
5. In your dashboard HTML pages, add these script tags (at end of <body>), without changing layout:
   <script type="module" src="/js/firebase-config.js"></script>
   <script type="module" src="/js/usageTracker.js"></script>
   <script type="module" src="/js/app.js"></script>

Usage on Dashboard:
- Call: window.DetoxRealtime.initRealtimeListeners('local_user');
- The scripts will update elements with IDs: screenTime, usageBreakdown, focusSessions if present.

Privacy:
- This tracker only measures time the page is active (site-only). It does not collect system-wide apps.
- For system-wide data, run a separate native agent (not included here).

