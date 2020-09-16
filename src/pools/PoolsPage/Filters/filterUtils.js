import _ from "lodash";

export const filterByQuery = (searchQuery, array) => {
    return !searchQuery
        ? array
        : array.filter((e) => {
            let searchedKeys = ["Name", "PoolType"];

            for (let i = 0; i < searchedKeys.length; i += 1) {
                if (
                    e[searchedKeys[i]]
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLocaleLowerCase())
                ) {
                    return true;
                }
            }
            return false;
        });
}

export const filterByTags = (tags, array) => {
    return tags.length < 1
        ? array
        : array.filter((e) => {
            let selectedTags = tags.map(t => t.ID)
            let poolTags = e.Tags.map(t => t.ID)
            return _.difference(selectedTags, poolTags).length === 0;
        });
}

export const filterByPoolType = (poolType, array) => {
    return !poolType
        ? array
        : array.filter((e) =>
            e?.PoolType === poolType
        );
}

export const filterByStrategy = (strategy, array) => {
    return !strategy
        ? array
        : array.filter((e) =>
            e?.AllocationStrategy?.ID === strategy.ID
        );
}

export const filterByResourceType = (resourceType, array) => {
    return !resourceType
        ? array
        : array.filter((e) =>
            e?.ResourceType?.ID === resourceType.ID
        );
}