export default class Change {
    id!: number;
    summary!: string;
    isDisplayDetails?: boolean = false;
    details?: string;
}