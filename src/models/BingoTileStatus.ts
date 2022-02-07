export default class BingoTileStatus {
    static NotDone: BingoTileStatus = new BingoTileStatus('NotDone');
    static PlanNo: BingoTileStatus = new BingoTileStatus('PlanNo');
    static PlanYes: BingoTileStatus = new BingoTileStatus('PlanYes');
    static Done: BingoTileStatus = new BingoTileStatus('Done');

    status: string;

    constructor(status: string) {
        this.status = status;
    }
}