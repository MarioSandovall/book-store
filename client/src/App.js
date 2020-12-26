import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./componets/Layout/Layout";
import Home from "./pages/Home/Home";
import Book from "./pages/Book/Book";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Book} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
