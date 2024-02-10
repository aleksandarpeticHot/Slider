import styled from "styled-components"

const sliderHeight = 14
const thumbRadius = 40

interface ThumbProps {
  $scrollx: number
  label: string
  $unit: string
  color: string
}

interface LineProps {
  $sliderxaxisvalue: string
  width: number
  color: string
  $lineBackgrondColor: string
}

const Line = styled.div<LineProps>`
min-width: 300px;
width: ${props => props.width}px;
height: ${sliderHeight}px;
background: linear-gradient(
  to right, 
  ${(props) => props.color} 0%, 
  ${(props) => props.color} ${(props) => props.$sliderxaxisvalue}%, 
  ${(props) => props.$lineBackgrondColor} ${(props) => props.$sliderxaxisvalue}%, 
  ${(props) => props.$lineBackgrondColor} 100%
);
border-radius: 7px;
&:hover {
  cursor: pointer;
}
`

const Thumb = styled.div<ThumbProps>`
width: ${thumbRadius}px;
height: ${thumbRadius}px;
border-radius: 50%;
left: -${thumbRadius / 2}px;
top: -${sliderHeight}px;
background-color: ${props => props.color};
transition: transform 0.1s ease; /* Smooth transition */
display: inline-block;  transition: 
margin-right: 8px;
transform: translateX(${props => props.$scrollx}px);
position: absolute;
cursor: pointer;
opacity: 1;
&:active {
  cursor: grabbing !important;
}

${props => props.label && `
    &::after {
      content: '${props.label}${props.$unit}';
      position: absolute;
      top: 100%;
      display: flex;
      gap: 3px;
      align-items: center;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 5px;
      font-size: 12px;
    }
`}
`

const Wrapper = styled.div`
position: relative;
`

export const SliderElements = {
  Line,
  Thumb,
  Wrapper
}