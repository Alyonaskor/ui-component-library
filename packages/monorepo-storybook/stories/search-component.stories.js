import React from 'react';

import App from '../../search-component/src/index'


export default {
    component: App,
    title: 'Search Component',
}


const Template = args => <App {...args} />;

export const Default = Template.bind({});
Default.args = {
  search: {
    searchWords: ''
  },
};

export const RegularSearch = Template.bind({});
RegularSearch.args = {
  search: {
    searchWords: 'Hiv'
  },
};

