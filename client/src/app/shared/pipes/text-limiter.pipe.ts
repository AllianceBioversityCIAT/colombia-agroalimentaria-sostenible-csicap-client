import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimiter',
  standalone: true
})
export class TextLimiterPipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 20, ellipsis = '...'): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    return value.slice(0, limit) + ellipsis;
  }
}
