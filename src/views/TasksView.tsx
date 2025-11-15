import TaskForm from "../components/tasks/TaskForm"
import TaskList from "../components/tasks/TaskList"
import "../styles/TasksView.css"
import type { Task, TaskType } from "../types"

interface TaskViewProps{
    tasks:Task[]
    onAddTask:(title:string, type:TaskType,description?:string)=> void
    onToggle:(id:string)=>void
    onDelete:(id:string)=>void
}

function TasksView({tasks,onAddTask,onToggle,onDelete}:TaskViewProps){
    const activeTask = tasks.filter(t=> t.plantStage!=='harvested'||t.isRecurring)

    return(
        <div className="task-view">
            <h2>📋 Mis Tareas</h2>

            <TaskForm onAddTask={onAddTask}/>

            <TaskList
            tasks={activeTask}
            onToggle={onToggle}
            onDelete={onDelete}
            />

            <div className="tasks-stats">
                <div className="stat-card">
                    <span className="stat-value">{activeTask.length}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{activeTask.filter(t=>!t.completed).length}</span>
                    <span className="stat-label">Pendiente</span>
                </div>
            </div>
        </div>
    )
}

export default TasksView