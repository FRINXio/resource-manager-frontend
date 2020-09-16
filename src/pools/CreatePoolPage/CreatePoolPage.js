import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {fetchQuery, queryFilterOptions} from "../../queries/Queries";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {createPool} from "./createPoolQueries";
import List from "@material-ui/core/List";
import _ from "lodash";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";


// ENUM : probably query in future (?)
const POOL_TYPES = ["set", "allocating", "singleton"]

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '20px',
    },
    paper: {
        padding: "50px",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    btnContainer: {
        marginLeft: "20px"
    },
    buttons: {
        margin: theme.spacing(0.5),
    },
    wrapper: {
        display: "flex",
        alignItems: "center"
    },
    resourceTypes: {
        '& .MuiTextField-root': {
            marginRight: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
    },
    resourceList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    resourceListButtons: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    }
}));

const CreatePoolPage = (props) => {
    const classes = useStyles()
    const [poolName, setPoolName] = useState("")
    const [description, setDescription] = useState("")
    const [poolType, setPoolType] = useState("set")
    const [allocationStrategy, setAllocationStrategy] = useState(null)
    const [resourceType, setResourceType] = useState(null)
    const [dealocationPeriod, setDealocationPeriod] = useState(0)
    const [poolValues, setPoolValues] = useState([])
    const [selectors, setSelectors] = useState({
        QueryAllocationStrategies: [],
        QueryResourceTypes: [],
        QueryTags: []
    })

    useEffect(() => {
        fetchQuery(queryFilterOptions).then(res => {
            setSelectors(res.data.data)
        }).catch(function (error) {
            console.log(error); //TODO error handling
        });
    }, [])

    const createNewPool = () => {
        const pool = {
            poolName,
            description,
            poolType,
            allocationStrategy,
            resourceType,
            dealocationPeriod,
            poolValues: [{vlan: 13}, {vlan: 14},]
        }
        createPool(pool)
    }

    const renderDealocationPeriod = () => {
        return (
            <Grid item xs={3}>
                <TextField
                    id="standard-full-width"
                    label="Dealocation safety period"
                    fullWidth
                    required
                    value={dealocationPeriod}
                    onChange={(e) => setDealocationPeriod(e.target.value)}
                    defaultValue={0}
                    type="number"
                    inputProps={{min: 0, step: 1000}}
                />
            </Grid>
        )
    }

    const renderAllocationStrategy = () => {
        return (
            <Grid item xs={3}>
                <Autocomplete
                    id="combo-box-demo"
                    options={selectors.QueryAllocationStrategies}
                    value={allocationStrategy}
                    getOptionLabel={(option) => option.Name}
                    onChange={(e, value) => setAllocationStrategy(value)}
                    renderInput={(params) => <TextField {...params} label="Allocation Strategy" required
                                                        placeholder="Select Allocation Strategy"/>}
                />
            </Grid>
        )
    }

    const handleAddResource = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        let newProperties = resourceType?.PropertyTypes.map(pt => {
            return {
                name: data.get(`propertyName-${pt.Name}`),
                value: data.get(`propertyValue-${pt.Name}`)
            }
        })

        setPoolValues(oldValues => [...oldValues, ...newProperties])
    }

    const addResourceForm = () => {
        return (
            <form autoComplete="off" onSubmit={handleAddResource}>
                <Grid container item xs={12} spacing={3}>
                    {resourceType?.PropertyTypes.map(pt =>
                        <>
                            <Grid item xs={6} key={`propertyName-${pt.Name}`}>
                                <TextField
                                    name={`propertyName-${pt.Name}`}
                                    label="Property Name"
                                    defaultValue={pt.Name}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} key={`propertyValue-${pt.Name}`}>
                                <TextField
                                    name={`propertyValue-${pt.Name}`}
                                    label={`Property Type (${pt?.Type})`}
                                    type={pt?.Type === "int" ? "number" : "text"}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" size="large">Add</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

    const resourceList = () => {
        const groupedResources = _.groupBy(poolValues, 'name')

        return (
            <List className={classes.resourceList} subheader={<li/>}>
                {Object.keys(groupedResources).map((propertyName) => (
                    <li key={`section-${propertyName}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>{propertyName}</ListSubheader>
                            {groupedResources[propertyName].map((item) => (
                                <ListItem key={`item-${propertyName}-${item}`} dense button onClick={null}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={item.value}/>
                                    <ListItemSecondaryAction>
                                        <ListItemText secondary="claimed"/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </List>
        )
    }

    const POOL_SPECIFIC = {
        set: [renderDealocationPeriod()],
        allocating: [renderDealocationPeriod(), renderAllocationStrategy()],
        singleton: []
    }

    return (
        <Container className={classes.container}>
            <div className={classes.wrapper}>
                <Typography component="div">
                    <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium">
                        Create New Pool
                    </Box>
                </Typography>
                <div className={classes.btnContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        startIcon={<SaveIcon/>}
                        onClick={createNewPool}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.buttons}
                        onClick={() => props.setShowCreatePool(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
            <Grow in={true} mountOnEnter unmountOnExit>
                <div>
                    <Paper elevation={2} className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    id="standard-full-width"
                                    label="Pool Name"
                                    value={poolName}
                                    onChange={(e) => setPoolName(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={POOL_TYPES}
                                    value={poolType}
                                    getOptionLabel={(option) => option}
                                    onChange={(e, value) => setPoolType(value)}
                                    renderInput={(params) => <TextField {...params} label="Pool Type" required
                                                                        placeholder="Select Pool Type"/>}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={selectors.QueryResourceTypes}
                                    value={resourceType}
                                    getOptionLabel={(option) => option.Name}
                                    onChange={(e, value) => {
                                        setResourceType(value);
                                        setPoolValues([])
                                    }}
                                    renderInput={(params) => <TextField {...params} required label="Resource Type"
                                                                        placeholder="Select Resource Type"/>}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="standard-full-width"
                                    label="Description (optional)"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    fullWidth
                                    multiline
                                />
                            </Grid>
                            {POOL_SPECIFIC[poolType]?.map(ps => ps)}
                        </Grid>
                    </Paper>
                    <Paper elevation={2} className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={7}>
                                <div style={{marginBottom: "30px"}}>
                                    <Typography component="div">
                                        <Box fontSize="h5.fontSize" fontWeight="fontWeightMedium">
                                            Resources
                                        </Box>
                                    </Typography>
                                </div>
                                {resourceType ? addResourceForm() : "No resource type selected"}
                            </Grid>
                            <Grid item xs={5}>
                                <div className={classes.resourceListButtons}>
                                    <Button variant="contained" size="small">Remove</Button>
                                </div>
                                {resourceType ? resourceList() : null}
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </Grow>
        </Container>
    )
}

export default CreatePoolPage