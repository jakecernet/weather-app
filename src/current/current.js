import { useState, useEffect } from "react";
import "./current.css";
import key from "../api.json";

function Current() {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const apiKey = "&key=" + key.name;
				const response = await fetch(
					"https://api.weatherapi.com/v1/current.json?q=" +
						"Ljubljana" +
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
		return null; // or render a loading state
	}

	return (
		<div>
			{
				(data.current.temp_c,
				data.current.condition.text,
				data.current.condition.icon)
			}
		</div>
	);
}

export default Current;
