import getMinNotFalse from "./getMinNotFalse"

const findNextSeparatingCharacter = (text) => {
    let separators = [
        { "name": "title", "openingChar": ",", "closingChar": ",", "value": false },
        { "name": "source", "openingChar": "[", "closingChar": "]", "value": false },
        { "name": "axiom", "openingChar": ":", "closingChar": "", "value": false },
        { "name": "year", "openingChar": "(", "closingChar": ")", "value": false },
        { "name": "context", "openingChar": "@", "closingChar": ")", "value": false },
        { "name": "tags", "openingChar": "#", "closingChar": "", "value": false },
    ]
    separators.forEach(separator => {
        separator.value = text.indexOf(separator.openingChar)
    })
    console.log(separators)
    return getMinNotFalse(separators);
}

export default findNextSeparatingCharacter
// removed 'author' dash character from the list of separators
// {"name": "author", "openingChar": "-", "closingChar": "", "value": false},