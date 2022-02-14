const getMinNotFalse = (separators) => {
    console.log(`🚀 ~ file: getMinNotFalse.js ~ line 2 ~ getMinNotFalse ~ separators`, separators)
    const charsFound = separators.filter(sep => sep.value > -1)
    console.log(`🚀 ~ file: getMinNotFalse.js ~ line 4 ~ getMinNotFalse ~ charsFound`, charsFound)
    if (!charsFound.length) {
        return false
    }
    const minSeparator = charsFound.reduce((min, item) => { return min > item.value ? item.value : min }, charsFound[0])
    const minSeparatorName = charsFound.reduce((min, item) => { return min > item.value ? item.name : min }, charsFound[0].name)
    console.log(`🚀 ~ file: getMinNotFalse.js ~ line 9 ~ getMinNotFalse ~ minSeparatorName`, minSeparatorName)
    console.log(`🚀 ~ file: getMinNotFalse.js ~ line 7 ~ getMinNotFalse ~ minSeparator`, minSeparator)
    return minSeparator;

}

export default getMinNotFalse