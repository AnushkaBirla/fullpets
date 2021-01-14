import './App.css';
import React from "react";
import { Router, Link } from "@reach/router";
import { parse } from 'query-string'
import {
  FormControl,
  InputLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

// submit disabled until all fields filled

function isValidAge(age) {
  return (/^\d+$/.test(age) && age > 0) || age === ""
}

function isValidUSZip(sZip) {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(sZip) || sZip === ""
}

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      animal: "Cats",
      breed: "Persian",
      currentAnimals: ["Cats"],
      currentBreeds: ["Persian"],
      zip: "",
      age: "",
    }
  }

  componentDidMount () {
    fetch('/animals/animalList')
      .then((response) => response.json())
      .then(result => {
        this.setState({currentAnimals: result})
      })
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

  handleValueChange = (event, name) => {
    console.log(event)
    this.setState({name: event.target.value})
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
  };

  handleAgeChange = (event) => {
    this.setState({age: event.target.value})
  }


    render() {

      const zipcodeError = !isValidUSZip(this.state.zip)
      const maxAgeError = !isValidAge(this.state.age)

      var zip = this.state.zip
      var animal = this.state.animal
      var breed = this.state.breed
      var age = this.state.age

      var allFieldsFilled = this.state.animal && this.state.breed && this.state.age && this.state.zip

      const ableToSubmit = (event) => {
        if (!allFieldsFilled) {
          event.preventDefault()
        }
      }

      const submitButton = 
        <Button 
          variant="contained" 
          disabled={!allFieldsFilled}
        >
          Submit
        </Button>

      return (
        <>
          <div>
          <br></br>
            <TextField
              error={zipcodeError}
              helperText={zipcodeError ? "Invalid ZIP code" : ""}
              id="standard-error-helper-text"
              label="Zipcode"
              onChange={this.handleZipCodeChange}
            />
            <br></br>
          </div>
          <br></br>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Animal</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={animal}
              onChange={this.handleAnimalChange}
            >
              {this.state.currentAnimals.map((animal) => (
                <MenuItem value={animal}>{animal}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br></br>
          <br></br>
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
          <br></br>
          <br></br>
          <TextField
            error={maxAgeError}
            helperText={maxAgeError ? "Invalid pet age" : ""}
            id="standard-error-helper-text"
            label="Max pet age"
            onChange={this.handleAgeChange}
          />
          <br></br>
          <br></br>
          <br></br>
          <Link 
            to={`search?zip=${zip}&animal=${animal}&breed=${breed}&maxage=${age}`}
            style={{ textDecoration: 'none' }}
            onClick={ableToSubmit}
          >
            {submitButton}
          </Link>
        </>
      );
  }
}

function InputForm() {

  // const classes = useStyles();
  const [animal, setAnimal] = React.useState("Cats");
  const [breed, setBreed] = React.useState("Persian");
  const [currentAnimals, setCurrentAnimals] = React.useState(["Default"]);
  const [currentBreeds, setCurrentBreeds] = React.useState(["Default"]);
  const [zip, setZip] = React.useState("");
  const [age, setAge] = React.useState("");
  
  const [zipcodeError, setZipcodeError] = React.useState(false);
  const [maxAgeError, setMaxAgeError] = React.useState(false);

  const handleAnimalChange = (event) => {
    setAnimal(event.target.value);
  };

  React.useEffect(() => {
    fetch('/animals/animalList')
      .then((response) => response.json())
      .then(setCurrentAnimals)
  }, [])

  React.useEffect(() => {
    fetch(`/animals/animalToBreedList?animal=${animal}`)
      .then((response) => response.json())
      .then(setCurrentBreeds)
  }, [animal])

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZip(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value)
  }

  React.useEffect(() => {
    setZipcodeError(!isValidUSZip(zip));
  }, [zip]);

  React.useEffect(() => {
    setMaxAgeError(!isValidAge(age));
  }, [age]);

  // const zipContext = React.createContext(null)
  // <zipContext.Provider value=zip>
  // </zipContext.Provider>

  const allFieldsFilled = animal && breed && age && zip

  const ableToSubmit = (event) => {
    if (!allFieldsFilled) {
      event.preventDefault()
    }
  }

  const submitButton = 
    <Button 
      variant="contained" 
      disabled={!allFieldsFilled}
    >
      Submit
    </Button>

  const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
  }))
  const classes = useStyles();

  return (
    <>
      <div className="App-header">
      <AppBar position="fixed">
        <Toolbar className="cherry-background">
          <Typography variant="h6" className="cherry-title">
            PetsGalore
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      <br></br>
        <TextField
          error={zipcodeError}
          helperText={zipcodeError ? "Invalid ZIP code" : ""}
          id="standard-error-helper-text"
          label="Zipcode"
          onChange={handleZipCodeChange}
        />
        <br></br>
      </div>
      <br></br>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Animal</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={animal}
          onChange={handleAnimalChange}
        >
          {currentAnimals.map((animal) => (
            <MenuItem value={animal}>{animal}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <br></br>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Breed</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={breed}
          onChange={handleBreedChange}
        >
          {currentBreeds.map((breed) => (
            <MenuItem value={breed}>{breed}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <br></br>
      <TextField
        error={maxAgeError}
        helperText={maxAgeError ? "Invalid pet age" : ""}
        id="standard-error-helper-text"
        label="Max pet age"
        onChange={handleAgeChange}
      />
      <br></br>
      <br></br>
      <br></br>
      <Link 
        to={`search?zip=${zip}&animal=${animal}&breed=${breed}&maxage=${age}`}
        style={{ textDecoration: 'none' }}
        onClick={ableToSubmit}
      >
        {submitButton}
      </Link>
    </>
  );
}

function SearchResults({location}) {
  const [petData, setPetData] = React.useState(null);

  const animal = parse(location.search).animal
  const breed = parse(location.search).breed
  const maxage = parse(location.search).maxage
  const zip = parse(location.search).zip

  React.useEffect(() => {
    fetch(`/animals/petData?zip=${zip}&animal=${animal}&breed=${breed}&maxage=${maxage}`)
      .then((response) => response.json())
      .then(setPetData)
  }, [])

  if (!petData) {
    return null
  }
  return (
    <div className="App">
      <h1>Search Results</h1>
      {petData.map((result) => {
        return (
          <PetCard
            key={result.id}
            id={result.id}
            name={result.name}
            age={result.age}
            location={result.zipcode}
            image={"https://storage.googleapis.com/borland/"+result.img_url+".jpg"}
            desc={result.desc}
          />
        );
      })}
    </div>
  );
}


function PetDetails({petId}) {
  const [petDetails, setPetDetails] = React.useState(null);

  React.useEffect(() => {
    fetch(`/animals/petDetails?id=${petId}`)
      .then((response) => response.json())
      .then(setPetDetails)
  }, [])

  if (!petDetails) {
    return null
  }
  return (
    <>
      <h1>Description</h1>
      <h1>{petDetails.name}</h1>
      <p>Age: {petDetails.age}</p>
      <p>Location: {petDetails.zipcode}</p>
      <img 
        alt="pet" 
        src={"https://storage.googleapis.com/borland/"+petDetails.img_url+".jpg"} 
        width="100%" 
        height="auto" 
      />
      <p>Description: {petDetails.desc}</p>
    </>
  );
}

function PetCard(props) {
  return (
    <>
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
      <p>Location: {props.location}</p>
      <img alt="pet" src={props.image} width="100%" height="auto" />
      <Link to={`pet/${props.id}`}>More details</Link>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Router>
        <Input path="/"/>
        <SearchResults path="/search" />
        <PetDetails path="/search/pet/:petId" />
      </Router>
    </div>
  );
}
