import React from 'react';
import * as PIXI from "pixi.js";
import 'pixi-spine';

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
      console.log(delta);
    });

    var basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = 30;
    basicText.y = 90;

    this.app.stage.addChild(basicText);

    var style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    });

    var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
    richText.x = 30;
    richText.y = 180;

    this.app.stage.addChild(richText);

    // tiles
    var ASSET_PATHS = [
      "static/assets/roguelikeSheet_transparent.png"
    ]

    var loader = new PIXI.loaders.Loader()
    if (!loader.resources.dragon) {
      loader.add('dragon', ASSET_PATHS)
    }

    var texture1 = PIXI.utils.TextureCache["static/assets/roguelikeSheet_transparent.png"];

    var rect1 = new PIXI.Rectangle(0 * 17, 0 * 17, 16, 16);

    var sprite1 = new PIXI.Sprite(texture1);

    this.app.stage.addChild(sprite1);

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
