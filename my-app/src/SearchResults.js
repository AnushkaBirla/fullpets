function PetCard(props) {
    return (
      <>
        <h1>{props.name}</h1>
        <p>Age: {props.age}</p>
        <p>Location: {props.location}</p>
        <img alt="dog" src={props.image} width="100%" height="auto" />
        <Button variant="contained" color="primary">
          More details
        </Button>
      </>
    );
  }
  
  let searchResults = [
    {
      name: "James",
      age: 8,
      location: 95220,
      image: "https://borland.s3.amazonaws.com/dog1.jpg"
    },
    {
      name: "Max",
      age: 5,
      location: 95220,
      image: "https://borland.s3.amazonaws.com/dog2.jpg"
    },
    {
      name: "Marvin",
      age: 2,
      location: 95220,
      image: "https://borland.s3.amazonaws.com/dog3.jpg"
    },
    {
      name: "Carla",
      age: 12,
      location: 95220,
      image: "https://borland.s3.amazonaws.com/dog4.jpg"
    },
    {
      name: "Eddy",
      age: 2,
      location: 95220,
      image: "https://borland.s3.amazonaws.com/dog5.jpg"
    }
  ];