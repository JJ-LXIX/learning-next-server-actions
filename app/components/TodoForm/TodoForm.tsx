"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addTodo } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TodoList from "../TodoList/TodoList";
import { BaseSyntheticEvent, startTransition, useOptimistic } from "react";

type Todo = {
  id?: number;
  todo: string | null;
};

type Props = {
  result: Todo[];
};

const formSchema = z.object({
  todo: z
    .string()
    .min(2, { message: "Must enter something..." })
    .max(100, { message: "Can't enter more than 100 characters..." }),
});

export default function TodoForm({ result }: Props) {
  const [optimisticTodos, setOptimisticTodo] = useOptimistic(
    result,
    (state, newTodo: Todo) => {
      return [...state, newTodo];
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  async function onSubmit(
    data: z.infer<typeof formSchema>,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) {
    e?.preventDefault();
    console.log(data, e);
    form.reset();
    startTransition(() => {
      setOptimisticTodo({
        todo: data.todo as string,
      });
    });

    const result = await addTodo(data);
    console.log(result);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data, e) => onSubmit(data, e))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Todos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your todo"
                      {...field}
                      className="max-w-60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <TodoList optimisticTodos={optimisticTodos} />
    </>
  );
}
