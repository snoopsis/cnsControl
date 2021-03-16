import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {
      searchTitle,
      tutorials,
      currentTutorial,
      currentIndex
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Procurar pergunta..."
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Procurar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Questoes CNS014</h4>
          <span>{tutorials && tutorials.length}</span>
          <ul className="list-group">
            {tutorials &&
              tutorials
                .map((tutorial, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    {tutorial.pergunta.substring(0, 150)}
                  </li>
                ))
                .slice(0, 10)}
          </ul>
          <div className="mb-4"></div>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>PERGUNTA:</h4>
              <div className="mt-4">{currentTutorial.pergunta}</div>

              <div className="mt-2">
                <Link
                  to={"/tutorials/" + currentTutorial.id}
                  className="badge badge-warning"
                >
                  Editar
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor clique em uma pergunta...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
