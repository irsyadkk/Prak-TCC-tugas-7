import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/UseAuth';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || "";
  const { accessToken, refreshAccessToken, logout } = useAuth();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${userEmail}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }}); 
      setUserName(res.data.data.name);
      localStorage.setItem("userName", res.data.data.name);
    } catch (error) {
      setUserName("");
    }
  }

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setNotes(res.data.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);

      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken !== "kosong") {
          const res = await axios.get(`${BASE_URL}/notes`, {
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

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("userName");
    navigate("/signin");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter(note =>  
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchNotes();
    if (userEmail && !userName) fetchUser();
  }, [userEmail]);

  return (
    <div>
      <nav className="navbar is-dark-grey" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item has-text-weight-bold is-size-5">Hello, {userName} !</span>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button onClick={handleLogout} className="button is-danger is-danger">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="section">
        <div className="container">
          <div className="box">

            <div className="level mb-4">
              <div className="level-left">
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Search notes..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <span className="icon is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="level-right">
                <Link to={'add'} className="button is-info">+ Add Note</Link>
              </div>
            </div>

            <table className="table is-striped is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th style={{ width: "100px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="has-text-centered has-text-grey">
                      No notes found.
                    </td>
                  </tr>
                ) : (
                  filteredNotes.map((note) => (
                    <tr key={note.id}>
                      <td>{note.title}</td>
                      <td>
                        <Link to={`detail/${note.id}`} className="button is-info is-small">See</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteList;
