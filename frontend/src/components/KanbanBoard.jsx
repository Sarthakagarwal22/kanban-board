import React, { useEffect, useState } from 'react';
import BoardColumn from './BoardColumn';
import './KanbanBoard.css';
import { fetchListsWithTasks, createList } from '../api/listApi';
import BoardsList from './BoardsList';
import { useDrop } from 'react-dnd';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [newColName, setNewColName] = useState('');
  const [addingCol, setAddingCol] = useState(false);


  useEffect(() => {
    async function loadBoard() {
      setLoading(true);
      // Pass selectedBoardId to API if needed
      const lists = await fetchListsWithTasks(selectedBoardId);
      setColumns(lists);
      setLoading(false);
    }
    if (selectedBoardId) {
      loadBoard();
    }
  }, [selectedBoardId]);

  // Drag-and-drop for columns
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: (item, monitor) => {
      // Column drag logic can be added here
    },
  });

  const moveTaskHandler = async (fromColIdx, fromTaskIdx, toColIdx, toTaskIdx) => {
    const columnsCopy = [...columns];
    const fromCol = columnsCopy[fromColIdx];
    const toCol = columnsCopy[toColIdx];
    const [movedTask] = fromCol.tasks.splice(fromTaskIdx, 1);
    toCol.tasks.splice(toTaskIdx, 0, movedTask);
    setColumns(columnsCopy);
    // Persist to backend
    try {
      await import('../api/listApi').then(api =>
        api.moveTask(movedTask.taskId, toCol.listId, toTaskIdx)
      );
    } catch (e) {
      // Optionally show error
    }
  };

  const handleAddColumn = async () => {
    if (!newColName.trim() || !selectedBoardId) return;
    setAddingCol(true);
    try {
      const newCol = await createList({
        boardId: selectedBoardId, 
        name: newColName.trim(),
        position: columns.length
    });
      setColumns([...columns, newCol]);
      setNewColName('');
    } catch (e) {
      // Optionally show error
    }
    setAddingCol(false);
  };

  return (
    <div className='kanban-board-container'>
      <BoardsList selectedBoardId={selectedBoardId} setSelectedBoardId={setSelectedBoardId} />
      <div className="kanban-board" ref={drop}>
        {columns.map((col, idx) => (
          <BoardColumn
            key={col.id || col.listId}
            column={col}
            index={idx}
            moveColumn={(from, to) => {
              const updated = [...columns];
              const [removed] = updated.splice(from, 1);
              updated.splice(to, 0, removed);
              setColumns(updated);
            }}
            moveTask={moveTaskHandler}
            onColumnDelete={listId => {
              setColumns(columns.filter(c => c.listId !== listId && c.id !== listId));
            }}
          />
        ))}
        <div className="kanban-new-column">
          {addingCol || newColName !== '' ? (
            <>
              <input
                type="text"
                placeholder="Add column name"
                value={newColName}
                onChange={e => setNewColName(e.target.value)}
                // disabled={addingCol}
                autoFocus
                style={{ marginRight: 8 }}
                onBlur={() => { if (!newColName) setAddingCol(false); }}
              />
              <button onClick={handleAddColumn} disabled={!newColName.trim()}>
                Add
              </button>
              <button onClick={() => { setAddingCol(false); setNewColName(''); }} style={{ marginLeft: 4 }} aria-label="Cancel add column">
                ✕
              </button>
            </>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={() => setAddingCol(true)}>+ New Column</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
