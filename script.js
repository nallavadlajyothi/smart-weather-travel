// ========================================
// CITY WEATHER DATA
// ========================================

const weatherData = {

    chennai: {
        city: "Chennai, India",
        temp: 31,
        condition: "Sunny",
        icon: "☀️",
        humidity: 68,
        wind: 14,
        visibility: 10,
        feels: 34
    },

    bangalore: {
        city: "Bangalore, India",
        temp: 25,
        condition: "Partly Cloudy",
        icon: "⛅",
        humidity: 72,
        wind: 10,
        visibility: 9,
        feels: 26
    },

    hyderabad: {
        city: "Hyderabad, India",
        temp: 29,
        condition: "Clear",
        icon: "🌤️",
        humidity: 55,
        wind: 12,
        visibility: 11,
        feels: 30
    },

    mumbai: {
        city: "Mumbai, India",
        temp: 28,
        condition: "Cloudy",
        icon: "☁️",
        humidity: 76,
        wind: 18,
        visibility: 8,
        feels: 31
    },

    delhi: {
        city: "Delhi, India",
        temp: 27,
        condition: "Clear",
        icon: "☀️",
        humidity: 48,
        wind: 9,
        visibility: 12,
        feels: 28
    },

    goa: {
        city: "Goa, India",
        temp: 29,
        condition: "Sunny",
        icon: "☀️",
        humidity: 65,
        wind: 13,
        visibility: 10,
        feels: 31
    },

    singapore: {
        city: "Singapore",
        temp: 30,
        condition: "Partly Cloudy",
        icon: "⛅",
        humidity: 78,
        wind: 11,
        visibility: 9,
        feels: 33
    },

    paris: {
        city: "Paris, France",
        temp: 21,
        condition: "Clear",
        icon: "🌤️",
        humidity: 57,
        wind: 8,
        visibility: 12,
        feels: 21
    }

};


// ========================================
// ELEMENTS
// ========================================

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const cityName =
    document.getElementById("cityName");

const weatherIcon =
    document.getElementById("weatherIcon");

const temperature =
    document.getElementById("temperature");

const condition =
    document.getElementById("condition");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const visibility =
    document.getElementById("visibility");

const feelsLike =
    document.getElementById("feelsLike");

const travelScore =
    document.getElementById("travelScore");

const travelMessage =
    document.getElementById("travelMessage");

const favoritesList =
    document.getElementById("favoritesList");

const themeBtn =
    document.getElementById("themeBtn");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

const notification =
    document.getElementById("notification");

const notificationText =
    document.getElementById(
        "notificationText"
    );


// ========================================
// SEARCH WEATHER
// ========================================

function searchWeather() {

    const city =
        cityInput.value
            .trim()
            .toLowerCase();

    if (city === "") {

        showNotification(
            "Please enter a city name."
        );

        return;
    }

    const data =
        weatherData[city];

    if (!data) {

        showNotification(
            "Weather data not available for this city."
        );

        return;
    }

    updateWeather(data);

    showNotification(
        "Weather updated for " + data.city
    );

}


// ========================================
// UPDATE WEATHER
// ========================================

function updateWeather(data) {

    cityName.textContent =
        data.city;

    weatherIcon.textContent =
        data.icon;

    temperature.textContent =
        data.temp + "°";

    condition.textContent =
        data.condition;

    humidity.textContent =
        data.humidity + "%";

    wind.textContent =
        data.wind + " km/h";

    visibility.textContent =
        data.visibility + " km";

    feelsLike.textContent =
        data.feels + "°";


    // Calculate travel score

    let score = 100;

    if (data.temp > 35) {
        score -= 15;
    }

    if (data.temp < 15) {
        score -= 10;
    }

    if (data.humidity > 75) {
        score -= 8;
    }

    if (data.wind > 20) {
        score -= 10;
    }

    travelScore.textContent =
        score;


    if (score >= 85) {

        travelMessage.textContent =
            "Today is a great day to explore! 🌴";

    } else if (score >= 70) {

        travelMessage.textContent =
            "Good conditions for a trip! ✈️";

    } else {

        travelMessage.textContent =
            "Consider planning indoor activities today. ☕";

    }


    generateForecast(data);

}


// ========================================
// FORECAST
// ========================================

function generateForecast(data) {

    const forecastGrid =
        document.getElementById(
            "forecastGrid"
        );

    const days = [
        "Today",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    const icons = [
        data.icon,
        "⛅",
        "☀️",
        "🌦️",
        "☀️"
    ];

    forecastGrid.innerHTML = "";

    days.forEach(
        function(day, index) {

            const max =
                data.temp +
                [0, 1, 2, -1, 1][index];

            const min =
                max - 5;

            forecastGrid.innerHTML += `

                <div class="forecast-card">

                    <div class="day">
                        ${day}
                    </div>

                    <div class="icon">
                        ${icons[index]}
                    </div>

                    <strong>
                        ${max}°C
                    </strong>

                    <p>
                        ${min}°C
                    </p>

                </div>

            `;

        }
    );

}


// ========================================
// SEARCH EVENTS
// ========================================

searchBtn.addEventListener(
    "click",
    searchWeather
);

cityInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            searchWeather();
        }

    }
);


// ========================================
// FAVORITES
// ========================================

let favorites =
    JSON.parse(
        localStorage.getItem(
            "weatherFavorites"
        )
    ) || [];


function toggleFavorite(button, place) {

    if (favorites.includes(place)) {

        favorites =
            favorites.filter(
                item => item !== place
            );

        button.textContent = "♡";

        button.classList.remove(
            "active"
        );

        showNotification(
            place + " removed from favorites."
        );

    } else {

        favorites.push(place);

        button.textContent = "♥";

        button.classList.add(
            "active"
        );

        showNotification(
            place + " added to favorites!"
        );

    }

    localStorage.setItem(
        "weatherFavorites",
        JSON.stringify(favorites)
    );

    displayFavorites();

}


// ========================================
// DISPLAY FAVORITES
// ========================================

function displayFavorites() {

    if (favorites.length === 0) {

        favoritesList.innerHTML = `

            <p class="empty-message">
                No favorite destinations yet.
                Click ♡ on a destination to save it.
            </p>

        `;

        return;
    }

    favoritesList.innerHTML = "";

    favorites.forEach(function(place) {

        favoritesList.innerHTML += `

            <div
                style="
                    background:white;
                    padding:18px;
                    margin-bottom:10px;
                    border-radius:12px;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    border:1px solid #e5eaf1;
                "
            >

                <strong>
                    ❤️ ${place}
                </strong>

                <button
                    onclick="searchFavorite('${place}')"
                    style="
                        border:none;
                        background:#eaf4ff;
                        color:#2b8ef3;
                        padding:8px 12px;
                        border-radius:7px;
                        cursor:pointer;
                    "
                >
                    View Weather
                </button>

            </div>

        `;

    });

}


// ========================================
// SEARCH FAVORITE
// ========================================

function searchFavorite(place) {

    const data =
        weatherData[
            place.toLowerCase()
        ];

    if (data) {

        updateWeather(data);

        document
            .getElementById("weather")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

}


// ========================================
// PLAN TRIP
// ========================================

function planTrip(place) {

    showNotification(
        "Trip planner opened for " +
        place +
        " ✈️"
    );

}


// ========================================
// START PLANNING
// ========================================

function startPlanning() {

    showNotification(
        "Choose a destination to start planning! 🧳"
    );

    document
        .getElementById("travel")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// NOTIFICATION
// ========================================

let notificationTimer;

function showNotification(message) {

    notificationText.textContent =
        message;

    notification.classList.add(
        "show"
    );

    clearTimeout(
        notificationTimer
    );

    notificationTimer =
        setTimeout(
            function() {

                notification.classList.remove(
                    "show"
                );

            },
            3000
        );

}


// ========================================
// DARK MODE
// ========================================

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );

        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeBtn.textContent = "☀️";

            localStorage.setItem(
                "weatherTheme",
                "dark"
            );

        } else {

            themeBtn.textContent = "🌙";

            localStorage.setItem(
                "weatherTheme",
                "light"
            );

        }

    }
);


// Load theme

if (
    localStorage.getItem(
        "weatherTheme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent = "☀️";

}


// ========================================
// MOBILE MENU
// ========================================

menuBtn.addEventListener(
    "click",
    function() {

        navLinks.classList.toggle(
            "show"
        );

    }
);


// ========================================
// DATE
// ========================================

const dateElement =
    document.getElementById(
        "weatherDate"
    );

const today =
    new Date();

dateElement.textContent =
    today.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            month: "long",
            day: "numeric"
        }
    );


// ========================================
// INITIAL LOAD
// ========================================

updateWeather(
    weatherData.chennai
);

displayFavorites();
