import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export function Header() {
    return(
      <header className="main-header">
        <nav className="nav-buttons">
          <Link to="/">Home</Link>
          <Link to="/artists">Artists</Link>
          <Link to="/about">About</Link>
          <Link to="/mixes">Mixes</Link>
        </nav>
      </header>
    )
  }