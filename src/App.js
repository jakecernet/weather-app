import React, { useEffect, useState } from "react";

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
	let cities = [];

	function toggleNav() {
		setNavClosed(!navbar);
		document.body.classList.toggle("small-nav");
		document.body.classList.toggle("avg-nav");
	}

	const [page, setPage] = useState("home");

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

	const [data, setData] = useState(null);

	const output_city = localStorage.getItem("city");
	console.log(output_city);

	useEffect(() => {
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
				console.log(receivedData);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, [output_city]);

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

	fetchCity();

	return (
		<div onLoad={setBackground()}>
			<nav>
				<ul>
					<li onClick={() => setPage("home")}>
						<img src={home} alt="home" />
						{navbar ? null : <a>Trenutno</a>}
					</li>
					<li onClick={() => setPage("today")}>
						<img src={today} alt="today" />
						{navbar ? null : <a>Danes</a>}
					</li>
					<li onClick={() => setPage("forecast")}>
						<img src={forecast} alt="forecast" />
						{navbar ? null : <a>Napoved</a>}
					</li>
					<li onClick={() => setPage("settings")}>
						<img src={settings} alt="settings" />
						{navbar ? null : <p>Nastavitve</p>}
					</li>
				</ul>
				<div className="bottom">
					<li className="button" onClick={() => setPage("feedback")}>
						<img src={feedback} alt="feedback" />
						{navbar ? null : <a>Vaše mnenje</a>}
					</li>
					<li className="button" onClick={toggleNav}>
						<img src={menu} alt="menu" />
						{navbar ? null : <p>Skrči</p>}
					</li>
				</div>
			</nav>
			<div className="container">
				{page === "home" && <Current data={data} />}
				{page === "today" && <Today data={data} />}
				{page === "forecast" && <Forecast data={data} />}
				{page === "feedback" && <Feedback />}
				{page === "settings" && <Settings cities={cities} />}
			</div>
		</div>
	);
}

export default App;
