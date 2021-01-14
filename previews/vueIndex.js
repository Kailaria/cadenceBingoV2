var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        h1Title: 'This is a tooltip!',
        description: 'This is a test project',
        pvalue: 0,
        updateLog: [
            {
                title: 'Beginning of the Vue refactor',
                version: '1.02.01',
                date: '2020-11-22',
                summary: 'This is a test summary',
                changeLog: [
                    {
                        id: '001',
                        summary: 'Change #1',
                        isDisplayDetails: false,
                    },
                    {
                        id: '002',
                        summary: 'Change #2',
                        isDisplayDetails: false,
                    },
                ]
            }
        ],
    },
    methods: {
        toggleChangeDetails: function(updateVersion, changeId) {
            var theChange = this.updateLog.find(update => update.version === updateVersion)
                .changeLog.find(change => change.id === changeId);

            theChange.isDisplayDetails = !theChange.isDisplayDetails;
        }
    }
})