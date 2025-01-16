import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  monsters: Monster[] = [];

  currentIndex: number = 1;

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem('monsters', JSON.stringify(this.monsters));
  }

  private load() {
    const monsterData = localStorage.getItem('monsters');

    if (monsterData) {
      this.monsters = JSON.parse(monsterData).map(
        (monsterJson: any) => new Monster(monsterJson)
      );
      this.currentIndex = Math.max(...this.monsters.map((item) => item.id));
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    this.monsters.push(
      new Monster({
        id: this.currentIndex,
        name: 'Waboking',
        healthPoints: 60,
        figureCaption: 'Nº010 Waboking',
      })
    );

    this.currentIndex++;
    this.monsters.push(
      new Monster({
        id: this.currentIndex,
        name: 'Mogup',
        image: 'img/mogup.png',
        type: MonsterType.FIRE,
        healthPoints: 60,
        figureCaption: 'Nº011 Mogup',
      })
    );

    this.currentIndex++;
    this.monsters.push(
      new Monster({
        id: this.currentIndex,
        name: 'Ondilis',
        image: 'img/ondilis.png',
        type: MonsterType.WATER,
        healthPoints: 60,
        figureCaption: 'Nº012 Ondilis',
      })
    );

    this.currentIndex++;
    this.monsters.push(
      new Monster({
        id: this.currentIndex,
        name: 'Verdana',
        image: 'img/verdana.png',
        type: MonsterType.PLANT,
        healthPoints: 60,
        figureCaption: 'Nº013 Verdana',
      })
    );

    this.currentIndex++;
    this.monsters.push(
      new Monster({
        id: this.currentIndex,
        name: 'Clobivags',
        image: 'img/clobivags.png',
        type: MonsterType.WIND,
        healthPoints: 60,
        figureCaption: 'Nº014 Clobivags',
      })
    );
  }

  getAll() {
    return this.monsters.map((monster) => monster.copy());
  }

  getOne(id: number): Monster | undefined {
    const monster = this.monsters.find((elt) => elt.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    monsterCopy.id = this.currentIndex;
    this.currentIndex++;
    this.monsters.push(monsterCopy.copy());
    this.save();
    return monsterCopy;
  }

  update(monster: Monster) {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(
      (item) => item.id === monster.id
    );
    if (monsterIndex !== -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
    }
    this.save();
    return monsterCopy;
  }

  delete(id: number) {
    const monsterIndex = this.monsters.findIndex((item) => item.id === id);
    if (monsterIndex !== -1) {
      this.monsters.slice(monsterIndex, 1);
    }
    this.save();
  }
}
