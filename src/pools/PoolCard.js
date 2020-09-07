// @flow
import * as React from 'react';
import {fetchQuery, queryAllPools, queryFilterOptions} from '../queries/Queries';
import {useEffect, useState} from 'react';
import PoolTable from "./PoolTable";
import Filters from "./Filters";
import {filterByPoolType, filterByQuery, filterByResourceType, filterByStrategy, filterByTags} from "./filterUtils";

const PoolCard = () => {
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

    // TODO: QueryRenderer should fetch the data child components should contain Fragments
    useEffect(() => {
        fetchQuery(queryAllPools).then(res => {
            console.log('pools', res.data.data.QueryResourcePools);
            setPoolArray(res.data.data.QueryResourcePools);
            setFilteredPoolArray(res.data.data.QueryResourcePools);
        }).catch(function (error) {
            console.log(error); //TODO error handling
        });

        fetchQuery(queryFilterOptions).then(res => {
            console.log(res.data.data)
            setFilterOptions(res.data.data)
        }).catch(function (error) {
            console.log(error); //TODO error handling
        });
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
        console.log(key, value)
        setFilterConstraints({
            ...filterConstraints,
            [key]: value
        })
    }

    return (
        <>
            <Filters {...filterOptions} poolArray={poolArray}
                     updateFilterConstraint={updateFilterConstraint}/>
            <PoolTable poolArray={filteredPoolArray} />
        </>
    );
};

export default PoolCard
