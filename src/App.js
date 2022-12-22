import React, { useState } from "react";
import {
  MantineProvider,
  MultiSelect,
  Button,
  Loader,
  List,
} from "@mantine/core";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);
  const allIngredients = [
    "Apple",
    "Banana",
    "Chocolate sauce",
    "Flour",
    "Strawberries",
  ];

  const getRecipe = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    await fetch("http://localhost:8000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: selectedIngredients }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      });
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <MultiSelect
        value={selectedIngredients}
        onChange={setSelectedIngredients}
        data={allIngredients}
        label="Ingredients"
        placeholder="Pick which ingredients to use"
      />
      <Button onClick={(evt) => getRecipe(evt)}>Create recipe</Button>
      {console.log(recipe)}
      {loading ? <Loader /> : <></>}
      {recipe ? (
        <>
          <h2>Title</h2>
          <h3>{recipe.title}</h3>
          <h2>Description</h2>
          <h2>Ingredients</h2>
          <List size="lg">
            {recipe.ingredients.map((el) => (
              <List.Item>{el}</List.Item>
            ))}
          </List>
          <h3>{recipe.description}</h3>
          <h2>Steps</h2>
          <List size="lg">
            {recipe.steps.map((el) => (
              <List.Item>{el}</List.Item>
            ))}
          </List>
        </>
      ) : (
        <></>
      )}
    </MantineProvider>
  );
}

export default App;

<List size="lg">
  <List.Item>Clone or download repository from GitHub</List.Item>
  <List.Item>Install dependencies with yarn</List.Item>
  <List.Item>To start development server run npm start command</List.Item>
  <List.Item>
    Run tests to make sure your changes do not break the build
  </List.Item>
  <List.Item>Submit a pull request once you are done</List.Item>
</List>;
