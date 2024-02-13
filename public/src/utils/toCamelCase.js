import _ from "lodash";

export function toCamelCase(text) {
    return _.flow(
        _.camelCase,
        _.startCase
    )(text);
}