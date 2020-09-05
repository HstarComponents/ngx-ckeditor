import { TestBed, inject } from '@angular/core/testing';

import { DynamicConfigDemoComponent } from './dynamic-config-demo.component';

describe('a dynamic-config-demo component', () => {
	let component: DynamicConfigDemoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DynamicConfigDemoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DynamicConfigDemoComponent], (DynamicConfigDemoComponent) => {
		component = DynamicConfigDemoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});