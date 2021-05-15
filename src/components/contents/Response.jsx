import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  response: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    response: {
      width: "80%",
      right: "auto"
    }
  },
}));

export default function Response(plops) {
    const classes = useStyles();

    return (
        <div style={{ width: "80%", right: "auto" }}>
          <p>RiMA</p>
          <Paper className={classes.response_card} style={{ color: "#ffffff", backgroundColor: "#3f51b5", padding: "5px"}}>
            {plops.text}
          </Paper>
        </div>
    )
}