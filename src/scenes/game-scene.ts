import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from './common';

// used for drawing out game objects for debugging our player input
const DEBUG = false;
// the scale factor that will be applied to our card image game objects
const SCALE = 1.5;
// the frame of the card spritesheet that represents the back of a card
const CARD_BACK_FRAME = 52;
// the x & y positions of were the foundation piles will be placed in our game area
const FOUNDATION_PILE_X_POSITIONS = [360, 425, 490, 555];
const FOUNDATION_PILE_Y_POSITION = 5;
// the x & y position of were the discard pile will be placed in our game area
const DISCARD_PILE_X_POSITION = 85;
const DISCARD_PILE_Y_POSITION = 5;
// the x & y position of were the draw pile will be placed in our game area
const DRAW_PILE_X_POSITION = 5;
const DRAW_PILE_Y_POSITION = 5;
// the x & y position of were the tableau pile will be placed in our game area
const TABLEAU_PILE_X_POSITION = 40;
const TABLEAU_PILE_Y_POSITION = 92;
// the starting frame of the card suit in the card spritesheet that represents the various cards
const SUIT_FRAMES = {
  HEART: 26,
  DIAMOND: 13,
  SPADE: 39,
  CLUB: 0,
};

export class GameScene extends Phaser.Scene {
  #drawPileCards!: Phaser.GameObjects.Image[];
  #discardPileCards!: Phaser.GameObjects.Image[];
  #foundationPileCards!: Phaser.GameObjects.Image[];
  #tableauContainers!: Phaser.GameObjects.Container[];
  constructor() {
    super({ key: SCENE_KEYS.GAME });
  }

  public create(): void {
    this.#createDrawPile();
    this.#createDiscardPile();
    this.#createFoundationPile();
    this.#createTableauPiles();
  }
  #createDrawPile(): void{
    this.#drawCardLocationBox(DRAW_PILE_X_POSITION,DRAW_PILE_Y_POSITION);
    this.#drawPileCards=[];
    for(let i=0;i<3;i++){
      this.#drawPileCards.push(this.#creatCard(DRAW_PILE_X_POSITION + i*5, DRAW_PILE_Y_POSITION));
    }
  }
  #drawCardLocationBox(x: number, y: number): void {
    this.add.rectangle(x,y,56,78).setOrigin(0).setStrokeStyle(2, 0x00000, 0.5);
  }
  #creatCard(x: number, y:number): Phaser.GameObjects.Image{
    return this.add.image(x,y,ASSET_KEYS.CARDS,CARD_BACK_FRAME).setOrigin(0).setScale(SCALE);
  }
  #createDiscardPile(): void{
    this.#drawCardLocationBox(DISCARD_PILE_X_POSITION,DISCARD_PILE_Y_POSITION);
    this.#discardPileCards = [];
    const bottomCard = this.#creatCard(DISCARD_PILE_X_POSITION,DISCARD_PILE_Y_POSITION).setVisible(false);
    const topCard = this.#creatCard(DISCARD_PILE_X_POSITION,DISCARD_PILE_Y_POSITION).setVisible(false);
    this.#discardPileCards.push(bottomCard,topCard);
  }
  #createFoundationPile(): void{
    this.#foundationPileCards = [];
    FOUNDATION_PILE_X_POSITIONS.forEach((x)=>{
      this.#drawCardLocationBox(x,FOUNDATION_PILE_Y_POSITION);
      const card=this.#creatCard(x,FOUNDATION_PILE_Y_POSITION).setVisible(false);
      this.#foundationPileCards.push(card);
    })
  }
  #createTableauPiles(): void{
    this.#tableauContainers = [];
    for(let i=0;i<7;i++){
      const x= TABLEAU_PILE_X_POSITION+i*85;
      const tableauContainer = this.add.container(x,TABLEAU_PILE_Y_POSITION,[]);
      this.#tableauContainers.push(tableauContainer);
      for(let j=0;j<i+1;j++){
      const cardObject = this.#creatCard(0,j*20);
      tableauContainer.add(cardObject);
      }
    }
  }
}
