import '../App.css'
import React from "react"
import { parse } from 'query-string'
import {Typography,

} from "@material-ui/core"

import PetCard from "./PetCard"

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

export default SearchResults