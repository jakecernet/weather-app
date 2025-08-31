import { useState, memo } from "react";
import "./feedback.css";
import star from "../buttons/star.svg";

const Feedback = memo(() => {
    const [feedback, setFeedback] = useState(0);

    const sendFeedback = (rating) => {
        setFeedback(rating);
        console.log("Feedback sent: " + rating);
    };

    return (
        <div className="feedback fade-in">
            <h1>Feedback</h1>
            <p>
                If you like the app, please leave me a star or follow me on
                GitHub.
            </p>
            <p>
                My GitHub:{" "}
                <a href="https://github.com/jakecernet">@jakecernet</a>
            </p>
            <div className="survey">
                <h2>Rate the app ( {feedback || "-"} )</h2>
                <ul>
                    {[1, 2, 3, 4, 5]
                        .map((n) => (
                            <li
                                key={n}
                                onClick={() => sendFeedback(n)}
                                aria-label={`ocena ${n}`}
                            >
                                <img
                                    src={star}
                                    alt={`star ${n}`}
                                    id={`star${n}`}
                                />
                            </li>
                        ))
                        .reverse()}
                </ul>
            </div>
        </div>
    );
});

export default Feedback;
