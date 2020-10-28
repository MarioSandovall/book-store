import React from 'react'
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

function ToolBar() {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6">
                    Book Store
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ToolBar