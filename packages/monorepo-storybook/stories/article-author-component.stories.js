import React from "react";
import ArticleAuthor from "../../article-author-component/src/index"
import "semantic-ui-css/semantic.min.css";


export default {
    title: "Article Author",
    component: ArticleAuthor,
};

const Template = (args) => <ArticleAuthor {...args} />;

export const Default = Template.bind({});

Default.args = {
    name: "Article Author Name",
    avatar: "https://react.semantic-ui.com/images/avatar/large/molly.png",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    avatarSize:"mini"
};

export const TinySize = Template.bind({});
TinySize.args = {
   ...Default.args,
   avatarSize: 'tiny',
   
};

export const AvShape = Template.bind({});
AvShape.args = {
   ...Default.args,
   avatarSize: "mini",
   avatarShape: "circular",
};
