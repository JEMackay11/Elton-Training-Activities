/**
 * @NApiVersion 2.1
 */
define(['N/search'],
    /**
     * @param{search} search
     */
    (search) => {
        const libModule = {};
        libModule.consolidateByJob = function (arrData) {
            var objDataPerJob = {};
            arrData.forEach(function (data) {
                for (let field in data){
                    log.debug("field", field)
                }
                if (objDataPerJob[data.job] == null) {
                    objDataPerJob[data.job] = [];
                }
                objDataPerJob[data.job].push(data);
            });
            return objDataPerJob;
        }

        return libModule;

    });
