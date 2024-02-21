import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  todo: text("todo"),
});
