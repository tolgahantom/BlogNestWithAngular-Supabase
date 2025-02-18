import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xrotyqpqvvqjdodahqnc.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhyb3R5cXBxdnZxamRvZGFocW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3OTE0NjQsImV4cCI6MjA1NTM2NzQ2NH0.Ju66TaUShjAFuK9nLr_1H8g2Zplwol3eSlCIZBuNVt4';

export const supabase = createClient(supabaseUrl, supabaseKey);
