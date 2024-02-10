"use client";
import Slider from "@/components/Slider/index";
import { useState } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
flex-direction: column;
gap: 50px;
`
const SliderWrapper = styled.div`
background: rgb(232,232,232);
width: 50%;
height: 300px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 15px;
`

const PercentStyled = styled.div`
background: rgb(232,232,232);
width: 300px;
height: 100px;
display: flex;
justify-content: center;
flex-direction: column;
gap: 10px;
align-items: center;
border-radius: 15px;
`


export default function Home() {
  const [value, setValue] = useState(0)
  const [percent, setPercent] = useState('0')

  return (
    <main>
      <SliderContainer>
        <PercentStyled>
          <div>{`Value: ${value}`}</div>
          <div>{`Percent: ${percent}%`}</div>
        </PercentStyled>
        <SliderWrapper>
          <Slider
            min={0}
            max={200}
            step={10}
            value={value}
            unit={'kg'}
            width={400}
            onChange={(value, percent) => {
              setValue(value)
              setPercent(percent || '')
            }}
            thumbColor={'#6617EB'}
            lineBackgroundColor={'#CAB8E8'}
            label
          />
        </SliderWrapper>
      </SliderContainer>
    </main>
  );
}
