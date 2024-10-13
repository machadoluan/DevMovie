import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetalisComponent } from '../detalis/detalis.component';

@Component({
  selector: 'app-more-movies',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './more-movies.component.html',
  styleUrl: './more-movies.component.scss'
})
export class MoreMoviesComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
) { }

  movies: any[] = [];
  categoryName: string = '';

  ngOnInit(): void {
    this.movies = this.data.movies;
    this.categoryName = this.data.categoryName;
    console.log(this.movies)
    console.log(this.categoryName)
  }

  detalis(movie: any) {

    // this.dialog.closeAll()

    this.dialog.open(DetalisComponent, {
      maxWidth: 800,
      maxHeight: 800,
      data: {
        banner: movie.backdrop_path,
        title: movie.title || movie.original_title,
        description: movie.overview,
        id: movie.id
      }
    })
  }

  close(){
    this.dialog.closeAll()
    
  }
}
