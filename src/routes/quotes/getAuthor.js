import  findNextSeparatingCharacter  from "./findNextSeparatingCharacter";

const getAuthor = (workingQuoteObject) => {
    let { author, remainingText } = workingQuoteObject
    workingQuoteObject['author'] = author = remainingText
    // console.log(remainingText)
    let textEnd = remainingText.length;
    let separatorValue = findNextSeparatingCharacter(remainingText);
    console.log(`🚀 ~ file: parseQuotes.js ~ line 60 ~ getQuoteAuthor ~ author`, author)
    console.log(`🚀 ~ file: parseQuotes.js ~ line 62 ~ getQuoteAuthor ~ remainingText`, remainingText)
    console.log(`🚀 ~ file: parseQuotes.js ~ line 62 ~ getQuoteAuthor ~ separatorValue`, separatorValue)
    if (separatorValue.value > -1  && author) {
        console.log(`🚀 ~ file: parseQuotes.js ~ line 65 ~ getQuoteAuthor ~ separatorValue > -1 && separatorValue`, (separatorValue > -1), separatorValue, author)
        // author = authorContainsDash(workingQuoteObject, author)
        remainingText = remainingText.trim()
        author = Array.from(remainingText).splice(2, separatorValue.value).join(String()).trim();
        console.log(`🚀 ~ file: getAuthor.js ~ line 16 ~ getAuthor ~ author`, author)

        // author = Array.from(remainingText).splice(separatorValue.value + 2, textEnd).join(String()).trim();
        remainingText = Array.from(remainingText).splice(separatorValue.value, textEnd).join(String()).trim();
        console.log(`🚀 ~ file: parseQuotes.js ~ line 79 ~ getQuoteAuthor ~ remainingText`, remainingText)
        workingQuoteObject['remainingText'] = remainingText
        workingQuoteObject['parsingComplete'] = true
    } else  {
        console.log( 'parse.js line:45 separatorValue', separatorValue);
        // author = authorContainsDash(workingQuoteObject['remainingText'])
        // author = authorContainsDash(remainingText)
        workingQuoteObject['author'] = author
        workingQuoteObject['remainingText'] = false
        workingQuoteObject['parsingComplete'] = true
    }
    workingQuoteObject['author'] = author;
    // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 53 ~ parseQuoteAuthorName ~ author`, author)
    // console.log(`🚀 ~ file: parse.js ~ line 54 ~ getQuoteAuthor ~ remainingText`, remainingText)
    // console.log(`🚀 ~ file: parse.js ~ line 54 ~ getQuoteAuthor ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject
}

// function authorContainsDash(workingQuoteObject, author) {
//     console.log(`🚀 ~ file: parseQuotes.js ~ line 50 ~ authorContainsDash ~ author`, author)
//     if (author.includes("-")) {
//         console.log(`🚀 ~ file: parseQuotes.js ~ line 53 ~ authorContainsDash ~ author.includes("-")`, true)
//         // let res = author.split("-")[1].trim()
//         let res = author.split("-")
//         console.log(`🚀 ~ file: parseQuotes.js ~ line 55 ~ authorContainsDash ~ res`, res)
//         res.shift()
//         res.join(String()).trim()
//         // res.trim()
//         workingQuoteObject['author'] = res
//         // let res = author.split("-").trim()
//         console.log(`🚀 ~ file: parseQuotes.js ~ line 53 ~ authorContainsDash ~ res`, res)
//         return res
//     }
//     return author.trim()
// }


export default getAuthor;