interface SubCate {
  id: number;
  name: string;
}

export interface MenuItem {
  name: string;
  href: string;
  role?: string;
  openInNewTab?: boolean;
  sub?: SubCate[];
}

export const menuItems: MenuItem[] = [
  {
    name: "MBA",
    href: "/list?category=11&page=1",
    sub: [
      {
        name: "School Information",
        id: 11,
      },
      {
        name: "MBA Rankings",
        id: 12,
      },
      {
        name: "Application FAQ",
        id: 13,
      },
      {
        name: "Application Strategy",
        id: 14,
      },
      {
        name: "Resume",
        id: 15,
      },
      {
        name: "Recommendation Letter",
        id: 16,
      },
      {
        name: "Essay Writing",
        id: 17,
      },
      {
        name: "MBA Interview",
        id: 18,
      },
      {
        name: "Application Summary",
        id: 19,
      },
    ],
  },

  {
    name: "Master",
    href: "/list?category=20&page=1",
    sub: [
      {
        name: "School Introduction",
        id: 20,
      },
      {
        name: "Major and Ranking",
        id: 21,
      },
      {
        name: "Application FAQ",
        id: 22,
      },
      {
        name: "Business Interview",
        id: 25,
      },
      {
        name: "Application Summary",
        id: 26,
      },
    ],
  },
  { name: "Editor", href: "/editor/new", role: "ADMIN" },
];
