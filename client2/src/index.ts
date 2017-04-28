import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StageComponent } from './stage/stage.component';
import { TableComponent } from './table/table.component';
import { SampleDirective } from './sample.directive';
import { SamplePipe } from './sample.pipe';
import { SocketService } from './socket.service';
import { DominoGraphics } from './graphics/domino-graphics';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {PlayerPageComponent} from './player-page/player-page.component';
export * from './stage/stage.component';
export * from './table/table.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './welcome-page/welcome-page.component';
export * from './player-page/player-page.component';
export {SocketService} from './socket.service';
export { DominoPlayer } from './interfaces/player';
export interface DominoGraphics {
  render();
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    StageComponent,
    WelcomePageComponent,
    SampleDirective,
    TableComponent,
    PlayerPageComponent,
  ],
  exports: [
    StageComponent,
    TableComponent,
    WelcomePageComponent,
    PlayerPageComponent,
    SampleDirective
  ]
})
export class SampleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SampleModule,
      providers: [SocketService]
    };
  }
}
