export const myLike = (likes, userId) => likes.some(id => id === userId);

export const createMarkup = (textToHTML) => {
    return {__html:textToHTML}
}