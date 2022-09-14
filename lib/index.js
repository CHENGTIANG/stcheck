const globby = require("globby");

const { readFileContent, stripComments } = require("./utils");

function check(options) {
  const { patterns, ignoreTexts, dict, ignoreComments, gitignore } =
    Object.assign(
      {
        patterns: [],
        ignoreTexts: [],
        dict: {},
        ignoreComments: true,
        gitignore: false,
      },
      options
    );
  const files = [];
  const filePaths = globby.sync(patterns, {
    gitignore,
  });
  for (const filePath of filePaths) {
    const rawContent = readFileContent(filePath);

    // 移除代码注释
    let content = rawContent;
    if (ignoreComments) {
      content = stripComments(rawContent);
    }

    // 将需要忽略的文本替换成*
    for (let i in ignoreTexts) {
      const text = ignoreTexts[i];
      if (text) {
        content = content.replace(new RegExp(text, "g"), "*");
      }
    }

    const lines = content.split("\n");
    const rowLines = rawContent.split("\n");
    const items = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const matches = line.match(/[\u4e00-\u9fa5]+/g);
      if (matches) {
        matches
          .join("")
          .split("")
          .forEach((char) => {
            const prefer = dict[char];
            if (prefer) {
              items.push({
                char,
                prefer,
                line: i + 1,
                code: rowLines[i],
              });
            }
          });
      }
    }

    if (items.length > 0) {
      files.push({
        filePath,
        items,
      });
    }
  }

  return files;
}

exports.check = check;
