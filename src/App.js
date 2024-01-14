import { useEffect, useState } from "react";
import "./App.css";
import Current from "./current/current";
import Forecast from "./forecast/forecast";
import Feedback from "./feedback/feedback";
import Settings from "./settings/settings";

function App() {
	let navClosed = false;

	let [navbar, setNavClosed] = useState(navClosed);

	function toggleNav() {
		setNavClosed(!navbar);
		document.body.classList.toggle("small-nav");
		document.body.classList.toggle("avg-nav");
	}

	const [page, setPage] = useState("home");

	return (
		<div>
			<nav>
				<ul>
					<li onClick={() => setPage("home")}>
						<i className="fas fa-home"></i>
						{navbar ? null : <a>Trenutno</a>}
					</li>
					<li onClick={() => setPage("forecast")}>
						<i className="fas fa-user"></i>
						{navbar ? null : <a>Napoved</a>}
					</li>
					<li onClick={() => setPage("feedback")}>
						<i className="fas fa-envelope"></i>
						{navbar ? null : <a>Vaše mnenje</a>}
					</li>
				</ul>
				<div className="bottom">
					<li className="button" onClick={() => setPage("settings")}>
						<i className="fas fa-cog"></i>
						{navbar ? null : <p>Nastavitve</p>}
					</li>
					<li className="button" onClick={toggleNav}>
						<i className="fas fa-bars"></i>
						{navbar ? null : <p>Skrči</p>}
					</li>
				</div>
			</nav>
			<div className="container">
				{page === "home" && <Current />}
				{page === "forecast" && <Forecast />}
				{page === "feedback" && <Feedback />}
				{page === "settings" && <Settings />}
			</div>
		</div>
	);
}

export default App;
