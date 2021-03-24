import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TablaMenu from "../../components/Restaurant/AgregarMenu";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    header: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
  }));

const EditMenu = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <TablaMenu/>
        </div>
    )

}

export default EditMenu