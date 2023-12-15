import React, { FC } from "react";
import Popup from "reactjs-popup";

import settings from "../assets/img/settings.svg";

interface IPopup {
  children: React.ReactNode;
}

const CustomPopup: FC<IPopup> = ({ children }) => {
  return (
    <Popup
      trigger={() => <img src={settings} alt="" />}
      position="left top"
      closeOnDocumentClick
      on={["hover", "focus"]}
    >
      <div className="popup">{children}</div>
    </Popup>
  );
};

export default CustomPopup;
