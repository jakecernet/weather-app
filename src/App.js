import { useState } from "react";
import "./App.css";

function App() {
	let navClosed = false;

	let [navbar, setNavClosed] = useState(navClosed);

	function toggleNav() {
		setNavClosed(!navbar);
		document.body.classList.toggle("small-nav");
		document.body.classList.toggle("avg-nav");
	}

	return (
		<div>
			<nav>
				<ul>
					<li>
						<i className="fas fa-home"></i>
						{navbar ? null : <a>Trenutno</a>}
					</li>
					<li>
						<i className="fas fa-user"></i>
						{navbar ? null : <a>Napoved</a>}
					</li>
					<li>
						<i className="fas fa-envelope"></i>
						{navbar ? null : <a>Vaše mnenje</a>}
					</li>
				</ul>
				<div className="bottom">
					<li>
						<i className="fas fa-cog"></i>
						{navbar ? null : <p>Nastavitve</p>}
					</li>
					<li className="button" onClick={toggleNav}>
						<i className="fas fa-bars"></i>
            {navbar ? null : <p>Skrči</p>}
					</li>
				</div>
			</nav>
			<div className="container">
				<h1>My React App</h1>
				<p>This is my first React App</p>
			</div>
		</div>
	);
}

export default App;
