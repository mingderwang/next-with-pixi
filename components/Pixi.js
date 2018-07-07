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

//load an image and run the `setup` function when it's done
PIXI.loader
  .add("images/cat.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  let cat = new PIXI.Sprite(PIXI.loader.resources["static/images/cat.png"].texture);

  //Add the cat to the stage
  app.stage.addChild(cat);
}
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
