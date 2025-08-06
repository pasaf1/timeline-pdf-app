import React, { useEffect, useState } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import { ItemTimeline, TimelineEvent } from './components/ItemTimeline';
import { exportTimelineToPDF } from './exportTimelineToPDF';
import { AddEventForm } from './components/AddEventForm';

function App() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // פונקציה לשליפת אירועים מה־Supabase
  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('timeline_events')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('שגיאה בשליפה:', error);
    } else {
      setEvents(data as TimelineEvent[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="App p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🚀 טיימליין פרויקט</h1>

      {/* טופס להוספת אירועים */}
      <AddEventForm onAdd={fetchEvents} />

      {/* טיימליין */}
      <div id="timeline-to-export" className="mt-6">
        {loading ? (
          <p>טוען אירועים...</p>
        ) : (
          <ItemTimeline events={events} />
        )}
      </div>

      {/* כפתור הורדה */}
      <div className="text-center mt-6">
        <button
          onClick={exportTimelineToPDF}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          הורד כ־PDF
        </button>
      </div>
    </main>
  );
}

export default App;
