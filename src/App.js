import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"

function App() {


  const [data, setData] = useState()
  const [value, setValue] = useState()
  const [search, setSearch] = useState()
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=c0dc001c2859affa55e955a8cb563d8a")
      .then(res => res.json())
      .then(res => { setData(res.results); setValue(res.results) })
      .catch(error => console.log(error, " Occured errror"))


  }, [])

  console.log(data, "dataaa")
  console.log(value, "valueeeeeeee")




  function HandleSearch(e) {



    let temp = e.target.value
    setSearch(temp)

    console.log(temp, "temp")
    if (temp) {

      let Results = value.filter(i => i.original_title.toLowerCase().trim().includes(temp.toLowerCase().trim()))
      console.log(Results, "Reslts")

      Results ? setData(Results) : setData([])
    }
    else {

      setData(value)
    }



  }


  function HandleClear() {

    setSearch("")
    setData(value)

  }



  function handleMovieClick(movie) {
    setSelectedMovie(movie);
  }

  function closeModal() {
    setSelectedMovie(null);
  }


  return (
    <div className="App">

      <h2 id="Title">MovieApp</h2><br />
      <hr id="HRule" /><br />


      <div class="input-group mb-3 w-25">
        <input type="text" class="form-control w-20" placeholder="Type movie name" aria-label="Recipient's username" aria-describedby="button-addon2" value={search} onChange={(e) => HandleSearch(e)} />
        <button class="btn btn-primary" type="button" id="button-addon2" onClick={HandleClear}>Clear Search</button>
      </div><br />



      <div id="movies">
        {data && data.length ? data.map((movie) => {

          return (

            <div key={movie.id}>

              <img id="images" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.original_title} />
              <div
                onClick={() => handleMovieClick(movie)}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
              >
                {movie.original_title}
              </div>
              <div>Language{movie.original_language}</div>
              <div>  Relase Date:{movie.release_date}</div>







            </div>

          )


        }) : <h3>No Results found...</h3>}



      </div>
      {selectedMovie && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMovie.original_title}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Plot:</strong> {selectedMovie.overview}</p>
                <p><strong>Language:</strong> {selectedMovie.original_language}</p>
                <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                <p><strong>Popularity:</strong> {selectedMovie.popularity}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}





    </div>
  );
}

export default App;
