import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { About } from "./layout/About";
import { Services } from "./layout/Services";
import { Hero } from "./layout/Hero";
import { Nav } from "./layout/Nav";
import { Experience } from "./layout/Experience";
import { Portfolio } from "./layout/Portfolio";
import { Footer } from "./layout/Footer";
import MoreProjects from "./layout/MoreProjects";
import HexagonCursor from "./components/HexagonCursor";

import db from "./database/bd.json";
import "./styles/tailwind.css";

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <HexagonCursor />
      <header className="bg-dark text-light">
        <Nav />
        {isHome && <Hero />}
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <About />
                <Services />
                <Experience />
                <Portfolio />
              </>
            }
          />
          <Route
            path="/more-projects"
            element={<MoreProjects projects={db.portfolio.web} />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </React.StrictMode>
);
