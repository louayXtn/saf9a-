import { Menu } from "@/types/Menu";

export const adminData: Menu[] = [
    {
    id: 1,
    title: "admin dashboard",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 2,
        title: "pending",
        newTab: false,
        path: "/pending",
      },
      {
        id: 3,
        title: "messages",
        newTab: false,
        path: "/messages",
      },
    ],
  },
];