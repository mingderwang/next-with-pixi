import React from 'react';
import * as PIXI from "pixi.js";

class PixiComponent extends React.Component {
  gameCanvas = HTMLDivElement;
  app = PIXI.Application;

  constructor() {
    super();
  }

  componentDidMount() {
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight,
      {
        backgroundColor: 0x10bb99
      });
    this.gameCanvas.appendChild(this.app.view);
    // create a new Sprite from an image path
    var bunny = PIXI.Sprite.fromImage('static/images/cat.png')

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = this.app.screen.width / 2;
    bunny.y = this.app.screen.height / 2;

    this.app.stage.addChild(bunny);

    // Listen for animate update
    this.app.ticker.add(function (delta) {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      bunny.rotation += 0.1 * delta;
    });
    this.app.start();
  }

  componentWillUnmount() {
    this.app.stop();
  }

  render() {
    let component = this;
    return (
      <div ref={(thisDiv) => { component.gameCanvas = thisDiv }} />
    );
  }
}

export default PixiComponent;
