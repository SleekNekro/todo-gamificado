import { PlantStage, TaskType, type PlantInfo, type Task } from "../types";

export const shouldPlantWither = (
  task: Task,
  plantInfo: PlantInfo
): boolean => {
  if (
    task.plantStage === PlantStage.HARVESTED ||
    task.plantStage === PlantStage.WITHERED
  ) {
    return false;
  }

  if (task.completed) {
    return false;
  }

  const now = new Date();
  const lastInteraction = task.lastWatewredAT || task.createdAt;
  const daysSinceInteraction = Math.floor(
    (now.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSinceInteraction >= plantInfo.neglectTime;
};

export const calculateGrowthDays = (task: Task): number => {
  if (task.type === TaskType.ROUTINE) {
    return task.daysNeglected;
  }

  if (task.type === TaskType.GOAL) {
    return 0;
  }

  return task.completed ? 1 : 0;
};

export const determinePlantStage = (
  task: Task,
  plantInfo: PlantInfo
): PlantStage => {
  if (shouldPlantWither(task, plantInfo)) {
    return PlantStage.WITHERED;
  }

  if (task.plantStage === PlantStage.HARVESTED) {
    return PlantStage.HARVESTED;
  }

  if (task.completed) {
    return PlantStage.MATURE;
  }

  const growthDays = calculateGrowthDays(task);
  const growthProgress = growthDays / plantInfo.growthTime;

  if (growthProgress < 0.3) {
    return PlantStage.SEED;
  } else if (growthProgress < 0.8) {
    return PlantStage.GROWING;
  } else {
    return PlantStage.MATURE;
  }
};
