import { MonsterTypeProperties } from '../../utils/monster.utils';
import { Monster } from './../../models/monster.model';
import {
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-playing-card',
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css',
})
export class PlayingCardComponent  {
  monster: InputSignal<Monster> = input(new Monster());

  monsterTypeIcon: Signal<string> = computed(() => {
    return MonsterTypeProperties[this.monster().type].imageUrl;
  });

  backgroundColor: Signal<string> = computed(() => {
    return MonsterTypeProperties[this.monster().type].color;
  });


}
