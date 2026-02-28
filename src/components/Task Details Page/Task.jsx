import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSearch, faRightFromBracket, faCheckSquare, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FiSidebar } from "react-icons/fi";
import { LuSquareCheckBig } from "react-icons/lu";

function Task() {
    const [Details, setDetails] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchText, setSearchText] = useState("");

    // Fetch data
    const dataFetching = async () => {
        try {
            const response = await axios.get("http://localhost:8212/TaskList/get");
            setDetails(response.data);
        } catch (error) {
            console.log("Data Not Get", error);
        }
    };

    useEffect(() => {
        dataFetching();
    }, []);

    // Delete task
    const deleteData = async (id) => {
        if (window.confirm("Are You Sure You Want To Delete This Item ?")) {
            await axios.delete(`http://localhost:8212/TaskList/delete/${id}`);
            dataFetching();
        }
    };

    // Toggle complete
    const toggleComplete = async (task) => {
        try {
            await axios.put(
                `http://localhost:8212/TaskList/update/${task.id}`,
                {
                    ...task,
                    completed: !task.completed,
                }
            );
            dataFetching();
        } catch (error) {
            console.log("Status update failed", error);
        }
    };

    // Filter + Search
    const filteredTasks = Details.filter(task => {
        const statusMatch =
            filter === "all" ||
            (filter === "complete" && task.completed) ||
            (filter === "pending" && !task.completed);

        const searchMatch =
            task.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchText.toLowerCase());

        return statusMatch && searchMatch;
    });


    // Priority badge style
    const getPriorityBadgeStyle = (task) => {
        if (task.completed) {
            return {
                backgroundColor: "#bdc3c7",
                color: "#2c3e50",
            };
        }

        switch (task.priority?.toLowerCase()) {
            case "high":
                return {
                    backgroundColor: "#e74c3c",
                    color: "white",
                };
            case "medium":
                return {
                    backgroundColor: "#f39c12",
                    color: "white",
                };
            case "low":
                return {
                    backgroundColor: "#27ae60",
                    color: "white",
                };
            default:
                return {
                    backgroundColor: "#7f8c8d",
                    color: "white",
                };
        }
    };

    return (
        <div className="flex-full-dashboard">
            {/* Sidebar */}
            <div className="conatiner-left-flex">
                <h1 className="logo"><LuSquareCheckBig /> TaskFlow</h1>
                <Link to={"/Home"}><button><FontAwesomeIcon icon={faThLarge} /> Dashboard</button></Link>
                <Link to={"/Task"}><button><FontAwesomeIcon icon={faCheckSquare} /> Task</button></Link>
                <Link to={"/"}><button><FontAwesomeIcon icon={faRightFromBracket} /> Log Out</button></Link>
            </div>

            {/* Main */}
            <div className="container-right-flex">
                <div className="container-navbar-button">
                    <button><FiSidebar /></button>
                </div>

                <div className="dashboard-details-container">
                    <h1>Tasks</h1>
                    <h3>Manage And Track All Your Task</h3>

                    {/* Search */}
                    <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    {/* Status Cards */}
                    <div className="d-card-flex">
                        <div
                            className={`d-card-list ${filter === "all" ? "active" : ""}`}
                            onClick={() => setFilter("all")}
                        >
                            <h1>All</h1>
                            <h1>{Details.length}</h1>
                        </div>

                        <div
                            className={`d-card-list ${filter === "pending" ? "active" : ""}`}
                            onClick={() => setFilter("pending")}
                        >
                            <h1>Pending</h1>
                            <h1>{Details.filter(t => !t.completed).length}</h1>
                        </div>

                        <div
                            className={`d-card-list ${filter === "complete" ? "active" : ""}`}
                            onClick={() => setFilter("complete")}
                        >
                            <h1>Complete</h1>
                            <h1>{Details.filter(t => t.completed).length}</h1>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="tabel-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map(task => (
                                    <tr key={task.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={task.completed || false}
                                                onChange={() => toggleComplete(task)}
                                            />
                                        </td>

                                        <td style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                            {task.title}
                                        </td>

                                        <td style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                            {task.description}
                                        </td>

                                        {/* ⭐ Priority Badge */}
                                        <td>
                                            <span
                                                style={{
                                                    ...getPriorityBadgeStyle(task),
                                                    padding: "6px 14px",
                                                    borderRadius: "999px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    textTransform: "capitalize",
                                                    display: "inline-block",
                                                    minWidth: "70px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {task.priority}
                                            </span>
                                        </td>

                                        <td>{task.createdAt}</td>

                                        <td>
                                            <Link to={`/Edit/${task.id}`}>
                                                <button className="edit-button">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                            </Link>

                                            <button
                                                className="delete-button"
                                                onClick={() => deleteData(task.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No tasks found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Task;