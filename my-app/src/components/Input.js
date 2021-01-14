import '../App.css'
import React from "react"
import { Link } from "@reach/router"
import {
  FormControl,
  InputLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core"

import FetchContext from "../Context"

function isValidAge(age) {
    return (/^\d+$/.test(age) && age > 0) || age === ""
}
  
function isValidUSZip(sZip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(sZip) || sZip === ""
}
  
  class Input extends React.Component {
  
    constructor(props) {
      super(props)
      this.state = {
        animal: "Cats",
        breed: "Persian",
        currentBreeds: ["Persian"],
        zip: "",
        age: "",
      }
    }
  
    componentDidUpdate (prevState) {

        if ((prevState.animal !== this.state.animal)) {
        fetch(`/animals/animalToBreedList?animal=${this.state.animal}`)
            .then((response) => response.json())
            .then(result => {
            this.setState({currentBreeds: result})
        })
        }
    }
  
    handleAnimalChange = (event) => {
      this.setState({animal: event.target.value})
      this.setState({breed: ""})
    }
  
    handleBreedChange = (event) => {
      this.setState({breed: event.target.value})
    }
  
    handleZipCodeChange = (event) => {
      this.setState({zip: event.target.value})
    }
  
    handleAgeChange = (event) => {
      this.setState({age: event.target.value})
    }
  
    ableToSubmit = (event) => {
        let allFieldsFilled = this.state.animal && this.state.breed && this.state.age && this.state.zip
        if (!allFieldsFilled) {
            event.preventDefault()
        }
    }
      render() {

        const {zip, animal, breed, age} = this.state
        const zipcodeError = !isValidUSZip(zip)
        const maxAgeError = !isValidAge(age)
  
        const submitButton = 
          <Button 
            variant="contained" 
            color="primary"
            disabled={!(animal && breed && age && zip)}
          >
            Submit
          </Button>
  

        if (!this.context){
            return null
        }

        return (
          <>
            <FetchContext.Consumer> 
            {currentAnimals => (
            <div className="Input-form">
                <Typography variant="h6">Find the perfect new family member</Typography>
                <Typography paragraph="true">
                    Fill out the form below to browse pets available for adoption near you!
                </Typography>
    
                <Grid container direction={"column"} spacing={5}>
                    <Grid item>
                    <TextField
                        error={zipcodeError}
                        helperText={zipcodeError ? "Invalid ZIP code, please enter a valid ZIP code" : ""}
                        id="standard-error-helper-text"
                        label="ZIP code"
                        onChange={this.handleZipCodeChange}
                    />
                    </Grid>
                    <Grid item>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Animal</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={animal}
                        onChange={this.handleAnimalChange}
                        >
                        {currentAnimals ? currentAnimals.map((animal) => (
                            <MenuItem value={animal}>{animal}</MenuItem>
                        ))
                        :
                        <div>
                            Loading
                        </div>
                        }
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Breed</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={breed}
                        onChange={this.handleBreedChange}
                        >
                        {this.state.currentBreeds.map((breed) => (
                            <MenuItem value={breed}>{breed}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item>
                    <TextField
                        error={maxAgeError}
                        helperText={maxAgeError ? "Invalid pet age, please enter numbers only" : ""}
                        id="standard-error-helper-text"
                        label="Maximum pet age"
                        onChange={this.handleAgeChange}
                    />
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Link 
                    to={`search?zip=${zip}&animal=${animal}&breed=${breed}&maxage=${age}`}
                    style={{ textDecoration: 'none' }}
                    onClick={this.ableToSubmit}
                >
                    {submitButton}
                </Link>
            </div>
            )}
            </FetchContext.Consumer>
          </>
        )
    }
  }

export default Input