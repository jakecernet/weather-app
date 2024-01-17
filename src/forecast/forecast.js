import { useEffect, useState } from "react";
import "./forecast.css";
import key from "../api.json";

function Forecast() {
	const [data, setData] = useState(null);
	const [day, setDay] = useState(null);

	function decodeDate(dateString) {
		const [year, month, day] = dateString.split("-");
		return {
			year: parseInt(year),
			month: parseInt(month),
			day: parseInt(day),
		};
	}

	function getDayName(dateString) {
		const date = decodeDate(dateString);
		const dayNames = [
			"Nedelja",
			"Ponedeljek",
			"Torek",
			"Sreda",
			"Četrtek",
			"Petek",
			"Sobota",
		];
		const dayName = new Date(date.year, date.month - 1, date.day).getDay();
		return dayNames[dayName];
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const apiKey = "&key=" + key.name;
				const response = await fetch(
					"https://api.weatherapi.com/v1/forecast.json?q=" +
						localStorage.getItem("city") +
						"&days=3" +
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
		<div className="displayForecast">
			<a>Napoved za {data.location.name}:</a>
			<div className="days">
				<div className="day">
					<a>{getDayName(data.forecast.forecastday[0].date)}</a>
					<img
						src={data.forecast.forecastday[0].day.condition.icon}
						alt={data.forecast.forecastday[0].day.condition.text}
					/>
					<a>{data.forecast.forecastday[0].day.avgtemp_c}°C</a>
					<p>{data.forecast.forecastday[0].day.avgtemp_f}°F</p>
				</div>
				<div className="day">
					<a>{getDayName(data.forecast.forecastday[1].date)}</a>
					<img
						src={data.forecast.forecastday[1].day.condition.icon}
						alt={data.forecast.forecastday[1].day.condition.text}
					/>
					<a>{data.forecast.forecastday[1].day.avgtemp_c}°C</a>
					<p>{data.forecast.forecastday[1].day.avgtemp_f}°F</p>
				</div>
				<div className="day">
					<a>{getDayName(data.forecast.forecastday[2].date)}</a>
					<img
						src={data.forecast.forecastday[2].day.condition.icon}
						alt={data.forecast.forecastday[2].day.condition.text}
					/>
					<a>{data.forecast.forecastday[2].day.avgtemp_c}°C</a>
					<p>{data.forecast.forecastday[2].day.avgtemp_f}°F</p>
				</div>
			</div>
		</div>
	);
}

export default Forecast;
