import { useState } from "react";
import "./forecast.css";

//eslint-disable-next-line
const Forecast = (data = { data }) => {
	const [display] = useState(data.data);

	if (!display) {
		return null;
	}

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
		return display.forecast.forecastday[day].hour.map((hour) => {
			return (
				<div className="hour">
					<p className="hourDisplay a-text">{hour.time.slice(-5)}</p>
					<p className="a-text">{hour.temp_c}°C</p>
					<img src={hour.condition.icon} alt={hour.condition.text} />
				</div>
			);
		});
	};

	return (
		<div className="displayForecast">
			<p className="a-text">Napoved za {display.location.name}:</p>
			<div className="days">
				<div className="day">
					<p className="a-text">{getDayName(display.forecast.forecastday[0].date)}</p>
					<img
						src={display.forecast.forecastday[0].day.condition.icon}
						alt={display.forecast.forecastday[0].day.condition.text}
					/>
					<p className="a-text">{display.forecast.forecastday[0].day.avgtemp_c}°C</p>
					<p>
						{display.forecast.forecastday[0].day.totalprecip_mm} mm
					</p>
					<div className="astro">
						<p className="a-text">
							Sončni vzhod ob:{" "}
							{display.forecast.forecastday[0].astro.sunrise}
						</p>
						<p className="a-text">
							Sončni zahod ob:{" "}
							{display.forecast.forecastday[0].astro.sunset}
						</p>
					</div>
					<div className="hourly">
						<p className="a-text">Vreme po urah:</p>
						<div className="hours">{renderHourly(0)}</div>
					</div>
				</div>
				<div className="day">
					<p className="a-text">{getDayName(display.forecast.forecastday[1].date)}</p>
					<img
						src={display.forecast.forecastday[1].day.condition.icon}
						alt={display.forecast.forecastday[1].day.condition.text}
					/>
					<p className="a-text">{display.forecast.forecastday[1].day.avgtemp_c}°C</p>
					<p>
						{display.forecast.forecastday[1].day.totalprecip_mm} mm
					</p>
					<div className="astro">
						<p className="a-text">
							Sončni vzhod ob:{" "}
							{display.forecast.forecastday[1].astro.sunrise}
						</p>
						<p className="a-text">
							Sončni zahod ob:{" "}
							{display.forecast.forecastday[1].astro.sunset}
						</p>
					</div>
					<div className="hourly">
						<p className="a-text">Vreme po urah:</p>
						<div className="hours">{renderHourly(1)}</div>
					</div>
				</div>
				<div className="day">
					<p className="a-text">{getDayName(display.forecast.forecastday[2].date)}</p>
					<img
						src={display.forecast.forecastday[2].day.condition.icon}
						alt={display.forecast.forecastday[2].day.condition.text}
					/>
					<p className="a-text">{display.forecast.forecastday[2].day.avgtemp_c}°C</p>
					<p>
						{display.forecast.forecastday[2].day.totalprecip_mm} mm
					</p>
					<div className="astro">
						<p className="a-text">
							Sončni vzhod ob:{" "}
							{display.forecast.forecastday[2].astro.sunrise}
						</p>
						<p className="a-text">
							Sončni zahod ob:{" "}
							{display.forecast.forecastday[2].astro.sunset}
						</p>
					</div>
					<div className="hourly">
						<p className="a-text">Vreme po urah:</p>
						<div className="hours">{renderHourly(2)}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Forecast;
