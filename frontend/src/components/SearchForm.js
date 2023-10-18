//Main search page

//Importing and using state
import React, { useState } from "react";

//Search component with destructured props.
function SearchForm({ onSearch }) {
  //Setting variable states.
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState("");

  //Asynchronous fetch on the submit (Search Button).
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Testing to see if it works
      console.log("Search Term:", searchTerm);
      console.log("Media Type:", mediaType);

      // Construct the search query URL based on user input
      const baseURL = `http://localhost:8080/search?term=${encodeURIComponent(searchTerm)}&media=${mediaType}`;
      //Return fetch data json object to reponse
      const response = await fetch(baseURL);
      console.log(response);
      
      //error handling
      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response.status} ${response.statusText}`
        );
      }
      // Relevent data extracted from the response object and passed back into the onSearch prop
      onSearch({ searchTerm, mediaType });
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., display an error message to the user
    }
  };
  // JSX with form and selection dropdown updating state variables based on user input and search button to activate
  //handleSubmit function above. All this data gets passed back into the prop for delivery on the FrontEnd.
  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter search term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="music">Music</option>
              <option value="musicVideo">Music Videos</option>
              <option value="movie">Movies</option>
              <option value="podcast">Podcasts</option>
              <option value="audiobook">Audiobooks</option>
              <option value="software">Applications</option>
              <option value="tvShow">TV-Show</option>
              <option value="ebook">ebook</option>
              <option value="shortFilm">Short Film</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
