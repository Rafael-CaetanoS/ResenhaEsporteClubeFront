export type timeResponse = {
    nomeTime: string,
    partida: {
        idPartida: string
    }
    jogadores: {
        inscricao: {
            idInscricao: string
            atleta:{
                nomeAtleta:string
            }
        }
    }[]
};