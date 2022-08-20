import React,  {useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './style.js';

const Header = ({ setCoordinates }) => {
    const classes = useStyles();
    const [autocomplete, setAutcomplete] = useState(null);

    const onLoad = (autoC) => setAutcomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({lat, lng})
    }

    return (
        <AppBar position="static" style={{ background: "black"}}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h2" className={classes.title}>
                   GSL
                </Typography>
                <Box display="inline-flex">
                <Typography variant="h6" className={classes.title}>
                    Recherche Villes
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder='Search...' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                    </div>
                 </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;