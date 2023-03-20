/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['../Library/activity3_custom_module'],

    (libModule) => {

        const getInputData = (inputContext) => {
            return libModule.searchRecord();
        }

        const map = (mapContext) => {
            try {
                const { name, subsidiary } = JSON.parse(mapContext.value);
                mapContext.write({
                    key: { name, subsidiary },
                    value: mapContext.value
                });
            } catch (e) {
                log.error('map:error', e);
            }
        }

        const reduce = (reduceContext) => {
            try {
                const { name, subsidiary } = JSON.parse(reduceContext.key);
                const arrByName = reduceContext.values.map(JSON.parse);
                const transactions = libModule.consolidateByName(arrByName);
                const output = {
                    name,
                    subsidiary,
                    transactions
                };
                log.debug("output", [output]);
                return [output];
            } catch (e) {
                log.error('reduce:error', e);
            }
        }



        const summarize = (summaryContext) => {

        }

        return {getInputData, map, reduce, summarize}

    });

// const getInputData = (inputContext) => {
//     let arrTransactionData = libModule.searchRecord();
//     // log.debug('getinput :arrTransactionData', arrTransactionData);
//     return arrTransactionData;
// }
//
// const map = (mapContext) => {
//     // log.debug("mapContext", mapContext);
//     try {
//         let {name, subsidiary} = JSON.parse(mapContext.value);
//         mapContext.write({
//             key: {name, subsidiary},
//             value: mapContext.value
//         });
//     } catch (e) {
//         log.error('map:error', e);
//     }
// }
//
// const reduce = (reduceContext) => {
//     try {
//         let objFinalOutput = {};
//         let arrFinalOutput = [];
//         let objKey = JSON.parse(reduceContext.key)
//         let arrByName = reduceContext.values.map(value => {
//             return JSON.parse(value)
//         });
//         let arrDataByTransaction = libModule.consolidateByName(arrByName);
//         objFinalOutput['name'] = objKey.name
//         objFinalOutput['subsidiary'] = objKey.subsidiary,
//             objFinalOutput['transactions'] = arrDataByTransaction
//         arrFinalOutput.push(objFinalOutput);
//         log.debug("arrFinalOutput", arrFinalOutput);
//     } catch (e) {
//         log.error('reduce:error', e);
//     }
// }