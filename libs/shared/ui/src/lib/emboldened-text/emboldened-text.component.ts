import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'avanti-emboldened-text',
  templateUrl: './emboldened-text.component.html',
  styleUrls: ['./emboldened-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmboldenedTextComponent {
  /** Text to embolden. */
  @Input() text: string;
  /** Query string of which to match characters with for emboldening. */
  @Input() query: string;
  /** Highlight color to apply to matched characters. */
  @Input() color: 'primary' | 'accent' | 'warn' = 'accent';

  getMatchedIndices(): number[] {
    const indices: number[] = [];
    const query = this.query.toLowerCase();
    const text = this.text.toLowerCase();

    let matchedIndex = 0;
    for (let i = 0; i < query.length; i++) {
      const index = text.indexOf(query[i], matchedIndex);
      if (index !== -1) {
        matchedIndex = index + 1;
        indices.push(index);
      }
    }

    return indices;
  }
}
