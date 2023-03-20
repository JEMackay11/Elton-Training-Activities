/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/message'],
/**
 * @param{message} message
 */
function(message) {

    function pageInit(scriptContext) {
        console.log("TEST");
        let myMsg = message.create({
            title: 'My Title',
            message: 'My Message',
            type: message.Type.CONFIRMATION
        });
        myMsg.show({
            duration: 5000 // will disappear after 5s
        });
    }

    return {
        pageInit: pageInit
    };
    
});
