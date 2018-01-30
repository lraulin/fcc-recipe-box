import React, { Component } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import './App.css';

class App extends Component {
  state = {
    recipes: [{
      recipeName: "Invisibility Potion",
      ingredients: ["Bittergreen Petals", "Diamond Powder"]
    }, {
      recipeName: "Cat Potion",
      ingredients: ["1 Rebis", "2 Quebrith"]
    }, ]
  }

  render() {
    const {recipes} = this.state;
    return (
      <div className = "App">
        <Accordion>
          {recipes.map((recipes, index) =>(
            <Panel
              header={recipes.recipeName}
              eventKey={index}
              key={index}
            >
              <ol>
              {recipes.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
              </ol>
            </Panel>
          ))}
        </Accordion>
      </div>
    );
  }
}

export default App;
