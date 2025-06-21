// src/mocks/users.ts
import type { User } from "../types/User";

export const users: User[] = [
  {
    id: 1,
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan.kowalski@example.com",
    age: 30,
  },
  {
    id: 2,
    firstName: "Anna",
    lastName: "Nowak",
    email: "anna.nowak@example.com",
    age: 25,
  },
  {
    id: 3,
    firstName: "Piotr",
    lastName: "Wiśniewski",
    email: "piotr.wisniewski@example.com",
    age: 28,
  },
];
