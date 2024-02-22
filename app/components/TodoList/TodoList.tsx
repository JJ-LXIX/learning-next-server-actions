"use client";
import React from "react";
import Todo from "../Todo/Todo";

type Props = {
  optimisticTodos: {
    id?: number;
    todo: string | null;
  }[];
};

export default function TodoList({ optimisticTodos }: Props) {
  return (
    <div className="w-full grid gap-4 grid-cols-3 mt-7">
      {optimisticTodos?.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
  );
}
