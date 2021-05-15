import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { PlusOneSharp } from '@material-ui/icons';

// const useStyles = makeStyles((theme) => ({
//   response: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//     response: {
//       width: "80%",
//       right: "auto"
//     }
//   },
// }));

export default function Request(plops) {
    // const classes = useStyles();

    return (
        <div style={{ width: "80%", textAlign: "right", marginRight: "10px", marginLeft: "auto"}}>
          <p style={{marginLeft: "auto"}}>あなた</p>
          <Paper style={{ padding: "5px", width: "100%", marginRight: "10px", marginLeft: "auto"}}>
            {plops.text}
          </Paper>
        </div>
    )
}