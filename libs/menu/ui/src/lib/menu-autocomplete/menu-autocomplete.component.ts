import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';
import { AutocompleteItem, MenuItemAutocompleteType } from '@avanti-pizza/api-interface';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { ToppingsService } from '@avanti-pizza/toppings/data-access';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'avanti-menu-autocomplete',
  templateUrl: './menu-autocomplete.component.html',
  styleUrls: ['./menu-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuAutocompleteComponent implements OnInit {
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
  @Input() suffixIcon: string;
  /** Whether the autcomplete will open with its first option active. */
  @Input() autoActiveFirstOption = true;
  /** Highlight color to apply to matched characters. */
  @Input() color: 'primary' | 'accent' | 'warn' = 'accent';
  /** Text to display in the option displayed when no matches are found. */
  @Input() missingOptionText: string;
  /** Time between observable input event dispatches. */
  @Input() debounceTime = 125;

  /** Emits the selected menu item upon a user action. */
  @Output() selected: EventEmitter<AutocompleteItem> = new EventEmitter<AutocompleteItem>();
  /** Emits when a user has cleared the input via the clear button */
  @Output() cleared: EventEmitter<void> = new EventEmitter<void>();
  /** Emits when a user removes a chip from the chip list. */
  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  filtered$: Observable<AutocompleteItem[]>;

  constructor(private toppingsService: ToppingsService, private menuService: MenuService) {}

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

  private setFilteredStream(): void {
    switch (this.type) {
      case 'toppings':
        this.filtered$ = this.getDebouncedValueChanges().pipe(switchMap(query => this.toppingsService.findAll(query)));
        break;
      case 'food':
        break;

      case 'drinks':

      default:
        break;
    }
  }

  private getDebouncedValueChanges(): Observable<string> {
    return this.control.valueChanges.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
  }
}
