import React from "react";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.common.white
    }
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "20px",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    whiteCheckBox: {
        color: "white",
        '&$checked': {
            color: "white"
        },
        checked: {}
    }
}));

const PoolTable = ({poolArray}) => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <TableContainer component={Paper}>
                <Table ria-label="pool table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">
                                <Checkbox color="default" className={classes.whiteCheckBox}
                                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                                    // checked={rowCount > 0 && numSelected === rowCount}
                                    // onChange={onSelectAllClick}
                                    inputProps={{'aria-label': 'select all desserts'}}
                                />
                            </StyledTableCell>

                            <StyledTableCell align="left">Pool Name</StyledTableCell>
                            <StyledTableCell align="right">Tags</StyledTableCell>
                            <StyledTableCell align="right">Pool Type</StyledTableCell>
                            <StyledTableCell align="right">Alloc. Strategy (Lang.)</StyledTableCell>
                            <StyledTableCell align="right">Resource Type</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {poolArray.map((row) => (
                            <TableRow key={row.Name}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        // checked={isItemSelected}
                                        inputProps={{'aria-labelledby': row.Name}}
                                    />
                                </TableCell>
                                <TableCell align="left">{row.Name}</TableCell>
                                <TableCell align="right">{row.Tags.map((t) => <Chip size="small" label={t.Tag}
                                                                                    className={classes.chip}/>)}</TableCell>
                                <TableCell align="right">{row?.PoolType}</TableCell>
                                <TableCell align="right">
                                    {row.AllocationStrategy ? `${row.AllocationStrategy.Name} (${row.AllocationStrategy?.Lang})` : "-"}
                                </TableCell>
                                <TableCell align="right">{row.ResourceType.Name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default PoolTable