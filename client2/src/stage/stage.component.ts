import {Component, ElementRef, Input, OnInit, Renderer} from '@angular/core';
import * as pixi from 'pixi.js';
import {DominoGraphics} from '../graphics/domino-graphics';

export interface Texture {
  name: string,
  src: string
}

export interface StageConfig {
  width?: number;
  height?: number;
  bg?: any;
}

@Component({
  selector: 'domino-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  private renderer: any;
  private stage: any;

  private textures: Texture[];

  @Input()
  private config: StageConfig = {};

  constructor(private el: ElementRef, private elRenderer: Renderer) {
  }

  /**
   * add textures for later loading
   * @param textures
   */
  public addTextures(...textures: Texture[]) {
    this.textures = this.textures || [];

    for(let texture of textures) {
      console.log(texture)
      this.textures.push(texture);
    }
  }

  ngOnInit() {

    this.configure();
    console.log("INITIALIZED")

    this.renderer = pixi.autoDetectRenderer(this.config.width, this.config.height);

    this.el.nativeElement.appendChild(this.renderer.view);
    this.stage = new pixi.Container();

    document.getElementById('pixi-component').appendChild(this.renderer.view);

    // set backgrond color
    this.renderer.backgroundColor = this.config.bg;

    this.renderer.render(this.stage);
  }

  /**
   * load all textures
   * @returns {Promise<T>}
   */
  public loadAllTextures() {

    return new Promise(
        (resolve, reject) => {

          this.textures.forEach(
              (texture: Texture) => {
                pixi.loader.add(texture.name, texture.src);
              }
          );

          pixi.loader.load(
              (result) => {
                this.textures = [];
                resolve(result);
              }
          );

        }
    );
  }

  public generateContainer() {
    return new pixi.Container();
  }

  /**
   * setup default config values
   */
  private configure() {
    this.config = {
      height: this.config.height ? this.config.height : 512,
      width: this.config.width ? this.config.width : 512,
      bg: this.config.bg ? this.config.bg : 0x000000,
    };
  }

  public getResource(name: string) {
    return pixi.loader.resources[name];
  }

  /**
   * create a child to stage by resource
   * @param name
   */
  createChildFromResource(name: string) {
    let child = new pixi.Sprite(pixi.loader.resources[name].texture);

    return child;
  }

  createText(text: string, styleDef: any) {
    var style = new PIXI.TextStyle(styleDef);

    var richText = new PIXI.Text(text, style);

    return richText;

  }

  removeChild(child) {
    this.stage.removeChild(child);
  }


  /**
   * update stage
   */
  public update() {
    this.renderer.render(this.stage);
  }

  /**
   * add a child
   * @param g
   */
  addGraphics(g: DominoGraphics) {
    this.stage.addChild(g.render());
    this.update();
  }

  /**
   * helper method to get the center of stage
   */
  getCenter() {
    return { x: this.config.width / 2, y: this.config.height / 2 };
  }
}
