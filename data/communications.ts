
import type { Communication } from '../types';

export const communications: Communication[] = [
  {
    id: 1,
    subject: "Project Submission Reminder",
    from: "Prof. Robert Smith",
    to: "Final Year CS Students",
    content: "This is a reminder that the deadline for the final year project submission is this Friday. Please adhere to the guidelines.",
    date: "2024-10-21",
    read: false
  },
  {
    id: 2,
    subject: "Feedback on recent guest lecture",
    from: "Student Council",
    to: "All Students",
    content: "We would appreciate your feedback on the recent guest lecture on 'Entrepreneurship'. A feedback form has been circulated via email.",
    date: "2024-10-20",
    read: true
  },
  {
    id: 3,
    subject: "Invitation to join Coding Club",
    from: "Coding Club",
    to: "First & Second Year Students",
    content: "The Coding Club is recruiting new members. If you are passionate about coding, join us for an introductory session this Wednesday.",
    date: "2024-10-18",
    read: false
  },
  {
    id: 4,
    subject: "Class Schedule Change for ECE-B",
    from: "ECE Department",
    to: "ECE-B Students",
    content: "Please note that the Digital Signal Processing class for tomorrow has been rescheduled to 2 PM.",
    date: "2024-10-22",
    read: true
  }
];
