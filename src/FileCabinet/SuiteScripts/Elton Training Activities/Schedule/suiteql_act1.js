/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/query', '../Library/suiteql_act_custom_module'],
    /**
 * @param{query} query
 */
    (query, libModule) => {

        const execute = (scriptContext) => {
            try {
                let arrTransData = libModule.getTransactions();
                let fileId = libModule.convertToFile(arrTransData);
                log.debug('arrTransData', arrTransData);
                log.debug('fileId', fileId);
            }
            catch (e) {
                log.debug('execute: error', e);
            }
        }

        return {execute}

    });
