// ============================================================
// SUPABASE SETUP
// ============================================================

const APP_COMMIT = '2026-08-07 10:06';

const SUPABASE_URL = 'https://ulhlpnqqdgrphoqgqavl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsaGxwbnFxZGdycGhvcWdxYXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDg1NzEsImV4cCI6MjA5NTg4NDU3MX0.jE5b7SQjPEO6uupySgltbYFdh9FBM5ZTgpUfKHD7kYE';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true }
});

if (window.location.hostname === 'localhost') {
  const _from = supabaseClient.from.bind(supabaseClient);
  supabaseClient.from = (table) => {
    const builder = _from(table);
    const noop = () => Promise.resolve({ data: null, error: null });
    const chainNoop = () => {
      const p = noop();
      p.eq = () => p;
      return p;
    };
    builder.upsert = noop;
    builder.insert = noop;
    builder.update = chainNoop;
    builder.delete = chainNoop;
    return builder;
  };
  console.log('[localhost] Supabase writes disabled — read-only mode');
}

window.supabaseClient = supabaseClient;
