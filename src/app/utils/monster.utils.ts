export enum MonsterType {
  PLANT = 'plant',
  ELECTRIC = 'electric',
  FIRE = 'fire',
  WATER = 'water',
  WIND = 'wind',
}

export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: { [key: string]: IMonsterProperties } = {
  [MonsterType.PLANT]: {
    imageUrl: 'img/plant.png',
    color: 'rgba(67 175 57)',
  },
  [MonsterType.ELECTRIC]: {
    imageUrl: 'img/electric.png',
    color: 'rgb(255, 255, 104)',
  },
  [MonsterType.FIRE]: {
    imageUrl: 'img/fire.png',
    color: 'rgb(215 86 57)',
  },
  [MonsterType.WATER]: {
    imageUrl: 'img/water.png',
    color: 'rgb(37, 150, 200)',
  },
  [MonsterType.WIND]: {
    imageUrl: 'img/wind.png',
    color: 'rgb(168, 168, 173)',
  },
};
