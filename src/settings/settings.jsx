import { useEffect, useState, useCallback } from "react";
import "./settings.css";

function Settings({ city, setCity }) {
	const [cities, setCities] = useState([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		try {
			const stored = JSON.parse(localStorage.getItem("cities") || "[]");
			setCities(stored);
		} catch {}
	}, []);

	const persistCities = useCallback((list) => {
		setCities(list);
		localStorage.setItem("cities", JSON.stringify(list));
	}, []);

	const selectCity = (c) => {
		setCity(c);
		localStorage.setItem("city", c);
	};

	const saveCity = () => {
		const value = input.trim();
		if (!value) return;
		selectCity(value);
		if (!cities.includes(value)) {
			persistCities([...cities, value]);
		}
		setInput("");
	};

	const clearList = (e) => {
		e.preventDefault();
		localStorage.removeItem("cities");
		localStorage.removeItem("city");
		setCity("");
		setCities([]);
	};

	return (
		<div className="settings fade-in">
			<h1>Nastavitve</h1>
			<div className="city">
				<a>Mesto (trenutno: {city || "ni izbrano"})</a>
				<p>Izberite mesto iz spodnjega seznama ali vnesite svoje mesto.</p>
				<ul>
					{cities.map((c) => (
						<li
							key={c}
							onClick={() => selectCity(c)}
							className={c === city ? "active-city" : ""}>
							{c}
						</li>
					))}
				</ul>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						saveCity();
					}}>
					<label>
						<input
							type="text"
							placeholder="Vnesi mesto"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</label>
				</form>
				<div className="actions">
					<button onClick={saveCity}>Shrani</button>
					<button onClick={clearList}>Izbriši vse</button>
				</div>
			</div>
		</div>
	);
}

export default Settings;
