// src/components/ItemTimeline.tsx

import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export interface TimelineEvent {
  id: string;
  event_type: string;
  description?: string;
  created_at: string;
  old_value?: string;
  new_value?: string;
  metadata?: {
    images?: string[];
    [key: string]: any;
  };
}

interface ItemTimelineProps {
  events: TimelineEvent[];
}

export const ItemTimeline: React.FC<ItemTimelineProps> = ({ events }) => {
  return (
    <VerticalTimeline>
      {events.map((event) => (
        <VerticalTimelineElement
          key={event.id}
          date={new Date(event.created_at).toLocaleString('he-IL')}
          iconStyle={{ background: '#2196f3', color: '#fff' }}
        >
          <h3>{getEventTitle(event.event_type)}</h3>
          {event.description && <p>{event.description}</p>}
          {event.event_type === 'image_added' && event.metadata?.images && (
            <div className="flex gap-2 mt-2">
              {event.metadata.images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="אירוע"
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          )}
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

const getEventTitle = (type: string) => {
  const map: Record<string, string> = {
    created: 'נוצר פריט',
    status_changed: 'סטטוס השתנה',
    image_added: 'הוספה תמונה',
    closed: 'הפריט נסגר',
    assigned: 'הוקצה למשתמש',
  };
  return map[type] || 'אירוע';
};
