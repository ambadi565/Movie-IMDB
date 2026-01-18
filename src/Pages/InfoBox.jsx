
function InfoBox({ data }) {
    return(
        <div className='movie-info-container'>
            <div>
                <img className="poster" src={data?.Poster} alt={"poster of" + data?.Title}></img>
            </div>
            
            <div className="movie-details">
                <a>Movie Name : <span>{data?.Title}</span></a><br></br>
                <a>Director : <span>{data?.Director}</span></a><br></br>
                <a>Rating : <span>{data?.imdbRating}</span></a><br></br>
                <a>Cast : <span>{data?.Actors}</span></a><br></br>
                <a>Awards : <span>{data?.Awards}</span></a><br></br>
            </div>
        </div>
    )
}
export default InfoBox;