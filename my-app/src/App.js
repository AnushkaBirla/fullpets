import './App.css'
import React from "react"
import { Router, Link } from "@reach/router"
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
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
} from "@material-ui/core"

// submit disabled until all fields filled

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
  }

  handleAgeChange = (event) => {
    this.setState({age: event.target.value})
  }


    render() {

      var zip = this.state.zip
      var animal = this.state.animal
      var breed = this.state.breed
      var age = this.state.age

      const zipcodeError = !isValidUSZip(zip)
      const maxAgeError = !isValidAge(age)


      var allFieldsFilled = animal && breed && age && zip

      const ableToSubmit = (event) => {
        if (!allFieldsFilled) {
          event.preventDefault()
        }
      }

      const submitButton = 
        <Button 
          variant="contained" 
          color="primary"
          disabled={!allFieldsFilled}
        >
          Submit
        </Button>

      return (
        <>
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
                    {this.state.currentAnimals.map((animal) => (
                      <MenuItem value={animal}>{animal}</MenuItem>
                    ))}
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
              onClick={ableToSubmit}
            >
              {submitButton}
            </Link>
          </div>
        </>
      )
  }
}

function InputForm() {

  const [animal, setAnimal] = React.useState("Cats")
  const [breed, setBreed] = React.useState("Persian")
  const [currentAnimals, setCurrentAnimals] = React.useState(["Default"])
  const [currentBreeds, setCurrentBreeds] = React.useState(["Default"])
  const [zip, setZip] = React.useState("")
  const [age, setAge] = React.useState("")
  
  const [zipcodeError, setZipcodeError] = React.useState(false)
  const [maxAgeError, setMaxAgeError] = React.useState(false)

  const handleAnimalChange = (event) => {
    setAnimal(event.target.value)
  }

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
    setBreed(event.target.value)
  }

  const handleZipCodeChange = (event) => {
    setZip(event.target.value)
  }

  const handleAgeChange = (event) => {
    setAge(event.target.value)
  }

  React.useEffect(() => {
    setZipcodeError(!isValidUSZip(zip))
  }, [zip])

  React.useEffect(() => {
    setMaxAgeError(!isValidAge(age))
  }, [age])

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
  const classes = useStyles()

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
  )
}

function SearchResults({location}) {
  const [petData, setPetData] = React.useState(null)

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
    <>
      <Typography variant="h6">Search Results</Typography>
      <a href={`/`}>Back to search</a>
      <br/>
      <br/>
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
        )
      })}
    </>
  )
}


function PetDetails({petId}) {
  const [petDetails, setPetDetails] = React.useState(null)

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
      <img className="Pet-details-picture"
        alt="pet" 
        src={"https://storage.googleapis.com/borland/"+petDetails.img_url+".jpg"} 
        width="50%" 
        height="auto" 
      />
      <Typography variant="h4">{petDetails.name}</Typography>
      <Typography variant="body1">Age: {petDetails.age}</Typography>
      <Typography variant="body1">Location: {petDetails.zipcode}</Typography>
      <br></br>
      <Typography variant="body2">{petDetails.desc}</Typography>    
    </>
  )
}

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    marginBlockEnd: 50,
    shadows: true,
    flexDirection: 'row'
  },
  media: {
    height: 300,
  },
})

function PetCard(props) {
  const classes = useStyles()

  const seeMore = 
    <Button size="small" color="primary">
      See More 
    </Button>

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.image}
        title="Pet"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">{props.name}</Typography>
        <Typography gutterBottom variant="body1">{props.age} years old - Lives in: {props.location}</Typography>
        <Typography variant="body2" color="textSecondary" component="p" noWrap="false">
          {props.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Link 
          to={`pet/${props.id}`}
          style={{ textDecoration: 'none' }}
        >
            {seeMore}
        </Link>
      </CardActions>
    </Card>
  )
}

export default function App() {
  return (
    <>
      <AppBar position="sticky" className="header">
        <Toolbar><Typography variant="h6">PetsGalore</Typography></Toolbar>
      </AppBar>
      <div className="App">
      <Router>
        <Input path="/"/>
        <SearchResults path="/search"/>
        <PetDetails path="/search/pet/:petId" />
      </Router>
      </div>
    </>
  )
}
