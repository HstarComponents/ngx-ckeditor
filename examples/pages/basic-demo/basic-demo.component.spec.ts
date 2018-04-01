import { TestBed, inject } from '@angular/core/testing';

import { BasicDemoComponent } from './basic-demo.component';

describe('a basic-demo component', () => {
	let component: BasicDemoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BasicDemoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BasicDemoComponent], (BasicDemoComponent) => {
		component = BasicDemoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});