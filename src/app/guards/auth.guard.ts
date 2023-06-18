import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
}

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getToken();

  // If there isn't a token redirect to /home
  if(!token){
    router.navigate(['/home']);
    return false
  }

  // Otherwise
  return true;
}
