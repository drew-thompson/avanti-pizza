import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToppingsService } from './toppings.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ToppingsService]
})
export class ToppingsDataAccessModule {}
