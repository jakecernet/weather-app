import { useEffect, useState } from "react";
import "./forecast.css";

const Forecast = (data = { data }) => {
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

	const renderHourly = (day) => {
		return data.forecast.forecastday[day].hour.map((hour) => {
			return (
				<div className="hour">
					<a className="hourDisplay">{hour.time.slice(-5)}</a>
					<a>{hour.temp_c}°C</a>
					<img src={hour.condition.icon} alt={hour.condition.text} />
				</div>
			);
		});
	};

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
					<div className="astro">
						<a>
							Sončni vzhod ob:{" "}
							{data.forecast.forecastday[0].astro.sunrise}
						</a>
						<a>
							Sončni zahod ob:{" "}
							{data.forecast.forecastday[0].astro.sunset}
						</a>
					</div>
					<div className="hourly">
						<a>Vreme po urah:</a>
						<div className="hours">{renderHourly(0)}</div>
					</div>
				</div>
				<div className="day">
					<a>{getDayName(data.forecast.forecastday[1].date)}</a>
					<img
						src={data.forecast.forecastday[1].day.condition.icon}
						alt={data.forecast.forecastday[1].day.condition.text}
					/>
					<a>{data.forecast.forecastday[1].day.avgtemp_c}°C</a>
					<p>{data.forecast.forecastday[1].day.avgtemp_f}°F</p>
					<div className="astro">
						<a>
							Sončni vzhod ob:{" "}
							{data.forecast.forecastday[1].astro.sunrise}
						</a>
						<a>
							Sončni zahod ob:{" "}
							{data.forecast.forecastday[1].astro.sunset}
						</a>
					</div>
					<div className="hourly">
						<a>Vreme po urah:</a>
						<div className="hours">{renderHourly(1)}</div>
					</div>
				</div>
				<div className="day">
					<a>{getDayName(data.forecast.forecastday[2].date)}</a>
					<img
						src={data.forecast.forecastday[2].day.condition.icon}
						alt={data.forecast.forecastday[2].day.condition.text}
					/>
					<a>{data.forecast.forecastday[2].day.avgtemp_c}°C</a>
					<p>{data.forecast.forecastday[2].day.avgtemp_f}°F</p>
					<div className="astro">
						<a>
							Sončni vzhod ob:{" "}
							{data.forecast.forecastday[2].astro.sunrise}
						</a>
						<a>
							Sončni zahod ob:{" "}
							{data.forecast.forecastday[2].astro.sunset}
						</a>
					</div>
					<div className="hourly">
						<a>Vreme po urah:</a>
						<div className="hours">{renderHourly(2)}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Forecast;