import React, { useState } from "react";
import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import { IoIosAddCircleOutline } from "react-icons/io";

interface HeaderProps {
    onAddTask: (taskTitle: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskTitle.trim() === "") return;
        onAddTask(taskTitle);
        setTaskTitle("");
    };

    return (
        <header className={styles.header} >
            <img src={logo} className={styles.img} />

                <form 
                onSubmit={handleSubmit}
                className={styles.newTaskForm} >
                <input
                    placeholder='add new task'
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <button type="submit">
                    Create
                    <IoIosAddCircleOutline size={20} />
                </button>    
                </form>
        </header>
    );
};