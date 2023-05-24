import Page from "./page";

export default class ResultPage extends Page {
    public async flightExists(){
        return await $('.outboundflightCardsContainer').isExisting();
    }
}
