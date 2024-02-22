"use client";
import React from "react";
import Todo from "../Todo/Todo";

type Todo = {
  id?: number;
  todo: string | null;
};

type Props = {
  optimisticTodos: {
    id?: number;
    todo: string | null;
  }[];
  setOptimisticTodo: (action: {
    action?: string | undefined;
    newTodo: Todo;
  }) => void;
};

export default function TodoList({
  optimisticTodos,
  setOptimisticTodo,
}: Props) {
  return (
    <div className="w-full grid gap-4 grid-cols-3 mt-7">
      {optimisticTodos?.map((todo) => {
        return (
          <Todo
            key={todo?.id}
            todo={todo}
            setOptimisticTodo={setOptimisticTodo}
          />
        );
      })}
    </div>
  );
}
