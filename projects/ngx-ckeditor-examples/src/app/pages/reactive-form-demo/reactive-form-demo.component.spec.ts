import { TestBed, inject } from '@angular/core/testing';

import { ReactiveFormDemoComponent } from './reactive-form-demo.component';

describe('a reactive-form-demo component', () => {
	let component: ReactiveFormDemoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ReactiveFormDemoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ReactiveFormDemoComponent], (ReactiveFormDemoComponent) => {
		component = ReactiveFormDemoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});