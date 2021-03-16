import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangePergunta = this.onChangePergunta.bind(this);
    this.onChangeResp1 = this.onChangeResp1.bind(this);
    this.onChangeResp2 = this.onChangeResp2.bind(this);
    this.onChangeResp3 = this.onChangeResp3.bind(this);
    this.onChangeResp4 = this.onChangeResp4.bind(this);
    this.onChangeCerta = this.onChangeCerta.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      resp1: "",
      resp2: "",
      resp3: "",
      resp4: "",
      certa: "",
      pergunta: ""
    };
  }

  onChangePergunta(e) {
    this.setState({
      pergunta: e.target.value
    });
  }

  onChangeResp1(e) {
    this.setState({
      resp1: e.target.value
    });
  }

  onChangeResp2(e) {
    this.setState({
      resp2: e.target.value
    });
  }

  onChangeResp3(e) {
    this.setState({
      resp3: e.target.value
    });
  }

  onChangeResp4(e) {
    this.setState({
      resp4: e.target.value
    });
  }

  onChangeCerta(e) {
    this.setState({
      certa: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      pergunta: this.state.pergunta,
      resp1: this.state.resp1,
      resp2: this.state.resp2,
      resp3: this.state.resp3,
      resp4: this.state.resp4,
      certa: this.state.certa
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          pergunta: response.data.pergunta,
          resp1: response.data.resp1,
          resp2: response.data.resp2,
          resp3: response.data.resp3,
          resp4: response.data.resp4,
          certa: response.data.certa,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      resp1: "",
      resp2: "",
      resp3: "",
      resp4: "",
      certa: "",
      pergunta: "",

      submitted: false
    });
  }

  render() {
    console.log(this.state.pergunta);
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>A pergunta foi adicionada com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Pergunta</label>
              <textarea
                type="text"
                className="form-control"
                id="title"
                value={this.state.pergunta}
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
                value={this.state.resp1}
                onChange={this.onChangeResp1}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Resposta 2</label>
              <input
                type="text"
                className="form-control"
                id="resp2"
                value={this.state.resp2}
                onChange={this.onChangeResp2}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Resposta 3</label>
              <input
                type="text"
                className="form-control"
                id="resp3"
                value={this.state.resp3}
                onChange={this.onChangeResp3}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Resposta 4</label>
              <input
                type="text"
                className="form-control"
                id="resp4"
                value={this.state.resp4}
                onChange={this.onChangeResp4}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Resposta Certa</label>
              <select
                className="form-control"
                id="certa"
                value={this.state.certa}
                onChange={this.onChangeCerta}
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
