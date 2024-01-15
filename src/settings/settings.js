import { useState } from "react";
import "./settings.css";

function Settings() {
	const [city, setCity] = useState("");

	function handleChange(event) {
		setCity(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(city);
	}

	return (
		<div>
			<h1>Nastavitve</h1>
			<div className="settings">
				<div>
					<h2>Izberite mesto</h2>
					<input type="text" onChange={handleChange} />
					<button type="submit" onClick={handleSubmit}>
						Potrdi
					</button>
				</div>
			</div>
		</div>
	);
}

export default Settings;
