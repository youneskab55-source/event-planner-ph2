import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { EventsProvider } from "./context/EventsContext";
import EventsPage from "./pages/EventsPage";
import InvitationsPage from "./pages/InvitationsPage";
import CollaboratorsPage from "./pages/CollaboratorsPage";

function App() {
  return (
    <EventsProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<EventsPage />} />
              <Route path="/invitations" element={<InvitationsPage />} />
              <Route path="/collaborators" element={<CollaboratorsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </EventsProvider>
  );
}

export default App;
