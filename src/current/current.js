import { useState, useEffect } from "react";
import "./current.css";

const Current = (data = { data }) => {
	const [display, setDisplay] = useState(data.data);

	if (!display) {
		return null;
	}

	return (
		<div className="display">
			<div className="location">
				<a>{display.location.name},</a>
				<p>{display.location.country}</p>
			</div>
			<div className="temperatura">
				<a>{display.current.temp_c}°C,</a>
				<div className="condition">
					<img
						src={display.current.condition.icon}
						alt={display.current.condition.text}
					/>
					<a>{display.current.condition.text}</a>
				</div>
			</div>
		</div>
	);
};

export default Current;
