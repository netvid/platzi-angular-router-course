import { Component } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit{

  public onExit(){
    const res = confirm('From component. Are you sure do you want to exit?');
    return res;
  }



}
