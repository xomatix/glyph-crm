import React, { useContext, useState, useEffect, useRef } from "react";
import "./GlLookup.css";
import GlList from "../GlList/GlList";
import GlEdit from "../GlEdit/GlEdit";

export const GlLookup = ({
  field,
  type = "text",
  label = field,
  fieldInLookup = field,
  showLabel = true,
  style = {},
  className = "",
  dataSetIdent,
  nameSpace,
  Context,
  children,
  where = {},
  onClick = () => {},
}) => {
  const contextValue = useContext(Context);
  const { _ = {}, setRecord = () => {} } = contextValue || {};
  const [showList, setShowList] = useState(false);
  const wrapperRef = useRef(null);
  const listRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (newValue) => {
    // console.log(newValue[fieldInLookup]);
    setRecord((prev) => ({ ...prev, [field]: newValue[fieldInLookup] }));
  };

  return (
    <div
      ref={wrapperRef}
      className={`lookup-container ${className}`}
      style={style}
      onFocus={() => {
        setShowList(true);
      }}
    >
      <GlEdit
        field={field}
        type={type}
        label={label}
        showLabel={showLabel}
        Context={Context}
      />
      {showList && (
        <GlList
          dataSetIdent={dataSetIdent}
          nameSpace={nameSpace}
          onClick={(row) => {
            handleChange(row);
            setShowList(false);
            onClick(row);
          }}
          where={where}
          ref={listRef}
        >
          {(row) => children(row)}
        </GlList>
      )}
    </div>
  );
};

export default GlLookup;
