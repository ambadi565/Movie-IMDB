import { useState, useRef } from 'react'
import Search from "../Components/Search"
import InfoBox from "./InfoBox"


function Menu() {

  const [movie, useMovie] = useState();
  const [movieName, setMovieName] = useState("");
  const inputRef = useRef(null);
  const [isPage2, setIsPage2] = useState(false);

  function page2() {
    const name = inputRef.current.value.trim();
    if(!name) return;

    setMovieName(name);
    setIsPage2(true);
    movieResponse(name);
  }

  const movieResponse = async (name) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieName: name })
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.error || "Failed to fetch movie data");
      }

      console.log("Movie Data:", data);
      useMovie(data);
    }
    catch (error) {
      console.error("Error fetching API:", error);
    }
  }



    return(
    <div className={`container ${isPage2 ? "page-2" : ""}`}>

      <div><h1>Movie <span className="imdb">IMDB</span></h1></div>
      <div className='input-box input-box-2'>
        <input ref={inputRef} type="text" placeholder="Search for movies, series..." />
        <button className='search-button search-button-2' onClick={page2}><Search /></button>
      </div>

      <InfoBox data={movie}/>
      
    </div>
    )
}

export default Menu