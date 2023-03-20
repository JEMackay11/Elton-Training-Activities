/**
 * @NApiVersion 2.1
 */
define(['N/query', 'N/file'],

    (query, file) => {
        const libModule = {};

        libModule.getTransactions = function () {
            let arrInvoiceData = [];
            try {
                let sqlTransQuery = query.runSuiteQL({
                    query: `SELECT id as recordId, transactionnumber as documentNumber, createddate as invoiceDate FROM Transaction WHERE recordType='invoice'`,
                });
                let iterator = sqlTransQuery.iterator();
                iterator.each(function (result) {
                    let currentResult = result.value;
                    let data = currentResult.asMap()
                    arrInvoiceData.push(data)
                    return true;
                });
            } catch (err) {
                log.error("searchRecord", err);
            }
            return arrInvoiceData;
        }



        libModule.convertToFile = function (arrTransData) {
            let fileObj = file.create({
                name: 'suiteql_act1.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(arrTransData)
            });
            fileObj.folder = 157;
            let fileId = fileObj.save();
            return fileId;
        }


        return libModule

    });

// libModule.getTransactions = function () {
//     let arrTransData = [];
//     try {
//         arrTransData = getTransactionData();
//     } catch (err) {
//         log.error("getTransactionData", err);
//     }
//     return arrTransData;
// }
//
// libModule.convertToFile = function (arrTransData) {
//     let fileObj = file.create({
//         name: 'suiteql_act1.txt',
//         fileType: file.Type.PLAINTEXT,
//         contents: JSON.stringify(arrTransData)
//     });
//     fileObj.folder = 157;
//     let fileId = fileObj.save();
//     return fileId;
// }
//
// function getTransactionData() {
//     let arrTransactionData = [];
//     try {
//         const sqlTransQuery = query.runSuiteQL({
//             query: `SELECT id, transactionnumber AS documentNumber, createddate AS invoiceDate FROM Transaction WHERE recordType='invoice'`
//         });
//         const iterator = sqlTransQuery.iterator();
//         iterator.each(function (result) {
//             const currentResult = result.value;
//             const data = currentResult.asMap();
//             arrTransactionData.push(data);
//             return true;
//         });
//     } catch (err) {
//         log.error("getTransactionData", err);
//     }
//     return arrTransactionData;
// }

// libModule.getTransactions = function () {
//     let arrInvData = [];
//     try {
//         arrInvData = searchInvoice();
//     } catch
//         (err) {
//         log.error("searchRecord", err);
//     }
//     return arrInvData;
// }
//
// libModule.convertToFile = function (arrTransData) {
//     let fileObj = file.create({
//         name: 'suiteql_act1.txt',
//         fileType: file.Type.PLAINTEXT,
//         contents: JSON.stringify(arrTransData)
//     });
//     fileObj.folder = 157;
//     let fileId = fileObj.save();
//     return fileId;
// }
//
// function searchInvoice() {
//     let arrInvoiceData = [];
//     try {
//         let sqlTransQuery = query.runSuiteQL({
//             query: `SELECT id as recordId, transactionnumber as documentNumber, createddate as invoiceDate FROM Transaction WHERE recordType='invoice'`,
//         });
//         let iterator = sqlTransQuery.iterator();
//         iterator.each(function(result) {
//             let currentResult = result.value;
//             let data = currentResult.asMap()
//                 arrInvoiceData.push(data)
//             return true;
//         });
//     } catch (err) {
//         log.error("searchRecord", err);
//     }
//     return arrInvoiceData;
// }

// var iterator = fileContent.fileID.lines.iterator();
// var iterator = sqlTransQuery.iterator();

//

// let iterator = sqlLocationQuery.iterator();
// iterator.each(function(result) {
//     let results = result.value.values
//     for (var i = 0; i < results.length; i++) {
//         var mResult = page[i].asMap();
//         log.debug("page", mResult);
//     }
//     // let objInvoiceData = {
//     //     recordId: page.id,
//     //     documentNumber: page.transactionnumber,
//     //     invoiceDate: page.createddate,
//     // }
//     // arrInvoiceData.push(objInvoiceData)
//     return true;
// })
// for (var i = 0; i < sqlLocationQuery.results.length; i++) {
//     var mResult = sqlLocationQuery.results[i].asMap();
//     let objInvoiceData = {
//         recordId: mResult.id,
//         documentNumber: mResult.transactionnumber,
//         invoiceDate: mResult.createddate,
//     }
//     arrInvoiceData.push(objInvoiceData)
// }