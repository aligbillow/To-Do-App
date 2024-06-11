import React, { useState } from "react";
import styles from './TodoItem.module.css';
import { TbTrash } from 'react-icons/tb';
import { BsFillCheckCircleFill } from "react-icons/bs";

interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface TaskProps {
    task: Task;
    onComplete: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string, newTitle: string) => void;
  }

export const TodoItem: React.FC<TaskProps> = ({ task, onComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleUpdate = () => {
    onUpdate(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className={styles.task}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
            onClick={() => onComplete(task.id)}
          >
            {task.title}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
};