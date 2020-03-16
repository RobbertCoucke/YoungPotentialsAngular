import { Component, OnInit } from '@angular/core';
import { User, Role } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { UploadService } from '@/_services/upload/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  submitted = false;
  error = '';
  currentUser : User;
  isStudent : boolean;
  profiel: any;
  uploadFile : any;
  loading: boolean = true;

  constructor(private userservice: UserService, private authenticatieService: AuthenticationService,
    private router: Router, private uploadService: UploadService){
  }

  ngOnInit() {

    console.log(this.currentUser);
    if (this.authenticatieService.currentUserValue == null) { 
      alert("Nice try, hackerman. :)");
      this.router.navigate(['/']);
    }else{
      this.authenticatieService.currentUser.subscribe(x => {
        if(x.role == Role.Admin)
        {
          alert("Nice try, hackerman. :)");
          this.router.navigate(['/']);
        }else{
          console.log(x);
          this.currentUser=x;
          this.userservice.getById(this.currentUser.id).subscribe(data => {
            console.log(data);
            this.isStudent=data.isStudent;
            this.profiel = data;
            console.log(this.profiel);
            this.loader(this.profiel);
            });
    
          this.uploadService.getFilePath(true,this.currentUser.id).subscribe(p => {
            if(p != null){
    
            this.uploadFile = p.path;
            }
          });
        }
      });

    } 
  }



  loader(x)
  {
    this.loading = false;
  }
  
  handleUpload(formData: FormData){
    formData.set("isUser", 'true');
    formData.set("id", this.currentUser.id.toString());
    this.uploadService.upload(formData).subscribe(p => {
    var file : any = formData.get('file');
    this.uploadFile = file.name;
    console.log(file.name);
    });
  }

  removeFile(){
    this.uploadService.delete(true, this.currentUser.id).subscribe(p => {
      this.uploadFile = null;
    })

  }
}
