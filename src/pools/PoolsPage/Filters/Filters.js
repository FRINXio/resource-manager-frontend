import React from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "20px",
    }
}));

const getPoolTypes = (poolArray) => {
    return [...new Set(poolArray.map(pool => pool.PoolType))]
}

const Filters = ({QueryAllocationStrategies, QueryResourceTypes, QueryTags, poolArray, updateFilterConstraint, filterConstraints}) => {
    const classes = useStyles()

    return (
        <Grid container spacing={3} className={classes.container}>
            <Grid item xs={9}>
                <TextField
                    placeholder="Search pools"
                    variant="outlined"
                    fullWidth
                    value={filterConstraints.searchQuery}
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
                    value={filterConstraints.poolType}
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
                    value={filterConstraints.tags}
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
                    value={filterConstraints.allocStrat || null}
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
                    value={filterConstraints.resourceType || null}
                    getOptionLabel={(option) => `${option.Name} (${option.Pools.length} pools)`}
                    onChange={(e, value) => updateFilterConstraint("resourceType", value)}
                    renderInput={(params) => <TextField {...params} label="Resource Type"
                                                        placeholder="Select Resource Type" variant="outlined"/>}
                />
            </Grid>
        </Grid>
    )
}

export default Filters