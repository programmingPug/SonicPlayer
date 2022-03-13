import { Component, OnInit } from '@angular/core';

import {
	
	faBars,
  faSearch,
  faHeadphones
	
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	faBars = faBars;
  faSearch = faSearch;
  faHeadphones = faHeadphones;

  constructor() { }

  ngOnInit() {
  }

}
