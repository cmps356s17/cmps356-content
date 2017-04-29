import { Component } from '@angular/core';

@Component({
    //template: `<h1>{{pageTitle}}</h1>`
    templateUrl: 'app/home/welcome.component.html',
    styles: ['.box {max-height:300px;padding-bottom:50px; }']
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
}
