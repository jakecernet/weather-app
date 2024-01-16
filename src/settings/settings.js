import { useState } from "react";
import "./settings.css";

function Settings() {
	const [city, setCity] = useState("");

	const cities = getCitiesFromLocalStorage().map((city) => {
		return (
			<li
				onClick={() => {
					localStorage.setItem("city", city);
					console.log("city: " + city);
					window.location.reload();
				}}>
				{city}
			</li>
		);
	});

	function saveCity(event) {
		event.preventDefault();
		setCity(document.getElementById("city").value);
		if (
			city !== "" &&
			city !== null &&
			city !== undefined &&
			city !== " " &&
			city !== "  " &&
			city !== "   " &&
			city !== "    "
		) {
			console.log(city);
			localStorage.setItem(city, city);
			alert("Mesto je bilo uspešno shranjeno!");
		}
	}

	function clearList(event) {
		event.preventDefault();
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="settings">
			<h1>Nastavitve</h1>
			<div className="city">
				<a>Mesto</a>
				<p>
					Izberite mesto iz spodnjega seznama ali vnesite svoje mesto.
				</p>
				<ul>{cities}</ul>
				<form>
					<label>
						<input
							type="text"
							placeholder="Vnesi mesto"
							id="city"
						/>
					</label>
				</form>
				<button onClick={saveCity}>Shrani</button>
				<button onClick={clearList}>Izbriši vse</button>
			</div>
		</div>
	);
}

function getCitiesFromLocalStorage() {
	const cities = [];
	for (let i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i) != "city") {
			const key = localStorage.key(i);
			cities.push(localStorage.getItem(key));
		} else {
			continue;
		}
	}
	return cities;
}

export default Settings;
