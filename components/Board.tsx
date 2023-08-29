"use client";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

const Board = () => {
  // const [board, getBoard] = useBoardStore((state) => [
  //   state.board,
  //   state.getBoard,
  // ]);

  const { board, getBoard } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  console.log(board);

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {board.columns.map((column, index) => (
              <Column
                key={column.id}
                id={column.id}
                todos={column.todos}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
