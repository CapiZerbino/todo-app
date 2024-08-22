import { createClient } from '@supabase/supabase-js';

import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://daqwnlfjlonsyxixnqld.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhcXdubGZqbG9uc3l4aXhucWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMzM2MjIsImV4cCI6MjAzOTgwOTYyMn0.SjWQ0UDLpECbycBA2ylGla1gNbu9drzZYHSUWL3wzQo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
