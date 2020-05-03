import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter, matchPath, Link } from "react-router-dom";

const logoNeg = require("images/impulsa-neg.svg");
const logoColor = require("images/impulsa-color.svg");

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      menu: false,
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
  _toggleMenu = (ev) => {
    ev.preventDefault();
    this.setState({
      menu: !this.state.menu,
    });
  };
  _handleLinkClick = (ev) => {
    this.setState({
      menu: false,
    });
  };
  _getTitle = () => {
    const { location } = this.props;
    return location.pathname.replace("/", "") || "Eleitoral";
  };
  componentDidMount() {
    this._setId(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    this._setId(nextProps.location.pathname);
  }
  render() {
    const { location } = this.props;
    const { menu } = this.state;
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
            <Link to={location.pathname}>Canvas {this._getTitle()}</Link>
          </h2>
        </div>
        <div className="divider" />
        <div className="header-content">
          <a className="menu-toggle" href="#" onClick={this._toggleMenu}>
            <FontAwesomeIcon icon="bars" />
          </a>
          <nav className="download">
            <Link to={`${location.pathname}?download=1`}>
              <FontAwesomeIcon icon="file-pdf" /> Baixar para impressão
            </Link>
          </nav>
          <nav className={menu ? "header-nav active" : "header-nav"}>
            <div className="header-nav-content">
              <Link to="/" onClick={this._handleLinkClick}>
                Eleitoral
              </Link>
              <Link to="/persona" onClick={this._handleLinkClick}>
                Persona
              </Link>
              <Link to="/identidade" onClick={this._handleLinkClick}>
                Identidade
              </Link>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
