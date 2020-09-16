import React, {useEffect, useState} from "react";
import Filters from "./Filters/Filters";
import PoolTable from "./Table/PoolTable";
import Grow from "@material-ui/core/Grow";
import {fetchQuery, queryAllPools, queryFilterOptions, tagPool} from "../../queries/Queries";
import {
    filterByPoolType,
    filterByQuery,
    filterByResourceType,
    filterByStrategy,
    filterByTags
} from "./Filters/filterUtils";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '20px',
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
    }
}));

const PoolsPage = (props) => {
    const classes = useStyles();
    const [poolArray, setPoolArray] = useState([]);
    const [filteredPoolArray, setFilteredPoolArray] = useState([])
    const [filterOptions, setFilterOptions] = useState({
        QueryAllocationStrategies: [],
        QueryResourceTypes: [],
        QueryTags: []
    })
    const [filterConstraints, setFilterConstraints] = useState({
        searchQuery: "",
        allocStrat: "",
        resourceType: "",
        tags: [],
        poolType: ""
    })

    const fetchData = () => {
        fetchQuery(queryAllPools).then(res => {
            setPoolArray(res.data.data.QueryResourcePools);
            setFilteredPoolArray(res.data.data.QueryResourcePools);
        }).catch(function (error) {
            console.log(error); //TODO error handling
        });

        fetchQuery(queryFilterOptions).then(res => {
            setFilterOptions(res.data.data)
        }).catch(function (error) {
            console.log(error); //TODO error handling
        });
    }

    // TODO: QueryRenderer should fetch the data child components should contain Fragments
    useEffect(() => {
        fetchData()
    }, []);

    // TODO filtering is performed locally on already fetched data, it should be probably handled by relay/graphql (?)
    useEffect(() => {
        const {searchQuery, tags, poolType, allocStrat, resourceType} = filterConstraints
        let results = filterByQuery(searchQuery, poolArray)
        results = filterByTags(tags, results)
        results = filterByPoolType(poolType, results)
        results = filterByStrategy(allocStrat, results)
        results = filterByResourceType(resourceType, results)

        setFilteredPoolArray(results);
    }, [filterConstraints]);

    const updateFilterConstraint = (key, value) => {
        setFilterConstraints({
            ...filterConstraints,
            [key]: value
        })
    }

    const assignTagToPool = (tag, poolId) => {
        fetchQuery(tagPool(tag.ID, poolId)).then(res => {
            fetchData()
        }).catch(function (error) {
            console.log(error); //TODO error handling
        });
    }

    return (
        <Container className={classes.container}>
            <div className={classes.wrapper}>
                <Typography component="div">
                    <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium">
                        Available Pools
                    </Box>
                </Typography>
                <div className={classes.btnContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        startIcon={<AddIcon/>}
                        onClick={() => props.setShowCreatePool(true)}
                    >
                        New
                    </Button>
                </div>
            </div>
            <Grow in={true} mountOnEnter unmountOnExit>
                <div>
                    <Filters {...filterOptions}
                             poolArray={poolArray}
                             filterConstraints={filterConstraints}
                             updateFilterConstraint={updateFilterConstraint}/>
                    <PoolTable QueryTags={filterOptions.QueryTags}
                               filteredPoolArray={filteredPoolArray}
                               assignTagToPool={assignTagToPool}/>
                </div>
            </Grow>
        </Container>
    )
}

export default PoolsPage