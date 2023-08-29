import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

type Props = {
  id: string;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column = ({ id, todos, index }: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-2000" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between items-center font-bold text-xl p-2">
                  {idToColumnText[id as TypedColumn]}
                  <span
                    className="text-gray-500 bg-gray-200 rounded-full
                px-2 py-1 text-sm font-normal"
                  >
                    {todos.length}
                  </span>
                </h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
