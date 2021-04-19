import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { getRecomendadosApi } from "../../../api/ComensalApi";
import {Collapse} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import PopOverInfo from "../../Restaurant/PopOverInfo";
import {notification} from "antd/es";

const { Panel } = Collapse;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

var listData = [];

const Recomendados = () => {
  const classes = useStyles();

  const [stateInfo, setStateInfo] = useState([]);

  const mostrar = async () => {
    const result = await getRecomendadosApi();
    // eslint-disable-next-line
    if(result.message) {
      notification.info({
        message: result.message,
        placement: "bottomRight"
      })
    }else{
      if (stateInfo === "") {
        result.filter(function (el) {
          listData.push({
            userName: el.userName,
            phone: el.phone,
            photo: el.photo,
            administrator: el.administrator,
            presentation: el.presentation,
            code: el.code,
            email: el.email,
          });
          return null;
        });
        setStateInfo([...listData, ...stateInfo]);
      } else {
        console.log("no");
      }
    }

  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["0"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      className="site-collapse-custom-collapse"
      onChange={mostrar}
    >
      <Panel
        header="Recomendados"
        key="1"
        className="site-collapse-custom-panel"
      >
        <List className={classes.root}>
          {stateInfo.map((item) => (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={item.photo} />
              </ListItemAvatar>
              <ListItemText
                primary={item.userName}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      <br />
                    </Typography>
                    <PopOverInfo nombre={item.userName} color={"secondary"} />
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Panel>
    </Collapse>
  );
};

export default Recomendados;
