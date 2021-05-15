import React from 'react'
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

export default function Entry(props) {
    const classes = useStyles();
    return(
        <div>
            <Paper className={classes.response_card} style={{ color: "#757575", backgroundColor: props.bg, padding: "5px", marginBottom: 5}}>
                <span style={{fontWeight: 'bold'}}>{props.rank}</span><a href={props.href} target="_blank" rel="noopener noreferrer">{props.text}</a>
            </Paper>
        </div>
    )
}