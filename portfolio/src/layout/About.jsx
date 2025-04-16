export function About() {
  return (
    <div className="bg-[#c9eaf6] world" id="about">
      <div className="wrapper max-w-[1000px] p-4 py-12 flex flex-col justify-center items-center gap-6 xl:flex-row xl:py-16">
        <h1 className="text-orquidea text-3xl font-bold xl:hidden">
          Vinag SV..
        </h1>
        <div className="relative w-[80%] aspect-square overflow-hidden rounded-xl border-b-8 border-orquidea sm:w-[50%]">
          <img
            src="images/profile.jpg"
            alt="Vinag SV"
            className="absolute inset-0 hover:scale-110 transition-transform shadow-lg"
          />
        </div>
        <div className="sm:w-[70%]">
          <h1 className="text-orquidea hidden text-3xl font-bold xl:block mb-4">
            Vinag SV..
          </h1>
          <p className="text-dark text-2xl">
            <span className="text-orquidea text-3xl">"</span>
            I'm a full-stack developer specializing in the MERN stack, focused
            on building modern and efficient applications. I use technologies
            like React and Tailwind CSS to create smooth user experiences. I'm
            constantly exploring new tools and improving my skills to deliver
            clean and effective solutions. Always learning, always creating.
            <span className="text-orquidea text-3xl">"</span>
          </p>
        </div>
      </div>
    </div>
  );
}
