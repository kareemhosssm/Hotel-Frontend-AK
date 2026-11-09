import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject: any[], klma: string): any[] {
    
    return arrayOfObject.filter(item => item.type.toLowerCase().includes(klma.toLowerCase()));
  }

}
