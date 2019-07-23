import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonPipesModule } from '@avanti-pizza/common/pipes';
import { EmboldenedTextComponent } from './emboldened-text.component';

describe('EmboldenedTextComponent', () => {
  let component: EmboldenedTextComponent;
  let fixture: ComponentFixture<EmboldenedTextComponent>;
  const defaultText = 'Belmont';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonPipesModule],
      declarations: [EmboldenedTextComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmboldenedTextComponent);
    component = fixture.componentInstance;
    component.query = 'bemt';
    component.text = defaultText;
    component.color = 'accent';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all text', () => {
    const el = fixture.debugElement;
    expect(el.nativeElement.textContent.trim()).toEqual(defaultText);
  });
});
