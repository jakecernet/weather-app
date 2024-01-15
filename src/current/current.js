import { useState, useEffect } from "react";
import "./current.css";
import key from "../api.json";

function Current() {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const apiKey = "&key=" + key.name;
				const response = await fetch(
					"https://api.weatherapi.com/v1/current.json?q=" +
						"Sydney" +
						apiKey
				);
				const data = await response.json();
				setData(data);
				console.log(data);
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
		<div className="display">
			<div className="location">
				<a>{data.location.name},</a>
				<p>{data.location.country}</p>
			</div>
			<div className="temp">
				<a>{data.current.temp_c}°C </a>
				<p>( {data.current.temp_f}°F ) </p>
			</div>
			<div className="condition">
				<img
					src={data.current.condition.icon}
					alt={data.current.condition.text}
				/>
				<a>{data.current.condition.text}</a>
			</div>
			<div className="other">
				<div className="wind">
					<a className="other-title">Veter</a>
					<a>{data.current.wind_kph} km/h</a>
					<p>{data.current.wind_mph} mph</p>
					<p>{data.current.wind_dir}</p>
				</div>
				<div className="humidity">
					<a className="other-title">Vlažnost</a>
					<a>{data.current.humidity}%</a>
				</div>
				<div className="precipitation">
					<a className="other-title">Padavine</a>
					<a>{data.current.precip_mm} mm</a>
					<p>{data.current.precip_in} in</p>
				</div>
				<div className="uv">
					<a className="other-title">UV indeks</a>
					<a>{data.current.uv}</a>
				</div>
				<div className="visibility">
					<a className="other-title">Vidljivost</a>
					<a>{data.current.vis_km} km</a>
					<p>{data.current.vis_miles} milj/a</p>
				</div>
			</div>
		</div>
	);
}

export default Current;
