import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";
// import PropTypes from "prop-types";
// function Food({name, picture, rating}) {// 중괄호안에 prop 이름을 넣어서 거기에 해당하는 값을 받아올 수 있다.
//   //props 는 우리가 임의로 정해준 모든 prop들을 나타내는 매개변수
//   return ( <div><h1> I like {name}</h1> <h2>{rating}/5.0</h2><img src = {picture} alt = {name} /></div>);
// }
// Food.propTypes = {name: PropTypes.string.isRequired,
// picture:PropTypes.string.isRequired,
// rating:PropTypes.number.isRequired };
// const foodILike = [
//   {id: 1,
//     name: "kimchi",
//     image: "https://craftlog.com/m/i/6171598=s1280=h960.webp",
//     rating: 5,
//   },
//   {id: 2,
//     name: "samgyupsal",
//     image: "https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F222d88e5c7dc496c8e8a8a56c3452e52.JPG",
//     rating: 4}
// ]

// function App() {
//   return (
//     <div className="App">
//     {foodILike.map(dish => <Food key = {dish.id} name = {dish.name} picture = {dish.image} rating = {dish.rating}/> )}
//     </div>// map 에서 dish 는 어레이의 각 엘레멘트이다. 그냥 이름 지으면 되는 것.
//   );// 다른 컴포넌트 안에 또다른 컴포넌트를 넣을 수 있다.
// }// 어떤 이름으로든 prop을 정해줄 수 있다.
class Home extends React.Component {
  //class 에는 render method 가 있다, react.component 를 extend 시켜줘야한다.

  // state = {//object. data that will change를 넣어준다..
  //   count: 0
  // };
  // add = () => {
  //   //this.state.count = 1;이런식으로 하면 render가 새로고침이 안되서 반영이 안된다
  //   this.setState(current => ({count: current.count + 1}));// setstate를 쓰면 알아서 새로고침 해주고, html을 그냥 보면, 그냥 값만 알아서 바뀐다
  // };
  // Minus = () => {
  //   this.setState(current => ({count: current.count - 1}));// current 라는 함수처럼 생긴것이 알아서 현재값을 알아와줌
  // };
  // componentDidMount() {
  //   setTimeout()
  // }
  // componentDidUpdate() {
  //   console.log("updated");
  // }
  // componentWillUnmount() {
  //   console.log("goodbye");
  // }
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    console.log(movies);
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false }); // 나중에 state를 추가해도 된다(book)
    }, 6000);
    this.getMovies();
  }
  render() {
    //react.component는 자동적으로 이 render를 실행시켜준다.
    // console.log("Im rendering")
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}
export default Home;
