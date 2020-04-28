import React from "react";

const iconNeg = require("images/impulsa-icon-neg.svg");
const iconColor = require("images/impulsa-icon-color.svg");

export default class Footer extends React.Component {
  render() {
    return (
      <footer id="app-footer">
        <p>
          <img className="neg" src={iconNeg.default} alt="Impulsa" />
          <img className="color" src={iconColor.default} alt="Impulsa" />
          <a href="https://impulsa.voto">https://impulsa.voto</a>
        </p>
        <p>
          <span className="fa fa-github" />
          <a href="https://github.com/institutoupdate/canvas">
            https://github.com/institutoupdate/canvas
          </a>
        </p>
      </footer>
    );
  }
}
