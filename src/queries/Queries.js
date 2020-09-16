// @flow
import * as axios from 'axios';
// import {graphql} from 'babel-plugin-relay/macro';

//resourcemanager/graphql/query
const BASIC_URL = 'http://0.0.0.0:5000/graphql/query';

const headers = {
    "x-tenant-id": "fb",
    "x-auth-user-role": "OWNER",
    "from": "fb-user@frinx.io"
};

export function fetchQuery(query) {
    return axios.post(
        BASIC_URL,
        {
            query,
        },
        {headers},
    );
}

export const queryAllocationStrats = `query queryAllocationStrats {
        QueryAllocationStrategies{
            ID
            Name
            Lang
            Script
        }
    }
    `;

export const createAllocationStrat = (name, lang, script) => {
    return (
        `mutation createAllocationStrat {
    CreateAllocationStrategy(
        name: "` +
        name +
        `",
        script: "` + script + `",
        lang: ` + lang + `,
    ){
        ID
        Name
        Lang
        Script
    }
}`
    );
};

export const queryAllPools = `query QueryAllPools {
    QueryResourcePools{
        ID
        Name
        PoolType
        Tags {
            ID
            Tag
        }
        AllocationStrategy {
            ID
            Name
            Lang
        }
        ResourceType {
            ID
            Name
        }
    }
}`;

export const queryFilterOptions = `query queryFilterOptions {
    QueryTags {
        ID
        Tag
        Pools {
            ID
            Name
        }
    },
    QueryAllocationStrategies{ 
        ID
        Name
        Lang
        Script
    },
    QueryResourceTypes {
      ID
      Name
      PropertyTypes {
            Name
            Type
        }
        Pools {
            ID
            Name
        }
    }
}`;

export const queryResourceTypes = `
  query queryResourceTypes {
    QueryResourceTypes {
      ID
      Name
      PropertyTypes {
            Name
            Type
        }
        Pools {
            ID
            Name
        }
    }
  }
`;

export const createNewResourceType = name => {
    return (
        `mutation createNewResourceType {
        CreateResourceType(
            resourceName: "` +
        name +
        `",
            resourceProperties: {
            vlan: "int"
        }
    ) {
            ID
            Name
        }
    }`
    );
};

export const createComplexResourceType = `mutation createComplexResourceType {
    CreateResourceType(
        resourceName: "complex",
        resourceProperties: {
        a: "int",
            b: "string"
    }
) {
        ID
        Name
    }
}`;

export const tagPool = (tagId, poolId) => `mutation TagPool {
    TagPool(tagId: ${tagId} , poolId: ${poolId}) {
        Tag
        Pools {
            ID
        }
    }
}`;

export const createSetPool = (resourceTypeId, poolName, description, poolValues, poolDealocationSafetyPeriod) => `mutation createSetPool {
    CreateSetPool(input: {
        resourceTypeId: ${resourceTypeId},
        poolName: "${poolName}",
        description: "${description}",
        poolValues: ${poolValues},
        poolDealocationSafetyPeriod: ${poolDealocationSafetyPeriod}
}){
        ID
        PoolType
        Name
    }
}`;

export const createAllocationPool = (resourceTypeId, poolName, description, allocationStrategyId, poolDealocationSafetyPeriod) => `mutation createAllocationPool {
    CreateAllocatingPool(input: {
        resourceTypeId: ${resourceTypeId},
        poolName: "${poolName}",
        description: "${description}",
        allocationStrategyId: ${allocationStrategyId},
        poolDealocationSafetyPeriod: ${poolDealocationSafetyPeriod}
}){
        ID
        PoolType
        Name
    }
}`;

export const createSingletonPool = (resourceTypeId, poolName, description, poolValues) => `mutation createSingletonPool {
    CreateSingletonPool(input: {
        resourceTypeId: ${resourceTypeId},
        poolName: "${poolName}",
        description: "${description}",
        poolValues: ${poolValues}
}){
        ID
        PoolType
        Name
    }
}`;

export const QueryAllPools = `query QueryAllPools {
    QueryResourcePools{
        ID
        Name
        PoolType
    }
}`;

export const ClaimResource = `mutation ClaimResource {
    ClaimResource(poolId:21474836480) {
        ID
        Properties
    }
}`;

export const ClaimResourceFromAllocatingPool = `mutation ClaimResourceFromAllocatingPool {
    ClaimResource(poolId:21474836481) {
        ID
        Properties
    }
}`;

export const QueryResources = `query QueryResources {
    QueryResources(poolId:21474836481){
        ID
        Properties
    }
}`;

export const deleteResourcePool = `mutation deleteResourcePool {
    DeleteResourcePool(resourcePoolId:21474836481)
}`;

export const deleteAllocationStrat = `mutation deleteAllocationStrat {
    DeleteAllocationStrategy(
        allocationStrategyId: 1,
){
        Name
    }
}`;
