import React, { Fragment, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

function KeyboardDatePickerExample(props) {
  const [selectedDate, setDate] = useState(moment());
  const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));

  const onDateChange = (date, value) => {
    setDate(date);
    setInputValue(value);
  };

  const dateFormatter = str => {
    return str;
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <KeyboardDatePicker
          autoOk={true}
          showTodayButton={true}
          value={selectedDate}
          format="YYYY-MM-DD"
          inputValue={inputValue}
          onChange={onDateChange}
          rifmFormatter={dateFormatter}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default KeyboardDatePickerExample;