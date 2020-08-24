const fs = require('fs')
const readline = require('readline')
const dayjs = require('dayjs')
const now = dayjs()

const setting = {
  title: "", fileName: "", category: "", tags: ""

};

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const stringToArrayStr = (string) => {
  return "[".concat(string, "]")
}

const getTitle = (answerT) => {
  setting.title = answerT;
  setting.fileName = `${now.format("YYYY-MM-DD")}-${setting.title.replace(/\s+/gm, '_')}`
}

const getCategory = (answerC) => {
  setting.category = stringToArrayStr(answerC)
}

const getTags = (answerTags) => {
  setting.tags = stringToArrayStr(answerTags)
}

r.question("title: ", (answerT) => {
  getTitle(answerT);
  r.question("category: ", (answerC) => {
    getCategory(answerC);
    r.question("tags: ", (answerTags) => {
      getTags(answerTags)
      const data =
        `---\n` +
        `title: ${setting.title}\n` +
        `date: ${now.format("YYYY-MM-DD HH:mm:ss ZZ")}\n` +
        `categories: ${setting.category}\n` +
        `tags: ${setting.tags}\n` +
        `---\n`;
      fs.writeFileSync(`${setting.fileName}.md`, data, 'utf8')
      console.log("Write Complete")
      r.pause()
    })
  })
})



// fs.writeFile('')
