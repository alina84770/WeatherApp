import React, { useState, useEffect } from "react";
import loadingImage from "../assest/images/loading.gif";
import '../App.css';

function Weatherapp() {
    const [location, setlocation] = useState("");
    const [weatherData, setweatherData] = useState(null);
    const [query, setquery] = useState("");
    const [loading, setloading] = useState("false");

    useEffect(() => {

        setloading("true");
        fetch(`http://api.weatherapi.com/v1/current.json?key=033d4d209ec04554966135639241211&q=${location}`)
            .then((response) => response.json())
            .then((data) => {
                if (!data.error) {
                    setweatherData(data);  
                }
                setloading("false");
            })
        setlocation("");

    }, [query]);

    const clickHandler = () => {
        if (location) {
            setquery(location);
        }
    }

    return (
        <div className="container">
            <div className="weatherapp">
                <div>
                    <h1 className="heading">Weather App</h1>
                    <div className="input">
                        <input type="text" value={location} onChange={(e) => setlocation(e.target.value)} placeholder="Enter Location" />
                        <i class="fa-solid fa-magnifying-glass" onClick={clickHandler}></i>
                    </div>

                    {loading === "true" && <img className="loadingImage"
                        src={loadingImage}
                        alt="Loading..."
                    />}

                    {weatherData ?
                        <div className="showData">
                            <div>
                                <h2 class="locationName">{weatherData.location.name} , {weatherData.location.country}</h2>
                                <div className="weatherImage">
                                    <img src={weatherData.current.condition.icon}></img>
                                </div>
                                <div className="data">
                                    <h3>Temperature</h3>
                                    <h3>{weatherData.current.temp_c}°C</h3>
                                </div>
                                <div className="data">
                                    <h3>Humidity</h3>
                                    <h3>{weatherData.current.humidity}%</h3>
                                </div>
                                <div className="data">
                                    <h3>Wind Speed</h3>
                                    <h3>{weatherData.current.wind_kph} Km/h</h3>
                                </div>

                            </div>
                        </div> : ""
                    }
                </div>
            </div>
        </div>
    )

}

export default Weatherapp;