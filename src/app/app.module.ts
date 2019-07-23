import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/game-login/game-login.component'
import { MenuComponent } from './components/menu/menu.component';


import { GamePlayComponent } from './components/game-play/game-play.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { JoinGameComponent } from './components/join-game/join-game.component';

const appRoutes: Routes = [
  { path: 'game-login', component: LandingPageComponent },
  { path: 'game-menu', component: MenuComponent },
  { path: 'game-play', component: GamePlayComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MenuComponent,
    GamePlayComponent,
    StartGameComponent,
    JoinGameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
