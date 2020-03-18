import { Component, OnInit, Input, Output } from '@angular/core';
import { Favoriet } from '@/_models/favoriet';
import { Vacature } from '@/_models/vacature';
import { Router } from '@angular/router';
import { FavoritesService } from '@/_services/Favorites/favorites.service';
import { User, Role } from '@/_models';
import { EventEmitter } from '@angular/core';
import { VacatureService } from '@/_services/Vacature/vacature.service';

@Component({
  selector: 'app-vacture-item',
  templateUrl: './vacture-item.component.html',
  styleUrls: ['./vacture-item.component.scss']
})
export class VactureItemComponent implements OnInit {
  liked = false;

  @Input() showTrashcan : boolean;
  @Input() showLike : boolean;
  @Input() favorite: Favoriet;
  @Input() currentUser: User;
  @Output() removeFavoriteEvent: EventEmitter<Favoriet> = new EventEmitter<Favoriet>();
  favorietId: number;
  vacature: Vacature;


  constructor(
    private router: Router,
    private favorietService: FavoritesService,
    private vacatureService : VacatureService) { }

  ngOnInit(): void {
    this.favorietId = this.favorite.id;
    this.vacature = this.favorite.vacature;
    if(this.favorietId != null){
      this.liked = true;
    }
  }

  

  detailClick(vacature){
    this.router.navigate(['/vacature-details'], { queryParams: { id: vacature.id }});

  }

  /**
   * @description delete vacature and do a callback to parent
   */
  delete(){
    this.vacatureService.deleteVacature(this.vacature.id).subscribe();
    this.removeFavoriteEvent.emit(this.favorite);
  }


  //handle liking and unliking a vacature
  onLike(){
    if(this.liked)
    {
      //set liked back to false
      this.liked = false;
      if(this.currentUser && this.currentUser.role == Role.User){
        this.favorietService.deleteFavorite(this.favorietId).subscribe(f => {
          this.favorite.id = null;
          this.favorietId = null;
        });
        //callback to parent to remove from list
        this.removeFavoriteEvent.emit(this.favorite);
      }
    }else{
      //set liked to true
      this.liked = true;
      if(this.currentUser && this.currentUser.role == Role.User){
        this.favorietService.addFavorite(this.currentUser.id, this.vacature.id).subscribe(f => {
          this.favorietId = f.id;
          this.favorite.id = f.id;
        });
        
      }
    }
  }

}
