"use client";
import { removeTodo } from "@/app/actions/actions";
import React from "react";

type Props = {
  todo: {
    id?: number;
    todo: string | null;
  };
};

export default function Todo({ todo }: Props) {
  return (
    <div
      className="min-h-52 bg-black text-white w-full flex p-4 rounded-lg relative"
      key={todo.id}
    >
      {todo.todo}
      <button
        onClick={() => removeTodo(todo.id!)}
        className="bg-red-800 w-10 h-10 absolute right-3 bottom-3 rounded-md"
      >
        X
      </button>
    </div>
  );
}
