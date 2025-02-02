import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TaskList({ tasks, onReorder }) {
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
                    style={{ ...provided.draggableProps.style, marginBottom: '10px' }}
                  >
                    <h3>{task.title}</h3>
                    <p>{task.content}</p>
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
