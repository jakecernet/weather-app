import { useState, useEffect } from "react";
import "./current.css";
import data from "../App";

const Current = (data = { data }) => {
	const [display, setDisplay] = useState(data.data);

	if (!display) {
		return null;
	}

	return (
		<div className="display">
			<div className="location">
				<a>{display.location.name},</a>
				<p>{display.location.country}</p>
			</div>
			<div className="temp">
				<a>{display.current.temp_c}°C </a>
				<p>( {display.current.temp_f}°F ) </p>
			</div>
			<div className="condition">
				<img
					src={display.current.condition.icon}
					alt={display.current.condition.text}
				/>
				<a>{display.current.condition.text}</a>
			</div>
			<div className="other">
				<div className="wind">
					<p className="other-title">Veter</p>
					<a>{display.current.wind_kph} km/h</a>
					<p>{display.current.wind_mph} mph</p>
					<p>{display.current.wind_dir}</p>
				</div>
				<div className="humidity">
					<p className="other-title">Vlažnost</p>
					<a>{display.current.humidity}%</a>
				</div>
				<div className="precipitation">
					<p className="other-title">Padavine</p>
					<a>{display.current.precip_mm} mm</a>
					<p>{display.current.precip_in} in</p>
				</div>
				<div className="uv">
					<p className="other-title">UV indeks</p>
					<a>{display.current.uv}</a>
				</div>
				<div className="visibility">
					<p className="other-title">Vidljivost</p>
					<a>{display.current.vis_km} km</a>
					<p>{display.current.vis_miles} milj/a</p>
				</div>
			</div>
		</div>
	);
};

export default Current;
