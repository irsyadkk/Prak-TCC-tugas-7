import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";
import EditNote from "./components/EditNote";
import DetailNote from "./components/DetailNote";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider, useAuthContext } from "./auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { accessToken } = useAuthContext();
  const isAuthenticated = !!accessToken;

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/notes" element={isAuthenticated ? <NoteList /> : <Navigate to="/signin" />} />
      <Route path="/notes/add" element={isAuthenticated ? <AddNote /> : <Navigate to="/signin" />} />
      <Route path="/edit/:id" element={isAuthenticated ? <EditNote /> : <Navigate to="/signin" />} />
      <Route path="/notes/detail/:id" element={isAuthenticated ? <DetailNote /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
