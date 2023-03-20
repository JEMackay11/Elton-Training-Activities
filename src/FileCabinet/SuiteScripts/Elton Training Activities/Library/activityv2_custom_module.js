/**
 * @NApiVersion 2.1
 */
define(['N/search'],
    /**
     * @param{search} search
     */
    (search) => {
        const libModule = {};
        libModule.searchRecord = function () {
            let arrEmpResults = [];
            try {
                let objEmpSearch = search.create({
                    type: 'employee',
                    filters: [],
                    columns:
                        [
                            'entityid',
                            'email',
                            'subsidiary',
                            'department',
                        ]
                });

                var searchResultCount = objEmpSearch.runPaged().count;
                if (searchResultCount != 0) {
                    var pagedData = objEmpSearch.runPaged({pageSize: 1000});
                    for (var i = 0; i < pagedData.pageRanges.length; i++) {
                        var currentPage = pagedData.fetch(i);
                        var pageData = currentPage.data;
                        if (pageData.length > 0) {
                            for (var pageResultIndex = 0; pageResultIndex < pageData.length; pageResultIndex++) {
                                let result = pageData[pageResultIndex];
                                let intSubID = result.getValue({name: 'subsidiary'})
                                arrEmpResults.push({
                                    name: pageData[pageResultIndex].getValue({name: 'entityid'}),
                                    email: pageData[pageResultIndex].getValue({name: 'email'}),
                                    subsidiaryId: pageData[pageResultIndex].getValue({name: 'subsidiary'}),
                                    departmentId: pageData[pageResultIndex].getValue({name: 'department'})
                                });
                            }
                        }
                    }
                }
            } catch (err) {
                log.error("searchRecord", err);
            }

            return arrEmpResults;
        }

        libModule.consolidateBySubId = function (arrBySubsidiary) {
            var objDataPerSubId = {};
            var arrDataPerSubId = [];
            arrBySubsidiary.forEach(function (data) {
                if (objDataPerSubId[data.subsidiaryId] == null) {
                    objDataPerSubId[data.subsidiaryId] = [];
                }
                let objData = {
                    name: data.name,
                    email: data.email,
                    departmentId: data.departmentId,
                }
                objDataPerSubId[data.subsidiaryId].push(objData);
            });
            arrDataPerSubId.push(objDataPerSubId);
            return arrDataPerSubId;
        }


        return libModule;

    });
