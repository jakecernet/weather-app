import { useEffect, useState } from "react";
import "./forecast.css";
import key from "../api.json";

function Forecast() {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const apiKey = "&key=" + key.name;
				const response = await fetch(
					"https://api.weatherapi.com/v1/forecast.json?q=" +
						"Sydney" +
						"&days=3" +
						apiKey
				);
				const data = await response.json();
				setData(data);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	if (!data) {
		return null;
	}

	return <div className="display"></div>;
}

export default Forecast;
