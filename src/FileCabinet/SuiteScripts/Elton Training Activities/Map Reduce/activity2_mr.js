/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['../Library/activity2_custom_module'],

    (libModule) => {

        const getInputData = (inputContext) => {
            return libModule.searchRecord();
        }

        const map = (mapContext) => {
            try {
                let {subsidiaryId} = JSON.parse(mapContext.value);
                mapContext.write({
                    key: {subsidiaryId},
                    value: mapContext.value
                });
            } catch (e) {
                log.error('map:error', e);
            }
        }

        const reduce = (reduceContext) => {
            try {
                let arrBySubsidiary = Array.from(reduceContext.values, value => JSON.parse(value));
                let arrDataBySubId = libModule.consolidateBySubId(arrBySubsidiary);
                log.debug("reduce: objDataBySubId", arrDataBySubId);
            } catch (e) {
                log.error('reduce:error', e);
            }
        }


        // const getInputData = (inputContext) => {
        //     let arrEmpData = libModule.searchRecord()
        //     log.debug('getinput: arrEmpData', arrEmpData);
        //     return arrEmpData;
        // }
        //
        // const map = (mapContext) => {
        //     // log.debug("mapContext", mapContext);
        //     try {
        //         let {subsidiaryId} = JSON.parse(mapContext.value);
        //         mapContext.write({
        //             key: {subsidiaryId},
        //             value: mapContext.value
        //         });
        //     }catch (e) {
        //         log.error('map:error', e);
        //     }
        // }
        //
        // const reduce = (reduceContext) => {
        //     try {
        //     let arrBySubsidiary = reduceContext.values.map(value => {
        //         return JSON.parse(value)
        //     });
        //     let arrDataBySubId = libModule.consolidateBySubId(arrBySubsidiary);
        //     log.debug("reduce: objDataBySubId", arrDataBySubId);
        //     }catch (e) {
        //         log.error('reduce:error', e);
        //     }
        // }

        const summarize = (summaryContext) => {

        }

        return {getInputData, map, reduce, summarize}

    });
