import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faHourglassHalf, faRightFromBracket, faCheckSquare, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FiSidebar } from "react-icons/fi";
import { LuSquareCheckBig } from "react-icons/lu";

function Home() {
    const Nav = useNavigate();

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const priorityRef = useRef(null);

    const [tasks, setTasks] = useState([]);

    // Get current date
    const getDate = (date = new Date()) =>
        date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).replace(',', '');

    // Fetch tasks from backend
    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:8212/TaskList/get");
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Task counts
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    // Add new task
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            priority: priorityRef.current.value,
            createdAt: getDate(),
            completed: false
        };

        try {
            await axios.post("http://localhost:8212/TaskList/create", formData);

            // reset form
            titleRef.current.value = "";
            descriptionRef.current.value = "";
            priorityRef.current.value = "low";

            Nav("/Task");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="flex-full-dashboard">

            {/* Sidebar */}
            <div className="conatiner-left-flex">
                <h1 className="logo"><LuSquareCheckBig /> TaskFlow</h1>

                <Link to="/Home">
                    <button><FontAwesomeIcon icon={faThLarge} /> Dashboard</button>
                </Link>

                <Link to="/Task">
                    <button><FontAwesomeIcon icon={faCheckSquare} /> Task</button>
                </Link>

                <Link to="/">
                    <button><FontAwesomeIcon icon={faRightFromBracket} /> Log Out</button>
                </Link>
            </div>

            {/* Main */}
            <div className="container-right-flex">
                <div className="container-navbar-button">
                    <button><FiSidebar /></button>
                </div>

                <div className="dashboard-details-container">
                    <h1>Dashboard</h1>
                    <h3>Welcome To TaskFlow - Your Productivity Companion</h3>

                    {/* Cards */}
                    <div className="d-card-flex">

                        <div className="d-card-details">
                            <h1><FontAwesomeIcon icon={faListCheck} /></h1>
                            <div className="item-flex">
                                <h3>Total Task</h3>
                                <h1>{totalTasks}</h1>
                            </div>
                        </div>

                        <div className="d-card-details">
                            <h1><FontAwesomeIcon icon={faCircleCheck} /></h1>
                            <div className="item-flex">
                                <h3>Completed</h3>
                                <h1>{completedTasks}</h1>
                            </div>
                        </div>

                        <div className="d-card-details">
                            <h1><FontAwesomeIcon icon={faHourglassHalf} /></h1>
                            <div className="item-flex">
                                <h3>Pending</h3>
                                <h1>{pendingTasks}</h1>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Create Task */}
                <h2>Create New Task</h2>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>

                        <label>Task Title</label>
                        <input
                            type="text"
                            ref={titleRef}
                            required
                            placeholder="Enter task title...."
                        />

                        <label>Description (Optional)</label>
                        <textarea
                            ref={descriptionRef}
                            placeholder="Add more details...."
                        />

                        <label>Priority</label>
                        <select ref={priorityRef} defaultValue="low">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <button type="submit" className="submit-button">
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;