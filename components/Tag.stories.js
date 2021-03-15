import React from "react";
import { Tag } from "./Tag";
import styles from "./Tag.module.css";

export default {
  title: "Components/Tag",
  component: Tag,
};

const Template = (args) => <Tag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: "development",
  image:
    "https://images.unsplash.com/photo-1611095567319-2f4c389168a9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2702&q=80",
  title: "Development",
  description: "development tag for developers",
};

export const Large = Template.bind({});
Large.args = {
  id: "development",
  image:
    "https://images.unsplash.com/photo-1611095567319-2f4c389168a9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2702&q=80",
  title: "Development",
  description: "development tag for developers",
  size: "large",
};
