export const heroTrust = [
  "Anonymous conversations",
  "Context-based matching",
  "Moderated community",
];

export const journeyOpener = [
  "Maybe you've had a terrible day.",
  "Maybe something amazing just happened.",
  "Maybe you're just bored.",
  "Maybe you're figuring something out.",
];

export type MatchChip = {
  label: string;
  selected?: boolean;
};

export const matchSteps: { step: string; title: string; chips: MatchChip[] }[] = [
  {
    step: "01",
    title: "What describes you?",
    chips: [
      { label: "Student", selected: true },
      { label: "International Student", selected: true },
      { label: "Job Seeker" },
      { label: "Professional" },
    ],
  },
  {
    step: "02",
    title: "What are you open to?",
    chips: [
      { label: "Studies & Academics", selected: true },
      { label: "Career & Jobs" },
      { label: "Making Friends" },
      { label: "New Country & Culture", selected: true },
      { label: "Family & Home" },
      { label: "Personal Growth" },
    ],
  },
  {
    step: "03",
    title: "What do you want to talk about?",
    chips: [
      { label: "Mood", selected: true },
      { label: "Situations" },
      { label: "Lifestyle", selected: true },
      { label: "Career" },
      { label: "Relationships" },
      { label: "Personal Growth" },
    ],
  },
];

export const matchOutcomes = [
  { text: "Someone walking a\nsimilar path.", tone: "ink" },
  { text: "Someone with a\ndifferent perspective.", tone: "muted" },
  { text: "Or simply... someone\nwho gets it.", tone: "accent" },
] as const;
