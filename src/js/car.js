import { Actor, Vector, Engine, Keys, Scene, clamp, Color} from "excalibur";
import { ResourceLoader ,Resources} from "./resources"
import { Block } from "./block";
import { Ending } from "./scenes/ending";
import { Level1 } from "./scenes/level1";
import { Coin } from "./coin";

let speed = 0

export class Car extends Actor {
  skoor = 0
  constructor(skoor){
    super({radius: Resources.Car.height/2})
    this.skoor = skoor
  }
    onInitialize(engine){
        this.graphics.use(Resources.Car.toSprite())
        this.pos.x = engine.drawWidth / 4
        this.pos.y = engine.drawHeight / 2
        this.pos = new Vector(400, 400);
        this.vel = new Vector(0, 0);
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event){
      if (event.other instanceof Block) {
        this.scene.transitionScene();
      }
      if (event.other instanceof Coin) {
        this.scene.addPoint()
      }
  }

    onPreUpdate(engine) {
     
      if (speed > 0){
        speed = speed - (1.7 + 0.01*speed);
      }

        if (engine.input.keyboard.isHeld(Keys.W)) {
          speed += 10;
        }

        if (engine.input.keyboard.isHeld(Keys.S)) {
          speed -= 6;
        }
    
        if (engine.input.keyboard.isHeld(Keys.D)) {
          this.rotation += speed * 0.00016;
        }
        if (engine.input.keyboard.isHeld(Keys.A)) {
          this.rotation -=  speed * 0.00016;
        }
        if (engine.input.keyboard.isHeld(Keys.Space)) {
          this.pos = new Vector(400, 400);
          this.vel = new Vector(0, 0);
          speed = 0
          this.rotation = 0
        }

        let direction = new Vector(
          Math.cos(this.rotation) * speed,
          Math.sin(this.rotation) * speed
        );
    
        this.vel = direction;
        this.pos.x = clamp(50, this.pos.x, 1550);
        this.pos.y = clamp(50, this.pos.y, 850);    
      }
      
}