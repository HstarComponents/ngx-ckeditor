import { TestBed, inject } from '@angular/core/testing';

import { InlineDemoComponent } from './inline-demo.component';

describe('a inline-demo component', () => {
	let component: InlineDemoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				InlineDemoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([InlineDemoComponent], (InlineDemoComponent) => {
		component = InlineDemoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});