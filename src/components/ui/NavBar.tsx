import { View } from "../../types/navigation";
import "../../styles/NavBar.css"

interface NavBarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

function NavBar({ currentView, onNavigate }: NavBarProps) {
  const navItems = [
    { view: View.GARDEN, icon: "🌱", label: "Jardín" },
    { view: View.HOUSE, icon: "🏠", label: "Casa" },
    { view: View.TASKS, icon: "📋", label: "Tareas" },
    { view: View.SHOP, icon: "🏪", label: "Tienda" },
  ];

  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <button
          key={item.view}
          className={`nav-button ${currentView === item.view ? "active" : ""}`}
          onClick={() => onNavigate(item.view)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default NavBar
