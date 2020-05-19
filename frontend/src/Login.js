import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import waveImage from "./Images/wave.png";
import avatars from "./avatars";

export default function Login() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const [focusUser, setFocusUser] = useState("input-div one");
	const [focusPass, setFocusPass] = useState("input-div pass");

	const [loading, setLoading] = useState(false);

	const passwordValidation = RegExp(
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
	);

	useEffect(() => {}, []);

	const handleFocusUser = (e) => {
		setFocusUser(focusUser + " focus");
	};

	const handleBlurUser = (e) => {
		if (e.target.value == "") setFocusUser("input-div one");
	};

	const handleFocusPass = (e) => {
		setFocusPass(focusPass + " focus");
	};

	const handleBlurPass = (e) => {
		if (e.target.value == "") setFocusPass("input-div pass");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		setLoading(false);
	};

	function Loading(props) {
		if (loading)
			return <img className="loading" src={require("./Images/loading.svg")} />;
		else return "";
	}

	return (
		<div>
			<Loading />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<img className="wave" src={waveImage} alt="" />
			<div className="container">
				<div className="img">
					<img src={require("./Images/otherlogo.svg")} alt="" />
				</div>
				<div className="login-content">
					<form>
						<Carousel
							showArrows={false}
							showStatus={false}
							showIndicators={false}
							showThumbs={false}
							infiniteLoop={true}
							autoPlay={true}
						>
							{Object.values(avatars).map((image, index) => {
								let imageLocation = "./Images/avatars/" + image;
								return (
									<img key={`${index}`} src={require(`${imageLocation}`)} alt="" />
								);
							})}
						</Carousel>
						<h2 className="title">Mock Twitter</h2>
						<div className={focusUser}>
							<div className="i">
								<FontAwesomeIcon className="i" icon={faUser} />
							</div>
							<div className="div">
								<h5>Username</h5>
								<input
									type="text"
									className="input"
									name="username"
									onFocus={handleFocusUser}
									onBlur={handleBlurUser}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
						</div>
						<div className={focusPass}>
							<div className="i">
								<FontAwesomeIcon className="i" icon={faLock} />
							</div>
							<div className="div">
								<h5>Password</h5>
								<input
									type="password"
									className="input"
									name="password"
									onFocus={handleFocusPass}
									onBlur={handleBlurPass}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
						<NavLink to={"/register"}>Register here</NavLink>
						<input
							type="submit"
							className="btn"
							value="Login"
							onClick={handleSubmit}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
