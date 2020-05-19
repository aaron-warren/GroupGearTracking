import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Register.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import waveImage from "./Images/wave.png";
import avatars from "./avatars";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [goodPassword, setGoodPassword] = useState(false);

	const [focusUser, setFocusUser] = useState("input-div one");
	const [focusPass, setFocusPass] = useState("input-div pass bad-password");
	const [focusConfPass, setFocusConfPass] = useState(
		"input-div pass bad-password"
	);

	const [btnState, setBtnState] = useState("btn bad-password");

	const [loading, setLoading] = useState(false);

	const passwordValidation = RegExp(
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
	);

	useEffect(() => {}, []);

	const handleFocus = (e) => {
		const { name } = e.target;

		switch (name) {
			case "username":
				setFocusUser(focusUser + " focus");
				break;
			case "password":
				setFocusPass(focusPass + " focus");
				break;
			case "confirm-password":
				setFocusConfPass(focusConfPass + " focus");
				break;
		}
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;

		if (value == "") {
			switch (name) {
				case "username":
					setFocusUser("input-div one");
					break;
				case "password":
					if (goodPassword) setFocusPass("input-div pass");
					else setFocusPass("input-div pass bad-password");
					break;
				case "confirm-password":
					if (goodPassword) setFocusConfPass("input-div pass");
					else setFocusConfPass("input-div pass bad-password");
					break;
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case "password":
				setPassword(value);
				if (passwordValidation.test(value)) {
					let checkedPassword = value === confirmPassword;
					setGoodPassword(checkedPassword);
					if (checkedPassword) {
						console.log("good");
						setBtnState("btn");
						setFocusPass("input-div pass focus");
						setFocusConfPass("input-div pass focus");
						break;
					}
				}
				setBtnState("btn bad-password");
				if (focusPass.includes("focus"))
					setFocusPass("input-div pass focus bad-password");
				else setFocusPass("input-div pass bad-password");
				if (focusConfPass.includes("focus"))
					setFocusConfPass("input-div pass focus bad-password");
				else setFocusConfPass("input-div pass bad-password");
				break;
			case "confirm-password":
				setConfirmPassword(value);
				if (passwordValidation.test(value)) {
					let checkedPassword = password === value;
					setGoodPassword(checkedPassword);
					if (checkedPassword) {
						setBtnState("btn");
						setFocusPass("input-div pass focus");
						setFocusConfPass("input-div pass focus");
						break;
					}
				}
				setBtnState("btn bad-password");
				if (focusPass.includes("focus"))
					setFocusPass("input-div pass focus bad-password");
				else setFocusPass("input-div pass bad-password");
				if (focusConfPass.includes("focus"))
					setFocusConfPass("input-div pass focus bad-password");
				else setFocusConfPass("input-div pass bad-password");
				break;
		}
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
						<h2 className="title">Register an Account</h2>
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
									onFocus={handleFocus}
									onBlur={handleBlur}
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
									onFocus={handleFocus}
									onBlur={handleBlur}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className={focusConfPass}>
							<div className="i">
								<FontAwesomeIcon className="i" icon={faLock} />
							</div>
							<div className="div">
								<h5>Confirm Password</h5>
								<input
									type="password"
									className="input"
									name="confirm-password"
									onFocus={handleFocus}
									onBlur={handleBlur}
									onChange={handleChange}
								/>
							</div>
						</div>
						<input
							type="submit"
							className={btnState}
							value="Register"
							onClick={handleSubmit}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
