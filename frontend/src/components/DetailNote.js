import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/UseAuth';

function DetailNote() {
  const [notes, setNotes] = useState({});
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
      setNotes(response.data.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);

      if (error.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken !== "kosong") {
          const res = await axios.get(`${BASE_URL}/notes/${id}`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`
            }
          });
          setNotes(res.data.data);
        } else {
          console.error("Failed to refresh token. Redirect to login.");
        }
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      navigate("/notes");
    } catch (error) {
      console.error("Failed to delete note:", error);

      if (error.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken !== "kosong") {
          await axios.delete(`${BASE_URL}/notes/${id}`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`
            }
          });
          navigate("/notes");
        } else {
          console.error("Failed to refresh token. Redirect to login.");
        }
      }
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title is-4 has-text-centered">{notes.title}</h1>

          <div className="content mb-5">
            <p>{notes.content}</p>
          </div>

          <div className="buttons is-centered">
            <Link to={`../../edit/${notes.id}`} className="button is-info">
              Edit
            </Link>
            <button
              onClick={() => deleteNote(notes.id)}
              className="button is-danger"
            >
              Delete
            </button>
            <Link to="/notes" className="button is-light">
              Back to Notes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailNote;
