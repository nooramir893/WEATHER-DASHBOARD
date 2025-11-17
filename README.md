# 🌤️ Weather Dashboard — Professional UI

A modern, responsive **Weather Dashboard Web App** built using **HTML, CSS, and JavaScript**, powered by the **OpenWeatherMap API**.
Users can search for any city and instantly see live weather data in a clean, card-based UI.

---

## 🚀 Features

* 🔍 **City Search Bar**
* 📦 **Weather Cards** (Temperature, Humidity, Wind Speed, Conditions)
* 🎨 **Gradient Background Effects** based on weather
* 📱 **Fully Responsive Design**
* ⚠️ **Error Handling** (Invalid cities or network issues)
* 🌐 **Real-Time Weather Data** from OpenWeatherMap API

---

## 📁 Project Structure

```
/weather-dashboard
│
├── index.html
├── style.css
├── script.js

```

---

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript (ES6)**
* **OpenWeatherMap API**

---

## 🔑 API Key Setup

This project uses OpenWeatherMap API key:

```
73a16595fc6c4cdac0c93f16ac513d7a
```

The key is already included in `script.js` file under:

```js
const API_KEY = "73a16595fc6c4cdac0c93f16ac513d7a";
```

No extra setup required.

---

# 🧩 How I Built This Project (Step-by-Step)

---

## **1️⃣ Created the Project Folder**

I started by creating a new folder:

```
weather-dashboard/
```

Inside it, I created three main files:

* `index.html`
* `style.css`
* `script.js`

---

## **2️⃣ Built the HTML Structure**

Inside **index.html**, I created:

* A clean UI layout
* A search bar at the top
* A container for weather cards
* Linked CSS and JS files

This built the basic skeleton of the app.

---

## **3️⃣ Designed the UI Using CSS**

In **style.css**, I added:

* Responsive layout
* Gradient background
* Weather cards
* Glass-effect card styles
* Hover animations
* Mobile-friendly spacing

This transformed the plain layout into a modern dashboard UI.

---

## **4️⃣ Generated an API Key**

I visited:

🔗 [https://openweathermap.org/api](https://openweathermap.org/api)

Then created an account → generated this API key:

```
73a16595fc6c4cdac0c93f16ac513d7a
```

---

## **5️⃣ Connected JavaScript with the API**

In **script.js**, I wrote:

* Fetch request to OpenWeatherMap
* Parsing JSON weather data
* Updating UI dynamically
* Displaying cards with:

  * temperature
  * humidity
  * wind speed
  * weather icon
* Error handling for wrong city names

This step added the **functionality**.

---

## **6️⃣ Implemented Background Effects**

Based on weather conditions (clear, cloudy, rainy, etc.), the background changes with CSS gradients.

This created a more professional, dynamic UI.

---

## **7️⃣ Added Error Messages**

If the user enters an invalid city:

* A clean error card appears
* UI clears old data
* Users understand what went wrong

---

## **8️⃣ Final Testing**

I tested the app by searching:

* Karachi
* Lahore
* London
* New York

Everything worked perfectly.

---

# ▶️ How to Run Locally

1. Download the project folder.
2. Open `index.html` in any browser.
3. Type a city name in the search bar.
4. View live weather instantly!

---

# 🙌 Author

**Noor Ul Ain Amir**
Built with using HTML, CSS, JavaScript and OpenWeatherMap API.

---
