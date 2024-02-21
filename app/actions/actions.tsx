"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Data = {
  todo: string;
};

export const addTodo = async (data: Data) => {
  console.log("running on server");
  try {
    await db.insert(todos).values({ todo: data.todo });
    return { message: "Todo Added Successfully" };
  } catch (error) {
    return { error };
  } finally {
    revalidatePath("/");
  }
};

export const removeTodo = async (id: number) => {
  console.log("running on server");
  try {
    await db.delete(todos).where(eq(todos.id, id));
    console.log("Todo Deleted Successfully");
  } catch (error) {
    return { error };
  } finally {
    revalidatePath("/");
  }
};
