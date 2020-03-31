import { CLICK_UPDATE_VALUE } from "./actionTypes";

const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  newValue: value
});

export default clickButton;