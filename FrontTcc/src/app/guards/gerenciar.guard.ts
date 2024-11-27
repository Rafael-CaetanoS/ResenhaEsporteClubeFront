import { CanActivateFn, Router } from '@angular/router';
import { PartidasService } from '../services/partidas.service';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const gerenciarGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService); // Serviço de autenticação
  const partidasService = inject(PartidasService); // Serviço para buscar informações da partida
  const router = inject(Router);

  const idUsuario = authService.retornaIdUsuario();
  const idPartida = route.paramMap.get("id");
  
  if (!idPartida || !idUsuario) {
    router.navigate(['']); 
    return false;
  }

  return partidasService.getPartidaById(idPartida).toPromise().then(partida => {
    if (partida?.atleta.idAtleta == idUsuario) {
      return true;
    } else {
      router.navigate(['/Inicio']); 
      return false;
    }
  }).catch(error => {
    console.error('Erro ao verificar partida:', error);
    router.navigate(['/Inicio']); 
    return false;
  });

};
