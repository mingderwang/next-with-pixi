import React from 'react';
import * as PIXI from "pixi.js";

class PixiComponent extends React.Component {
  gameCanvas = HTMLDivElement; 
  app = PIXI.Application;
  
  constructor() {
    super();
  }
  
  componentDidMount() {
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight);
    this.gameCanvas.appendChild(this.app.view);
    this.app.start();
  }
  
  componentWillUnmount() {
    this.app.stop();
  }
  
  render() {
    let component = this;
    return (
      <div ref={(thisDiv) => {component.gameCanvas = thisDiv}} />
    );
  }
}

export default PixiComponent;
