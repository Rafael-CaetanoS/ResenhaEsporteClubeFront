export type inscricaoResponse = {
    idInscricao: string;
    partida: {
        idPartida: string
        },
    atleta: {
        idAtleta: string,
        nomeAtleta: string,
        apelido:string
        }
}