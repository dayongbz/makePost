const fs = require('fs')
const readline = require('readline')
const d = new Date();

const addZero = (data) => {
  return data < 10 ? "0" + data : data.toString()
}

const addZeroForTimezonOffset = (data) => {
  const sign = data.toString()[0];
  const dataAbs = Math.abs(data) / 60;
  let result = dataAbs.toString();

  for (let i = result.length; i < 4; i++) {
    result = "0".concat(result);
  }

  if (sign == "-") {
    result = "+".concat(result);
  } else if (data !== 0) {
    result = "-".concat(result);
  } else {
    result = "+".concat(result);
  }

  return result;
}

const setting = {
  title: "", fileName: "", category: "", tags: "", date: {
    year: d.getFullYear().toString(),
    month: addZero(d.getMonth() + 1),
    date: addZero(d.getDate()),
    hours: addZero(d.getHours()),
    minutes: addZero(d.getMinutes()),
    seconds: addZero(d.getSeconds()),
    timezone: addZeroForTimezonOffset(d.getTimezoneOffset())
  }
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
  setting.fileName = `${setting.date.year}-${setting.date.month}-${setting.date.date}-${setting.title.replace(/\s+/gm, '_')}`
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
        `date: ${setting.date.year}-${setting.date.month}-${setting.date.date} ${setting.date.hours}:${setting.date.minutes}:${setting.date.seconds} ${setting.date.timezone}\n` +
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
