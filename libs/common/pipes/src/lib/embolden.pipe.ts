import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'embolden'
})
export class EmboldenPipe implements PipeTransform {
  transform(value: string, args?: number[]): any {
    const characters = value.split('');
    const emboldenCharacters = characters.map((c, i) => {
      if (args.includes(i)) {
        return `<strong>${c}</strong>`;
      } else {
        return c;
      }
    });

    return emboldenCharacters.join('');
  }
}
