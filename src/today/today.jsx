import { useState, useEffect } from "react";
import "./today.css";

//eslint-disable-next-line
const Today = (data = { data }) => {
	const [display, setDisplay] = useState(data.data);

	useEffect(() => {
		setDisplay(data.data);
	}, [data]);

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
			case "Patchy rain nearby":
				return "Rahle padavine";
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

	const renderRemainingForecast = (currentHour) => {
		//eslint-disable-next-line
		return display.forecast.forecastday[0].hour.map((hour) => {
			if (hour.time.slice(-5) > currentHour) {
				return (
					<div className="remainingHour">
						<p className="a-text">{hour.time.slice(-5)}</p>
						<p className="a-text">{hour.condition.text}</p>
						<img
							src={hour.condition.icon}
							alt={hour.condition.text}
						/>
						<p className="a-text">{hour.temp_c}°C</p>
					</div>
				);
			}
		});
	};

	return (
		<div className="display">
			<h1>Danes:</h1>
			<div className="vodoravno">
				<div>
					<div className="location">
						<p className="a-text">{display.location.name}</p>
						<p>{display.location.country}</p>
					</div>
					<div className="temp">
						<p className="a-text">{display.current.temp_c}°C</p>
						<p>( {display.current.temp_f}°F )</p>
					</div>
					<div className="condition">
						<img
							src={display.current.condition.icon}
							alt={display.current.condition.text}
						/>
						<p className="a-text">
							{translateCondition(display.current.condition.text)}
						</p>
					</div>
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
				</div>
				<div className="remainingForecast">
					<p className="a-text">Preostanek dneva:</p>
					<div className="scrollbar">
						{renderRemainingForecast(
							display.current.last_updated.slice(-5)
						)}
					</div>
					<p style={{ color: "white"}} className="navodilo">
						(Pritisni Shift za vodoravno premikanje)
					</p>
				</div>
			</div>
		</div>
	);
};

export default Today;
