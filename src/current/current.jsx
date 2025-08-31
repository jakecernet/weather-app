import React from "react";
import "./current.css";

const conditionMap = {
    Sunny: "Sončno",
    Clear: "Jasno",
    "Partly cloudy": "Delno oblačno",
    Cloudy: "Oblačno",
    Overcast: "Pretežno oblačno",
    Mist: "Megla",
    "Patchy rain possible": "Možni padavini",
    "Patchy snow possible": "Možen sneg",
    "Patchy sleet possible": "Možen dež s snegom",
    "Patchy freezing drizzle possible": "Možna poledica",
    "Thundery outbreaks possible": "Možni nevihtni izbruhi",
    "Blowing snow": "Sneženje",
    Blizzard: "Snežni vihar",
    Fog: "Megla",
    "Freezing fog": "Zmrznjena megla",
    "Patchy light drizzle": "Rahel dež",
    "Light drizzle": "Rahel dež",
    "Freezing drizzle": "Zmrznjen dež",
    "Heavy freezing drizzle": "Močan zmrznjen dež",
    "Patchy light rain": "Rahel dež",
    "Light rain": "Rahel dež",
    "Moderate rain at times": "Občasno zmerno deževno",
    "Moderate rain": "Zmerno deževno",
    "Heavy rain at times": "Občasno močno deževno",
    "Heavy rain": "Močno deževno",
    "Light freezing rain": "Rahel zmrznjen dež",
    "Moderate or heavy freezing rain": "Zmerno ali močno zmrznjen dež",
    "Light sleet": "Rahel dež s snegom",
    "Moderate or heavy sleet": "Zmerno ali močen dež s snegom",
    "Patchy light snow": "Rahel sneg",
    "Light snow": "Rahel sneg",
    "Patchy moderate snow": "Zmerno sneženje",
    "Moderate snow": "Zmerno sneženje",
};

const windMap = {
    N: "Severno",
    NNE: "Severovzhodno",
    NE: "Severovzhodno",
    ENE: "Severovzhodno",
    E: "Vzhodno",
    ESE: "Jugovzhodno",
    SE: "Jugovzhodno",
    SSE: "Jugovzhodno",
    S: "Južno",
    SSW: "Jugozahodno",
    SW: "Jugozahodno",
    WSW: "Jugozahodno",
    W: "Zahodno",
    WNW: "Severozahodno",
    NW: "Severozahodno",
    NNW: "Severozahodno",
};

const trCond = (c) => conditionMap[c] || c;
const trWind = (w) => windMap[w] || w;

const Current = React.memo(({ data }) => {
    const display = data;
    if (!display) return null;
    return (
        <div className="displayCurrent fade-in">
            <div className="basic">
                <div className="location">
                    <span>{display.location.name},</span>
                    <p>{display.location.country}</p>
                </div>
                <div className="temperatura">
                    <span>
                        {display.current.temp_c}°C{" "}
                        <span>({display.current.temp_f}°F)</span>
                    </span>
                    <p>Občutek kot {display.current.feelslike_c}°C</p>
                    <div className="condition">
                        <img
                            src={display.current.condition.icon}
                            alt={display.current.condition.text}
                            loading="lazy"
                        />
                        <span>{trCond(display.current.condition.text)}</span>
                    </div>
                </div>
            </div>
            <div className="other">
                <a>
                    Veter: {display.current.wind_kph} km/h <br />
                    {trWind(display.current.wind_dir)}
                </a>
                <a>{display.current.humidity}% vlažnost</a>
                <a>Vidljivost: {display.current.vis_km} km</a>
            </div>
            <div className="lastUpdated">
                <p>
                    Zadnja posodobitev:{" "}
                    {display.current.last_updated.split(" ")[1]}
                </p>
            </div>
        </div>
    );
});

export default Current;
