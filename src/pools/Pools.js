import * as React from 'react';
import {useState} from 'react';
import PoolsPage from "./PoolsPage/PoolsPage";
import CreatePoolPage from "./CreatePoolPage/CreatePoolPage";

// TODO remove when router is implemented => CreatePoolPage and PoolsPage should be individual routes with Header in each of them
const Pools = () => {
    const [showCreatePool, setShowCreatePool] = useState(false);

    return (
        <>
            {showCreatePool ?
                <CreatePoolPage setShowCreatePool={setShowCreatePool}/> :
                <PoolsPage setShowCreatePool={setShowCreatePool}/>
            }
        </>
    );
};

export default Pools
