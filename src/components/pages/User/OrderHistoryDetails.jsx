import { Typography } from '@mui/material';

function OrderHistoryDetails({ product }) {
    return (
        <div>
            <Typography>
                You last enjoyed:
            </Typography>
            <Typography>
                {product.name}
            </Typography>
            <Typography>
                {product.price}
            </Typography>
            <Typography>
                {product.quantity}
            </Typography>
        </div>
    );
}

export default OrderHistoryDetails;