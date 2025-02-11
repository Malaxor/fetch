export function capitalize (str) {
  return str.split(' ').reduce((words, word) => {
    words.push(word[0].toUpperCase() + word.slice(1))
    return words
  }, []).join(' ')
}