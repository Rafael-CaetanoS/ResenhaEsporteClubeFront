import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService); 
  const router = inject(Router); 

  if (authService.autenticar()) {
    return true; 
  } else {
    router.navigate(['']);
    return false; 
  }
};
