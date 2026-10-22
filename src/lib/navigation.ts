export type NavLink = {
  href: string;
  label: string;
};

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  // { href: "/episodes", label: "Episodes" },
  { href: "/#how-it-works", label: "How It Works" },
  // { href: "/about", label: "About" },
  // { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/#how-it-works", label: "How It Works" },
    ],
  },
  {
    title: "Company",
    links: [{ href: "/contact", label: "Contact" }],
  },
];

