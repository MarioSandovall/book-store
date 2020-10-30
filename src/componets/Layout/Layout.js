import React from "react";
import Container from "@material-ui/core/Container";

import Navbar from "../Navbar/Navbar";

function Layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      <Container fixed>{props.children}</Container>
    </React.Fragment>
  );
}

export default Layout;
