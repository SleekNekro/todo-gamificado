import type { Task } from "../../types";
import { getGridDimensions } from "../../utils/gardenUtils";
import PlantCell from "./PlantCell";
import "../../styles/GardenGrid.css"


interface GardenGridProps {
  tasks: Task[];
  maxPlots: number;
  onHarvest: (id: string) => void;
}

function GardenGrid({ tasks, maxPlots, onHarvest }: GardenGridProps) {
  const { rows, cols } = getGridDimensions(maxPlots);
  
  // Crear un mapa de posición -> tarea para acceso rápido
  const plotMap = new Map<number, Task>();
  tasks.forEach(task => {
    if (task.plantStage !== 'harvested' || task.isRecurring) {
      plotMap.set(task.gardenPosition, task);
    }
  });

  // Generar array de todas las parcelas
  const plots = Array.from({ length: maxPlots }, (_, index) => {
    const task = plotMap.get(index);
    return { position: index, task };
  });

  return (
    <div className="garden-grid-container">
      <div className="garden-decorative-border">
        <div 
          className="garden-grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`
          }}
        >
          {plots.map(({ position, task }) => (
            <PlantCell
              key={position}
              position={position}
              task={task}
              onHarvest={onHarvest}
            />
          ))}
        </div>
      </div>

      {/* Decoración del jardín */}
      <div className="garden-decoration">
        <span className="deco-item fence-left">🌳</span>
        <span className="deco-item fence-right">🌳</span>
      </div>
    </div>
  );
}

export default GardenGrid;