import Checkbox from "./Checkbox";

export default{
    title: "components/Checkbox",
    component: Checkbox,
};

const Template = (args) => <Checkbox  {...args}/>

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args= {
    label: "Default Checkbox",
    controlChecked: false,
    defaultValue: false,
    disabled: false
};

export const CheckedCheckbox = Template.bind({});
CheckedCheckbox.args ={
    label: "Checked Checkbox",
    controlChecked: true,
    defaultvalue: true,
    disabled: false
}

export const DisabledCheckbox = Template.bind({});
DisabledCheckbox.args={
    label: "Disabled Checkbox",
    controlChecked: false,
    defaultValue: false,
    disabled: true
}
