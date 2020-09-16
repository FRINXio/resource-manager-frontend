import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "inline-block"
    }
}));

export default function AddTagMenu({allTags, assignTagToPool, poolId}) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);
        console.log(option)
        option.ID && assignTagToPool(option, poolId)
    };

    return (
        <div className={classes.root}>
            <Chip size="small" icon={<AddIcon/>} variant="outlined" clickable onClick={handleClick}/>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "220px",
                    },
                }}
            >
                <MenuItem disabled >
                    {allTags.length > 0 ? "Start typing..." : "No tags available"}
                </MenuItem>
                {allTags.map((tag) => (
                    <MenuItem key={tag.ID} onClick={() => handleClose(tag)}>
                        {tag.Tag}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}