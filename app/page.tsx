import { db } from "@/db";
import { todos } from "@/db/schema";
import TodoForm from "./components/TodoForm/TodoForm";

export default async function Home() {
  const result = await db.select().from(todos);
  return (
    <main className="min-h-screen p-10">
      <TodoForm result={result} />
    </main>
  );
}
