import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @ViewChild('myDiv', { static: true }) myDiv!: ElementRef;
  @ViewChild('input', { static: true }) searchInput!: ElementRef;

  isScroll = false;

  constructor(
    private route: Router
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Pega a posição de scroll atual
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Se a posição for maior que 0, adiciona a classe, senão remove
    if (scrollPosition > 1) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  search() {
    const div = this.myDiv.nativeElement;
    this.searchInput.nativeElement.style.display = 'block'
    this.myDiv.nativeElement.style.padding = '10px 20px'
    div.style.width = '250px';
    div.style.background = 'linear-gradient(to left, #4e4e4e, #2b2b2b)';
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;

    if (this.myDiv && !this.myDiv.nativeElement.contains(targetElement)) {
      // Fecha a div quando clicar fora
      this.searchInput.nativeElement.style.display = 'none';
      this.myDiv.nativeElement.style.padding = '0';
      this.myDiv.nativeElement.style.width = 'auto';
      this.myDiv.nativeElement.style.background = 'transparent';
    }
  }

  onSearch(input: HTMLInputElement) {
    const value = input.value
    if (value) {
      this.route.navigate(['/search'], { queryParams: { q: value } })
    } else {
      this.route.navigate(['/'])
    }
  }


}
