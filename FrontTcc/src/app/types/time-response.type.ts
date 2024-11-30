export type timeResponse = {
    nomeTime: string,
    totalPontos: string,
    partida: {
        idPartida: string
    }
    jogadores: {
        inscricao: {
            idInscricao: string
            atleta:{
                nomeAtleta:string,
                apelido:string
            }
        }
    }[]
};