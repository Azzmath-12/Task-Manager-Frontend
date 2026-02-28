import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
    const { id } = useParams();

    const Nav = useNavigate();

    const [Details, setDetails] = useState({
        title: "",
        description: "",
        priority: ""
    });

    const dataFetching = async () => {
        try {
            const response = await axios.get(`http://localhost:8212/TaskList/getById/${id}`);
            setDetails(response.data);
            console.log(response.data);
        }
        catch (Error) {
            console.error("Data Not Found", Error);
        }
    };

    useEffect(() => {
        dataFetching();
    }, []);

    const handleChange = (e) => {
        setDetails({ ...Details, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8212/TaskList/update/${id}`, Details);
            alert("Data updated successfully");
            Nav("/Task");
        }
        catch (Error) {
            console.error("Data Not Update: ", Error);
        }
    };

    return (
        <>
            <div className="edit-modal-backdrop">
                <div className="edit-task-modal">
                    <form onSubmit={handleSubmit} className="edit-task-form">
                        <label className="edit-label">Task Title</label>
                        <input type="text"
                            name="title"
                            value={Details.title}
                            onChange={handleChange}
                            className="edit-input-title" />
                        <label className="edit-label">Description (Optional)</label>
                        <textarea
                            name="description"
                            value={Details.description}
                            onChange={handleChange}
                            className="edit-textarea" />
                        <label className="edit-label">Priority</label>
                        <select name="priority" value={Details.priority} onChange={handleChange} className="edit-select">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High </option>
                        </select>
                        <div className="edit-button-group">
                            <button type="submit" className="edit-submit-button">Update Task</button>
                            <Link to={"/Task"} className="edit-cancel-link">
                                <button className="edit-cancel-button" type="button">Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Edit;