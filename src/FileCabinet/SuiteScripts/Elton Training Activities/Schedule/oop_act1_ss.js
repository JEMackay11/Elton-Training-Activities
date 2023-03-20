/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['../Library/oop_act1_custom_module'],
    
    (libModule) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try {
                let arrTransactionData = libModule.searchRecord()
                let arrData = libModule.consolidateNewData(arrTransactionData);
                let fileId = libModule.convertToFile(arrData);
                log.debug('arrData', arrData);
                log.debug('fileId', fileId);
            }
            catch (e) {
                log.debug('execute: error', e);
            }

        }

        return {execute}

    });
