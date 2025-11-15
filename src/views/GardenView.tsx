import GardenGrid from "../components/garden/GardenGrid"
import { getPlantInfo } from "../data/plants"
import "../styles/GardenView.css"
import type { Task } from "../types"

interface GardenViewProps{
    tasks: Task[]
    onHarvest: (id:string)=>void
    maxPlots:number
}

function GardenView({ tasks, onHarvest, maxPlots }: GardenViewProps) {
  const activePlants = tasks.filter(t => t.plantStage !== 'harvested' || t.isRecurring);
  const maturePlants = activePlants.filter(t => t.plantStage === 'mature');
  const witheredPlants = activePlants.filter(t => t.plantStage === 'withered');
  
  return (
    <div className="garden-view">
      <div className="garden-header">
        <h2>🌱 Mi Jardín</h2>
        <p className="garden-subtitle">Haz clic en las plantas brillantes para cosechar</p>
      </div>
      
      <div className="garden-info">
        <div className="info-badge">
          <span>📍 {activePlants.length}/{maxPlots} parcelas</span>
        </div>
        {maturePlants.length > 0 && (
          <div className="info-badge harvest-ready">
            <span>✨ {maturePlants.length} listas para cosechar</span>
          </div>
        )}
        {witheredPlants.length > 0 && (
          <div className="info-badge withered">
            <span>🥀 {witheredPlants.length} marchitas</span>
          </div>
        )}
      </div>

      {activePlants.length === 0 ? (
        <div className="empty-garden">
          <div className="empty-icon">🌱</div>
          <h3>Tu jardín está vacío</h3>
          <p>Ve a la pestaña de <strong>Tareas</strong> para plantar tus primeras semillas</p>
          <p className="hint">💡 Cada tarea que crees se convertirá en una planta en tu jardín</p>
        </div>
      ) : (
        <GardenGrid
          tasks={activePlants}
          maxPlots={maxPlots}
          onHarvest={onHarvest}
        />
      )}

      {/* Lista detallada opcional */}
      {activePlants.length > 0 && (
        <details className="plant-details-section">
          <summary>📋 Ver lista detallada de plantas</summary>
          <div className="plant-detail-list">
            {activePlants.map(task => {
              const plantInfo = getPlantInfo(task.type);
              return (
                <div key={task.id} className="plant-detail-item">
                  <span className="detail-emoji">{plantInfo.visual.emoji}</span>
                  <div className="detail-info">
                    <strong>{task.title}</strong>
                    <span className="detail-meta">
                      {plantInfo.name} • Parcela #{task.gardenPosition} • {task.plantStage}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      )}
    </div>
  );
}
export default GardenView