/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['../Library/activityv2_custom_module'],

    (libModule) => {
        const getInputData = (inputContext) => {
            return libModule.consolidateBySubId(libModule.searchRecord());
        };

        const map = (mapContext) => {
            try {
                const arrEmpData = JSON.parse(mapContext.value);
                log.debug('map: arrEmpData', arrEmpData);
            } catch (e) {
                log.error('map:error', e);
                return 'Error: Could not parse input data';
            }
        };


        const reduce = (reduceContext) => {

        }

        const summarize = (summaryContext) => {

        }

        return {getInputData, map, reduce, summarize}

    });

// const getInputData = (inputContext) => {
//     let arrEmpData = libModule.searchRecord()
//     let arrDataBySubId = libModule.consolidateBySubId(arrEmpData);
//     // log.debug('getinput: arrDataBySubId', arrDataBySubId);
//     return arrDataBySubId;
// }
//
// const map = (mapContext) => {
//     // log.debug("map", mapContext);
//     try {
//         let arrEmpData = JSON.parse(mapContext.value);
//         log.debug('map: arrEmpData', arrEmpData);
//     }catch (e) {
//         log.error('map:error', e);
//     }
//
// }