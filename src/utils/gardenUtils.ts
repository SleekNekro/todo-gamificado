import { PlantStage, type Task } from "../types";

export const findFreePlot = (task: Task[], maxPolts: number): number | null => {
  const occupiedPlots = task
    .filter((task) => task.plantStage !== "harvested" || task.isRecurring)
    .map((task) => task.gardenPosition);

  for (let i = 0; i < maxPolts; i++) {
    if (!occupiedPlots.includes(i)) {
      return i;
    }
  }

  return null
};

export const getMaxPlotsForLevel = (level:number):number=>{
    if(level < 3) return 9
    if(level < 5) return 16
    if(level < 8) return 25
    return 36
}

export const getGridDimensions=(maxPlots:number):{rows:number, cols: number}=>{
    const side = Math.sqrt(maxPlots)
    return{rows:side, cols:side}
}
