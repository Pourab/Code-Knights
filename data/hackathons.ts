import type { Hackathon } from '../types';

export const hackathons: Hackathon[] = [
  {
    id: 1,
    title: "AI for Social Good",
    description: "A 24-hour hackathon focused on building AI-powered solutions to tackle real-world social challenges. Open to all departments.",
    submittedBy: "Alice Johnson",
    status: "approved",
    posterUrl: "https://placehold.co/600x400/3498db/ffffff?text=AI+for+Good"
  },
  {
    id: 2,
    title: "Sustainable Tech Challenge",
    description: "Develop innovative hardware or software projects that promote environmental sustainability. Great prizes to be won!",
    submittedBy: "Bob Williams",
    status: "approved",
    posterUrl: "https://placehold.co/600x400/2ecc71/ffffff?text=Eco+Hack"
  },
  {
    id: 3,
    title: "Web3 & Blockchain Hack",
    description: "Explore the future of the decentralized web. Build DApps, explore smart contracts, and learn from industry experts.",
    submittedBy: "Charlie Brown",
    status: "pending"
  },
  {
    id: 4,
    title: "Game Dev Jam",
    description: "Create a video game from scratch in 48 hours. Theme to be announced at the start of the event. All skill levels welcome.",
    submittedBy: "Diana Prince",
    status: "pending"
  }
];
