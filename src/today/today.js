import { useState, useEffect } from "react";
import "./today.css";

const Today = (data = { data }) => {
	const [display, setDisplay] = useState(data.data);

	if (!display) {
		return null;
	}

	const renderRemainingForecast = (currentHour) => {
		return display.forecast.forecastday[0].hour.map((hour) => {
			if (hour.time.slice(-5) > currentHour) {
				return (
					<div className="remainingHour">
						<a>{hour.time.slice(-5)}</a>
						<a>{hour.condition.text}</a>
						<img
							src={hour.condition.icon}
							alt={hour.condition.text}
						/>
						<a>{hour.temp_c}°C</a>
					</div>
				);
			}
		});
	};

	return (
		<div className="display">
			<div>
				<div className="location">
					<a>{display.location.name},</a>
					<p>{display.location.country}</p>
				</div>
				<div className="temp">
					<a>{display.current.temp_c}°C</a>
					<p>( {display.current.temp_f}°F )</p>
				</div>
				<div className="condition">
					<img
						src={display.current.condition.icon}
						alt={display.current.condition.text}
					/>
					<a>{display.current.condition.text}</a>
				</div>
				<div className="astro">
					<a>
						Sončni vzhod ob:{" "}
						{display.forecast.forecastday[0].astro.sunrise}
					</a>
					<a>
						Sončni zahod ob:{" "}
						{display.forecast.forecastday[0].astro.sunset}
					</a>
				</div>
			</div>
			<div className="remainingForecast">
				<a>Preostanek dneva:</a>
				<div className="scrollbar">
				{renderRemainingForecast(
					display.current.last_updated.slice(-5)
				)}
				</div>
			</div>
		</div>
	);
};

export default Today;
