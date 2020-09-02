// @flow
import type {WithStyles} from '@material-ui/core';

import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';
import AceEditor from 'react-ace';

import {motion} from 'framer-motion';
import Card from "@material-ui/core/Card";
import {Code} from "@material-ui/icons";
import CodeEditor from "../configure/CodeEditor";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {createAllocationStrat, fetchQuery, queryAllocationStrats} from "../queries/Queries";

const styles = theme => ({
});

type Props = {
    children: React.ChildrenArray<null | React.Element<*>>,
    className?: string,
} & WithStyles<typeof styles>;

const AddEditStrategy = (props: Props) => {
    const {className, classes} = props;
    const [name, setName] = useState('');

    const onNameChanged = (val) => {
        setName(val.target.value)
    }

    const script = `function invoke() {log(JSON.stringify({respool: resourcePool.ResourcePoolName, currentRes: currentResources}));return {vlan: userInput.desiredVlan};}`
    const lang = `js`

    const createStrategy = () => {
        fetchQuery(createAllocationStrat(name, lang, script)).then(val => {
            console.log(val)
        });
    }

    return (
        <div>
            <Card>
                <TextField label="NAME" onChange={onNameChanged} />
            </Card>
            <Card>
                <CodeEditor />
            </Card>
            <div>
                <Button onClick={createStrategy}>Save</Button>
            </div>
        </div>

    );
};

export default withStyles(styles)(AddEditStrategy);
