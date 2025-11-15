import { useState } from "react";
import { TaskType } from "../../types";
import { getPlantInfo } from "../../data/plants";
import "../../styles/TaskForms.css"

interface TaskFormProps {
  onAddTask: (tittle: string, type: TaskType, description?: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState<TaskType>(
    TaskType.OCCASIONAL
  );
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() !== "") {
      onAddTask(title, selectedType, description || undefined);
      setTitle("");
      setDescription("");
      setSelectedType(TaskType.OCCASIONAL);
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setSelectedType(TaskType.OCCASIONAL);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <div className="task-form-container">
        <button className="plant-seed-button" onClick={() => setShowForm(true)}>
          🌱 Plantar Nueva Semilla
        </button>
      </div>
    );
  }

  const plantInfo = getPlantInfo(selectedType);

  return (
    <div className="task-form-container">
      <h2>🌱 Plantar una nueva semilla</h2>

      <div className="plant-type-selector">
        {Object.values(TaskType).map((type) => {
          const info = getPlantInfo(type);
          const isSelected = selectedType === type;

          return (
            <button
              key={type}
              type="button"
              className={`plant-type-button ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedType(type)}
              style={{
                borderColor: isSelected ? info.visual.color : "#ddd",
              }}
            >
              <span className="plant-icon">{info.visual.emoji}</span>
              <span className="plant-name">{info.name}</span>
            </button>
          );
        })}
      </div>

      <div
        className="plant-info-box"
        style={{ borderLeftColor: plantInfo.visual.color }}
      >
        <p className="plant-description">{plantInfo.description}</p>
        <div className="plant-stats">
          <span>
            ⏱️ Crece en {plantInfo.growthTime}{" "}
            {plantInfo.growthTime === 1 ? "día" : "días"}
          </span>
          <span>💰 Vale {plantInfo.fruitValue} monedas</span>
          {plantInfo.urgentBonus && (
            <span>⚡ +{plantInfo.urgentBonus} monedas si completas rápido</span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title">¿Que necesitas hacer? </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Algo que sabes hacer!! ^^ "
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Detalles (opcional)</label>
          <textarea 
          id="task-description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder="Añade mas informacion sobre la tarea..."
          rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="submit-button" onClick={handleSubmit}>
            Añadir
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
