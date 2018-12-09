import fs from 'fs';
import path from 'path';
import dataIndex from '../data/index.json';

// Route Format:
// {
//   path: string,
//   getData: function
//   component: 'pages/TestQuestion'
// }

const buildRoutes = () => {
  const { categories } = dataIndex;
  const categoryRoutes = [];
  const questionRoutes = [];

  // TODO: make category root paths - i.e. /javascript to hold all JS quizzes
  categories.forEach(c => {
    const categoryPath = path.resolve(__dirname, `../data/${c.key}/index.json`);
    const category = require(categoryPath);
    const { quizzes } = category;

    const categoryRoute = {
      path: `/${c.key}`,
      getData: () => ({
        name: c.name,
        category,
      }),
      component: 'src/components/pages/Category',
    };

    categoryRoutes.push(categoryRoute);

    quizzes.forEach(q => {
      const questionPath = path.resolve(__dirname, `../data/${c.key}/${q.key}/index.json`);
      const question = require(questionPath);
      const filePath = path.resolve(
        __dirname,
        `../data/${c.key}/${q.key}/${question.questionFile}`,
      );
      const file = fs.readFileSync(filePath, { encoding: 'utf8' });

      const questionRoute = {
        path: `/${c.key}/${q.key}`,
        getData: () => ({
          question,
          file,
          questionKey: q.key,
        }),
        component: 'src/components/pages/Question',
      };

      questionRoutes.push(questionRoute);
    });
  });

  return [...categoryRoutes, ...questionRoutes];
};

export default buildRoutes;
