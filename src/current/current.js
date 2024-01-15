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
						"Vrhnika" +
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
		return null; // or render a loading state
	}

	const decodeWindDirection = (windDirection) => {
		if ((windDirection = "N")) {
			return "Sever";
		} else if ((windDirection = "NNE")) {
			return "Sever-severovzhod";
		} else if ((windDirection = "NE")) {
			return "Severovzhod";
		} else if ((windDirection = "ENE")) {
			return "Vzhod-severovzhod";
		} else if ((windDirection = "E")) {
			return "Vzhod";
		} else if ((windDirection = "ESE")) {
			return "Vzhod-jugovzhod";
		} else if ((windDirection = "SE")) {
			return "Jugovzhod";
		} else if ((windDirection = "SSE")) {
			return "Jug-jugovzhod";
		} else if ((windDirection = "S")) {
			return "Jug";
		} else if ((windDirection = "SSW")) {
			return "Jug-jugozahod";
		} else if ((windDirection = "SW")) {
			return "Jugozahod";
		} else if ((windDirection = "WSW")) {
			return "Zahod-jugozahod";
		} else if ((windDirection = "W")) {
			return "Zahod";
		} else if ((windDirection = "WNW")) {
			return "Zahod-severozahod";
		} else if ((windDirection = "NW")) {
			return "Severozahod";
		} else if ((windDirection = "NNW")) {
			return "Sever-severozahod";
		}
	};

	const decodeCondition = (condition) => {
		if ((condition = "Sunny")) {
			return "Sončno";
		} else if ((condition = "Partly cloudy")) {
			return "Delno oblačno";
		} else if ((condition = "Cloudy")) {
			return "Oblačno";
		} else if ((condition = "Overcast")) {
			return "Pretežno oblačno";
		} else if ((condition = "Mist")) {
			return "Megleno";
		} else if ((condition = "Patchy rain possible")) {
			return "Možnost padavin";
		} else if ((condition = "Patchy snow possible")) {
			return "Možnost sneženja";
		} else if ((condition = "Patchy sleet possible")) {
			return "Možnost dežja";
		} else if ((condition = "Patchy freezing drizzle possible")) {
			return "Možnost pozebe";
		} else if ((condition = "Thundery outbreaks possible")) {
			return "Možnost neviht";
		} else if ((condition = "Blowing snow")) {
			return "Sneži";
		} else if ((condition = "Blizzard")) {
			return "Snežni vihar";
		} else if ((condition = "Fog")) {
			return "Megla";
		} else if ((condition = "Freezing fog")) {
			return "Zmrznjena megla";
		} else if ((condition = "Patchy light drizzle")) {
			return "Rahel dež";
		} else if ((condition = "Light drizzle")) {
			return "Rahel dež";
		} else if ((condition = "Freezing drizzle")) {
			return "Zmrznjen dež";
		} else if ((condition = "Heavy freezing drizzle")) {
			return "Močan zmrznjen dež";
		} else if ((condition = "Patchy light rain")) {
			return "Rahel dež";
		} else if ((condition = "Light rain")) {
			return "Rahel dež";
		} else if ((condition = "Moderate rain at times")) {
			return "Zmeren dež";
		}
	};

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
					className="condition__icon"
					src={data.current.condition.icon}
					alt={data.current.condition.text}
				/>
				<a className="condition__text">
					{decodeCondition(data.current.condition.text)}
				</a>
			</div>
			<div className="other">
				<div className="wind">
					<a className="other-title">Veter</a>
					<a>{data.current.wind_kph} km/h</a>
					<p>{data.current.wind_mph} mph</p>
					<p>{decodeWindDirection(data.current.wind_dir)}</p>
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
					<p>{data.current.vis_miles} miles</p>
				</div>
			</div>
		</div>
	);
}

export default Current;
