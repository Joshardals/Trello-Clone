import { databases } from "@/appwrite";

export const getTodosGroupedByColumn = async () => {
  if (
    process.env.NEXT_PUBLIC_DATABASE_ID === undefined ||
    process.env.NEXT_PUBLIC_COLLECTION_ID === undefined
  ) {
    throw new Error("Enviroment variables are not defined");
  }
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_COLLECTION_ID
  );

  const todos = data.documents;
  console.log(todos);

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  console.log(columns);
};