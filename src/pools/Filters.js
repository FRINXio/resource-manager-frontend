import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "20px",
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.primary,
    }
}));

const getPoolTypes = (poolArray) => {
    return poolArray.map(pool => pool.PoolType)
}

const Filters = ({QueryAllocationStrategies, QueryResourceTypes, QueryTags, poolArray, updateFilterConstraint}) => {
    const classes = useStyles()

    return (
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Typography component="div">
                            <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium">
                                Existing Pools
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            placeholder="Search pools"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => updateFilterConstraint("searchQuery", e.target.value)}
                            InputProps={{
                                type: 'search', startAdornment: (
                                    <InputAdornment position="start">
                                        <Search/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={getPoolTypes(poolArray)}
                            getOptionLabel={(option) => option}
                            onChange={(e, value) => updateFilterConstraint("poolType", value)}
                            renderInput={(params) => <TextField {...params} label="Pool Type" variant="outlined"/>}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={QueryTags}
                            getOptionLabel={(option) => option.Tag}
                            filterSelectedOptions
                            onChange={(e, value) => updateFilterConstraint("tags", value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Tags"
                                    placeholder="Select Tags"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={QueryAllocationStrategies}
                            getOptionLabel={(option) => `${option.Name} (${option.Lang})`}
                            onChange={(e, value) => updateFilterConstraint("allocStrat", value)}
                            renderInput={(params) => <TextField {...params} label="Strategy"
                                                                placeholder="Select Strategy" variant="outlined"/>}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={QueryResourceTypes}
                            getOptionLabel={(option) => `${option.Name} (${option.Pools.length} pools)`}
                            onChange={(e, value) => updateFilterConstraint("resourceType", value)}
                            renderInput={(params) => <TextField {...params} label="Resource Type"
                                                                placeholder="Select Resource Type" variant="outlined"/>}
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default Filters