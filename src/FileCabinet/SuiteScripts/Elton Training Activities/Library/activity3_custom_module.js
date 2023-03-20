/**
 * @NApiVersion 2.1
 */
define(['N/search'],
    /**
     * @param{search} search
     */
    (search) => {
        const libModule = {};
        libModule.searchRecord = function () {
            let arrTransactionResults = [];
            try {
                let objTransactionSearch = search.create({
                    type: 'transaction',
                    filters: [],
                    columns: ['entity', 'subsidiary', 'tranid', 'trandate', 'amount']
                });

                // Run the search using search.run() instead of search.runPaged() for better performance
                objTransactionSearch.run().each(function (result) {
                    arrTransactionResults.push({
                        name: result.getText({name: 'entity'}),
                        subsidiary: result.getValue({name: 'subsidiary'}),
                        document_number: result.getValue({name: 'tranid'}),
                        transaction_date: result.getValue({name: 'trandate'}),
                        total_amount: result.getValue({name: 'amount'}),
                    });
                    return true;
                });
            } catch (err) {
                log.error("searchRecord", err);
            }

            return arrTransactionResults;
        }

        libModule.consolidateByName = function (arrByName) {
            return arrByName.map(function(data) {
                return {
                    document_number: data.document_number,
                    transaction_date: data.transaction_date,
                    total_amount: data.total_amount,
                };
            });
        };



        return libModule;

    });

// libModule.consolidateByName = function (arrByName) {
//     var arrDataTransaction = [];
//     arrByName.forEach(function (data) {
//         let objDataTransactions = {
//             document_number: data.document_number,
//             transaction_date: data.transaction_date,
//             total_amount: data.total_amount,
//         }
//         arrDataTransaction.push(objDataTransactions);
//     });
//     return arrDataTransaction;
// }

// libModule.searchRecord = function () {
//     let arrTransactionResults = [];
//     try {
//         let objTransactionSearch = search.create({
//             type: 'transaction',
//             filters: [],
//             columns: ['entity', 'subsidiary', 'tranid', 'trandate', 'amount']
//         });
//
//         var searchResultCount = objTransactionSearch.runPaged().count;
//         if (searchResultCount != 0) {
//             var pagedData = objTransactionSearch.runPaged({pageSize: 1000});
//             for (var i = 0; i < pagedData.pageRanges.length; i++) {
//                 var currentPage = pagedData.fetch(i);
//                 var pageData = currentPage.data;
//                 if (pageData.length > 0) {
//                     for (var pageResultIndex = 0; pageResultIndex < pageData.length; pageResultIndex++) {
//                         arrTransactionResults.push({
//                             name: pageData[pageResultIndex].getText({name: 'entity'}),
//                             subsidiary: pageData[pageResultIndex].getValue({name: 'subsidiary'}),
//                             document_number: pageData[pageResultIndex].getValue({name: 'tranid'}),
//                             transaction_date: pageData[pageResultIndex].getValue({name: 'trandate'}),
//                             total_amount: pageData[pageResultIndex].getValue({name: 'amount'}),
//                         });
//                     }
//                 }
//             }
//         }
//     } catch (err) {
//         log.error("searchRecord", err);
//     }
//
//     return arrTransactionResults;
// }