export interface EventDataInterface {
  id?: number;
  title: string;
  date: string | Date;
  description: string;
  icon: string;
  eventType: EventDataType;
  telephoneNumber: string;
  email: string;
  place: string;
  event: string;
}

export type EventDataType = 'sport' | 'culture' | 'health' | 'friends' | 'work' | 'family';
