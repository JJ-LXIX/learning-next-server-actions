"use client";
import { removeTodo } from "@/app/actions/actions";
import React, { startTransition } from "react";

type Props = {
  todo: {
    id?: number;
    todo: string | null;
  };
  setOptimisticTodo: any;
};

export default function Todo({ todo, setOptimisticTodo }: Props) {
  function buttonClick(id: number) {
    startTransition(() => {
      {
        setOptimisticTodo({
          action: "delete",
          newTodo: { id },
        });
      }
    });

    removeTodo(id);
  }

  return (
    <div
      className="min-h-52 bg-black text-white w-full flex p-4 rounded-lg relative"
      key={todo?.id}
    >
      {todo?.todo}
      <button
        onClick={() => buttonClick(todo.id!)}
        className="bg-red-800 w-10 h-10 absolute right-3 bottom-3 rounded-md"
      >
        X
      </button>
    </div>
  );
}
