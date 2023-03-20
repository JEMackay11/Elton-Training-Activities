/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['../Library/oop_act2_custom_module'],
    
    (libModule) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
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
