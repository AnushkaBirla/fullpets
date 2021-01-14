import '../App.css'
import React from "react"
import { Link } from "@reach/router"
import {
  Button,
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextareaAutosize,
} from "@material-ui/core"

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
          <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
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

export default PetCard