import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangePergunta = this.onChangePergunta.bind(this);
    this.onChangeResp1 = this.onChangeResp1.bind(this);
    this.onChangeResp2 = this.onChangeResp2.bind(this);
    this.onChangeResp3 = this.onChangeResp3.bind(this);
    this.onChangeResp4 = this.onChangeResp4.bind(this);
    this.onChangeCerta = this.onChangeCerta.bind(this);
    this.getPergunta = this.getPergunta.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentQuestion: {
        id: null,
        resp1: "",
        resp2: "",
        resp3: "",
        resp4: "",
        certa: "",
        pergunta: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPergunta(this.props.match.params.id);
  }

  onChangePergunta(e) {
    const pergunta = e.target.value;

    this.setState(function(prevState) {
      return {
        currentQuestion: {
          ...prevState.currentQuestion,
          pergunta: pergunta
        }
      };
    });
  }

  onChangeResp1(e) {
    const resp1 = e.target.value;

    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        resp1: resp1
      }
    }));
  }

  onChangeResp2(e) {
    const resp2 = e.target.value;

    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        resp2: resp2
      }
    }));
  }

  onChangeResp3(e) {
    const resp3 = e.target.value;

    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        resp3: resp3
      }
    }));
  }

  onChangeResp4(e) {
    const resp4 = e.target.value;

    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        resp4: resp4
      }
    }));
  }

  onChangeCerta(e) {
    const certa = e.target.value;

    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        certa: certa
      }
    }));
  }

  getPergunta(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentQuestion: response.data[0]
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentQuestion.id,
      pergunta: this.state.currentQuestion.pergunta,
      resp1: this.state.currentQuestion.resp1,
      resp2: this.state.currentQuestion.resp2,
      resp3: this.state.currentQuestion.resp3,
      resp4: this.state.currentQuestion.resp4,
      certa: this.state.currentQuestion.certa
    };

    TutorialDataService.update(this.state.currentQuestion.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentQuestion: {
            ...prevState.currentQuestion,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentQuestion.id,
      this.state.currentQuestion
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "A pergunta foi atualizada!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {
    TutorialDataService.delete(this.state.currentQuestion.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentQuestion } = this.state;

    return (
      <div>
        {currentQuestion ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Pergunta</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentQuestion.pergunta}
                  onChange={this.onChangePergunta}
                  rows="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Resposta 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="resp1"
                  value={currentQuestion.resp1}
                  onChange={this.onChangeResp1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Resposta 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="resp2"
                  value={currentQuestion.resp2}
                  onChange={this.onChangeResp2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Resposta 3</label>
                <input
                  type="text"
                  className="form-control"
                  id="resp3"
                  value={currentQuestion.resp3}
                  onChange={this.onChangeResp3}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Resposta 4</label>
                <input
                  type="text"
                  className="form-control"
                  id="resp4"
                  value={currentQuestion.resp4}
                  onChange={this.onChangeResp4}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Resposta Certa</label>
                <select
                  className="form-control"
                  id="certa"
                  value={currentQuestion.certa}
                  onChange={this.onChangeCerta}
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
