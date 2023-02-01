import AddProduct from "./AddProduct";
import Button from '@mui/material/Button';

function AddSection({addSection, setAddSection}) {
    return ( 
   <div>
    {addSection ?
    <AddSection/> :
    <Button>
        Add a Menu Section
    </Button>
    }
    </div>   
    );
}

export default AddSection;