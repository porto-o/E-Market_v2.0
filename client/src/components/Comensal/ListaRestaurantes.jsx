import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TablaListRestaurantes from "./TablaListRestaurantes";

export default function ListaRestaurantes(props) {
  return (
    <Router>
      <TablaListRestaurantes />
    </Router>
  );
}
