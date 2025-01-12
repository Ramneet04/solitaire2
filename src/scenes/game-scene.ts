import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from './common';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.GAME });
  }

  public create(): void {
    this.add.image(0,0,ASSET_KEYS.CARDS,0).setOrigin(0);
  }
}
