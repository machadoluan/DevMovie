import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { MovieApiService } from '../../service/movie-api.service';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetalisComponent } from '../../components/detalis/detalis.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MoreMoviesComponent } from '../../components/more-movies/more-movies.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    RouterLink,
    DialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChildren('carousel') carousels!: QueryList<ElementRef>

  currentIndex: number = 0;
  autoSlideInterval: any;
  trendingApiData: any[] = [];
  actionMovie: any[] = [];
  adventureMovies: any[] = [];
  animationMovies: any[] = [];
  comedyMovies: any[] = [];
  scienceMovies: any[] = [];
  thrillerMovies: any[] = [];
  trailerKey: any;
  bannerMovie: any[] = [];

  constructor(
    private service: MovieApiService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 10000);

    this.ApiDataMovies()
    console.log('movies', this.bannerMovie)
  }


  ngOnDestroy(): void {
    // Limpar o intervalo quando o componente for destruído
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
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


  ApiDataMovies() {
    // Trending
    this.service.tredingMovieApiData().subscribe((result) => {
      this.trendingApiData = result.results;
      this.bannerMovie.push(...result.results);
    })

    // Action
    this.service.actionMovies().subscribe((result) => {
      this.actionMovie = result.results;
      this.bannerMovie.push(...result.results);
      console.log(result)

    })

    // Adventure

    this.service.adventureMovies().subscribe((result) => {
      this.adventureMovies = result.results
      this.bannerMovie.push(...result.results);

    })

    // Animation
    this.service.animationMovies().subscribe((result) => {
      this.animationMovies = result.results
      this.bannerMovie.push(...result.results);

    })

    // Comedy

    this.service.comedyMovies().subscribe((result) => {
      this.comedyMovies = result.results
      this.bannerMovie.push(...result.results);

    })

    // Science

    this.service.scienceMovies().subscribe((result) => {
      this.scienceMovies = result.results
      this.bannerMovie.push(...result.results);

    })

    // Thriller
    this.service.thrillerMovies().subscribe((result) => {
      this.thrillerMovies = result.results
      this.bannerMovie.push(...result.results);

    })

  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.bannerMovie.length;
  }


  scrollLeft(index: number) {
    const carousel = this.carousels.toArray()[index]
    carousel.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
  }

  scrollRight(index: number) {
    const carousel = this.carousels.toArray()[index]
    carousel.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
  }

  seeAll(categoryName: string, category: any) {
    this.dialog.open(MoreMoviesComponent, {
      maxWidth: 1000,
      maxHeight: 700,
      data: {
        categoryName: categoryName,
        movies: category
      }
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
