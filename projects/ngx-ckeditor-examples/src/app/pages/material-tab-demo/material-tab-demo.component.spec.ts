import { TestBed, inject } from '@angular/core/testing';

import { MaterialTabDemoComponent } from './material-tab-demo.component';

describe('a material-tab-demo component', () => {
	let component: MaterialTabDemoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MaterialTabDemoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([MaterialTabDemoComponent], (MaterialTabDemoComponent) => {
		component = MaterialTabDemoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});