import Button from "./Button";

export default {
  title: "components/button",
  component: Button,
};

const Template = (args) => <Button onClick={alertMessage} {...args} />;

const alertMessage = () => {
  alert("Button Clicked!?");
};

export const PrimaryButton = {
  args: {
    children: "Button",
    type: "primary",
    onClick: alertMessage,
  },
};

export const SecondaryButton = {
    args: {
      children: "Button",
      type: "secondary",
      onClick: alertMessage,
    },
  };
  