import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export const AddEventForm: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('timeline_events').insert({
      event_type: eventType,
      description,
      metadata: imageUrl ? { images: [imageUrl] } : null
    });

    if (error) {
      alert('שגיאה בהוספה: ' + error.message);
    } else {
      alert('אירוע נוסף בהצלחה!');
      setEventType('');
      setDescription('');
      setImageUrl('');
      onAdd(); // רענון האירועים
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">הוספת אירוע חדש</h2>

      <label className="block mb-1">סוג אירוע</label>
      <input
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        placeholder="created / image_added / status_changed..."
        className="border p-2 w-full mb-2"
        required
      />

      <label className="block mb-1">תיאור</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <label className="block mb-1">קישור לתמונה (אם רלוונטי)</label>
      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
        הוסף אירוע
      </button>
    </form>
  );
};
