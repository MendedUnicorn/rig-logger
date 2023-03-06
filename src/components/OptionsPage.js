import { Tab, TabList } from "@fluentui/react-components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectOptions } from "../selectors/optionsSelectors";

import OptionsCategory from "./OptionsCategory";
import OptionTable from "./OptionTable";

const OptionsPage = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const data = useSelector(selectOptions("rigs"));
  return (
    <div className="options-page-container">
      {/* <div>
        <OptionsCategory categoryName="Rigs" type="rigs" />

        <OptionsCategory categoryName="Operators" type="operators" />
        <OptionsCategory categoryName="Contractors" type="contractors" />
        <OptionsCategory categoryName="DE" type="des" />
        <OptionsCategory categoryName="FSM" type="fsms" />
        <OptionsCategory categoryName="Colleagues" type="colleagues" />
        <OptionsCategory categoryName="Tools" type="tools" />
      </div> */}

      <TabList onTabSelect={(_, data) => setSelectedValue(data.value)}>
        <Tab id="Rigs" value="rigs">
          Rigs
        </Tab>
        <Tab id="Operators" value="operators">
          Operators
        </Tab>
        <Tab id="Contractors" value="contractors">
          Contractors
        </Tab>
        <Tab id="DE" value="des">
          DE
        </Tab>
        <Tab id="FSM" value="fsms">
          FSM
        </Tab>
        <Tab id="colleagues" value="colleagues">
          Colleagues
        </Tab>
        <Tab id="tools" value="tools">
          Tools
        </Tab>
      </TabList>
      {selectedValue && <OptionTable type={selectedValue} data={data} />}
    </div>
  );
};

export default OptionsPage;
