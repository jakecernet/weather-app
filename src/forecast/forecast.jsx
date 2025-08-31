import React, { useMemo } from "react";
import "./forecast.css";

const Forecast = React.memo(({ data }) => {
	const display = data;
	if (!display) return null;

	const dayNames = [
		"Nedelja",
		"Ponedeljek",
		"Torek",
		"Sreda",
		"Četrtek",
		"Petek",
		"Sobota",
	];
	const getDayName = (d) => {
		const [y, m, day] = d.split("-").map(Number);
		return dayNames[new Date(y, m - 1, day).getDay()];
	};

	const hourlyByIndex = useMemo(() => {
		const days = display?.forecast?.forecastday || [];
		return days.map((fd) =>
			(fd.hour || []).map((h) => (
				<div className="hour" key={h.time}>
					<p className="hourDisplay a-text">{h.time.slice(-5)}</p>
					<p className="a-text">{h.temp_c}°C</p>
					<img
						src={h.condition.icon}
						alt={h.condition.text}
						loading="lazy"
					/>
				</div>
			))
		);
	}, [display]);

	return (
		<div className="displayForecast fade-in">
			<p className="a-text">Napoved za {display.location.name}:</p>
			<div className="days">
				{display.forecast.forecastday.map((d, idx) => (
					<div className="day card" key={d.date}>
						<p className="a-text">{getDayName(d.date)}</p>
						<img
							src={d.day.condition.icon}
							alt={d.day.condition.text}
							loading="lazy"
						/>
						<p className="a-text">{d.day.avgtemp_c}°C</p>
						<p>{d.day.totalprecip_mm} mm</p>
						<div className="astro">
							<p className="a-text">Sončni vzhod ob: {d.astro.sunrise}</p>
							<p className="a-text">Sončni zahod ob: {d.astro.sunset}</p>
						</div>
						<div className="hourly">
							<p className="a-text">Vreme po urah:</p>
							<div className="hours">{hourlyByIndex[idx]}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
});

export default Forecast;
						