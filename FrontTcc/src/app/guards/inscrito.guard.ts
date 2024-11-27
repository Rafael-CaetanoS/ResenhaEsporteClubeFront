import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { InscricaoService } from '../services/inscricao.service';

export const inscritoGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const inscritoService = inject(InscricaoService);
  const router = inject(Router);

  const idUsuario = authService.retornaIdUsuario();
  const idPartida = route.paramMap.get('id');

  if (!idPartida || !idUsuario) {
    router.navigate(['']); // Redireciona para a página inicial
    return false;
  }

  return inscritoService.getInscritosPartidas(idPartida).toPromise().then(inscricoes => {
    // Verifica se o usuário está inscrito na partida
    const usuarioInscrito = inscricoes!.some(inscricao => inscricao.atleta.idAtleta == idUsuario);

    if (usuarioInscrito) {
      return true; // Permite acesso
    } else {
      router.navigate(['/Inicio']); // Redireciona caso não esteja inscrito
      return false;
    }
  }).catch(error => {
    console.error('Erro ao verificar inscrições:', error);
    router.navigate(['/Inicio']); // Redireciona caso haja um erro
    return false;
  });
};
