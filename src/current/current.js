import { useState, useEffect } from "react";
import "./current.css";
import data from "../App";

const Current = (data = {data}) => {
	console.log(data);

	return (
		<div className="display">
			<div className="location">
				<a>{data.location.name},</a>
				<p>{data.location.country}</p>
			</div>
			<div className="temp">
				<a>{data.current.temp_c}°C </a>
				<p>( {data.current.temp_f}°F ) </p>
			</div>
			<div className="condition">
				<img
					src={data.current.condition.icon}
					alt={data.current.condition.text}
				/>
				<a>{data.current.condition.text}</a>
			</div>
			<div className="other">
				<div className="wind">
					<p className="other-title">Veter</p>
					<a>{data.current.wind_kph} km/h</a>
					<p>{data.current.wind_mph} mph</p>
					<p>{data.current.wind_dir}</p>
				</div>
				<div className="humidity">
					<p className="other-title">Vlažnost</p>
					<a>{data.current.humidity}%</a>
				</div>
				<div className="precipitation">
					<p className="other-title">Padavine</p>
					<a>{data.current.precip_mm} mm</a>
					<p>{data.current.precip_in} in</p>
				</div>
				<div className="uv">
					<p className="other-title">UV indeks</p>
					<a>{data.current.uv}</a>
				</div>
				<div className="visibility">
					<p className="other-title">Vidljivost</p>
					<a>{data.current.vis_km} km</a>
					<p>{data.current.vis_miles} milj/a</p>
				</div>
			</div>
		</div>
	);
}

export default Current;
