// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

module.exports = function generator(plop) {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('react-component', {
    description: 'Adds a new react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.component.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.pending.tsx',
        templateFile: 'templates/component-pending.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/index.ts',
        template: `
          export { {{pascalCase name}} } from './{{kebabCase name}}.component';
          export { {{pascalCase name}}Pending } from './{{kebabCase name}}.pending';
        `,
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.module.scss',
        template: '.{{camelCase name}} {\n\n}\n',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.module.scss.d.ts',
        template: 'export const {{camelCase name}}: string;\n',
      },
      {
        type: 'append',
        path: 'package.json',
        pattern: /"exports": {(?<insertion>)/g,
        template: '    "./{{kebabCase name}}": "./src/{{kebabCase name}}/index.ts",',
      },
    ],
  });
};
