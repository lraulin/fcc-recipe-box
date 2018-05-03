import React, { Component } from 'react';
import {db} from './firebase'
import './App.css';
import {
  Panel,
  PanelGroup,
  Button,
  ButtonToolbar,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';

class App extends Component {
  state = {
    recipes: [{recipeName:'', ingredients: []}],
    showAdd: false,
    showeEdit: false,
    currentIndex: 0,
    newestRecipe: {
      recipeName: "",
      ingredients: []
    }
  }

  deleteRecipe(index) {
    const recipeID = this.state.recipes[index].recipeID;
    db.ref('recipes/').child(recipeID).remove();
  }

  updateNewRecipe(recipeName, ingredients) {
    const newestRecipe = {
      recipeName: recipeName,
      ingredients: ingredients
    }
    this.setState({newestRecipe});
  }

  saveNewRecipe() {
    db.ref('recipes/').push(this.state.newestRecipe);

  }

  submitNewRecipe() {
    this.saveNewRecipe();
    this.close();
  }

  submitEditRecipe(index) {
    const recipeID = this.state.recipes[index].recipeID;
    const recipeName = this.state.newestRecipe.recipeName;
    const ingredients = this.state.newestRecipe.ingredients;
    db.ref('recipes/').child(recipeID).update({ recipeName, ingredients })
    this.close();
  }

  close = () => {
    if (this.state.showAdd) { this.setState({showAdd: false}); }
    if (this.state.showEdit) { this.setState({showEdit: false}); }
  }

  open = (state, currentIndex) => {
    const newestRecipe = this.state.recipes[currentIndex];
    this.setState({newestRecipe});
    this.setState({[state]: true});
    console.log(currentIndex);
    this.setState({currentIndex});
  }

  componentDidMount() {
    console.log('mounted!');
    db.ref('recipes/').on('value', snapshot=>{
      const recipeData = snapshot.val();
      if (recipeData) {
        const recipes = Object.keys(recipeData).map(key=>{
          const recipe = recipeData[key];
          recipe.recipeID = key;
          return recipe
        });
        this.setState({recipes});
      }
    });
  }
  

  render() {
    const { recipes, newestRecipe, currentIndex } = this.state;
    return (
      (recipes !== []) &&
      <div className="App container">
        {/* Recipes Accordion */}
        <PanelGroup accordion id="recipeAccordion">
          {recipes.map((recipe, index) =>(
            <Panel bsStyle="info" eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ul className="list-unstyled" >
                {recipe.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                </ul>
                <ButtonToolbar className="btn-centered">
                  <Button
                    bsStyle="danger"
                    onClick={(event) => this.deleteRecipe(index)}
                  >Delete Recipe</Button>
                  <Button
                    bsStyle="default"
                    onClick={(event) => this.open("showEdit", index)}
                  >Edit Recipe</Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
          ))}
        </PanelGroup>

        {/* Add recipe popup window */}
        <Modal show={this.state.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Recipe Name</ControlLabel>
              <FormControl
                type="text"
                inputRef={input => this.textInput = input}
                placeholder="Enter Recipe Name"
                onChange={(event) => this.updateNewRecipe(
                  event.target.value, newestRecipe.ingredients)}
              />
              <FormGroup>
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  type="textarea"
                  inputRef={input => this.textInput = input}
                  placeholder="Enter Ingredients (separated by commas)"
                  onChange={(event) => this.updateNewRecipe(
                    newestRecipe.recipeName, event.target.value.split(","))}
                />
              </FormGroup>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer className="center">
            <Button bsStyle="primary" onClick={(event) => this.submitNewRecipe()}>
              Submit</Button>
          </Modal.Footer>
        </Modal>

      {/* Edit recipe popup window */}
      <Modal show={this.state.showEdit} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Recipe Name</ControlLabel>
            <FormControl
              type="text"
              inputRef={input => this.textInput = input}
              defaultValue={recipes[currentIndex].recipeName}
              onChange={(event) => this.updateNewRecipe(
                event.target.value, newestRecipe.ingredients)}
            />
            <FormGroup>
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                type="textarea"
                inputRef={input => this.textInput = input}
                defaultValue={recipes[currentIndex].ingredients}
                onChange={(event) => this.updateNewRecipe(
                  newestRecipe.recipeName, event.target.value.split(","))}
              />
            </FormGroup>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer className="center">
          <Button bsStyle="primary" onClick={(event) => this.submitEditRecipe(currentIndex)}>
            Submit</Button>
        </Modal.Footer>
      </Modal>
      <Button bsStyle="primary" onClick={(event) => this.open("showAdd", currentIndex)}>
        Add Recipe</Button>
    </div>
    );
  }
}

export default App;
