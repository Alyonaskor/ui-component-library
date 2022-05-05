* git clone https://github.com/Alyonaskor/ui-component-library.git
* cd ui-component-library/
* yarn
* cd packages/monorepo-storybook/
* yarn storybook (test components on Storybook localhost:6006)
* ctrl + c
* insert folder with your-component into folder packages
* drag your file.stories.js into packages/monorepo-storybook/stories
* in file.stories.js cange import YourComponent from '../../your-component/src/index'
* cd ui-components-library 
* lerna bootstrap
* cd packages/monorepo-storybook/
* yarn storybook