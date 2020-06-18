import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Nav from "./NavBar";
import Register from "./Register";

export default function App() {
	return (
		<BrowserRouter>
			<div>
				{/* <Nav /> */}
				<Switch>
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}
