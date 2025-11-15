import { getPlantInfo } from "../../data/plants";
import type { Task } from "../../types";
import '../../styles/TaskItem.css'

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const plantInfo = getPlantInfo(task.type);
  return (
    <div
      className="task-item"
      style={{ borderLeftColor: plantInfo.visual.color }}
    >
      <span className="plant-emoji">{plantInfo.visual.emoji}</span>

      <div className="task-content">
        <div className="task-header">
          <span className={`task-title ${task.completed ? "completed" : ""}`}>
            {task.title}
          </span>
          <span className="plant-stage-badge">{task.plantStage}</span>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className="plant-type">{plantInfo.name}</span>
          <span className="plant-value">💰 {plantInfo.fruitValue}</span>
        </div>
      </div>

      <div className="task-actions">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          title={task.completed ? "Marcar como pendiente" : "Cosechar"}
        />

        <button onClick={() => onDelete(task.id)} className="delete-btn">
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
