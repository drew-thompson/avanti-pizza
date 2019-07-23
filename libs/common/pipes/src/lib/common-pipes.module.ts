import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmboldenPipe } from './embolden.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [EmboldenPipe],
  exports: [EmboldenPipe]
})
export class CommonPipesModule {}
