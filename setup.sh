#!/bin/bash

echo "🚀 מתחילים התקנה והגדרות לפרויקט timeline-pdf-app"

cd src || { echo "❌ לא נמצא תיקיית src – ודא שאתה בתיקיית הפרויקט!"; exit 1; }

# === 1. טיפוסים חסרים ===
if [ ! -f "html2pdf.d.ts" ]; then
  echo "📄 מוסיף html2pdf.d.ts"
  echo "declare module 'html2pdf.js';" > html2pdf.d.ts
fi

if [ ! -f "react-vertical-timeline-component.d.ts" ]; then
  echo "📄 מוסיף react-vertical-timeline-component.d.ts"
  echo "declare module 'react-vertical-timeline-component';" > react-vertical-timeline-component.d.ts
fi

# === 2. קובץ Supabase ===
if [ ! -f "supabaseClient.ts" ]; then
  echo "🔌 יוצר supabaseClient.ts"
  cat <<EOF > supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kddgrzmgxxudzsgsermu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZGdyem1neHh1ZHpzZ3Nlcm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODQ5MzgsImV4cCI6MjA3MDA2MDkzOH0.oQN46_jv8hm7gDVMvS2_WOUE4Kxp8aSD482K9H9vE44';

export const supabase = createClient(supabaseUrl, supabaseKey);
EOF
fi

# === 3. קובץ exportTimelineToPDF ===
if [ ! -f "exportTimelineToPDF.ts" ]; then
  echo "📄 יוצר exportTimelineToPDF.ts"
  cat <<EOF > exportTimelineToPDF.ts
import html2pdf from 'html2pdf.js';

export const exportTimelineToPDF = () => {
  const element = document.getElementById('timeline-to-export');
  if (!element) return;

  const opt = {
    margin: 0.5,
    filename: 'timeline.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};
EOF
fi

# חזרה לתיקיית הפרויקט
cd ..

# === 4. התקנת חבילות ===
echo "📦 מתקין חבילות נדרשות..."

npm list @supabase/supabase-js &> /dev/null || npm install @supabase/supabase-js
npm list html2pdf.js &> /dev/null || npm install html2pdf.js
npm list react-vertical-timeline-component &> /dev/null || npm install react-vertical-timeline-component

echo "✅ כל ההגדרות הושלמו. אפשר להריץ את הפרויקט עם: npm start"
