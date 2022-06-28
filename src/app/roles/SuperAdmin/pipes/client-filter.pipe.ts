import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform {

  transform(data:any, searchValue:string): any[] {
    
    if(!data || !searchValue){
      return data;
    }

    return data.filter(client => 
    client.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || 
    client.contact_number.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    client.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    client.address.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    client.status.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) 
    )
  }

}
