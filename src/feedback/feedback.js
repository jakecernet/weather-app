import { useState } from "react";
import "./feedback.css";

function Feedback() {
	const [feedback, setFeedback] = useState(0);

	const sendFeedback = (rating) => {
		setFeedback(rating);
		// Send feedback to the server
	}

	return (
		<div className="feedback">
			<h1>Feedback</h1>
			<p>
				If you like the app, please leave me a star or follow me on
				GitHub
			</p>
			<div className="survey">
				<h2>Rate the app</h2>
				<ul>
					<li onClick={() => sendFeedback(1)}>⭐️</li>
					<li onClick={() => sendFeedback(2)}>⭐️⭐️</li>
					<li onClick={() => sendFeedback(3)}>⭐️⭐️⭐️</li>
					<li onClick={() => sendFeedback(4)}>⭐️⭐️⭐️⭐️</li>
					<li onClick={() => sendFeedback(5)}>⭐️⭐️⭐️⭐️⭐️</li>
				</ul>
			</div>
		</div>
	);
}

export default Feedback;
