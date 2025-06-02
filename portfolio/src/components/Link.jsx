import { motion } from "framer-motion";
import { Link as RouterLink, useLocation } from "react-router-dom";

export function Link({ content, href, motionDelay }) {
  const location = useLocation();
  const isHashLink = href.startsWith("#");

  // For hash links, use location object to specify pathname and hash
  // On home page, just href (hash), on other pages, go to '/' with hash
  const to = isHashLink
    ? location.pathname === "/"
      ? { hash: href }
      : { pathname: "/", hash: href }
    : href;

  return (
    <motion.li
      initial={{ opacity: 0, scale: 2, y: 150 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: motionDelay }}
    >
      <RouterLink
        to={to}
        className="relative w-full inline-block text-center uppercase hover:text-orquidea transition-transform xl:hover:translate-y-1 xl:hover:scale-x-105 after:absolute xl:after:w-2 after:aspect-square after:bg-transparent after:-top-0 xl:hover:after:bg-orquidea after:rounded-full xl:after:left-1/2 xl:hover:after:-translate-y-2 xl:after:transition-all after:-translate-x-1/2"
      >
        {content}
      </RouterLink>
    </motion.li>
  );
}
