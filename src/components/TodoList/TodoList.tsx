import React from "react";
import styles from './TodoList.module.css';
import { TodoItem as TodoItemComponent } from "../TodoItem/TodoItem";

interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface TaskProps {
    tasks: Task[];
    onComplete: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string, newTitle: string) => void; 
}

export const TodoList: React.FC<TaskProps> = ({ tasks, onComplete, onDelete, onUpdate }) => {
    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;

    return (
        <section className={styles.tasks} >
            <header className={styles.header}>
                <div>
                    <p>Created tasks</p>
                    <span>{tasksQuantity}</span>
                </div>
                <div>
                    <p className={styles.textPurple}>Completed tasks</p>
                    <span>{completedTasks} of {tasksQuantity} </span>
                </div>
            </header>
            <div className={styles.list}>
                {tasks.map(task => (
                    <TodoItemComponent
                     key={task.id}
                     task={task}
                     onDelete={onDelete}
                     onComplete={onComplete}
                     onUpdate={onUpdate}
                     />
                ))}
            </div>
        </section>
    );
};
