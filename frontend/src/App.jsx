import KanbanBoard from './components/KanbanBoard';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
          <main className="main-content">
            <KanbanBoard />
          </main>
      </div>
    </DndProvider>
  );
}

export default App;
