import React from "react";
import { Page } from "./Page";

export default {
  title: "Components/Page",
  component: Page,
};

const Template = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  image:
    "https://images.unsplash.com/photo-1611095567319-2f4c389168a9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2702&q=80",
  title: "Development",
  links: [
    {
      link: "/home",
      text: "Home",
    },
    {
      link: "/about-us",
      text: "About Us",
    },
    {
      link: "/contact-us",
      text: "Contact Us",
    },
  ],
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  image:
    "https://images.unsplash.com/photo-1611095567319-2f4c389168a9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2702&q=80",
  title: "Development",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  links: [
    {
      link: "/home",
      text: "Home",
    },
    {
      link: "/about-us",
      text: "About Us",
    },
    {
      link: "/contact-us",
      text: "Contact Us",
    },
  ],
};
