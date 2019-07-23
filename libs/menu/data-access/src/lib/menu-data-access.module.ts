import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MenuService } from './menu.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [MenuService]
})
export class MenuDataAccessModule {}
