import { ESCAPE } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';
import { AutocompleteItem, MenuItemAutocompleteType } from '@avanti-pizza/api-interface';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'avanti-menu-autocomplete',
  templateUrl: './menu-autocomplete.component.html',
  styleUrls: ['./menu-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuAutocompleteComponent implements OnInit, OnChanges {
  /** The element reference to the input within a mat-chip-list. */
  @ViewChild('chipInput', { static: false }) chipInput: ElementRef<HTMLInputElement>;
  /** The type of autocomplete to filter through. */
  @Input() type: MenuItemAutocompleteType;
  /** Reactive input control. */
  @Input() control: FormControl;
  /** Items that have been previously selected. */
  @Input() selection: AutocompleteItem[];
  /** Label to display in form field. */
  @Input() label: string;
  /** Placeholder to display in form field input. */
  @Input() placeholder: string;
  /** Icon to display within form field suffix button. */
  @Input() suffixIcon = 'clear';
  /** Whether the autcomplete will open with its first option active. */
  @Input() autoActiveFirstOption = true;
  /** Highlight color to apply to matched characters. */
  @Input() color: 'primary' | 'accent' | 'warn' = 'accent';
  /** Text to display in the option displayed when no matches are found. */
  @Input() missingOptionText: string;
  /** Time between observable input event dispatches. */
  @Input() debounceTime = 125;
  /** Whether the component will emit a cleared event when focused and on the escape key press. */
  @Input() clearOnEscape = true;

  /** Emits the selected menu item upon a user action. */
  @Output() selected: EventEmitter<AutocompleteItem> = new EventEmitter<AutocompleteItem>();
  /** Emits when a user has cleared the input via the clear button */
  @Output() cleared: EventEmitter<void> = new EventEmitter<void>();
  /** Emits when a user removes a chip from the chip list. */
  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  /** All currently filtered autocomplete results. */
  filtered$: Observable<AutocompleteItem[]>;
  /** Whether the input is focused. */
  isFocused: boolean;

  constructor(private menuService: MenuService) {}

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.type;
    if (change) {
      this.setFilteredStream();
    }
  }

  ngOnInit() {
    this.setFilteredStream();
  }

  onSuffixClicked(): void {
    this.control.patchValue('');
    this.cleared.emit();
  }

  onMissingClicked(): void {
    this.control.patchValue('');
    this.cleared.emit();
  }

  onChipRemoved(index: number): void {
    this.removed.emit(index);
  }

  select(event: MatOptionSelectionChange, item: AutocompleteItem): void {
    if (event.isUserInput) {
      this.selected.emit(item);
    }
  }

  getValue(item: AutocompleteItem): any {
    switch (this.type) {
      default:
        return item.name;
    }
  }

  clearInput(): void {
    this.chipInput.nativeElement.value = '';
  }

  private setFilteredStream(): void {
    const type = this.type;
    if (type === 'drinks' || type === 'beers' || type === 'beverages') {
      this.filtered$ = this.getDebouncedValueChanges().pipe(switchMap(query => this.menuService.findAllDrinks({ query, type })));
    } else if (type === 'food' || type === 'pizzas' || type === 'toppings') {
      this.filtered$ = this.getDebouncedValueChanges().pipe(switchMap(query => this.menuService.findAllFood({ query, type })));
    }
  }

  private getDebouncedValueChanges(): Observable<string> {
    return this.control.valueChanges.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if (this.clearOnEscape && event.keyCode === ESCAPE) {
      this.cleared.emit();
    }
  }
}
