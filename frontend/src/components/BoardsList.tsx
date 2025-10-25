import React, { useEffect, useState } from 'react';
import './BoardsList.less';
import { fetchBoards, createBoard } from '../api/boards';

type TBoard = {
    id: string;
    name: string;
}

type BoardsListProps = {
  selectedBoardId: string | null;
  setSelectedBoardId: (id: string) => void;
};

const BoardsList: React.FC<BoardsListProps> = ({ selectedBoardId, setSelectedBoardId }) => {
  const [boards, setBoards] = useState<TBoard[]>([]);
  const [creating, setCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  useEffect(() => {
    async function loadBoards() {
      try {
        const data = await fetchBoards();
        setBoards(data);
        if (data.length > 0) {
          setSelectedBoardId(data[0].id);
        }
      } catch (e) {
        // Optionally handle error
      }
    }
    loadBoards();
  }, []);

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;
    try {
      const created = await createBoard({ name: newBoardName });
      setBoards([...boards, created]);
      setNewBoardName('');
      setCreating(false);
      setSelectedBoardId(created.id);
    } catch (e) {
      // Optionally handle error
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span className="sidebar-logo">|||</span>
        <span>kanban</span>
      </div>
      <div className="sidebar-boards-label">ALL BOARDS ({boards.length})</div>
      <nav className="sidebar-nav">
        {boards.map((board) => (
          <div
            className={`sidebar-board${selectedBoardId === board.id ? ' active' : ''}`}
            key={board.id}
            onClick={() => setSelectedBoardId(board.id)}
          >
            <span className="sidebar-board-icon" />{board.name}
          </div>
        ))}
        {creating ? (
          <div className="sidebar-new-board-input">
            <input
              type="text"
              value={newBoardName}
              onChange={e => setNewBoardName(e.target.value)}
              placeholder="Board name"
              className="sidebar-new-board-field"
              autoFocus
            />
            <button className="sidebar-new-board-tick" onClick={handleCreateBoard}>
              ✓
            </button>
          </div>
        ) : (
          <div className="sidebar-new-board" onClick={() => setCreating(true)}>
            + Create New Board
          </div>
        )}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-theme-toggle">
          <span className="sidebar-theme-icon">🌙</span>
        </button>
      </div>
    </aside>
  );
};

export default BoardsList;
