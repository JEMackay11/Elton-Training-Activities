/**
 * @NApiVersion 2.1
 */
define(['N/search', '../Library/oop_fieldmapping', 'N/file'],
    /**
     * @param{search} search
     */
    (search, libMapping, file) => {
        const libModule = {};

        libModule.searchRecord = function () {
            const arrTransactionResults = [];
            try {
                const objTransactionSearch = search.create({
                    type: 'transaction',
                    filters: [],
                    columns: ['entity', 'subsidiary', 'tranid', 'trandate', 'amount', 'transactionnumber']
                });

                const searchResultCount = objTransactionSearch.runPaged().count;
                if (searchResultCount === 0) {
                    return arrTransactionResults;
                }

                const pagedData = objTransactionSearch.runPaged({pageSize: 1000});

                pagedData.pageRanges.forEach(pageRange => {
                    const currentPage = pagedData.fetch({index: pageRange.index});
                    const pageData = currentPage.data;

                    arrTransactionResults.push(...pageData.map(pageResult => ({
                        customer_id: pageResult.getValue({name: 'entity'}),
                        name: pageResult.getText({name: 'entity'}),
                        trans_id: pageResult.getValue({name: 'tranid'}),
                        document: pageResult.getValue({name: 'transactionnumber'}),
                        date: pageResult.getValue({name: 'trandate'}),
                        subsidiary: pageResult.getValue({name: 'subsidiary'}),
                        amount: pageResult.getValue({name: 'amount'}),
                    })));
                });
            } catch (err) {
                log.error("searchRecord", err);
            }

            return arrTransactionResults;
        }

        libModule.consolidateNewData = function (arrData) {
            let transFields = libMapping.oopAct1.transactions;
            let result = [];
            arrData.forEach(function (data) {
                let existingObj = result.find(obj => obj.id === data.customer_id);
                if (existingObj) {
                    // Object with customer ID already exists, push transactions to it
                    existingObj.transactions.push(transFields.reduce(function (acc, lineField) {
                        for (let [field, value] of Object.entries(lineField)) {
                            if (data[field]) {
                                acc[value] = data[field];
                            }
                        }
                        return acc;
                    }, {}));
                } else {
                    // Object with customer ID doesn't exist, create new object
                    let objNewData = {
                        id: data.customer_id,
                        name: data.name,
                        subsidiary: data.subsidiary,
                        transactions: [transFields.reduce(function (acc, lineField) {
                            for (let [field, value] of Object.entries(lineField)) {
                                if (data[field]) {
                                    acc[value] = data[field];
                                }
                            }
                            return acc;
                        }, {})]
                    };
                    result.push(objNewData);
                }
            });
            return result;
        };

        libModule.convertToFile = function (arrTransData) {
            let fileObj = file.create({
                name: 'oop_act1.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(arrTransData)
            });
            fileObj.folder = 157;
            let fileId = fileObj.save();
            return fileId;
        }

        return libModule;

    });

// libModule.consolidateNewData = function (arrData) {
//     const transFields = libMapping.oopAct1.transactions;
//     return arrData.map(function (data) {
//         const objNewData = {
//             id: data.customer_id,
//             name: data.name,
//             subsidiary: data.subsidiary,
//             transactions: transFields.map(function (lineField) {
//                 const objTransPerCustomer = {};
//                 for (const [field, value] of Object.entries(lineField)) {
//                     if (data[field]) {
//                         objTransPerCustomer[value] = data[field];
//                     }
//                 }
//                 return objTransPerCustomer;
//             })
//         };
//         return objNewData;
//     });
// };

// libModule.consolidateNewData = function (arrData) {
//     let arrTransData = [];
//     arrData.forEach(function (data) {
//         let objNewData = {};
//         let arrTransPerCustomer = [];
//         libMapping.oopAct1.transactions.forEach(function (lineField) {
//             let objTransPerCustomer = {};
//             for (let field in lineField) {
//                 if (data[field]) {
//                     objTransPerCustomer[lineField[field]] = data[field];
//                 }
//             }
//             arrTransPerCustomer.push(objTransPerCustomer);
//         });
//         objNewData.id = data.customer_id;
//         objNewData.name = data.name;
//         objNewData.subsidiary = data.subsidiary;
//         objNewData.transactions = arrTransPerCustomer;
//         arrTransData.push(objNewData);
//     });
//     return arrTransData;
// }

// libModule.searchRecord = function () {
//     let arrTransactionResults = [];
//     try {
//         let objTransactionSearch = search.create({
//             type: 'transaction',
//             filters: [],
//             columns: ['entity', 'subsidiary', 'tranid', 'trandate', 'amount', 'transactionnumber']
//         });
//
//         var searchResultCount = objTransactionSearch.runPaged().count;
//         if (searchResultCount != 0) {
//             var pagedData = objTransactionSearch.runPaged({pageSize: 1000});
//             for (var i = 0; i < pagedData.pageRanges.length; i++) {
//                 var currentPage = pagedData.fetch(i);
//                 var pageData = currentPage.data;
//                 if (pageData.length > 0) {
//                     for (var pageResultIndex = 0; pageResultIndex < pagedData.length; pageResultIndex++) {
//                         arrTransactionResults.push({
//                             customer_id: pageData[pageResultIndex].getValue({name: 'entity'}),
//                             name: pageData[pageResultIndex].getText({name: 'entity'}),
//                             trans_id: pageData[pageResultIndex].getValue({name: 'tranid'}),
//                             document: pageData[pageResultIndex].getValue({name: 'transactionnumber'}),
//                             date: pageData[pageResultIndex].getValue({name: 'trandate'}),
//                             subsidiary: pageData[pageResultIndex].getValue({name: 'subsidiary'}),
//                             amount: pageData[pageResultIndex].getValue({name: 'amount'}),
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


// libModule.consolidateRawData = function (arrData) {
//     var objNewData = {};
//     arrData.forEach(function (data) {
//         if (objNewData[data.cust_id] == null) {
//             objNewData[data.cust_id] = [];
//         }
//         objNewData[data.cust_id].push(data);
//     });
//     return objNewData;
// }

// libModule.consolidateNewData = function (arrData) {
//     let arrTest = [];
//     let objNewData = {};
//     for (let customer in arrData) {
//         objNewData[customer] = {};
//         let arrTransPerCustomer = [];
//         arrData[customer].forEach(function (data) {
//             libMapping.oopAct1.transactions.forEach(function (lineField) {
//                 let objTransPerCustomer = {};
//                 for (let field in lineField) {
//                     if (data[field]) {
//                         objTransPerCustomer[lineField[field]] = data[field];
//                     }
//                 }
//                 arrTransPerCustomer.push(objTransPerCustomer);
//             });
//         });
//         objNewData[customer].id = arrData[customer][0].cust_id;
//         objNewData[customer].name = arrData[customer][0].name;
//         objNewData[customer].subsidiary = arrData[customer][0].subsidiary;
//         objNewData[customer].transactions = arrTransPerCustomer;
//     }
//     return objNewData;
// }

// libModule.consolidateByTransaction = function (arrByTrans) {
//     var arrDataTransaction = [];
//     arrByTrans.forEach(function (data) {
//         let objDataTransactions = {
//             id: data.trans_id,
//             document: data.document,
//             date: data.date,
//             subsidiary: data.subsidiary,
//             amount: data.amount,
//         }
//         arrDataTransaction.push(objDataTransactions);
//     });
//     return arrDataTransaction;
// }


// libModule.consolidateCustomerData = function (arrData) {
//     var arrCustomerData = [];
//     arrData.forEach(function (data) {
//         let objCustomerData = {
//             id: data.cust_id,
//             name: data.name,
//             subsidiary: data.subsidiary,
//         }
//         arrCustomerData.push(objCustomerData);
//     });
//     return arrCustomerData;
// }
//
// libModule.consolidateTransData = function (arrData) {
//     var arrDataTransaction = [];
//     arrData.forEach(function (data) {
//         let objDataTransactions = {
//             id: data.trans_id,
//             document: data.document,
//             date: data.subsidiary,
//             subsidiary: data.subsidiary,
//             amount: data.amount,
//         }
//         arrDataTransaction.push(objDataTransactions);
//     });
//     return arrDataTransaction;
// }

// libModule.consolidateNewData = function (arrData) {
//     let arrTest = [];
//     for (let customer in arrData) {
//         var objNewData = {};
//         arrData[customer].forEach(function (data) {
//             objNewData['id'] = data.cust_id,
//                 objNewData['name'] = data.name,
//                 objNewData['subsidiary'] = data.subsidiary,
//                 objNewData['transaction'] = arrData[customer]
//         });
//         arrTest.push(objNewData)
//         // log.debug("customer", arrData[customer])
//         // log.debug("arrTransData", arrTransData)
//     }
//     log.debug("arrTest", arrTest)
//     return objNewData;
// }

// libModule.consolidateData = function (arrData) {
//     var arrTransData = [];
//     arrData.forEach(function (data) {
//         log.debug("data", data[arrData])
//
//         arrTransData.push(objDataTransactions);
//     });
//
//     return arrTransData;
// }
// objData[customer]['id'] = objDataByCustomer[customer][0].cust_id;
// objData[customer]['name'] = objDataByCustomer[customer][0].name;
// objData[customer]['subsidiary'] = objDataByCustomer[customer][0].subsidiary;
// objData['id'] = objDataByCustomer[customer].cust_id
// objData['name'] = objDataByCustomer[customer].name
// objData['subsidiary'] = objDataByCustomer[customer].subsidiary
// let objDataTransactions = {
//     id: data.trans_id,
//     document: data.document,
//     date: data.date,
//     subsidiary: data.subsidiary,
//     amount: data.amount,
// }