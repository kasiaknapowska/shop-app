import { useState } from "react";
import styled from "styled-components";
import "./_Select.scss"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const DropDownContainer = styled("div")`
  background-color: white;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
`;
const DropDownHeader = styled("div")`
  color: #802c6e;
  padding: .9rem 1rem;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const DropDownListContainer = styled("div")`
  color: #707070;
  text-align: left;
  border: 1px solid #e0e0e0;
  border-top: none;
  background-color: white;
  position: absolute;
  z-index: 2;
`;
const DropDownList = styled("ul")``;
const ListItem = styled("li")`
  padding: .8rem;
  &:last-child {
    padding-bottom: 1rem;
  }
  &:hover {
    background-color: #2fc5e6;
  }
`;

export default function Select({ option, dropDownOptions, successcallback, inputSize, arrowPosition }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  

  const onClick = (element, successcallback) => {
    successcallback(element);
    setIsOpen(false);
  };

  return (
    <>
      <DropDownContainer style={inputSize}>
        <DropDownHeader onClick={toggling}>
          <KeyboardArrowDownRoundedIcon
            fontSize="small"
            className="select_icon"
            style={arrowPosition}
          />
          {option ? option : "Select size"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer style={inputSize}>
            <DropDownList>
              {dropDownOptions &&
                dropDownOptions.map((element) => (
                  <ListItem
                    onClick={(e) => onClick(element, successcallback)}
                    key={Math.random()}
                  >
                    {element}
                  </ListItem>
                ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </>
  );
}
