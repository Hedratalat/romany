import { FiLogOut } from "react-icons/fi";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

export default function NavBarDash({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:");
    }
  };

  return (
    <nav className="bg-hero text-white z-40 shadow-md border-b border-gold/30">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">
        <button
          onClick={onMenuClick}
          className="lg:hidden bg-gold/10 border border-gold/30 p-2 rounded-md hover:bg-gold/20 transition text-gold"
        >
          <Menu size={22} />
        </button>

        <h2 className="font-cormorant text-xl sm:text-3xl font-light text-white">
          Welcome{" "}
          <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
            Admin
          </em>
        </h2>

        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="flex items-center gap-2 border border-gold/30 text-gold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-inter text-sm hover:bg-gold/10 transition"
        >
          Logout
          <FiLogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </nav>
  );
}
