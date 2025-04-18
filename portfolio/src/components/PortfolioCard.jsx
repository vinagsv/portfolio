import { FiExternalLink } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";

export function PortfolioCard({
  src,
  title,
  description,
  pageLink,
  sourceLink,
  skills,
}) {
  return (
    <div
      className="w-full portfolio-card transition-transform hover:scale-[1.02] rounded-[15px] "
      style={{
        background:
          "linear-gradient(38deg,rgba(176, 241, 245, 1) 2%, rgba(202, 224, 230, 1) 30%, rgba(146, 238, 252, 1) 90%)",
      }}
    >
      <div className="h-[20rem] m-4 mb-0 shadow-md overflow-hidden sm:h-[13rem] rounded-md">
        <img
          className="bg-dark h-full w-full object-cover transition-transform duration-300"
          src={src}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h2 className="capitalize text-lg opacity-80">{skills.join("•")}</h2>
        <h1 className="text-orquidea text-3xl font-medium capitalize xl:text-2xl">
          {title}
        </h1>
        <p className="text-xl tracking-wider lowercase mb-3">{description}</p>

        <div className="flex flex-wrap gap-6 text-3xl sm:text-xl">
          <a href={pageLink || "#"} target="_blank">
            <button className="bg-orquidea px-4 py-1 flex items-center gap-2 rounded-sm hover:text-light transition-colors">
              <FiExternalLink className="inline" />
              <span>view project</span>
            </button>
          </a>
          {sourceLink && (
            <a href={sourceLink} target="_blank">
              <button className="bg-orquidea px-4 py-1 flex items-center gap-2 rounded-sm hover:text-light transition-colors">
                <AiFillGithub className="inline" />
                <span>source code</span>
              </button>
            </a>
          )}
        </div>
      </div>

      <style>
        {`
      .portfolio-card:hover {
      box-shadow: 0 0 35px 10px #6feaf7;
      }
  `}
      </style>
    </div>
  );
}
