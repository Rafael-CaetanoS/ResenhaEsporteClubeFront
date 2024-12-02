export type PartidaResponse = {
        idPartida: string,
        titulo: string,
        descricao: string,
        horaInicio: string,
        horaFim: string,
        data: Date,
        qtdeAtletas: string,
        endereco:string,
        nomeLocal:string,
        cidade:string,
        atleta: {
            idAtleta: string,
            nomeAtleta:string,
            apelido:string,
            }
        esporte:{
            idEsporte:string,
            nomeEsporte:string
        }
        statusPartida:{
            idStatusPartida:string
        }
}