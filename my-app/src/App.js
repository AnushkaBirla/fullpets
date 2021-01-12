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
} from "@material-ui/core";


// import "./styles.css";

  // form requiring zip code, animal, breed, max age
// submit disabled until all fields filled
// fields are validated
// animal and breed are both dropdown
// breed options changes based on animal choice
// animal and breeds lists are fetched from the server

// example backend response for map between animal and breeds
const animalToBreed = {
  dog: ["german shepherd", "golden doodle", "havaneese", "pug", "husky"],
  cat: ["persian", "rag doll", "shorthair", "burmese"],
  bird: ["crow", "parrot", "eagle", "hawk"]
};

// do later 
const animalToMaxAge = {
  dog: 14,
  cat: 15,
  bird: 20
}

// example backend response for animal list
const animalList = ["bird", "cat", "dog"];

function isValidUSZip(sZip) {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(sZip) || sZip === ""
}

function isValidAge(age) {
  return (/^\d+$/.test(age) && age > 0) || age === ""
}

function InputForm() {
  // states
  // zip code error
  // max age error

  // const classes = useStyles();
  const [animal, setAnimal] = React.useState("cat");
  const [breed, setBreed] = React.useState("persian");
  const [currentBreeds, setCurrentBreeds] = React.useState(["Default"]);
  const [zip, setZip] = React.useState("");
  const [age, setAge] = React.useState("");

  const [data, setData] = React.useState(null);
  
  const [zipcodeError, setZipcodeError] = React.useState(false);
  const [maxAgeError, setMaxAgeError] = React.useState(false);

  const handleAnimalChange = (event) => {
    setAnimal(event.target.value);
  };

  // pass in query params 
  // React.useEffect(() => {
  //   fetch('/animals/data')
  //     .then((response) => response.json())
  //     .then(setData)
  // }, [])

  // if (data) {
  //  return <div>{JSON.stringify(data)}</div>
  // }

  React.useEffect(() => {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => )
    setCurrentBreeds(animalToBreed[animal]);
  }, [animal]);

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    // var numberPattern = /^\d+$/
    // if (numberPattern.test(event.target.value)) {
    //   setZip(event.target.value);
    // }
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

  const zipContext = React.createContext(null)

  // <zipContext.Provider value=zip>
  // </zipContext.Provider>

  const handleSubmitForm = () => {
    // <Link to="?zipcode=zip">Relative query</Link>
    //setZipcodeError(!isValidUSZip(zip));
  };

  const submitButton = 
    <Button 
      variant="contained" 
      onClick={handleSubmitForm}
      disabled={!(animal && breed && age && zip)}
    >
      Submit
    </Button>

  return (
    // <div>
    //   null case
    // </div>
    <>
      <div>
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
          {animalList.map((animal) => (
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
      >
        {submitButton}
      </Link>
    </>
  );
}

// add a use effects to parse the url query params gotten from the for inputs
// this is where call to backend is made - do w empty {} so that it only is called on the component did moint equivalanet


function SearchResults({location}) {
  console.log(parse(location.search))
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


function PetDetails({petId, location}) {
  // later on could fetch more pet info from an api on the express server
  console.log(petId)
  console.log(parse(location))
  console.log(parse(location.search))
  let petInfo = pets[petId];

  const [petDetails, setPetDetails] = React.useState(null);

  React.useEffect(() => {
    fetch('/animals/petDetails')
      .then((response) => response.json())
      .then(setPetDetails)
  }, [])

  return (
    <>
      <h1>{petInfo.name}</h1>
      <p>Age: {petInfo.age}</p>
      <p>Location: {petInfo.zipcode}</p>
      <p>Description: {petInfo.desc}</p>
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
        <InputForm path="/"/>
        <SearchResults path="/search" />
        <PetDetails path="/search/pet/:petvgId" />
      </Router>
    </div>
  );
}

let pets = {
  1: {
    name: "James",
    age: 8,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog1.jpg",
    desc: "he's a very happy dog!"
  },
  2: {
    name: "Max",
    age: 5,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog2.jpg",
    desc: "he's a very sad dog!"
  },
  3: {
    name: "Marvin",
    age: 2,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog3.jpg",
    desc: "he's a very mean dog!"
  },
  4: {
    name: "Carla",
    age: 12,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog4.jpg",
    desc: "he's a very enthusiastic dog!"
  },
  5: {
    name: "Eddy",
    age: 2,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog5.jpg",
    desc: "he's a very calm dog!"
  }
};

let searchResults = [
  {
    id: 1,
    name: "James",
    age: 8,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog1.jpg",
    desc: "he's a very happy dog!"
  },
  {
    id: 2,
    name: "Max",
    age: 5,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog2.jpg",
    desc: "he's a very sad dog!"
  },
  {
    id: 3,
    name: "Marvin",
    age: 2,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog3.jpg",
    desc: "he's a very mean dog!"
  },
  {
    id: 4,
    name: "Carla",
    age: 12,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog4.jpg",
    desc: "he's a very enthusiastic dog!"
  },
  {
    id: 5,
    name: "Eddy",
    age: 2,
    location: 95220,
    image: "https://borland.s3.amazonaws.com/dog5.jpg",
    desc: "he's a very calm dog!"
  }
];

