import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";

import React from "react";

import { withRouter, Switch, Route, useLocation } from "react-router-dom";

import NotFound from "components/NotFound.jsx";
import Header from "components/Header.jsx";
import Footer from "components/Footer.jsx";

import Canvas from "components/Canvas.jsx";
import Download from "components/Download.jsx";

import "styles/canvas.less";
import "styles/main.less";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }
  componentDidUpdate() {
    this.containerRef.current.scrollTop = 0;
  }
  render() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    let appStyle = {};
    let className = "container";
    if (query.get("download")) {
      appStyle = { overflow: "hidden" };
      className += " download";
    }
    return (
      <div className="container" className={className}>
        <Header />
        <div className="app-container" ref={this.containerRef} style={appStyle}>
          <Switch>
            <Route exact path="/" component={Canvas} />
            <Route
              exact
              path="/:id"
              strict
              render={({ match }) => {
                if (!/\b[0-9a-f]{5,40}\b$/.test(match.params.id)) {
                  return <NotFound />;
                }
                return <Canvas />;
              }}
            />
            <Route component={NotFound} />
          </Switch>
          {query.get("download") ? <Download /> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
