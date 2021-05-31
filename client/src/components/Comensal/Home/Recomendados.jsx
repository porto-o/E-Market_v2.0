import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { getRecomendadosApi } from "../../../api/ComensalApi";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import PopOverInfo from "../../Restaurant/PopOverInfo";
import { notification } from "antd/es";

const { Panel } = Collapse;

let userNames, phone, photo, admin, presentation, code, email;
let arrayUserNames = [];
let arrayPhone = [];
let arrayPhoto = [];
let arrayAdmin = [];
let arrayPresentation = [];
let arrayCode = [];
let arrayEmail = [];

export default class Recomendados extends Component {
  state = {
    stateInfo: [],
  };

  componentDidMount() {
    this.getRecomendados();
  }

  getRecomendados = async () => {
    var stateInfo = [];
    const result = await getRecomendadosApi();
    if (result.message) {
      notification.info({
        message: result.message,
        placement: "bottomRight",
      });
    } else {
      // eslint-disable-next-line
      if (this.state.stateInfo == "") {
        result.filter(function (el) {
          userNames = el.userName;
          phone = el.phone;
          photo = el.photo;
          admin = el.administrator;
          presentation = el.presentation;
          code = el.codeRes;
          email = el.email;
          arrayUserNames.push(userNames);
          arrayPhone.push(phone);
          arrayPhoto.push(photo);
          arrayAdmin.push(admin);
          arrayPresentation.push(presentation);
          arrayCode.push(code);
          arrayEmail.push(email);
          return null;
        });

        for (let i = 0; i < arrayUserNames.length; i++) {
          const data = {
            key: arrayUserNames[i],
            userName: arrayUserNames[i],
            phone: arrayPhone[i],
            photo: arrayPhoto[i],
            admin: arrayAdmin[i],
            presentation: arrayPresentation[i],
            code: arrayCode[i],
            email: arrayEmail[i],
          };
          stateInfo.push(data);
        }
        this.setState({ stateInfo });
      }
    }
  };

  render() {
    return (
      <div>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header="Recomendados"
            key="1"
            className="site-collapse-custom-panel"
          >
            <List>
              {this.state.stateInfo.map((item) => (
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
                          color="textPrimary"
                        >
                          <br />
                        </Typography>
                        <PopOverInfo
                          nombre={item.userName}
                          color={"secondary"}
                        />
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Panel>
        </Collapse>
      </div>
    );
  }
}
