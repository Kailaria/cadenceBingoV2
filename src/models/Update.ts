import Change from './Change';

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
    
    static CopyFromJson(jsonObj: any): Update {
        let theCopy = new Update();
        theCopy.title = jsonObj.title;
        theCopy.version = jsonObj.version;
        theCopy.date = jsonObj.date;
        theCopy.summary = jsonObj.summary;
        theCopy.changeLog = new Array<Change>();
        if (jsonObj.changeLog !== undefined) {
            jsonObj.changeLog.change.forEach((change: any) => {
                let copyChange = new Change();
                copyChange.id = change.id;
                copyChange.summary = change.summary;
                copyChange.isDisplayDetails = false;
                copyChange.details = change.details;
                theCopy.changeLog.push(copyChange);
            });
        }

        return theCopy;
    }
}