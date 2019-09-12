import React, { Component } from "react";
import { recipe } from "../tempDetails";

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: recipe,
      url: `https://www.food2fork.com/api/get?key=a2bff86e50cb02486313d30efc836bbd&rId=${this.props.id}`
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      this.setState({ recipe: jsonData.recipe });
    } catch (error) {
      console.log(error);
    }
  }

  //************************another way to write the same thing - fetching*********************/
  //without using the constructor
  //because we can access this.props in componentDidMount

  // state = {
  //   recipe: recipe
  // };

  // async componentDidMount() {
  //   const id = this.props.id;
  //   const url = `https://www.food2fork.com/api/get?key=a2bff86e50cb02486313d30efc836bbd&rId=${id}`;
  //   try {
  //     const data = await fetch(url);
  //     const jsonData = await data.json();
  //     this.setState(         ----> passing a function here not an object
  //       (state, props) => {
  //         return { recipe: jsonData.recipe };
  //       },
  //       () => {} -----> in setstate we can have a callback function
  //     );                 setstate is asynchronous -- we ill have example when searching
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;

    const { handleIndex } = this.props;
    console.log(this.props);

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <button
                type="button"
                className="btn btn-warning mb-5 text-capitalize"
                onClick={() => handleIndex(1)} //we are passing an argument here(index) so we use arrow function
              >
                back to recipe list
              </button>
              <img src={image_url} className="d-block w-100" alt="recipe"></img>
            </div>
            {/* details */}
            <div className="col-10 mx-auto col-md-6 my-3">
              <h3 className="text-uppercase">{title}</h3>
              <h6 className="text-warning text-caiptalize text-slanted">
                Provided by {publisher}
              </h6>
              <a
                href={publisher_url}
                className="btn btn-primary mt-2 text-capitalize"
                target="_blank"
                rel="noopener noreferrer"
              >
                publisher webpage
              </a>
              <a
                href={source_url}
                className="btn btn-success mt-2 mx-3 text-capitalize"
                target="_blank"
                rel="noopener noreferrer"
              >
                recipe url
              </a>
              <ul className="list-group mt-4">
                <h3 className="mt-3 mb-4">Ingredients</h3>
                {ingredients.map((item, index) => {
                  return (
                    <li key={index} className="list-group-item text-slanted">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
