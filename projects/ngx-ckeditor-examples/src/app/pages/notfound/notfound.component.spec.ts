import { TestBed, inject } from '@angular/core/testing';

import { NotfoundComponent } from './notfound.component';

describe('a notfound component', () => {
	let component: NotfoundComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				NotfoundComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([NotfoundComponent], (NotfoundComponent) => {
		component = NotfoundComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});