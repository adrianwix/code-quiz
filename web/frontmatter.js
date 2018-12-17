const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const exampleFileRoute = path.resolve(__dirname, '../data/javascript/simple-add.md');
const exampleFile = fs.readFileSync(exampleFileRoute, { encoding: 'utf8' });
const parsedExample = matter(exampleFile);

console.log(parsedExample);

const categoryPath = path.resolve(__dirname, `../data/javascript/category.json`);
const category = require(categoryPath);
const { quizzes } = category;

const route = {
  component: 'src/components/pages/QuestionMD',
  path: '/javascript/questionmd',
  getData: () => ({
    question: parsedExample.data,
    content: parsedExample.content,
    quizzes: quizzes,
    questionKey: 'simple-add',
    subcategory: 'arithmetic',
  }),
};

export default route;
