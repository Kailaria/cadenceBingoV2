export default class BingoTileStatus {
    static NotDone: BingoTileStatus = new BingoTileStatus('NotDone',1);
    static PlanNo: BingoTileStatus = new BingoTileStatus('PlanNo',0);
    static PlanYes: BingoTileStatus = new BingoTileStatus('PlanYes',2);
    static Done: BingoTileStatus = new BingoTileStatus('Done',3);

    private static Statuses: Array<BingoTileStatus> = [
        BingoTileStatus.PlanNo,
        BingoTileStatus.NotDone,
        BingoTileStatus.PlanYes,
        BingoTileStatus.Done
    ]

    status: string;
    order: number;

    constructor(status: string, order: number) {
        this.status = status;
        this.order = order;
    }

    static nextStatus(current: BingoTileStatus, isGoal: boolean): BingoTileStatus {
        if (current.status !== BingoTileStatus.Done.status) {
            return BingoTileStatus.Statuses[current.order + 1];
        } else if (isGoal !== undefined && isGoal) { 
            // We already know it's in Done status, therefore goals loop to NotDone
            return BingoTileStatus.NotDone;
        }
        // Else, it's in Done and not a goal, so needs to loop to PlanNo
        return BingoTileStatus.PlanNo;
    }

    static prevStatus(current: BingoTileStatus, isGoal: boolean): BingoTileStatus {
        if ((!isGoal && current.status !== BingoTileStatus.PlanNo.status) ||
            (isGoal && current.status !== BingoTileStatus.NotDone.status)) {
            return BingoTileStatus.Statuses[current.order - 1];
        }
        // else, it's at the lowest status for its type and needs to loop to Done
        return BingoTileStatus.Done;
    }
}