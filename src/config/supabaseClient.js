
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://nvfupxgmshebislzsyzy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZnVweGdtc2hlYmlzbHpzeXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5ODM3MTUsImV4cCI6MjAyMDU1OTcxNX0.l8RlZWh_fUaqZem7x5_cI8VaS11I7ghlbw54xKKOTyw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;