import { useEffect, useState } from "react";
import api from "./api.json";
import "./App.css";
import Current from "./current/current";
import Today from "./today/today";
import Forecast from "./forecast/forecast";
import Feedback from "./feedback/feedback";
import Settings from "./settings/settings";

import Day from "./images/day.jpg";
import Night from "./images/night.jpg";

function App() {	
	let navClosed = true;

	let [navbar, setNavClosed] = useState(navClosed);

	function toggleNav() {
		setNavClosed(!navbar);
		document.body.classList.toggle("small-nav");
		document.body.classList.toggle("avg-nav");
	}

	const [page, setPage] = useState("home");

	const setBackground = () => {
		const body = document.body;
		const currentHour = new Date().getHours();
		if (currentHour >= 6 && currentHour < 18) {
			body.style.backgroundImage = `url(${Day})`;
		} else {
			body.style.backgroundImage = `url(${Night})`;
		}
	};

	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const apiKey = "&key=" + api.name;
				const response = await fetch(
					"https://api.weatherapi.com/v1/forecast.json?q=" +
						localStorage.getItem("city") +
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
	}, []);

	if (!data) {
		return null;
	}

	return (
		<div onLoad={setBackground()}>
			<nav>
				<ul>
					<li onClick={() => setPage("home")}>
						<i className="fas fa-home"></i>
						{navbar ? null : <a>Trenutno</a>}
					</li>
					<li onClick={() => setPage("today")}>
						<i className="fas fa-calendar"></i>
						{navbar ? null : <a>Danes</a>}
					</li>
					<li onClick={() => setPage("forecast")}>
						<i className="fas fa-user"></i>
						{navbar ? null : <a>Napoved</a>}
					</li>
					<li onClick={() => setPage("settings")}>
						<i className="fas fa-cog"></i>
						{navbar ? null : <p>Nastavitve</p>}
					</li>
				</ul>
				<div className="bottom">
					<li className="button" onClick={() => setPage("feedback")}>
						<i className="fas fa-envelope"></i>
						{navbar ? null : <a>Vaše mnenje</a>}
					</li>
					<li className="button" onClick={toggleNav}>
						<i className="fas fa-bars"></i>
						{navbar ? null : <p>Skrči</p>}
					</li>
				</div>
			</nav>
			<div className="container">
				{page === "home" && <Current data={data} />}
				{page === "today" && <Today data={data} />}
				{page === "forecast" && <Forecast data={data} />}
				{page === "feedback" && <Feedback />}
				{page === "settings" && <Settings />}
			</div>
		</div>
	);
}

export default App;
