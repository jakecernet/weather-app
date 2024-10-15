import { useState, useEffect } from "react";
import "./settings.css";

function Settings() {
	const [city, setCity] = useState("");
	const [cities, setCities] = useState([]);

	useEffect(() => {
		getCitiesFromLocalStorage();
	}, []);

	function getCitiesFromLocalStorage() {
		if (localStorage.length === 0) {
			return [];
		} else {
			for (let i = 0; i < localStorage.length; i++) {
				if (localStorage.key(i) === "cities") {
					const cities = JSON.parse(localStorage.getItem("cities"));
					setCities(cities);
				}
			}
		}
		return cities;
	}

	const citiesDisplay = cities.map((city) => {
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

	function saveCity() {
		const savedCity = document.getElementById("city").value;
		if (savedCity !== "" && savedCity !== null && savedCity !== undefined) {
			setCity(JSON.stringify(savedCity));
		}		
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
			localStorage.setItem("city", city);
			const updatedCities = [...cities, city];
			setCities(updatedCities);
			localStorage.setItem("cities", JSON.stringify(updatedCities));
			alert("Mesto je bilo uspešno shranjeno!");
			window.location.reload();
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
				<ul>{citiesDisplay}</ul>
				<form>
					<label>
						<input
							type="text"
							placeholder="Vnesi mesto"
							id="city"
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									saveCity();
								}
							}}
						/>
					</label>
				</form>
				<button onClick={saveCity}>Shrani</button>
				<button onClick={clearList}>Izbriši vse</button>
			</div>
		</div>
	);
}

export default Settings;
