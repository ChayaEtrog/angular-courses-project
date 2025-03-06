import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon',
  standalone: true
})
export class IconPipe implements PipeTransform {

  transform(text: string) {
    switch (text) {
      case ("join"):
        return "📥";
      case ("leave"):
        return "📤";
      default: return text;
    }

  }

}
