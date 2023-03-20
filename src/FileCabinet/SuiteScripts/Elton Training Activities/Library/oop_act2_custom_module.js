/**
 * @NApiVersion 2.1
 */
define(['N/search', '../Library/oop2_fieldmapping', 'N/file'],
    /**
     * @param{search} search
     */
    (search, libMapping, file) => {
        const libModule = {};
        libModule.getTransactions = function () {
            let arrSoData = [];
            try {
                let arrSOTransaction = searchSOTransaction();
                arrSoData = consolidateSoData(arrSOTransaction);
            } catch
                (err) {
                log.error("searchRecord", err);
            }
            return arrSoData;
        }

        libModule.convertToFile = function (arrTransData) {
            let fileObj = file.create({
                name: 'oop_act2.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(arrTransData)
            });
            fileObj.folder = 157;
            let fileId = fileObj.save();
            return fileId;
        }
        // PRIVATE FUNCTION
        function searchSOTransaction() {
            let arrSearchSOTransResults = [];
            let objSearchSOTransResults = {};
            let objSOTransSearch = search.create({
                type: 'salesorder',
                filters: [
                    ['type', 'anyof', 'SalesOrd'],
                    'AND',
                    ['mainline', 'is', 'F'],
                    'AND',
                    ['taxline', 'is', 'F'],
                    'AND',
                    ['cogs', 'is', 'F'],
                    'AND',
                    ['shipping', 'is', 'F'],
                ],
                columns: [
                    'internalid',
                    'tranid',
                    search.createColumn({name: 'entityid', join: 'customerMain'}),
                    'datecreated',
                    search.createColumn({name: 'internalid', join: 'subsidiary'}),
                    search.createColumn({name: 'internalid', join: 'item'}),
                    'quantity',
                    'amount',
                    'rate',
                ]
            });

            objSOTransSearch.run().each(function(result) {
                arrSearchSOTransResults.push({
                    soId: result.getValue('internalid'),
                    documentNumber: result.getValue('tranid'),
                    customerId: result.getValue({name: 'entityid', join: 'customerMain'}),
                    salesDate: result.getValue('datecreated'),
                    subsidiaryId: result.getValue({name: 'internalid', join: 'subsidiary'}),
                    itemId: result.getValue({name: 'internalid', join: 'item'}),
                    lineAmount: result.getValue('quantity'),
                    lineRate: result.getValue('amount'),
                    lineQty: result.getValue('rate'),
                });
                return true;
            });

            return arrSearchSOTransResults;
        }

        function consolidateSoData(arrSOTransaction) {
            return arrSOTransaction.reduce(function (acc, data) {
                let soID = data.soId;
                let existingObj = acc.find(obj => obj[soID]);
                if (existingObj) {
                    // Object with SO ID already exists, push lines to it
                    let objTransLines = {};
                    for (let field in libMapping.oopAct2.lines[0]) {
                        if (data[field]) {
                            objTransLines[libMapping.oopAct2.lines[0][field]] = data[field];
                        }
                    }
                    existingObj[soID].lines.push(objTransLines);
                } else {
                    // Object with SO ID doesn't exist, create new object
                    let objNewData = {};
                    objNewData[soID] = {
                        header: {},
                        lines: [],
                    };
                    for (let field in libMapping.oopAct2.header) {
                        if (data[field]) {
                            objNewData[soID].header[libMapping.oopAct2.header[field]] = data[field];
                        }
                    }
                    let objTransLines = {};
                    for (let field in libMapping.oopAct2.lines[0]) {
                        if (data[field]) {
                            objTransLines[libMapping.oopAct2.lines[0][field]] = data[field];
                        }
                    }
                    objNewData[soID].lines.push(objTransLines);
                    acc.push(objNewData);
                }
                return acc;
            }, []);
        }

        return libModule;

    });


// function consolidateSoData(arrSOTransaction) {
//     return arrSOTransaction.map(function (data) {
//         let objNewData = {};
//         let soID = data.soId;
//         objNewData[soID] = {
//             header: {},
//             lines: [],
//         };
//         for (let field in libMapping.oopAct2.header) {
//             if (data[field]) {
//                 objNewData[soID].header[libMapping.oopAct2.header[field]] = data[field];
//             }
//         }
//         let arrTransPerSoID = [];
//         libMapping.oopAct2.lines.forEach(function (lineField) {
//             let objTransLines = {};
//             for (let field in lineField) {
//                 if (data[field]) {
//                     objTransLines[lineField[field]] = data[field];
//                 }
//             }
//             arrTransPerSoID.push(objTransLines);
//         });
//         objNewData[soID].lines = arrTransPerSoID;
//         return objNewData;
//     });
// }

// function consolidateSoData(arrSOTransaction) {
//     let arrSoData = [];
//     arrSOTransaction.forEach(function (data) {
//         let objNewData = {};
//         let soID = data.soId;
//         objNewData[soID] = {};
//         objNewData[soID].header = {};
//         for (let field in libMapping.oopAct2.header) {
//             if (data[field]) {
//                 objNewData[soID].header[libMapping.oopAct2.header[field]] = data[field];
//             }
//             let arrTransPerSoID = [];
//             libMapping.oopAct2.lines.forEach(function (lineField) {
//                 let objTransLines = {};
//                 for (let field in lineField) {
//                     if (data[field]) {
//                         objTransLines[lineField[field]] = data[field];
//                     }
//                 }
//                 arrTransPerSoID.push(objTransLines);
//                 objNewData[soID].lines = arrTransPerSoID;
//             });
//         }
//         arrSoData.push(objNewData);
//     });
//     return arrSoData;
// }

// function searchSOTransaction() {
//     let arrSearchSOTransResults = [];
//     let objSOTransSearch = search.create({
//         type: 'salesorder',
//         filters: [
//             ['type', 'anyof', 'SalesOrd'],
//             'AND',
//             ['mainline', 'is', 'F'],
//             'AND',
//             ['taxline', 'is', 'F'],
//             'AND',
//             ['cogs', 'is', 'F'],
//             'AND',
//             ['shipping', 'is', 'F'],
//         ],
//         columns: [
//             search.createColumn({name: 'internalid'}),
//             search.createColumn({name: 'tranid'}),
//             search.createColumn({name: 'entityid', join: 'customerMain'}),
//             search.createColumn({name: 'datecreated'}),
//             search.createColumn({name: 'internalid', join: 'subsidiary'}),
//             search.createColumn({name: 'internalid', join: 'item'}),
//             search.createColumn({name: 'quantity'}),
//             search.createColumn({name: 'amount'}),
//             search.createColumn({name: 'rate'}),
//         ]
//     });
//
//     var searchResultCount = objSOTransSearch.runPaged().count;
//     if (searchResultCount != 0) {
//         var pagedData = objSOTransSearch.runPaged({pageSize: 1000});
//         for (var i = 0; i < pagedData.pageRanges.length; i++) {
//             var currentPage = pagedData.fetch(i);
//             var pageData = currentPage.data;
//             if (pageData.length > 0) {
//                 for (var pageResultIndex = 0; pageResultIndex < pageData.length; pageResultIndex++) {
//                     let result = pageData[pageResultIndex];
//                     arrSearchSOTransResults.push({
//                         soId: result.getValue('internalid'),
//                         documentNumber: result.getValue('tranid'),
//                         customerId: result.getValue({name: 'entityid', join: 'customerMain'}),
//                         salesDate: result.getValue('datecreated'),
//                         subsidiaryId: result.getValue({name: 'internalid', join: 'subsidiary'}),
//                         itemId: result.getValue({name: 'internalid', join: 'item'}),
//                         lineAmount: result.getValue('quantity'),
//                         lineRate: result.getValue('amount'),
//                         lineQty: result.getValue('rate'),
//                     });
//                 }
//             }
//         }
//     }
//     return arrSearchSOTransResults;
// }

// libModule.consolidateRawData = function (arrData) {
//     let objNewData = {};
//     arrData.forEach(function (data) {
//         if (objNewData[data.document_Number] == null) {
//             objNewData[data.document_Number] = [];
//         }
//         objNewData[data.document_Number].push(data);
//     });
//
//     return objNewData;
// }

// libModule.consolidateNewData = function (arrData) {
//     let arrTest = [];
//     let objNewData = {};
//     for (let soID in arrData) {
//         objNewData[soID] = {};
//         objNewData[soID].header = {};
//         let arrTransPerSoID = [];
//         arrData[soID].forEach(function (data) {
//             for (let field in libMapping.oopAct2.header) {
//                 if (data[field]) {
//                     objNewData[soID].header[libMapping.oopAct2.header[field]] = data[field];
//                 }
//             }
//             ;
//             libMapping.oopAct2.lines.forEach(function (lineField) {
//                 let objTransLines = {};
//                 for (let field in lineField) {
//                     if (data[field]) {
//                         objTransLines[lineField[field]] = data[field];
//                     }
//                 }
//                 arrTransPerSoID.push(objTransLines);
//             });
//         });
//         objNewData[soID].lines = arrTransPerSoID;
//         arrTest.push(objNewData[soID]);
//     }
//     // log.debug("objNewData", objNewData)
//     // return objNewData;
//     return arrTest;
// }

// function consolidateLines(arrSOData) {
//     let objNewData = {};
//     arrSOData.forEach(function (data) {
//         if (objNewData[data.soId] == null) {
//             objNewData[data.soId] = [];
//         }
//         objNewData[data.soId].push(data);
//     });
//     return objNewData;
// }

// function consolidateTest(arrData) {
//     let arrTest = [];
//     let objNewData = {};
//     for (let soID in arrData) {
//         objNewData[soID] = {};
//         objNewData[soID].header = {};
//         let arrTransPerSoID = [];
//         arrData.forEach(function (data) {
//             for (let field in libMapping.oopAct2.header) {
//                 if (data[field]) {
//                     objNewData[soID].header[libMapping.oopAct2.header[field]] = data[field];
//                 }
//             }
//             ;
//             libMapping.oopAct2.lines.forEach(function (lineField) {
//                 let objTransLines = {};
//                 for (let field in lineField) {
//                     if (data[field]) {
//                         objTransLines[lineField[field]] = data[field];
//                     }
//                 }
//                 arrTransPerSoID.push(objTransLines);
//             });
//         });
//         objNewData[soID].lines = arrTransPerSoID;
//         // arrTest.push(objNewData[soID]);
//     }
//     log.debug("objNewData", objNewData)
//     log.debug("arrTest", arrTest)
//     return objNewData;
//     // return arrTest;
// }
