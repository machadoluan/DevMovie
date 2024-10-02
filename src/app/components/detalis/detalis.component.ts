import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MovieApiService } from '../../service/movie-api.service';


@Component({
  selector: 'app-detalis',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    CommonModule
  ],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.scss'
})
export class DetalisComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MovieApiService
  ) { }

  title: string = '';
  description: string = '';
  banner: string = '';
  trailerKey: any;
  id: any;
  casts: any[] = []


  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
    this.banner = this.data.banner;
    this.id = this.data.id;
    console.log(this.id)

    this.MovieCast()
  }

  MovieCast(){
    this.service.getMovieCast(this.id).subscribe((result) => {

      this.casts = result.cast;

       console.log('cast', this.casts)

    })
  }

  trailer(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result)

      result.results.forEach((element: any) => {
        if (element.type === "Trailer") {
          this.trailerKey = element.key;
        }
      });
      console.log(this.trailerKey)
      window.open(`https://www.youtube.com/watch?v=${this.trailerKey}`, '_blank')
    })
  }
}
