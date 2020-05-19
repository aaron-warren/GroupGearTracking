import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function NavBar() {
	return (
		<div className="nav">
			<ul className="nav-links">
				<NavLink className="link" to="Login">
					<div>Login</div>
				</NavLink>
				<li>Option 2</li>
				<li>Option 3</li>
			</ul>
		</div>
	);
}
