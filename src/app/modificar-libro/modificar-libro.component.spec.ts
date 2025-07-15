import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLibroComponent } from './modificar-libro.component';

describe('ModificarLibroComponent', () => {
  let component: ModificarLibroComponent;
  let fixture: ComponentFixture<ModificarLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
