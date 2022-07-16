import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Card from "./components/ui/Card";
import BookingHomePage from "./pages/BookingHomePage";
import Layout from "./components/layout/Layout";
import Footer from "./components/Footer";
import DriverDetailsPage from "./pages/DriverDetailsPage";

function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<BookingHomePage />} />
            <Route
              path="/drive"
              element={
                <ProtectedRoute>
                  <DriverDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
        <Footer />
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
