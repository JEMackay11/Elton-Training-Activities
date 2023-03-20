/**
 * @NApiVersion 2.1
 */
define(['N/query', 'N/file'],

    (query, file) => {
        const libModule = {};
        libModule.getTransactions = function () {
            let arrSalesOrderData = [];
            try {
                let resultIterator = query.runSuiteQLPaged({
                    query: `SELECT id as recordId, transactionnumber as documentNumber, createddate as salesDate FROM Transaction WHERE recordType='salesorder'`,
                    pageSize: 25
                }).iterator();

                resultIterator.each(function (page) {
                    let pageIterator = page.value.data.iterator();
                    pageIterator.each(function (row) {
                        let objSalesOrderData = {
                            recordId: row.value.getValue(0),
                            documentNumber: row.value.getValue(1),
                            invoiceDate: row.value.getValue(2),
                        }
                        arrSalesOrderData.push(objSalesOrderData)
                        return true;
                    });

                    return true;
                });

            } catch (err) {
                log.error("searchRecord", err);
            }
            return arrSalesOrderData;
        }

        libModule.convertToFile = function (arrTransData) {
            let fileObj = file.create({
                name: 'suiteql_act3.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(arrTransData)
            });
            fileObj.folder = 157;
            let fileId = fileObj.save();
            return fileId;
        }


        return libModule

    });;




// function generateDynamicObject(propertyNames, row) {
//     let obj = {};
//     for (let i = 0; i < propertyNames.length; i++) {
//         obj[propertyNames[i]] = row.getValue(i);
//     }
//     return obj;
// }

// function searchSalesOrder() {
//     let arrSalesOrderData = [];
//     try {
//         let resultIterator  = query.runSuiteQLPaged({
//             query: `SELECT id as recordId, transactionnumber as documentNumber, createddate as salesDate FROM Transaction WHERE recordType='salesorder'`,
//             pageSize: 25
//         }).iterator();
//
//         resultIterator.each(function(page) {
//             let pageIterator = page.value.data.iterator();
//             pageIterator.each(function(row) {
//                 let objSalesOrderData = {
//                     recordId: row.value.getValue(0),
//                     documentNumber: row.value.getValue(1),
//                     invoiceDate: row.value.getValue(2),
//                 }
//                 arrSalesOrderData.push(objSalesOrderData)
//                 return true;
//             });
//
//             return true;
//         });
//
//     } catch (err) {
//         log.error("searchRecord", err);
//     }
//     return arrSalesOrderData;
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