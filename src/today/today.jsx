import { useMemo } from "react";
import React from "react";
import "./today.css";

const conditionsMap = {
    "Partly cloudy": "Delno oblačno",
    "Sunny": "Sončno",
    "Clear": "Jasno",
    "Overcast": "Pretežno oblačno",
    "Patchy rain possible": "Možnost padavin",
    "Patchy rain nearby": "Rahle padavine",
    "Patchy light rain": "Rahle padavine",
    "Moderate or heavy rain shower": "Močni nalivi",
    "Light rain shower": "Rahli nalivi",
    "Moderate rain": "Zmerna deževja",
    "Light rain": "Rahlo deževje",
    "Heavy rain": "Močno deževje",
    "Patchy light drizzle": "Rahlo rosni dež",
    "Light drizzle": "Rahel rosni dež",
    "Freezing fog": "Zmrzal",
    "Fog": "Megla",
    "Mist": "Izredno megleno",
    "Patchy light snow": "Rahel sneg",
    "Light snow": "Rahel sneg",
    "Patchy moderate snow": "Zmerna sneženja",
    "Moderate snow": "Zmerno sneženje",
    "Patchy heavy snow": "Močno sneženje",
    "Heavy snow": "Močno sneženje",
    "Ice pellets": "Ledene kroglice",
    "Light sleet": "Rahel dež in sneg",
    "Moderate or heavy sleet": "Močen dež in sneg",
    "Light snow showers": "Rahli snežni nalivi",
    "Moderate or heavy snow showers": "Močni snežni nalivi",
    "Patchy light snow with thunder": "Rahel sneg z grmenjem",
    "Moderate or heavy snow with thunder": "Močen sneg z grmenjem",
    "Patchy light sleet": "Rahel dež in sneg",
    "Moderate or heavy sleet showers": "Močni dež in sneg",
    "Thundery outbreaks": "Neurje",
    "Blowing snow": "Piha sneg",
    "Blizzard": "Metlovi",
    "Frost": "Zmrzal",
};
const translateCondition = (c) => conditionsMap[c] || c;

const Today = React.memo(({ data }) => {
    if (!data) return null;
    const display = data;

    const remaining = useMemo(() => {
        const currentHour = display.current.last_updated.slice(-5);
        return display.forecast.forecastday[0].hour
            .filter((h) => h.time.slice(-5) > currentHour)
            .map((hour) => (
                <div className="remainingHour card fade-in" key={hour.time}>
                    <p className="a-text">{hour.time.slice(-5)}</p>
                    <p className="a-text">{hour.condition.text}</p>
                    <img
                        src={hour.condition.icon}
                        alt={hour.condition.text}
                        loading="lazy"
                    />
                    <p className="a-text">{hour.temp_c}°C</p>
                </div>
            ));
    }, [display]);

    return (
        <div className="display fade-in">
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
                    <div className="scrollbar">{remaining}</div>
                    <p style={{ color: "white" }} className="navodilo">
                        (Pritisni Shift za vodoravno premikanje)
                    </p>
                </div>
            </div>
        </div>
    );
});

export default Today;
