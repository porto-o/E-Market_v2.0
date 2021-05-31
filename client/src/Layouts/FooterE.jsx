import React from "react";
import {
  GithubOutlined,
  AndroidOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  DesktopOutlined,
  PartitionOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

export default function FooterE() {
  return (
    <div className="main-footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            {/*Column 1*/}
            <div className="col-md-5 col-sm-6">
              <h4>Desarrolladores</h4>
              <ul className="list-unstyled">
                <li>Ismael Porto García</li>
                <li>Porfirio Damian Escamilla Huerta</li>
                <li>Angel Said García Piedra</li>
                <li>Nadia Ximena Elizalde Olmedo</li>
              </ul>
            </div>
            {/*Column 2*/}
            <div className="col-md-4 col-sm-6">
              <h4>Tecnologías</h4>
              <ul className="list-unstyled">
                <li>
                  MongoDB <DatabaseOutlined />
                </li>
                <li>
                  ExpressJS <CloudServerOutlined />
                </li>
                <li>
                  ReactJS <DesktopOutlined />
                </li>
                <li>
                  NodeJS <PartitionOutlined />
                </li>
              </ul>
            </div>
            {/*Column 4*/}
            <div className="col-md-3 col-sm-6">
              <h4>Otros</h4>
              <ul className="list-unstyled">
                <li>
                  <Button
                    style={{ backgroundColor: "transparent", border: "0" }}
                    target="_blank"
                    href="https://github.com/portocreator/E-Market_v2.0"
                  >
                    <GithubOutlined />
                  </Button>{" "}
                </li>
                <li>
                  <Button
                    style={{ backgroundColor: "transparent", border: "0" }}
                    target="_blank"
                    href="https://emarket3.goodbarber.app/"
                  >
                    <AndroidOutlined /> <AppleOutlined />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} E-Market - Todos los derechos
              reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
