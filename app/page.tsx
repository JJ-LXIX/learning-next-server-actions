import { db } from "@/db";
import { todos } from "@/db/schema";
import TodoForm from "./components/TodoForm/TodoForm";
import Todo from "./components/Todo/Todo";

export default async function Home() {
  const result = await db.select().from(todos);
  return (
    <main className="min-h-screen p-10">
      <TodoForm />
      <div className="w-full grid gap-4 grid-cols-3 mt-7">
        {result?.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </div>
    </main>
  );
}
