import { Component} from "@angular/core";
import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { Role } from '@/_models';



@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"]
})
export class VerifyComponent {
 
  loading: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(u => {
      
      //if user isn't logged in or his role isn't admin then return to home
      if (!u || u.role !== 'Admin') {
        this.router.navigate(["/"]);
      }
    });

  }
  

}
