import React, { useState, useEffect } from "react";

//Bootstrap fo styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchForm from "./components/SearchForm";

function App() {

  //Defining variables & their states.
  const [apiKey, setApiKey] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [displayFavHeader, updateDisplayFavHeader] = useState(false);
  const [noResults, setNoResults] = useState(false);

 //Fetch API Key:
 const fetchApiKey = async () => {
  try {
    const response = await fetch('http://localhost:8080/api-key'); // Replace with the correct API endpoint on your server
    if (!response.ok) {
      throw new Error(`Error fetching API key: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Call fetchApiKey function:
useEffect(() => {
  console.log('useEffect called');
  fetchApiKey().then((fetchedApiKey) => {
    if (fetchedApiKey) {
      // Use the fetched API key for subsequent requests
      setApiKey(fetchedApiKey);
      //Test
      // console.log('API Key:', fetchedApiKey);
    } else {
      // Handle error or use a default key
      setApiKey('default_api_key');
    }
  });
}, []);






  // Main async function connecting to the backend server via port 8080.
  //Taking the searchTerm and mediaType as arguments to be passed to the server.
  const handleSearch = async ({ searchTerm, mediaType }) => {
    //Testing
    console.log("Search Term:", searchTerm);
    console.log("Media Type:", mediaType);
    try {
      // Fetch data from the express server on port 8080. URI function component solution
      //Courtesy of OpenAi.
      const response = await fetch(
        `http://localhost:8080/search?term=${encodeURIComponent(
          searchTerm
        )}&media=${mediaType}`,
        {
          headers: {
            'api-key': apiKey, // Use the API key obtained from the server
          },
        }
      );





      
      

      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response.status} ${response.statusText}`
        );
      }
      //Return fetched data.
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        // Set noResults to true when there are no results
        setNoResults(true);
      } else {
        setNoResults(false); // Reset to false if there are results
      }
      //Updating SearchResults variable with api data.
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  //Toggle switch for adding user favourites.
  const toggleFavorite = (result) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.trackId === result.trackId
    );

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.trackId !== result.trackId
      );
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, result];
      setFavorites(updatedFavorites);
      updateDisplayFavHeader(updatedFavorites.length > 0);
    }
  };

  //Delete favourites
  const handleDelete = (trackId) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.trackId !== trackId
    );
    setFavorites(updatedFavorites);
    updateDisplayFavHeader(updatedFavorites.length > 0);
  };

  //FrontEnd JSX
  return (
    <div className="App container">
      <SearchForm onSearch={handleSearch} />
      <div className="row">
        <div className="col-md-8">
          {searchResults && (
            <div>
              <h2>SEARCH RESULTS</h2>
              {noResults ? (
                <p>No results found for the selected media type.</p>
              ) : (
                // Render the search results when available
                <div className="row">
                  {searchResults.results.map((result, index) => (
                    <div key={index} className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{result.trackName}</h5>
                          <p className="card-text">{result.artistName}</p>
                          <a
                            href={result.trackViewUrl}
                            className="btn btn-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Details
                          </a>
                          <button
                            className={`btn ${
                              result.isFavorite
                                ? "btn-info"
                                : "btn-outline-info"
                            } mt-2`}
                            onClick={() => toggleFavorite(result)}
                          >
                            {result.isFavorite
                              ? "Remove from Favorites"
                              : "Add to Favorites"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="col-md-4">
          {displayFavHeader && favorites.length > 0 && (
            <div>
              <h2>FAVOURITES</h2>
              <ul>
                {favorites.map((favorite) => (
                  <li key={favorite.trackId} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{favorite.trackName}</h5>
                      <p className="card-text">{favorite.artistName}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(favorite.trackId)}
                      >
                        DELETE
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
