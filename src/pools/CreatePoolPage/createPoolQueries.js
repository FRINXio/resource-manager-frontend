import {createAllocationPool, createSetPool, createSingletonPool, fetchQuery} from "../../queries/Queries";

export const parseObject_toGraphQL = (obj) => {
    if (Array.isArray(obj)) {
        let parsedString = "["
        obj.map(o => {
            Object.keys(o).map(k => {
                if (Number.isInteger(o[k])) {
                    parsedString += `{${k}: ${o[k]}},`
                } else {
                    parsedString += `{${k}: "${o[k]}"},`
                }
            })
        })
        parsedString += "]"
        return parsedString
    }

    let parsedString = ""
    Object.keys(obj).map(k => {
        parsedString += `${k}: "${obj[k]}",`
    })
    return parsedString
}

export const createPool = (pool) => {
    console.log(pool)
    switch (pool.poolType) {
        case "set":
            return postCreateSetPool(pool);
        case "allocating":
            return postCreateAllocatingPool(pool);
        case "singleton":
            return postCreateSingletonPool(pool)
    }
}

export const postCreateSetPool = (pool) => {
    const {poolName, description, resourceType, dealocationPeriod, poolValues} = pool

    fetchQuery(createSetPool(resourceType.ID, poolName, description, parseObject_toGraphQL(poolValues), dealocationPeriod)).then(res => {
        console.log(res.data)
    }).catch(function (error) {
        console.log(error); //TODO error handling
    });
}

export const postCreateAllocatingPool = (pool) => {
    const {poolName, description, allocationStrategy, resourceType, dealocationPeriod} = pool

    fetchQuery(createAllocationPool(resourceType.ID, poolName, description, allocationStrategy.ID, dealocationPeriod)).then(res => {
        console.log(res.data)
    }).catch(function (error) {
        console.log(error); //TODO error handling
    });
}

export const postCreateSingletonPool = (pool) => {
    const {poolName, description, resourceType, poolValues} = pool

    fetchQuery(createSingletonPool(resourceType.ID, poolName, description, parseObject_toGraphQL(poolValues))).then(res => {
        console.log(res.data)
    }).catch(function (error) {
        console.log(error); //TODO error handling
    });
}