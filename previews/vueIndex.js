var app = new Vue({
    el: '#app',
    data: {
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
                        details: 'details for change #1 displayed',
                    },
                    {
                        id: '002',
                        summary: 'Change #2',
                        isDisplayDetails: false,
                        details: '',
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