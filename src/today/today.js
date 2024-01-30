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
			<div className="top">
				<div className="topLeft">
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
				</div>
				<div className="remainingForecast">
					{renderRemainingForecast(
						display.current.last_updated.slice(-5)
					)}
				</div>
			</div>
			<div className="bottomLeft">
				<div className="astro">
					<div className="sunrise">
						<a>
							Sončni vzhod ob:{" "}
							{display.forecast.forecastday[0].astro.sunrise}
						</a>
					</div>
					<div className="sunset">
						<a>
							Sončni zahod ob:{" "}
							{display.forecast.forecastday[0].astro.sunset}
						</a>
					</div>
					<div className="moonphase">
						<a>
							Lunina mena:{" "}
							{display.forecast.forecastday[0].astro.moon_phase}
						</a>
					</div>
					<div className="sunPath">
						<a>
							Položaj sonca:{" "}
							{display.forecast.forecastday[0].astro.sunrise}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Today;
