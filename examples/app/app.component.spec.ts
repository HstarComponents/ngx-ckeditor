import { TestBed, inject } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('a app component', () => {
	let component: AppComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AppComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([AppComponent], (AppComponent) => {
		component = AppComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});