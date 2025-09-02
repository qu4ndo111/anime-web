import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
    <div className="h-[70px]"></div>
    <header className="w-full flex justify-center fixed top-0 z-50 bg-black/40 backdrop-blur-md shadow-md">
      <div className="w-full md:px-6 lg:px-8 mx-auto 
                max-w-screen-sm sm:max-w-screen-md 
                md:max-w-screen-lg lg:max-w-screen-xl 
                xl:max-w-[1400px] flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <h1 className="text-white font-bold text-xl tracking-wide">Anime</h1>

        {/* Navigation */}
        <nav className="flex gap-4">
          {[
            { to: "/", label: "Home page" },
            { to: "/genres", label: "Genres" },
            { to: "/top", label: "Top Anime" },
          ].map((item) => (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <div
                  className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                      : "text-white border border-white/30 hover:border-pink-400 hover:text-pink-300"
                  }`}
                >
                  {item.label.toUpperCase()}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex gap-4 text-white text-lg cursor-pointer">
          <i className="pi pi-search hover:text-pink-400 transition"></i>
          <i className="pi pi-user hover:text-pink-400 transition"></i>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
