import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, ReactiveFormsModule, CustomMaterialModule, SharedUiModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
