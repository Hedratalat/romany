import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

export default function SideBarDash({ isOpen, setIsOpen }) {
  const navItems = [
    { to: "addProjects", label: "Add Projects" },
    { to: "manageProjects", label: "Manage Projects" },
    { to: "messages", label: "Message" },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 min-h-screen bg-hero text-white shadow-xl w-64 p-6
        flex flex-col overflow-y-auto transition-transform duration-300 z-50 border-r border-gold/20
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white/50 hover:text-gold transition"
        >
          <X size={24} />
        </button>

        <h2 className="font-cormorant text-2xl font-light border-b border-gold/20 mb-8 pb-4 text-center">
          <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
            Dashboard
          </em>
        </h2>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block font-inter text-sm tracking-widest-1.5 rounded-xl px-4 py-2.5 cursor-pointer transition-all duration-200
                    ${
                      isActive
                        ? "bg-gold/15 text-gold border border-gold/30"
                        : "text-white/50 hover:bg-gold/10 hover:text-gold border border-transparent"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
