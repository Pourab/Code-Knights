export interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  department: string;
  date: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  type: 'workshop' | 'seminar' | 'fest' | 'sports';
}

export interface Communication {
  id: number;
  subject: string;
  from: string;
  to: string;
  content: string;
  date: string;
  read: boolean;
}

export interface Hackathon {
  id: number;
  title: string;
  description: string;
  submittedBy: string;
  status: 'pending' | 'approved';
  posterUrl?: string;
}
