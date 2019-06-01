import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [LoadingComponent, HeaderComponent],
  exports: [LoadingComponent, HeaderComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
