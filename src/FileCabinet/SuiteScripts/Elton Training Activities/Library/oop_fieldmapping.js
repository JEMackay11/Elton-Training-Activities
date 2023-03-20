/**
 * @NApiVersion 2.1
 */
define([], function () {
    const fieldMapping = {};

    fieldMapping.oopAct1 = {
        transactions: [
            {
                "trans_id": "trans_id",
                "document": "document",
                "date": "date",
                "subsidiary": "subsidiary",
                "amount": "amount",
            }
        ]

    }
    return fieldMapping;
});
