import { useState, useEffect } from "react";
import "./current.css";

const Current = (data = { data }) => {
	const [display, setDisplay] = useState(data.data);

	if (!display) {
		return null;
	}

	const translateCondition = (condition) => {
		switch (condition) {
			case "Sunny":
				return "Sončno";
			case "Clear":
				return "Jasno";
			case "Partly cloudy":
				return "Delno oblačno";
			case "Cloudy":
				return "Oblačno";
			case "Overcast":
				return "Pretežno oblačno";
			case "Mist":
				return "Megla";
			case "Patchy rain possible":
				return "Možni padavini";
			case "Patchy snow possible":
				return "Možen sneg";
			case "Patchy sleet possible":
				return "Možen dež s snegom";
			case "Patchy freezing drizzle possible":
				return "Možna poledica";
			case "Thundery outbreaks possible":
				return "Možni nevihtni izbruhi";
			case "Blowing snow":
				return "Sneženje";
			case "Blizzard":
				return "Snežni vihar";
			case "Fog":
				return "Megla";
			case "Freezing fog":
				return "Zmrznjena megla";
			case "Patchy light drizzle":
				return "Rahel dež";
			case "Light drizzle":
				return "Rahel dež";
			case "Freezing drizzle":
				return "Zmrznjen dež";
			case "Heavy freezing drizzle":
				return "Močan zmrznjen dež";
			case "Patchy light rain":
				return "Rahel dež";
			case "Light rain":
				return "Rahel dež";
			case "Moderate rain at times":
				return "Občasno zmerno deževno";
			case "Moderate rain":
				return "Zmerno deževno";
			case "Heavy rain at times":
				return "Občasno močno deževno";
			case "Heavy rain":
				return "Močno deževno";
			case "Light freezing rain":
				return "Rahel zmrznjen dež";
			case "Moderate or heavy freezing rain":
				return "Zmerno ali močno zmrznjen dež";
			case "Light sleet":
				return "Rahel dež s snegom";
			case "Moderate or heavy sleet":
				return "Zmerno ali močen dež s snegom";
			case "Patchy light snow":
				return "Rahel sneg";
			case "Light snow":
				return "Rahel sneg";
			case "Patchy moderate snow":
				return "Zmerno sneženje";
			case "Moderate snow":
				return "Zmerno sneženje";
		}
	};

	const translateWind = (wind) => {
		switch (wind) {
			case "N":
				return "Severno";
			case "NNE":
				return "Severovzhodno";
			case "NE":
				return "Severovzhodno";
			case "ENE":
				return "Severovzhodno";
			case "E":
				return "Vzhodno";
			case "ESE":
				return "Jugovzhodno";
			case "SE":
				return "Jugovzhodno";
			case "SSE":
				return "Jugovzhodno";
			case "S":
				return "Južno";
			case "SSW":
				return "Jugozahodno";
			case "SW":
				return "Jugozahodno";
			case "WSW":
				return "Jugozahodno";
			case "W":
				return "Zahodno";
			case "WNW":
				return "Severozahodno";
			case "NW":
				return "Severozahodno";
			case "NNW":
				return "Severozahodno";
		}
	};

	return (
		<div className="displayCurrent">
			<div className="basic">
				<div className="location">
					<a>{display.location.name},</a>
					<p>{display.location.country}</p>
				</div>
				<div className="temperatura">
					<a>
						{display.current.temp_c}°C{" "}
						<a>({display.current.temp_f}°F)</a>
					</a>
					<p>Občutek kot {display.current.feelslike_c}°C</p>
					<div className="condition">
						<img
							src={display.current.condition.icon}
							alt={display.current.condition.text}
						/>
						<a>
							{translateCondition(display.current.condition.text)}
						</a>
					</div>
				</div>
			</div>
			<div className="other">
				<a>
					Veter: {display.current.wind_kph} km/h <br></br>
					{translateWind(display.current.wind_dir)}
				</a>
				<a>{display.current.humidity}% vlažnost</a>
				<a>Vidljivost: {display.current.vis_km} km</a>
			</div>
			<div className="lastUpdated">
				<p>
					Zadnja posodobitev:{" "}
					{display.current.last_updated.split(" ")[1]}
				</p>
			</div>
		</div>
	);
};

export default Current;
