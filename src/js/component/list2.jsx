import React, { useState } from 'react';

export const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 7;

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && newTask.trim()) {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const handleDelete = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Añadir tarea"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
            />

            {tasks.length === 0 ? (
                <p>No hay tareas, añadir tareas</p>
            ) : (
                <>
                    <ul>
                        {currentTasks.map((task, index) => (
                            <li key={index} className="task">
                                {task}
                                <button onClick={() => handleDelete(indexOfFirstTask + index)} type="button" className="btn-close delete-icon" aria-label="Close"></button>
                            </li>
                        ))}
                    </ul>
                    <div className="task-counter">
                        <p>Tareas pendientes: {tasks.length}</p>
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};