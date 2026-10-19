import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Events" },
  { to: "/invitations", label: "Invitations" },
  { to: "/collaborators", label: "Collaborators" },
];

function Navigation() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
