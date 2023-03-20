/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['../Library/activities_custom_module'],
    /**
     */
    (libModule) => {
        const INPUT_DATA = [
            {
                name: "Ann",
                gender: "F",
                job: "Functional"
            },
            {
                name: "Jen",
                gender: "F",
                job: "Accountant"
            },
            {
                name: "Jessica",
                gender: "F",
                job: "Developer"
            },
            {
                name: "Josh",
                gender: "M",
                job: "Developer"
            },
            {
                name: "Mark",
                gender: "M",
                job: "Functional"
            },
            {
                name: "Miles",
                gender: "M",
                job: "Engineer"
            }
        ];
        const getInputData = (inputContext) => {
            return INPUT_DATA;
        }


        const map = (mapContext) => {
            try {
                let {job} = JSON.parse(mapContext.value);
                mapContext.write({
                    key: {job},
                    value: mapContext.value
                });
            } catch (e) {
                log.error('map:error', e);
            }
        }

        const reduce = (reduceContext) => {
            try {
                let arrByJob = reduceContext.values.map(value => {
                    return JSON.parse(value)
                });
                log.debug("arrByJob", arrByJob);
            } catch (e) {
                log.error('reduce:error', e);
            }
        }

        const summarize = (summaryContext) => {

        }

        return {getInputData, map, reduce, summarize}

    });
