import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
}));

const removeHistory = () => {
    // ローカルストレージの内容を削除する
    localStorage.removeItem('footprint')
}

export default function ButtonAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" style={{ color: "#000000", backgroundColor: "#26c6da" }}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>
                    {/* <span onClick={removeHistory}>
                        <SettingsIcon /> 履歴削除(残り3回)
                    </span> */}
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
    );
}