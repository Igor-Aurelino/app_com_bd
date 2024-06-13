import { createClient } from "@supabase/supabase-js";

const link = "https://hvicanahcfmnlzxofbkp.supabase.co"
const chave = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aWNhbmFoY2Ztbmx6eG9mYmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNDM3NDgsImV4cCI6MjAzMzcxOTc0OH0.t01EUplRq-a1R-pLvSFdwySCfjK8jiaJKsQMC2iR0EY"
export const supabase = createClient(link, chave);