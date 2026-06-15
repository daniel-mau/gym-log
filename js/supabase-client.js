// ============================================================
// SUPABASE SETUP
// ============================================================

const SUPABASE_URL = 'https://ulhlpnqqdgrphoqgqavl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsaGxwbnFxZGdycGhvcWdxYXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDg1NzEsImV4cCI6MjA5NTg4NDU3MX0.jE5b7SQjPEO6uupySgltbYFdh9FBM5ZTgpUfKHD7kYE';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true }
});
window.supabaseClient = supabaseClient;
