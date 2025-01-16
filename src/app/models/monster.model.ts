import { MonsterType } from '../utils/monster.utils';

export class Monster {
  id: number = -1;
  name: string = 'Monster';
  image: string = 'img/wago.png';
  type: MonsterType = MonsterType.ELECTRIC;
  healthPoints: number = 80;
  figureCaption: string = 'Nº 001 Monster';
  attackName: string = 'Standard Attack';
  attackStrength: number = 80;
  attackDescription: string = 'This is a simple attack description...';

  constructor(init?: Partial<Monster>) {
    Object.assign(this, init);
  }

  copy(): Monster {
    return new Monster(this);
  }
}
