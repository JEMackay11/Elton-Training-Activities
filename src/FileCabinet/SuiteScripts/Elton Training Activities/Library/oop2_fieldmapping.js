/**
 * @NApiVersion 2.1
 */
define([], function () {
    const fieldMapping = {};

    fieldMapping.oopAct2 = {
        header: {
            documentNumber: "document_Number",
            customerId: "customerId",
            salesDate: "salesDate",
            subsidiaryId: "subsidiaryId",
        },
        lines: [
            {
                itemId: "itemId",
                lineAmount: "lineAmount",
                lineRate: "lineRate",
                lineQty: "lineQty",
            }
        ]
    }
    return fieldMapping;
});
