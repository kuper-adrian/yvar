const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const VARS_FINDER_EXPRESSION_LEFT = '\\$_\\{\\s*';
const VARS_FINDER_EXPRESSION_RIGHT = '\\s*\\}';

const templateFilePath = argv._[0];
const outputFilePath = argv._[1];

let replacementVars = [];
Object.keys(argv).forEach((key) => {
  if (key === '_') return;
  replacementVars.push({ name: key, value: argv[key] })
});

const template = fs.readFileSync(templateFilePath).toString();
let output = template;

/**
 * Returns regex expression to find patterns like {{ test }} in a string
 * @param {String} varName Name of variable to find with regex
 */
function craftRegexExpression(varName) {
  return new RegExp(VARS_FINDER_EXPRESSION_LEFT + varName + VARS_FINDER_EXPRESSION_RIGHT, 'g');
}

for (let i = 0; i < replacementVars.length; i++) {
  const element = replacementVars[i];
  output = output.replace(craftRegexExpression(element.name), element.value);
}

fs.writeFileSync(outputFilePath, output);