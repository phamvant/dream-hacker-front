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
    href: "/list?category=1&page=1",
    sub: [
      {
        name: "Essay Writing",
        id: 2,
      },
      {
        name: "MBA Rankings",
        id: 3,
      },
      {
        name: "MBA Interviews",
        id: 4,
      },
      {
        name: "School Information",
        id: 5,
      },
      {
        name: "Resume",
        id: 6,
      },
      {
        name: "Recommendation Letter",
        id: 7,
      },
      {
        name: "Application FAQ",
        id: 8,
      },
      {
        name: "Application Summary",
        id: 9,
      },
      {
        name: "Application Strategy",
        id: 10,
      },
    ],
  },
  {
    name: "PhD",
    href: "/list?category=11&page=1",
    sub: [
      {
        name: "PhD",
        id: 11,
      },
      {
        name: "Essay Writing",
        id: 12,
      },
    ],
  },
  {
    name: "Master",
    href: "/list?category=2&page=1",
    sub: [
      {
        name: "Master",
        id: 13,
      },
      {
        name: "Essay Writing",
        id: 14,
      },
    ],
  },
  { name: "Editor", href: "/editor", role: "ADMIN" },
];
