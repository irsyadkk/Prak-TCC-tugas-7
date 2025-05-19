import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/UseAuth';

function EditNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const { accessToken, refreshAccessToken } = useAuth();

    useEffect(() => {
        getNoteById();
    }, []);

    const getNoteById = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
        } catch (error) {
            console.error("Failed to fetch note:", error);
            if (error.response?.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken !== "kosong") {
                    const response = await axios.get(`${BASE_URL}/notes/${id}`, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    setTitle(response.data.data.title);
                    setContent(response.data.data.content);
                } else {
                    navigate("/signin");
                }
            }
        }
    };

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${BASE_URL}/notes/${id}`, {
                title,
                content
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            navigate(`/notes/detail/${id}`);
        } catch (error) {
            console.error("Failed to update note:", error);
            if (error.response && error.response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken !== "kosong") {
                    await axios.patch(`${BASE_URL}/notes/${id}`, {
                        title,
                        content
                    }, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    navigate(`/notes/detail/${id}`);
                } else {
                    navigate("/signin");
                }
            }
        }
    };

    return (
        <div className="columns mt-6 is-centered">
            <div className="column is-half">
                <h1 className="title has-text-centered mb-5">Edit Note</h1>
                <form onSubmit={updateNote} className="box">
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Edit the title"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Content</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Edit the content"
                                rows="6"
                                required
                            />
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right mt-4">
                        <div className="control">
                            <button type="submit" className="button is-success">
                                Update Note
                            </button>
                        </div>
                        <div className="control">
                            <button type="button" className="button is-light" onClick={() => navigate(`/notes/detail/${id}`)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditNote;
