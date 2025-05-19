import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/UseAuth';

function AddNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { accessToken, refreshAccessToken } = useAuth();

    const saveNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/notes`, {
                title,
                content
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            navigate("/notes");
        } catch (error) {
            console.error("Failed to add note:", error);

            if (error.response && error.response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken !== "kosong") {
                    await axios.post(`${BASE_URL}/notes`, {
                        title,
                        content
                    }, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    navigate("/notes");
                } else {
                    console.error("Failed to refresh token. Redirecting to login.");
                    navigate("/signin");
                }
            }
        }
    }

    return (
        <div className="columns mt-6 is-centered">
            <div className="column is-half">
                <h1 className="title has-text-centered mb-5">Add a New Note</h1>
                <form onSubmit={saveNote} className="box">
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title of your note"
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
                                placeholder="Write your note content here..."
                                rows="6"
                                required
                            />
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right mt-4">
                        <div className="control">
                            <button type="submit" className="button is-success">
                                Save Note
                            </button>
                        </div>
                        <div className="control">
                            <button type="button" className="button is-light" onClick={() => navigate("/notes")}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNote;
