import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalDrawerComponent } from './sal-drawer/sal-drawer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ItemListComponent } from './menu-list/item-list/item-list.component';

@NgModule({
  declarations: [SalDrawerComponent, MenuListComponent, ItemListComponent],
  imports: [CommonModule, MatSidenavModule],
  exports: [SalDrawerComponent, MenuListComponent],
})
export class SalDrawerModule {}
