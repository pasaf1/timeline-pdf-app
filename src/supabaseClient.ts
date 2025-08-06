// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kddgrzmgxxudzsgsermu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZGdyem1neHh1ZHpzZ3Nlcm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODQ5MzgsImV4cCI6MjA3MDA2MDkzOH0.oQN46_jv8hm7gDVMvS2_WOUE4Kxp8aSD482K9H9vE44';

export const supabase = createClient(supabaseUrl, supabaseKey);
