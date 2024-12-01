import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const atualizarJogadorGuard: CanActivateFn = (route, state) => {
  const atletaIdUrl = route.paramMap.get('id');
  const atletaSession = sessionStorage.getItem('idAtleta');
  const router = inject(Router);

if(atletaIdUrl === atletaSession){
  return true;
}
else{
  router.navigate(['/Inicio'])
  return false;
} 
};
