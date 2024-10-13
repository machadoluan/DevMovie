import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MovieApiService } from '../../service/movie-api.service';
import { TrailerComponent } from '../trailer/trailer.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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
    private service: MovieApiService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  title: string = '';
  description: string = '';
  banner: string = '';
  trailerKey: any;
  id: any;
  casts: any[] = [];
  youtubeUrl: SafeResourceUrl = ''
  photoDefault: boolean = false;


  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
    this.banner = this.data.banner;
    this.id = this.data.id;
    console.log(this.id)

    this.MovieCast()
  }

  MovieCast() {
    this.service.getMovieCast(this.id).subscribe((result) => {

      this.casts = result.cast;

      this.casts.forEach((element: any) => {
        if (element.profile_path === null) {
          element.profile_path = "user.jpg";
        } else {
          element.profile_path = `https://image.tmdb.org/t/p/original/${element.profile_path}`;
        }
      });


    })
  }

  trailer(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result)

      result.results.forEach((element: any) => {
        if (element.type === "Trailer") {
          this.trailerKey = element.key;
          this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailerKey}?autoplay=1&mute=1`);
        }
      });
      this.dialog.open(TrailerComponent, {
        maxWidth: 1000,
        data: {
          youtubeUrl: this.youtubeUrl
        }
      })
    })
  }
}
