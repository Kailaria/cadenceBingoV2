import Change from './Change.js';

export default class Update {
    title!: string;
    version!: string;
    date!: string;
    summary!: string;
    changeLog!: Change[];

    constructor(title: string = "title",
        version: string = "xx.xx.xx",
        date: string = "1976-01-01",
        summary: string = "summary",
        changeLog?: Change[]) {
            this.title = title;
            this.version = version;
            this.date = date;
            this.summary = summary;
            this.changeLog = changeLog === undefined ? [] : changeLog;
        }
}