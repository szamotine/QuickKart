import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'contractname' })
export class ContractNamePipe implements PipeTransform{
  transform(name: string): string {
    let temp: string = "";

    temp += name.charAt(0).toUpperCase();

    for (let i = 1; i < name.length; i++) {
      if (name.charAt(i)== ' ') {
        temp += " " + name.charAt(i + 1).toUpperCase();
      }
    }

    return temp;
  }

}
