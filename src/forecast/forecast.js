import { useEffect, useState } from "react";
import "./forecast.css";
import key from "../api.json";

function Forecast() {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const apiKey = "&key=" + key.name;
				const response = await fetch(
					"https://api.weatherapi.com/v1/forecast.json?q=" +
						"Sydney" +
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

	return <div className="display">
		<div className="days">
			<div className="day">
				<a>{data.forecast.forecastday[0].date}</a>
				<img src={data.forecast.forecastday[0].day.condition.icon} alt={data.forecast.forecastday[0].day.condition.text} />
				<a>{data.forecast.forecastday[0].day.avgtemp_c}°C</a>
				<p>{data.forecast.forecastday[0].day.avgtemp_f}°F</p>
			</div>
			<div className="day">
				<a>{data.forecast.forecastday[1].date}</a>
				<img src={data.forecast.forecastday[1].day.condition.icon} alt={data.forecast.forecastday[1].day.condition.text} />
				<a>{data.forecast.forecastday[1].day.avgtemp_c}°C</a>
				<p>{data.forecast.forecastday[1].day.avgtemp_f}°F</p>
			</div>
			<div className="day">
				<a>{data.forecast.forecastday[2].date}</a>
				<img src={data.forecast.forecastday[2].day.condition.icon} alt={data.forecast.forecastday[2].day.condition.text} />
				<a>{data.forecast.forecastday[2].day.avgtemp_c}°C</a>
				<p>{data.forecast.forecastday[2].day.avgtemp_f}°F</p>
			</div>
		</div>
	</div>;
}

export default Forecast;
