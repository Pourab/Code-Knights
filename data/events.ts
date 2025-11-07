
import type { Event } from '../types';

export const events: Event[] = [
  {
    id: 1,
    title: "Workshop on Artificial Intelligence",
    description: "An introductory workshop on the fundamentals of AI and Machine Learning. Open to all students.",
    date: "2024-10-25",
    time: "10:00 AM - 1:00 PM",
    location: "Auditorium A",
    organizer: "Computer Science Dept.",
    type: "workshop"
  },
  {
    id: 2,
    title: "Inter-College Debate Competition",
    description: "The annual inter-college debate competition 'Verbal War'. Come and support our team!",
    date: "2024-11-05",
    time: "2:00 PM onwards",
    location: "Main Auditorium",
    organizer: "Literary Club",
    type: "seminar"
  },
  {
    id: 3,
    title: "Tech Fest 'Innovate 2024'",
    description: "The biggest tech fest of the year with coding competitions, project showcases, and guest lectures.",
    date: "2024-11-18",
    time: "9:00 AM - 6:00 PM",
    location: "Entire Campus",
    organizer: "Student Council",
    type: "fest"
  },
  {
    id: 4,
    title: "Campus Basketball Tournament Finals",
    description: "The final match of the intra-college basketball tournament. Don't miss the thrilling action!",
    date: "2024-10-28",
    time: "5:00 PM",
    location: "Sports Complex",
    organizer: "Sports Committee",
    type: "sports"
  }
];
