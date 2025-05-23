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
  const { record = {}, setRecord = () => {} } = contextValue || {};
  const [showList, setShowList] = useState(false);
  const wrapperRef = useRef(null);
  const lookupListRef = useRef();

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
    setRecord((prev) => ({
      ...prev,
      [field]: newValue[field],
      [fieldInLookup]: newValue[fieldInLookup],
    }));
  };

  const handleSearchLookup = () => {
    if (lookupListRef != null && lookupListRef.current != null) {
      lookupListRef.current.refresh();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`lookup-container ${className}`}
      style={style}
      onFocus={(e) => {
        if (!e.target.closest('button[aria-label="Clear"]')) {
          setShowList(true);
        }
      }}
    >
      <GlEdit
        field={fieldInLookup}
        type={type}
        label={label}
        showLabel={showLabel}
        Context={Context}
        onEnter={handleSearchLookup}
      />
      {showList && (
        <GlList
          ref={lookupListRef}
          dataSetIdent={dataSetIdent}
          nameSpace={nameSpace}
          onClick={(row) => {
            handleChange(row);
            setShowList(false);
            onClick(row);
          }}
          where={{
            ...where,
            field: record[field],
            [fieldInLookup]: record[fieldInLookup],
          }}
        >
          {(row) => children(row)}
        </GlList>
      )}
    </div>
  );
};

export default GlLookup;
