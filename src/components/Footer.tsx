import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
        <ul>
          <li>
            <Link to="/">Events</Link>
          </li>
          <li>
            <Link to="/invitations">Invitations</Link>
          </li>
          <li>
            <Link to="/collaborators">Collaborators</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
