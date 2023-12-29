import React, { FC } from "react";
import Popup from "reactjs-popup";
import hihi from "../assets/img/hihi.svg";

import settings from "../assets/img/settings.svg";

interface IPopup {
  children: React.ReactNode;
}

const CustomPopup: FC<IPopup> = ({ children }) => {
  return (
    <Popup
      trigger={() => (
        <img src={hihi} alt="" style={{ width: 40, height: 40 }} />
      )}
      position="left top"
      closeOnDocumentClick
      on={["hover", "focus"]}
    >
      <div className="popup">{children}</div>
    </Popup>
  );
};

export default CustomPopup;
