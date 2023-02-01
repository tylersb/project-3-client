import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material';
import {ListItemText} from '@mui/material';
import { useState } from 'react';

function Layout({children}) {
    const [anchor, setAnchor] = useState(false)
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setAnchor(open)
    }
     return ( 
    <>
    <div className="Layout">
        {/* open drawer */}
        <Button onClick={toggleDrawer(true)}>Sigh</Button>
        <Drawer 
        className="drawer"
        anchor='right'
        // variant='permanent'
        open={anchor}
        onClose={toggleDrawer(false)}
        sx={{
            width: "600px",
            height: "200px",
            background: "primary"}}
        >
            <div>
                <Typography variant='h5'>
                    Order Details
                </Typography>
            </div>
            <List>
                <ListItem>
                    <ListItemText primary="sucker"/>
                </ListItem>
            </List>
        </Drawer>

        {/* navbar */}


        {children}
    </div>
    </>
    );
}

export default Layout;