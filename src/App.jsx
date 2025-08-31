import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Routes, NavLink } from "react-router-dom";

import api from "./api.json";
import "./App.css";
import Loading from "./loading/loading";

import Day from "./images/day.webp";
import Night from "./images/night.webp";

import home from "./buttons/home.svg";
import today from "./buttons/today.svg";
import forecast from "./buttons/forecast.svg";
import settings from "./buttons/settings.svg";
import feedback from "./buttons/feedback.svg";
import menu from "./buttons/menu.svg";

const Current = lazy(() => import("./current/current"));
const Today = lazy(() => import("./today/today"));
const Forecast = lazy(() => import("./forecast/forecast"));
const Feedback = lazy(() => import("./feedback/feedback"));
const Settings = lazy(() => import("./settings/settings"));

function App() {
    const [navbar, setNavClosed] = useState(true);
    const [data, setData] = useState(null);
    const [city, setCity] = useState(() => localStorage.getItem("city") || "");

    const toggleNav = useCallback(() => {
        setNavClosed((n) => !n);
        document.body.classList.toggle("small-nav");
        document.body.classList.toggle("avg-nav");
    }, []);

    useEffect(() => {
        const apply = () => {
            const currentHour = new Date().getHours();
            const body = document.body;
            body.style.backgroundImage =
                currentHour >= 6 && currentHour < 19
                    ? `url(${Day})`
                    : `url(${Night})`;
            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "center";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundAttachment = "fixed";
        };
        apply();
        const id = setInterval(apply, 1000 * 60 * 10);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (!city) {
            (async () => {
                try {
                    const ip = await (
                        await fetch("https://api.ipify.org?format=json")
                    ).json();
                    const location = await (
                        await fetch(`https://ipapi.co/${ip.ip}/json/`)
                    ).json();
                    if (location?.city) {
                        setCity(location.city);
                        const list = JSON.parse(
                            localStorage.getItem("cities") || "[]"
                        );
                        if (!list.includes(location.city)) {
                            localStorage.setItem(
                                "cities",
                                JSON.stringify([...list, location.city])
                            );
                        }
                        localStorage.setItem("city", location.city);
                    }
                } catch {}
            })();
        }
    }, [city]);

    useEffect(() => {
        if (!city) return;
        const abort = new AbortController();
        (async () => {
            try {
                const apiKey = "&key=" + api.name;
                const res = await fetch(
                    `https://api.weatherapi.com/v1/forecast.json?q=${encodeURIComponent(
                        city
                    )}&days=3${apiKey}`,
                    { signal: abort.signal }
                );
                if (!res.ok) throw new Error("Network");
                const json = await res.json();
                setData(json);
            } catch (e) {
                if (e.name !== "AbortError") console.error(e);
            }
        })();
        return () => abort.abort();
    }, [city]);

    if (!data) return <Loading />;

    return (
        <div>
            <Router>
                <nav aria-label="Primary">
                    <ul>
                        <NavLink to="/" style={{ textDecoration: "none" }}>
                            <li>
                                <img src={home} alt="home" />
                                {navbar ? null : <span>Trenutno</span>}
                            </li>
                        </NavLink>
                        <NavLink to="/today" style={{ textDecoration: "none" }}>
                            <li>
                                <img src={today} alt="today" />
                                {navbar ? null : <span>Danes</span>}
                            </li>
                        </NavLink>
                        <NavLink
                            to="/forecast"
                            style={{ textDecoration: "none" }}
                        >
                            <li>
                                <img src={forecast} alt="forecast" />
                                {navbar ? null : <span>Napoved</span>}
                            </li>
                        </NavLink>
                        <NavLink
                            to="/settings"
                            style={{ textDecoration: "none" }}
                        >
                            <li>
                                <img src={settings} alt="settings" />
                                {navbar ? null : <span>Nastavitve</span>}
                            </li>
                        </NavLink>
                    </ul>
                    <div className="bottom">
                        <NavLink
                            to="/feedback"
                            style={{ textDecoration: "none" }}
                        >
                            <li className="button">
                                <img src={feedback} alt="feedback" />
                                {navbar ? null : <span>Vaše mnenje</span>}
                            </li>
                        </NavLink>
                        <ul
                            style={{ listStyle: "none", margin: 0, padding: 0 }}
                        >
                            <li className="button" onClick={toggleNav}>
                                <img src={menu} alt="menu" />
                                {navbar ? null : <span>Skrči</span>}
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<Current data={data} />} />
                            <Route
                                path="/today"
                                element={<Today data={data} />}
                            />
                            <Route
                                path="/forecast"
                                element={<Forecast data={data} />}
                            />
                            <Route
                                path="/settings"
                                element={
                                    <Settings city={city} setCity={setCity} />
                                }
                            />
                            <Route path="/feedback" element={<Feedback />} />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </div>
    );
}

export default App;
