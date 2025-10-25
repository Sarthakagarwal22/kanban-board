import React from 'react';
import './TaskCard.css';
import { useDrag, useDrop } from 'react-dnd';

const TaskCard = ({ task, columnIndex, index, moveTask }) => {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { columnIndex, index },
  });
  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item) => {
      if (item.columnIndex !== columnIndex || item.index !== index) {
        moveTask(item.columnIndex, item.index, columnIndex, index);
        item.columnIndex = columnIndex;
        item.index = index;
      }
    },
  });
  return (
    <div className="task-card" ref={node => drag(drop(node))}>
      <div className="task-title">{task.title}</div>
      {/* <div className="task-subtasks">{task.subtasks?.length || 0} of {task.subtasks?.length || 0} subtasks</div> */}
    </div>
  );
};

export default TaskCard;
