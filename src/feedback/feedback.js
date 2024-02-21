import { useState } from "react";
import "./feedback.css";
import star from "../buttons/star.svg";

function Feedback() {
	const [feedback, setFeedback] = useState(0);

	const sendFeedback = (rating) => {
		setFeedback(rating);
		console.log("Feedback sent: " + rating);
	};

	return (
		<div className="feedback">
			<h1>Feedback</h1>
			<p>
				If you like the app, please leave me a star or follow me on
				GitHub
			</p>
			<p>
				My GitHub:{" "}
				<a href="https://github.com/jakecernet">@jakecernet</a>
			</p>
			<div className="survey">
				<h2>Rate the app</h2>
				<ul>
					<li onClick={() => sendFeedback(5)}>
						<img src={star} alt="star" id="star5" />
						<li onClick={() => sendFeedback(4)}>
							<img src={star} alt="star" id="star4" />
							<li onClick={() => sendFeedback(3)}>
								<img src={star} alt="star" id="star3" />
								<li onClick={() => sendFeedback(2)}>
									<img src={star} alt="star" id="star2" />
									<li onClick={() => sendFeedback(1)}>
										<img src={star} alt="star" id="star1" />
									</li>
								</li>
							</li>
						</li>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Feedback;
