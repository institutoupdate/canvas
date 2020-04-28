import React from "react";
import { withRouter, matchPath, Link } from "react-router-dom";

const logoNeg = require("images/impulsa-neg.svg");
const logoColor = require("images/impulsa-color.svg");

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }
  _setId(id) {
    this.setState({
      id: id.substr(1),
    });
  }
  _getPDFUrl(format) {
    const id = this.state.id || "default";
    return `/files/canvas-${id}-${format.toUpperCase()}.pdf`;
  }
  componentDidMount() {
    this._setId(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    this._setId(nextProps.location.pathname);
  }
  render() {
    const { location } = this.props;
    return (
      <header id="app-header">
        <div className="title">
          <h1>
            <Link to="/">
              <img className="neg" src={logoNeg.default} alt="Impulsa" />
              <img className="color" src={logoColor.default} alt="Impulsa" />
            </Link>
          </h1>
          <h2>
            <Link to="/">Canvas Eleitoral</Link>
          </h2>
        </div>
        <div className="divider" />
        {/* <nav className="header-nav">
          <Link to="/example">Veja um exemplo</Link>
        </nav> */}
        <nav className="download">
          <Link to={`${location.pathname}?download=1`}>
            <span className="fa fa-file-pdf-o" /> Baixar para impressão
          </Link>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
