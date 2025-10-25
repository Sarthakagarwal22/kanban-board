import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import './BoardColumn.css';
import { useDrag, useDrop } from 'react-dnd';
import { getTasks, createTask } from '../api/tasksApi';

const BoardColumn = ({ column, index, moveColumn, moveTask }) => {
  const [tasks, setTasks] = useState(column.tasks || []);
  const [adding, setAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks(column.id);
        setTasks(data);
      } catch (e) {
        // Optionally handle error
      }
    }
    fetchTasks();
  }, [column.listId]);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const position = tasks.length;
      const created = await createTask({
        listId: column.listId,
        title: newTaskTitle,
        position
      });
      setTasks([...tasks, created]);
      setNewTaskTitle('');
      setAdding(false);
    } catch (e) {
      // Optionally handle error
    }
  };

  const [, drag] = useDrag({
    type: 'COLUMN',
    item: { index },
  });
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: (item) => {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index;
      }
    },
  });
  return (
    <div className="board-column" ref={node => drag(drop(node))}>
      <div className="board-column-header">
        <span className="board-column-title">{column.name}</span>
      </div>
      <div className="board-column-tasks">
        {tasks.map((task, idx) => (
          <TaskCard
            key={task.taskId}
            task={task}
            columnIndex={index}
            index={idx}
            moveTask={moveTask}
          />
        ))}
      </div>
      {adding ? (
        <div className="board-column-add-task-input">
          <input
            type="text"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            placeholder="Task title"
            className="board-column-add-task-field"
            autoFocus
          />
          <button className="board-column-add-task-tick" onClick={handleAddTask}>
            ✓
          </button>
          <button className="board-column-add-task-cross" onClick={() => { setAdding(false); setNewTaskTitle(''); }} style={{ marginLeft: 4 }}>
            ✕
          </button>
        </div>
      ) : (
        <button className="board-column-add-task" onClick={() => setAdding(true)}>
          + Add Task
        </button>
      )}
    </div>
  );
};

export default BoardColumn;
