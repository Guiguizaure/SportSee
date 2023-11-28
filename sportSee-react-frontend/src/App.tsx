import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Sidebar from "./components/Sidebar/sidebar";
import ProfilePage from "./pages/Profil/profilPage";
import UserDetailPage from "./pages/UserDetail/userDetailPage";
import ControlPage from "./pages/Control/controlPage";
import { DataSourceProvider } from "./contexts/DataSourceContext";

function App() {
  return (
    <DataSourceProvider>
      <Router>
        <Header />
        <section className="main-wrapper flex w-full">
          <Sidebar />
          <main className="min-w-[780px] w-full">
            <Routes>
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/reglage" element={<ControlPage />} />
              <Route path="/user/:id" element={<UserDetailPage />} />
            </Routes>
          </main>
        </section>
      </Router>
    </DataSourceProvider>
  );
}

export default App;
