import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">Sarath Valanukonda</NavLink>
      </div>

      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/professional-summary" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
          Professional Summary
        </NavLink>
        <NavLink to="/projects" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
          Projects
        </NavLink>
        <NavLink to="/blogs" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
          Blogs
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
