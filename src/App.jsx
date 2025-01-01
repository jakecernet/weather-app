import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from "react-router-dom";

import api from "./api.json";
import "./App.css";
import Current from "./current/current";
import Today from "./today/today";
import Forecast from "./forecast/forecast";
import Feedback from "./feedback/feedback";
import Settings from "./settings/settings";
import Loading from "./loading/loading";

import Day from "./images/day.jpg";
import Night from "./images/night.jpg";

import home from "./buttons/home.svg";
import today from "./buttons/today.svg";
import forecast from "./buttons/forecast.svg";
import settings from "./buttons/settings.svg";
import feedback from "./buttons/feedback.svg";
import menu from "./buttons/menu.svg";

function App() {
	const [navbar, setNavClosed] = useState(true);
	const [data, setData] = useState(null);
	const output_city = localStorage.getItem("city");
	let cities = [];

	function toggleNav() {
		setNavClosed(!navbar);
		document.body.classList.toggle("small-nav");
		document.body.classList.toggle("avg-nav");
	}

	const setBackground = () => {
		const body = document.body;
		const currentHour = new Date().getHours();
		if (currentHour >= 6 && currentHour < 19) {
			body.style.backgroundImage = `url(${Day})`;
		} else {
			body.style.backgroundImage = `url(${Night})`;
		}
		body.style.backgroundSize = "cover";
		body.style.backgroundPosition = "center";
		body.style.backgroundRepeat = "no-repeat";
		body.style.backgroundAttachment = "fixed";
	};

	useEffect(() => {
		fetchCity();
		fetchData();
	}, [output_city]);

	async function fetchData() {
		try {
			const apiKey = "&key=" + api.name;
			const response = await fetch(
				"https://api.weatherapi.com/v1/forecast.json?q=" +
					output_city +
					"&days=3" +
					apiKey
			);
			const receivedData = await response.json();
			setData(receivedData);
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchCity() {
		if (output_city == null) {
			const myip = await fetch("https://api.ipify.org?format=json");
			const ip = await myip.json();
			const mylocation = await fetch(
				"https://ipapi.co/" + ip.ip + "/json/"
			);
			const location = await mylocation.json();
			const city = location.city;

			if (localStorage.getItem("city") == null) {
				localStorage.setItem("city", city);
				let cities = JSON.parse(localStorage.getItem("cities")) || [];
				cities.push(city);
				localStorage.setItem("cities", JSON.stringify(cities));
			}
		}
	}

	if (!data) {
		return <div>{<Loading />}</div>;
	}

	return (
		<div onLoad={setBackground()}>
			<Router>
				<nav>
					<ul>
						<NavLink to="/" style={{ textDecoration: "none" }}>
							<li>
								<img src={home} alt="home" />
								{navbar ? null : <a>Trenutno</a>}
							</li>
						</NavLink>
						<NavLink to="/today" style={{ textDecoration: "none" }}>
							<li>
								<img src={today} alt="today" />
								{navbar ? null : <a>Danes</a>}
							</li>
						</NavLink>
						<NavLink to="/forecast" style={{ textDecoration: "none" }}>
							<li>
								<img src={forecast} alt="forecast" />
								{navbar ? null : <a>Napoved</a>}
							</li>
						</NavLink>
						<NavLink to="/settings" style={{ textDecoration: "none" }}>
							<li>
								<img src={settings} alt="settings" />
								{navbar ? null : <a>Nastavitve</a>}
							</li>
						</NavLink>
					</ul>
					<div className="bottom">
						<NavLink to="/feedback" style={{ textDecoration: "none" }}>
							<li className="button">
								<img src={feedback} alt="feedback" />
								{navbar ? null : <a>Vaše mnenje</a>}
							</li>
						</NavLink>
						<li className="button" onClick={toggleNav}>
							<img src={menu} alt="menu" />
							{navbar ? null : <a>Skrči</a>}
						</li>
					</div>
				</nav>
				<div className="container">
					<Routes>
						<Route path="/" element={<Current data={data} />} />
						<Route path="/today" element={<Today data={data} />} />
						<Route
							path="/forecast"
							element={<Forecast data={data} />}
						/>
						<Route path="/settings" element={<Settings />} />
						<Route path="/feedback" element={<Feedback />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
