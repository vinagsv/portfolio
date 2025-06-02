import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PortfolioCard } from "../components/PortfolioCard";
import { PortfolioToggle } from "../components/PortfolioToggle";
import { Tooltip } from "../components/Tooltip";
import db from "../database/bd.json";

export function Portfolio() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="bg-[#c9eaf6]" id="portfolio">
      <div className="wrapper px-4 py-36">
        <div className="flex justify-between flex-wrap gap-y-4">
          <h1 className="text-dark text-4xl">PROJECTS..</h1>
          <div className="text-light flex gap-2">
            <Tooltip
              title="view more on GitHub"
              href="https://github.com/vinagsv"
            >
              <PortfolioToggle title="GitHub" />
            </Tooltip>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-12 sm:grid-cols-2 xl:grid-cols-3">
          {db.portfolio.web.map((e) => (
            <PortfolioCard
              key={e.title}
              src={e.src}
              title={e.title}
              description={e.description}
              pageLink={e.pageLink}
              sourceLink={e.sourceLink}
              skills={e.skills}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/more-projects"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button className="bg-[#731dba] text-white text-lg font-medium px-6 py-2 rounded-lg hover:bg-[#2fe1fc] transition duration-300 shadow-md">
              View More Projects
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
