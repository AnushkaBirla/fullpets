import './App.css'
import React from "react"
import { Router } from "@reach/router"
import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core"

import PetDetails from "./components/PetDetails"
import Input from "./components/Input"
import SearchResults from "./components/SearchResults"
import FetchContext from "./Context"

export default function App() {

  let [currentAnimals, setCurrentAnimals] = React.useState(["Cats"])

  React.useEffect(() => {
    fetch('/animals/animalList')
      .then((response) => response.json())
      .then(setCurrentAnimals)
  }, [])


  return (
    <>
      <AppBar position="sticky" className="header">
        <Toolbar><Typography variant="h6">PetsGalore</Typography></Toolbar>
      </AppBar>
      <div className="App">
      <FetchContext.Provider value={currentAnimals}>
      <Router>
          <Input path="/"/>
          <SearchResults path="/search"/>
          <PetDetails path="/search/pet/:petId" />
      </Router>
      </FetchContext.Provider>
      </div>
    </>
  )
}
