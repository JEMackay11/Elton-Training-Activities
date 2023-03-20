/**
 * @NApiVersion 2.1
 */
define(['N/query', 'N/file'],
    
    (query, file) => {
        const libModule = {};
        libModule.getTransactions = function () {
            try {
                const sqlTransQuery = query.runSuiteQL({
                    query: `SELECT id as recordId, transactionnumber as documentNumber, createddate as salesDate FROM Transaction WHERE recordType='salesorder'`,
                });
                return sqlTransQuery.results.map(result => result.asMap());
            } catch (err) {
                log.error("searchRecord", err);
                return [];
            }
        };


        libModule.convertToFile = function (arrTransData) {
            let fileObj = file.create({
                name: 'suiteql_act2.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(arrTransData)
            });
            fileObj.folder = 157;
            let fileId = fileObj.save();
            return fileId;
        }

        return libModule

    });

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