import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function CardComponent({item, handleAddItem, handleRemoveItem, handleDelete, idx}) {
    return ( 
        <>
        <Card elevation={3}>
            <CardHeader
                action={<DeleteIcon onClick={() => { handleDelete(idx) }} />} 
                title={item.name} 
                subheader={item.price}
                />
                <CardContent>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="baseline"
                    spacing={1}
                >
                    <Typography>Quantity: </Typography>
                    <RemoveCircleOutlinedIcon onClick={() => { handleRemoveItem(idx, item.quantity) }} />
                    <p>{item.quantity}</p>
                    <AddCircleOutlinedIcon onClick={() => { handleAddItem(idx, item.quantity) }} />
                </Stack>
                <p>Items total: ${item.price * item.quantity}</p>
            </CardContent>
        </Card>
        </>
     );
}

export default CardComponent;