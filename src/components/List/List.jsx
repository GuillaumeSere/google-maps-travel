import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './style.js';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {

    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        setElRefs(refs);
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4">Restaurants, Hôtels & Attractions</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hôtels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Notes</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>Tout</MenuItem>
                            <MenuItem value={3}>Plus de 3 étoiles</MenuItem>
                            <MenuItem value={4}>Plus de 4 étoiles</MenuItem>
                            <MenuItem value={4.5}>Plus de 4.5 étoiles</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => (
                            <Grid ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
}

export default List;