import React, { Component } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { withRouter, Link } from "react-router-dom";

const FORMATS = {
  A1: {
    size: "841x594mm",
    grid: [4, 2],
  },
  A2: {
    size: "594x420mm",
    grid: [2, 2],
  },
  A3: {
    size: "420x297mm",
    grid: [2, 1],
  },
};

const Container = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  overflow: auto;
  header {
    display: flex;
    align-items: center;
    margin: 0 0 2rem;
    .icon {
      width: 3rem;
      flex: 0 0 auto;
      margin: 0 2rem 0 1rem;
      font-size: 2em;
      color: #999;
    }
  }
  h2 {
    font-size: 1em;
    margin: 0;
    font-weight: 600;
  }
  p {
    color: #999;
    margin: 0;
    font-size: 0.9em;
  }
  .close {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  @media only screen and (max-width: 700px) {
    display: flex;
    header {
      margin: 0 1rem 2rem;
    }
  }
`;

const Content = styled.section`
  max-width: 600px;
  padding: 2rem;
  background: #222;
  color: #f0f0f0;
  margin: 4rem auto;
  box-shadow: 0 0 4rem rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  border: 1px solid #333;
  position: relative;
  z-index: 10;
  @media only screen and (max-width: 700px) {
    max-width: none;
    border-radius: 0;
    margin: 0;
    font-size: 0.9em;
    padding: 2rem 1rem 1rem;
    flex: 1 1 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .selector-container {
      flex: 1 1 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
    }
  }
`;

const Button = styled.a`
  background: #eb5023;
  color: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 7px;
  margin: 0;
  display: block;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  [data-icon] {
    margin-right: 1rem;
  }
  &:hover,
  &:active,
  &:focus {
    color: #fff;
  }
  ${(props) =>
    props.disabled &&
    css`
      background: #333 !important;
      color: #666 !important;
    `}
`;

const PaperSelector = styled.div`
  max-width: 500px;
  margin: 0 6rem;
  position: relative;
  &.has-format {
    .papers .paper-container .paper {
      opacity: 0.3;
      border-color: transparent;
    }
    .papers .paper-container.selected .paper {
      opacity: 1;
      background: rgba(255, 255, 255, 0.05);
      border-color: #e00a69;
      box-shadow: 0 0 0.6rem #e00a69;
    }
  }
  .papers {
    background: rgba(255, 255, 255, 0.05);
    position: relative;
    width: 100%;
    padding-top: 70.707%;
    .paper-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      &:nth-child(2) {
        width: 70.707%;
      }
      &:nth-child(3) {
        width: 50%;
      }
      &:focus,
      &:active,
      &:hover {
        .paper {
          background-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0.6rem #e00a69;
        }
      }
    }
    .paper {
      width: 100%;
      padding-top: 70%;
      border: 1px solid #e00a69;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
      transition: all linear 0.1s;
      .info {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        span {
          padding: 0.5rem;
        }
        .name {
          font-weight: 600;
          font-size: 1.2em;
          margin: 0 1rem;
        }
        .size {
          font-size: 0.8em;
          color: #666;
        }
      }
    }
  }
  @media only screen and (max-width: 700px) {
    margin: 0 auto;
    flex: 1 1 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const GridContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  .item {
    border-right: 1px dashed rgba(255, 255, 255, 0.2);
    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
  }
`;

const SelectOutput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  font-size: 0.9em;
  line-height: 1.2;
  label {
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: normal;
    input {
      margin: 0 1rem 0 0;
    }
  }
  @media only screen and (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    label {
      padding: 0 2rem 1rem;
    }
  }
`;

class Grid extends Component {
  render() {
    const { cols, rows, format } = this.props;
    const size = cols * rows;
    const width = 100 / cols;
    const height = 100 / rows;
    const style = {
      width: `${width}%`,
      height: `${height}%`,
    };
    return (
      <GridContainer>
        {Array.apply(null, Array(size)).map((value) => (
          <div key={value} className="item" style={style} />
        ))}
      </GridContainer>
    );
  }
}

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormat: "",
      tiled: false,
    };
  }
  _setFormat = (format) => (ev) => {
    ev.preventDefault();
    const { selectedFormat } = this.state;
    this.setState({
      selectedFormat: format == selectedFormat ? "" : format,
    });
  };
  _handleOutputChange = ({ target }) => {
    if (target.value == "tiled") {
      this.setState({ tiled: true });
    } else {
      this.setState({ tiled: false });
    }
  };
  _getUrl = () => {
    const id = this.props.id || "default";
    const { selectedFormat, tiled } = this.state;
    if (!selectedFormat) return "#";
    let filename = `canvas-${id}-${selectedFormat.toUpperCase()}`;
    if (tiled) {
      filename += "-A4";
    }
    return `/files/${filename}.pdf`;
  };
  _handleCloseClick = (ev) => {
    ev.preventDefault();
    const { onClose } = this.props;
    onClose && onClose();
  };
  render() {
    const { location } = this.props;
    const { tiled, selectedFormat } = this.state;
    return (
      <Container>
        <Link className="close" to={location.pathname} />
        <Content>
          <header>
            <div className="icon">
              <FontAwesomeIcon icon="file-download" />
            </div>
            <div className="text">
              <h2>Baixar para impressão</h2>
              <p>Escolha abaixo como deseja baixar em PDF:</p>
            </div>
          </header>
          <section className="selector-container">
            <PaperSelector className={selectedFormat ? "has-format" : ""}>
              <div className="papers">
                {Object.keys(FORMATS).map((format) => (
                  <div
                    tabIndex="-1"
                    key={format}
                    className={`paper-container ${
                      format == selectedFormat ? "selected" : ""
                    }`}
                    onClick={this._setFormat(format)}
                  >
                    <div className="paper">
                      {tiled && selectedFormat == format ? (
                        <Grid
                          cols={FORMATS[format].grid[0]}
                          rows={FORMATS[format].grid[1]}
                        />
                      ) : null}
                      <div className="info">
                        <span className="name">{format}</span>
                        <span className="size">{FORMATS[format].size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PaperSelector>
            <SelectOutput>
              <label>
                <input
                  type="radio"
                  name="output"
                  checked={!tiled}
                  onChange={this._handleOutputChange}
                  value="full"
                />
                Formato completo
              </label>
              <label>
                <input
                  type="radio"
                  name="output"
                  checked={tiled}
                  onChange={this._handleOutputChange}
                  value="tiled"
                />
                Recortar para{" "}
                {selectedFormat
                  ? FORMATS[selectedFormat].grid[0] *
                    FORMATS[selectedFormat].grid[1]
                  : ""}{" "}
                folhas em tamanho A4
              </label>
            </SelectOutput>
          </section>
          <Button disabled={!selectedFormat} href={this._getUrl()}>
            <FontAwesomeIcon icon="file-pdf" />
            {!selectedFormat ? (
              "Selecione um formato"
            ) : (
              <span>
                Baixar em formato {selectedFormat}{" "}
                {tiled ? "recortado" : "completo"}
              </span>
            )}
          </Button>
        </Content>
      </Container>
    );
  }
}

export default withRouter(Download);
