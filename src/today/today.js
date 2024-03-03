import { useState, useEffect } from "react";
import "./today.css";

const Today = (data = { data }) => {
	const [display, setDisplay] = useState(data.data);

	useEffect(() => {
		setDisplay(data.data);
	}, [data]);

	const setMain = (hour) => {
		setDisplay({
			...display,
			current: {
				...display.current,
				temp_c: hour.temp_c,
				temp_f: "N/A ",
				condition: {
					...display.current.condition,
					text: hour.condition.text,
					icon: hour.condition.icon,
				},
			},
		});
	};

	const translateCondition = (condition) => {
		switch (condition) {
			case "Partly cloudy":
				return "Delno oblačno";
			case "Sunny":
				return "Sončno";
			case "Clear":
				return "Jasno";
			case "Overcast":
				return "Pretežno oblačno";
			case "Patchy rain possible":
				return "Možnost padavin";
			case "Patchy light rain":
				return "Rahle padavine";
			case "Moderate or heavy rain shower":
				return "Močni nalivi";
			case "Light rain shower":
				return "Rahli nalivi";
			case "Moderate rain":
				return "Zmerna deževja";
			case "Light rain":
				return "Rahlo deževje";
			case "Heavy rain":
				return "Močno deževje";
			case "Patchy light drizzle":
				return "Rahlo rosni dež";
			case "Light drizzle":
				return "Rahel rosni dež";
			case "Freezing fog":
				return "Zmrzal";
			case "Fog":
				return "Megla";
			case "Mist":
				return "Izredno megleno";
			case "Patchy light snow":
				return "Rahel sneg";
			case "Light snow":
				return "Rahel sneg";
			case "Patchy moderate snow":
				return "Zmerna sneženja";
			case "Moderate snow":
				return "Zmerno sneženje";
			case "Patchy heavy snow":
				return "Močno sneženje";
			case "Heavy snow":
				return "Močno sneženje";
			case "Ice pellets":
				return "Ledene kroglice";
			case "Light sleet":
				return "Rahel dež in sneg";
			case "Moderate or heavy sleet":
				return "Močen dež in sneg";
			case "Light snow showers":
				return "Rahli snežni nalivi";
			case "Moderate or heavy snow showers":
				return "Močni snežni nalivi";
			case "Patchy light snow with thunder":
				return "Rahel sneg z grmenjem";
			case "Moderate or heavy snow with thunder":
				return "Močen sneg z grmenjem";
			case "Patchy light sleet":
				return "Rahel dež in sneg";
			case "Moderate or heavy sleet showers":
				return "Močni dež in sneg";
			case "Thundery outbreaks":
				return "Neurje";
			case "Blowing snow":
				return "Piha sneg";
			case "Blizzard":
				return "Metlovi";
			case "Frost":
				return "Zmrzal";
			default:
				return condition;
		}
	};

	const translateDay = (day) => {
		switch (day) {
			case "Partly cloudy":
				return "Delno oblačno";
			case "Sunny":
				return "Sončno";
			case "Clear":
				return "Jasno";
			case "Overcast":
				return "Pretežno oblačno";
			case "Patchy rain possible":
				return "Možnost padavin";
			case "Patchy light rain":
				return "Rahle padavine";
			case "Moderate or heavy rain shower":
				return "Močni nalivi";
			case "Light rain shower":
				return "Rahli nalivi";
			case "Moderate rain":
				return "Zmerna deževja";
			case "Light rain":
				return "Rahlo deževje";
			case "Heavy rain":
				return "Močno deževje";
			case "Patchy light drizzle":
				return "Rahlo rosni dež";
			case "Light drizzle":
				return "Rahel rosni dež";
			case "Freezing fog":
				return "Zmrzal";
			case "Fog":
				return "Megla";
			case "Mist":
				return "Izredno megleno";
			case "Patchy light snow":
				return "Rahel sneg";
			case "Light snow":
				return "Rahel sneg";
			case "Patchy moderate snow":
				return "Zmerna sneženja";
			case "Moderate snow":
				return "Zmerno sneženje";
			case "Patchy heavy snow":
				return "Močno sneženje";
			case "Heavy snow":
				return "Močno sneženje";
			case "Ice pellets":
				return "Ledene kroglice";
			case "Light sleet":
				return "Rahel dež in sneg";
			case "Moderate or heavy sleet":
				return "Močen dež in sneg";
			case "Light snow showers":
				return "Rahli snežni nalivi";
			case "Moderate or heavy snow showers":
				return "Močni snežni nalivi";
			case "Patchy light snow with thunder":
				return "Rahel sneg z grmenjem";
			case "Moderate or heavy snow with thunder":
				return "Močen sneg z grmenjem";
			case "Patchy light sleet":
				return "Rahel dež in sneg";
			case "Moderate or heavy sleet showers":
				return "Močni dež in sneg";
			case "Thundery outbreaks":
				return "Neurje";
			case "Blowing snow":
				return "Piha sneg";
			case "Blizzard":
				return "Metlovi";
			case "Frost":
				return "Zmrzal";
			default:
				return day;
		}
	};

	const renderRemainingForecast = (currentHour) => {
		return display.forecast.forecastday[0].hour.map((hour) => {
			if (hour.time.slice(-5) > currentHour) {
				return (
					<div
						className="remainingHour"
						onClick={() => setMain(hour)}>
						<a>{hour.time.slice(-5)}</a>
						<a>{translateDay(hour.condition.text)}</a>
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
				<h1>Danes:</h1>
				<div className="location">
					<a>{display.location.name}</a>
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
					<a>{translateCondition(display.current.condition.text)}</a>
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
