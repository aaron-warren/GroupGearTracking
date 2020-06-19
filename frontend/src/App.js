import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Login from "./Login";
import Nav from "./NavBar";
import Register from "./Register";

const client = new ApolloClient({
	uri: "http://localhost:5000/api",
});

export default function App() {
	return (
		<BrowserRouter>
			<ApolloProvider client={client}>
				<div>
					<Nav />
					<Switch>
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
					</Switch>
				</div>
			</ApolloProvider>
		</BrowserRouter>
	);
}
