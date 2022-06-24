import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {
    
    constructor(private authService: AuthenticationService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let user = JSON.parse(localStorage.getItem('user'));
        // if (this.authService.isLoggedIn) {
        //     window.alert("You are not allowed to access this URL!");
        //     this.router.navigate(['/dashboard/default'])
        // }
        return true;
    }
}