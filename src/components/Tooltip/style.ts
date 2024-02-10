import styled from "styled-components";

const tooltipVariables = {
  tooltipTextColor: 'white',
  tooltipBackgroundColor: 'black',
  tooltipMargin: '80px',
  tooltipArrowSize: '6px'
};

export const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const Tooltip = styled.div`
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px;
  color: ${tooltipVariables.tooltipTextColor};
  background: ${tooltipVariables.tooltipBackgroundColor};
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1;
  z-index: 100;
  white-space: nowrap;

  &::before {
    content: " ";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: ${tooltipVariables.tooltipArrowSize};
    margin-left: calc(${tooltipVariables.tooltipArrowSize} * -1);
  }
`;

export const TopTooltip = styled(Tooltip)`
  top: calc(${tooltipVariables.tooltipMargin} * -1);

  &::before {
    top: 100%;
    border-top-color: ${tooltipVariables.tooltipBackgroundColor};
  }
`;