export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Idol's Drill",
    items: [
      { name: "Home", href: "/" },
      { name: "Chat", href: "/chat" },
      { name: "Result", href: "/result" },
    ],
  },
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
    ],
  },
  {
    title: "Components",
    items: [
      // Components will be added here by Prompt 2
    ],
  },
];
