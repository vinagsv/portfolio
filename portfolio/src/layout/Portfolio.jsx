import { PortfolioCard } from "../components/PortfolioCard";
import { PortfolioToggle } from "../components/PortfolioToggle";
import { Tooltip } from "../components/Tooltip";
import db from "../database/bd.json";

export function Portfolio() {
  return (
    <div className="bg-light" id="portfolio">
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
          {db.portfolio.web.map((e) => {
            return (
              <PortfolioCard
                key={e.title}
                src={e.src}
                title={e.title}
                description={e.description} {/* Ensure using 'description' */}
                pageLink={e.pageLink}
                sourceLink={e.sourceLink}
                skills={e.skills}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
