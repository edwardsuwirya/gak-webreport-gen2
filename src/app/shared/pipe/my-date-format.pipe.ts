import { Pipe, PipeTransform } from '@angular/core';

declare var moment: any;

@Pipe({
  name: 'myDateFormat'
})
export class MyDateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format(args);
  }

}
