import { Component, OnInit } from '@angular/core';

import { Product } from './models/product.model';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  template: `
  <!-- It allows render the content when you access to determinate path -->
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  imgParent = '';
  showImg = true;
  token: string = '';
  imgRendered = '';

  constructor(
    private userService: UsersService,
    private fileService: FileService,
    private authService: AuthService){}

  public ngOnInit(): void{
    // To keep the user in other components like the nav when the page is reloaded
    this.authService.profile().subscribe();
  }

  public createUser(){
    this.userService.create({email: 'luis@gmail.com', password: 'abc', name: 'Luis', role: 'customer'}).subscribe({
      next: (user) => console.log(user),
      error: () => console.error('Error')
    })
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  public downloadPdf(){
    this.fileService.getFile('myFile.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf').subscribe()
  }

  onUpload(event: Event){
    const eventTarget = event.target as HTMLInputElement;
    const file = eventTarget.files?.item(0);
    if(file){
      this.fileService.uploadFile(file).subscribe({
        next: res => this.imgRendered = res.location,
        error: () => console.error('Error')
      })
    }
  }
}

