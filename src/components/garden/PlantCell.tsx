import { getPlantInfo } from "../../data/plants";
import type { Task } from "../../types";
import "../../styles/PlantCell.css"

interface PlantCellProps {
  task?: Task;
  position: number;
  onHarvest: (id: string) => void;
}

function PlantCell({ task, position, onHarvest }: PlantCellProps) {
  if (!task) {
    return (
      <div className="plant-cell-empty" title={`Parcela #${position} - Vacia`}>
        <div className="soil-patch">
          <span className="soil-icon">🟫</span>
        </div>
      </div>
    );
  }

  const plantInfo = getPlantInfo(task.type);
  const canHarvest = task.plantStage === "mature";

  const getPlantEmoji = () => {
    switch (task.plantStage) {
      case "seed":
        return "🌱";
      case "growing":
        return "🌿";
      case "mature":
        return plantInfo.visual.emoji;
      case "withered":
        return "🥀";
      default:
        return plantInfo.visual.emoji;
    }
  };

  const handleClick = () =>{
    if (canHarvest) {
        onHarvest(task.id)
    }
  }

   return (
    <div 
      className={`plant-cell ${task.plantStage} ${canHarvest ? 'harvestable' : ''}`}
      onClick={handleClick}
      title={`${task.title} - ${task.plantStage}`}
      style={{
        borderColor: canHarvest ? '#FFD700' : plantInfo.visual.color
      }}
    >
      <div className="soil-patch">
        <span className="soil-icon">🟫</span>
      </div>
      
      <div className="plant-sprite">
        <span className="plant-emoji">{getPlantEmoji()}</span>
      </div>

      {canHarvest && (
        <div className="harvest-indicator">
          <span className="sparkle">✨</span>
        </div>
      )}

      {task.isRecurring && (
        <div className="recurring-badge">
          <span>♻️</span>
        </div>
      )}

      {task.plantStage === 'growing' && (
        <div className="growth-indicator">
          <div className="growth-bar">
            <div 
              className="growth-fill" 
              style={{ 
                width: `${(task.currentGrowthDays / plantInfo.growthTime) * 100}%` 
              }}
            />
          </div>
          <span className="growth-text">{task.currentGrowthDays}/{plantInfo.growthTime}</span>
        </div>
      )}
    </div>
  );
}

export default PlantCell
