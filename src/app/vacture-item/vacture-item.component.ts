import { Component, OnInit, Input, Output } from '@angular/core';
import { Favoriet } from '@/_models/favoriet';
import { Vacature } from '@/_models/vacature';
import { Router } from '@angular/router';
import { FavoritesService } from '@/_services/Favorites/favorites.service';
import { User, Role } from '@/_models';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vacture-item',
  templateUrl: './vacture-item.component.html',
  styleUrls: ['./vacture-item.component.scss']
})
export class VactureItemComponent implements OnInit {
  liked = false;

  @Input() favorite: Favoriet;
  @Input() currentUser: User;
  @Output() removeEvent: EventEmitter<Favoriet> = new EventEmitter<Favoriet>();
  favorietId: number;
  vacature: Vacature;
  
  

  constructor(
    private router: Router,
    private favorietService: FavoritesService) { }

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

  onLike(){
    if(this.liked)
    {
      this.liked = false;
      if(this.currentUser && this.currentUser.role == Role.User){
        this.favorietService.deleteFavorite(this.favorietId).subscribe();
        this.removeEvent.emit(this.favorite);
      }
      //deletefavorite(vacature.id, currentUser.id)
    }else{
      this.liked = true;
      if(this.currentUser && this.currentUser.role == Role.User){
        this.favorietService.addFavorite(this.currentUser.id, this.vacature.id).subscribe();
        
      }
    }
  }

}
