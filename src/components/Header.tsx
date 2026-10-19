import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-title">
          EventHub
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
