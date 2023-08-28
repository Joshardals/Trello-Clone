import { databases } from "@/appwrite";

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );

  const todos = data.documents;

  const columns: Column[] = [
    { id: "todo", todos: [] },
    { id: "inprogress", todos: [] },
    { id: "done", todos: [] },
  ];

  todos.forEach((todo) => {
    const columnIndex = columns.findIndex(
      (column) => column.id === todo.status
    );

    if (columnIndex !== -1) {
      columns[columnIndex].todos.push({
        $id: todo.$id,
        $createdAt: todo.$createdAt,
        title: todo.title,
        status: todo.status,
        ...(todo.image && { image: JSON.parse(todo.image) }),
      });
    }
  });

  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  // If columns doesn't have inprogress, todo and done, add them with empty todos.

  for (const columnType of columnTypes) {
    const existingColumn = columns.find((column) => column.id === columnType);
    if (!existingColumn) {
      columns.push({
        id: columnType,
        todos: [],
      });
    }
  }

  // Sort Coluumns by ColumnTypes

  const sortedColumns = columns.sort((a, b) => {
    return columnTypes.indexOf(a.id) - columnTypes.indexOf(b.id);
  });

  const board: Board = {
    columns: sortedColumns,
  };
  return board;

  // const columns = todos.reduce((acc, todo) => {
  //   if (!acc.get(todo.status)) {
  //     acc.set(todo.status, {
  //       id: todo.status,
  //       todos: [],
  //     });
  //   }

  //   acc.get(todo.status)!.todos.push({
  //     $id: todo.$id,
  //     $createdAt: todo.$createdAt,
  //     title: todo.title,
  //     status: todo.status,
  //     ...(todo.image && { image: JSON.parse(todo.image) }),
  //   });

  //   return acc;
  // }, new Map<TypedColumn, Column>());

  // // If columns doesn't have inprogress, todo and done, add them with empty todos.
  // const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

  // for (const columnType of columnTypes) {
  //   if (!columns.get(columnType)) {
  //     columns.set(columnType, {
  //       id: columnType,
  //       todos: [],
  //     });
  //   }
  // }

  // // Sort Coluumns by ColumnTypes
  // const sortedColumns = new Map(
  //   Array.from(columns.entries()).sort(
  //     (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
  //   )
  // );

  // const board: Board = {
  //   columns: sortedColumns,
  // };

  // return board;
};
