import '../App.css'
import React from "react"
import {Typography} from "@material-ui/core"

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

export default PetDetails