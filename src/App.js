import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState("");

  const fetchMeals = () => {
    if (!query) return;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          setMeals(data.meals);
          setSelectedMeal(null);
          setError("");
        } else {
          setMeals([]);
          setSelectedMeal(null);
          setError("Sorry 😔 No recipes found!");
        }
      })
      .catch(() => {
        setMeals([]);
        setSelectedMeal(null);
        setError("Failed ❌ to fetch data.");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchMeals();
  };

  return (
    <div className="App">
      <h1>🍴 Recipe Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={fetchMeals}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!selectedMeal && meals.length > 0 && (
        <div>
          <h2>
            Available Recipes 🥗 for:{" "}
            <span style={{ color: "#6c5ce7" }}>{query}</span>
          </h2>
          <div className="recipe-grid">
            {meals.map((meal) => (
              <div className="recipe-card" key={meal.idMeal}>
                <h3>{meal.strMeal}</h3>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <p>
                  <strong>Category:</strong> {meal.strCategory}
                </p>
                <p>
                  <strong>Area:</strong> {meal.strArea}
                </p>
                <button
                  className="details-btn"
                  onClick={() => setSelectedMeal(meal)}
                >
                  🍲 View Recipe Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMeal && (
        <div className="recipe-details">
          <h2>{selectedMeal.strMeal}</h2>

          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />

          <p className="info">
            <strong>Category:</strong> {selectedMeal.strCategory}
          </p>
          <p className="info">
            <strong>Area:</strong> {selectedMeal.strArea}
          </p>

          <p>{selectedMeal.strInstructions}</p>

          <a
            href={selectedMeal.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="youtube-btn"
          >
            ▶️ Watch on YouTube
          </a>

          <br />
          <br />

          <button onClick={() => setSelectedMeal(null)} className="back-btn">
            ⬅️ Back to all recipes
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
