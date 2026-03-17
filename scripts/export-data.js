// Data Export Script for SudsyCo Rentals
// Run this in your browser console while logged in as ADMIN on sudsycorentals.com
//
// Steps:
// 1. Go to sudsycorentals.com and log in as admin
// 2. Open browser DevTools (F12 or Cmd+Option+I)
// 3. Go to the Console tab
// 4. Paste this entire script and press Enter
// 5. It will download JSON files for each table

(async () => {
  const SUPABASE_URL = "https://effhelwpanlnfmeguvek.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmZmhlbHdwYW5sbmZtZWd1dmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MTUxNTYsImV4cCI6MjA4NTM5MTE1Nn0.SlD9L9YhremH4Sop9pAZCOZRm0vsw6zD1rEpQgV7iMs";

  // Get the current session token from localStorage
  const storageKeys = Object.keys(localStorage).filter(k => k.includes("supabase") && k.includes("auth"));
  let accessToken = null;

  for (const key of storageKeys) {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (data?.access_token) {
        accessToken = data.access_token;
        break;
      }
    } catch (e) {}
  }

  if (!accessToken) {
    console.error("ERROR: No auth session found. Make sure you are logged in as admin!");
    return;
  }

  console.log("Found auth token. Starting export...");

  const tables = [
    "customers",
    "machines",
    "rental_history",
    "delivery_schedules",
    "contact_submissions",
    "delivery_blackout_dates",
    "user_roles"
  ];

  const allData = {};

  for (const table of tables) {
    console.log(`Exporting ${table}...`);
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.asc`,
        {
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Prefer": "count=exact"
          }
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.warn(`Warning: Could not export ${table}: ${err}`);
        allData[table] = [];
        continue;
      }

      const data = await response.json();
      allData[table] = data;
      console.log(`  ✓ ${table}: ${data.length} records`);
    } catch (err) {
      console.warn(`Warning: Error exporting ${table}:`, err);
      allData[table] = [];
    }
  }

  // Download as a single JSON file
  const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sudsyco-data-export.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log("\n=== EXPORT COMPLETE ===");
  console.log("File downloaded: sudsyco-data-export.json");
  console.log("Summary:");
  for (const [table, data] of Object.entries(allData)) {
    console.log(`  ${table}: ${data.length} records`);
  }
})();
