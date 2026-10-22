export const heroTrust = [
  "Context-based matching",
  "Moderated community",
  "Anonymous conversations",
];

export const journeyOpener = [
  "Maybe you've had a terrible day.",
  "Maybe something amazing just happened.",
  "Maybe you're just bored.",
  "Maybe you're figuring something out.",
];

export type MatchChip = {
  label: string;
  emoji?: string;
  selected?: boolean;
};

export const matchSteps: { step: string; title: string; chips: MatchChip[] }[] = [
  {
    step: "01",
    title: "What describes you?",
    chips: [
      { label: "Student", emoji: "🎓", selected: true },
      { label: "International Student", emoji: "🌍", selected: true },
      { label: "Job Seeker", emoji: "💼" },
      { label: "Professional", emoji: "👔" },
    ],
  },
  {
    step: "02",
    title: "What are you open to?",
    chips: [
      { label: "Studies & Academics", emoji: "📚", selected: true },
      { label: "Career & Jobs", emoji: "💼" },
      { label: "Making Friends", emoji: "🤝" },
      { label: "New Country & Culture", emoji: "🌍", selected: true },
      { label: "Family & Home", emoji: "👨‍👩‍👧" },
      { label: "Personal Growth", emoji: "🌱" },
    ],
  },
  {
    step: "03",
    title: "What do you want to talk about?",
    chips: [
      { label: "Mood", emoji: "😊", selected: true },
      { label: "Situations", emoji: "💬" },
      { label: "Lifestyle", emoji: "🌿", selected: true },
      { label: "Career", emoji: "💼" },
      { label: "Relationships", emoji: "💞" },
      { label: "Personal Growth", emoji: "🌱" },
    ],
  },
];

export const matchOutcomes = [
  { text: "Someone walking a\nsimilar path.", tone: "ink" },
  { text: "Someone with a\ndifferent perspective.", tone: "muted" },
  { text: "Or simply... someone\nwho gets it.", tone: "accent" },
] as const;
