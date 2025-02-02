import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

function TaskList({ tasks, onReorder, handleDelete }) {
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);
    onReorder(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: "10px",
                    }}
                    className="bg-white p-4 mb-4 shadow-md rounded"
                  >
                    <strong>{task.title}</strong>
                    <p>{task.content}</p>
                    <div className="flex justify-between mt-2">
                      <Link
                        to={`/edit-task/${task._id}`}
                        className="flex w-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="flex w-auto justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-600"
                      >
                        Delete Task
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;
