import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userEmail!: string;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    // this.userEmail= JSON.parse (localStorage.getItem('user')).email;
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    this.userEmail = user ? user.email : null;
    // console.log('User email:', this.userEmail);

    this.isLoggedIn$=this.authService.isLoggedIn();

  }

  onLogout(){
    this.authService.logOut();
  }

}
