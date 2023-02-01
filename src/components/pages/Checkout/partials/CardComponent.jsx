import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


function CardComponent({ item, handleAddItem, handleRemoveItem, handleDelete, idx }) {
    return (
        <>
            <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    <DeleteIcon onClick={() => { handleDelete(idx) }} />
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="baseline"
                        spacing={1}
                    >
                        <RemoveCircleOutlinedIcon onClick={() => { handleRemoveItem(idx, item.quantity) }} />
                        <Typography>{item.quantity}</Typography>
                        <AddCircleOutlinedIcon onClick={() => { handleAddItem(idx, item.quantity) }} />
                    </Stack>
                </TableCell>
                <TableCell align="right">Subtotal: ${item.price * item.quantity}</TableCell>
            </TableRow>
        </>
    );
}



export default CardComponent;