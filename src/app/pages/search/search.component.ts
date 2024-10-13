import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieApiService } from '../../service/movie-api.service';
import { ActivatedRoute, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DetalisComponent } from '../../components/detalis/detalis.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  constructor(private service: MovieApiService, private route: ActivatedRoute, private dialog: MatDialog) { }

  movie: any[] = [];
  searchQuery: string = '';
  errorSearch: string = ''


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      console.log(this.searchQuery)
      this.service.getSearchMovie(this.searchQuery).subscribe((result) => {
        this.movie = result.results
        console.log(this.movie)
        if (this.movie.length <= 0) {
          this.errorSearch = this.searchQuery;
        } else {
          this.errorSearch = ''
        }
      })
    })



  }

  detalis(movie: any) {
    this.dialog.open(DetalisComponent, {
      maxWidth: 800,
      maxHeight: 800,
      data: {
        id: movie.id,
        banner: movie.backdrop_path,
        title: movie.title || movie.original_title,
        description: movie.overview
      }
    })

    // Cast

    this.service.getMovieCast(movie.id).subscribe((result) => {
      console.log(result)
    })
  }
}
