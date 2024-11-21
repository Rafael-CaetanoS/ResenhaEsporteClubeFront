export type PartidaResponse = {
        idPartida: string,
        titulo: string,
        descricao: string,
        horaInicio: string,
        horaFim: string,
        data: Date,
        faixaEtaria: string,
        qtdeAtletas: string,
        endereco:string,
        nomeLocal:string,
        cidade:string,
        atleta: {
            idAtleta: string,
            nomeAtleta:string
            }
        esporte:{
            idEsporte:string,
            nomeEsporte:string
        }
}