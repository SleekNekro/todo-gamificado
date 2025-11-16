import { useState } from 'react';
import type { Task } from './types';
import { TaskType } from './types/taskTypes';
import { PlantStage } from './types/task';
import { View } from './types/navigation';
import type { ShopItem } from './types/shop';
import { generateId } from './utils/idGenerator';
import { getPlantInfo } from './data/plants';
import { findFreePlot, getMaxPlotsForLevel } from './utils/gardenUtils';
import useLocalStorage from './hooks/useLocalStorage';
import usePlayer from './hooks/usePlayer';
import NavBar from './components/ui/NavBar';
import GardenView from './views/GardenView';
import HouseView from './views/HouseView';
import TasksView from './views/TasksView';
import ShopView from './views/ShopView';
import './styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.GARDEN);
  const [tasks, setTasks] = useLocalStorage<Task[]>('garden-tasks', []);
  const { 
    player, 
    addFruit, 
    addExperience, 
    addCoins, 
    sellFruit, 
    sellAllFruits, 
    purchaseItem, 
    hasItem 
  } = usePlayer();

  const addTask = (title: string, type: TaskType, description?: string) => {
    const maxPlots = getMaxPlotsForLevel(player.level);
    const freePlot = findFreePlot(tasks, maxPlots);
    
    if (freePlot === null) {
      alert('¡Tu jardín está lleno! Cosecha algunas plantas o sube de nivel para expandirlo.');
      return;
    }

    const isRecurring = type === TaskType.ROUTINE;
    
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      type,
      completed: false,
      isRecurring,
      completions: [],
      currentGrowthDays: 0,
      plantStage: PlantStage.SEED,
      plantedAt: new Date(),
      gardenPosition: freePlot,
      createdAt: new Date()
    };
    
    setTasks([...tasks, newTask]);
  
  };

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const plantInfo = getPlantInfo(task.type);

    if (task.isRecurring) {
      if (!task.completed) {
        const newGrowthDays = task.currentGrowthDays + 1;
        const newCompletions = [...task.completions, new Date()];
        
        let newStage = task.plantStage;
        let maturedAt = task.maturedAt;
        let harvestableUntil = task.harvestableUntil;
        
        if (newGrowthDays >= plantInfo.growthTime) {
          newStage = PlantStage.MATURE;
          maturedAt = new Date();
          const deadline = new Date();
          deadline.setDate(deadline.getDate() + plantInfo.harvestWindow);
          harvestableUntil = deadline;
        } else if (newGrowthDays > 0) {
          newStage = PlantStage.GROWING;
        }
        
        setTasks(tasks.map(t =>
          t.id === id 
            ? { 
                ...t, 
                completed: true,
                currentGrowthDays: newGrowthDays,
                completions: newCompletions,
                plantStage: newStage,
                maturedAt,
                harvestableUntil
              } 
            : t
        ));
      }
    } else {
      if (!task.completed) {
        const maturedAt = new Date();
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + plantInfo.harvestWindow);
        
        setTasks(tasks.map(t =>
          t.id === id 
            ? { 
                ...t, 
                completed: true,
                completedAt: new Date(),
                plantStage: PlantStage.MATURE,
                maturedAt,
                harvestableUntil: deadline
              } 
            : t
        ));
      }
    }
  };

  const harvestPlant = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task || task.plantStage !== PlantStage.MATURE) return;

    const plantInfo = getPlantInfo(task.type);
    
    addFruit(plantInfo.name, 1);
    const expGained = plantInfo.growthTime * 10;
    addExperience(expGained);
    
    if (task.isRecurring) {
      setTasks(tasks.map(t =>
        t.id === id 
          ? { 
              ...t, 
              completed: false,
              currentGrowthDays: 0,
              plantStage: PlantStage.SEED,
              plantedAt: new Date(),
              lastHarvestedAt: new Date(),
              maturedAt: undefined,
              harvestableUntil: undefined
            } 
          : t
      ));
    } else {
      setTasks(tasks.map(t =>
        t.id === id 
          ? { 
              ...t, 
              plantStage: PlantStage.HARVESTED
            } 
          : t
      ));
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Función para vender frutas individuales
  const handleSellFruit = (fruitName: string, pricePerUnit: number) => {
    const earned = sellFruit(fruitName, pricePerUnit);
    if (earned > 0) {
      alert(`¡Vendiste todo tu ${fruitName} por ${earned} monedas! 💰`);
    }
  };

  // Función para vender todas las frutas
  const handleSellAllFruits = () => {
    const fruitPrices: { [key: string]: number } = {};
    Object.values(TaskType).forEach(type => {
      const plantInfo = getPlantInfo(type);
      fruitPrices[plantInfo.name] = plantInfo.fruitValue;
    });
    
    const earned = sellAllFruits(fruitPrices);
    if (earned > 0) {
      alert(`¡Vendiste todas tus frutas por ${earned} monedas! 💰`);
    }
  };

  // Función para comprar items
  const handlePurchaseItem = (item: ShopItem) => {
    const success = purchaseItem(item.id, item.price);
    if (success) {
      alert(`¡Compraste ${item.name}! 🎉\n${item.description}`);
    } else {
      alert('No tienes suficientes monedas 💰');
    }
  };

  const expForNextLevel = player.level * 100;
  const expProgress = (player.experience / expForNextLevel) * 100;

  // IDs de items comprados
  const purchasedItemIds = player.inventory.purchasedItems.map(item => item.shopItemId);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌱 Mi Jardín Productivo</h1>
        
        <div className="player-info">
          <div className="player-stat">
            <span className="stat-icon">👤</span>
            <span>{player.name} - Nivel {player.level}</span>
          </div>
          <div className="player-stat">
            <span className="stat-icon">💰</span>
            <span>{player.inventory.coins} monedas</span>
          </div>
          <div className="exp-bar-container">
            <div className="exp-bar" style={{ width: `${expProgress}%` }} />
            <span className="exp-text">{player.experience} / {expForNextLevel} EXP</span>
          </div>
        </div>
      </header>
      
      <NavBar currentView={currentView} onNavigate={setCurrentView} />
      
      {currentView === View.GARDEN && (
        <GardenView 
          tasks={tasks}
          onHarvest={harvestPlant}
          maxPlots={getMaxPlotsForLevel(player.level)}
        />
      )}
      {currentView === View.HOUSE && <HouseView />}
      {currentView === View.TASKS && (
        <TasksView
          tasks={tasks}
          onAddTask={addTask}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      )}
      {currentView === View.SHOP && (
        <ShopView
          playerCoins={player.inventory.coins}
          playerLevel={player.level}
          fruits={player.inventory.fruits}
          purchasedItemIds={purchasedItemIds}
          onSellFruit={handleSellFruit}
          onSellAllFruits={handleSellAllFruits}
          onPurchaseItem={handlePurchaseItem}
        />
      )}
    </div>
  );
}

export default App;