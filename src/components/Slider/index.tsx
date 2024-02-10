"use client";
import React, { useEffect, useRef, useState } from 'react'
import { SliderElements } from './style';
interface SliderProps {
  /** Minimum value of the slider. */
  min: number;
  /** Maximum value of the slider. */
  max: number;
  /** Current value of the slider. */
  value: number;
  /** Width of the slider component. */
  width: number;
  /** Callback function triggered when the slider value changes. */
  onChange?: (value: number, percent?: string) => void;
  /** Boolean flag indicating whether to display the label. */
  label?: boolean;
  /** Unit to display alongside the slider value. */
  unit?: string;
  /** Color of the slider thumb. */
  thumbColor?: string;
  /** Step value for the slider. */
  step?: number;
  /** Background color of the slider track. */
  lineBackgroundColor?: string;
}

const thumbRadius = 40
const defaultThumbColor = '#96be25'
const defaultLineBackgroundColor = '#cbdf92'

const Slider: React.FC<SliderProps> = (props) => {
  const { min, max, value, width } = props
  const [sliderXAxisValue, setSliderXAxisValue] = useState('0')
  const sliderWrapperRef = useRef<HTMLDivElement>(null)
  const sliderThumbRef = useRef<HTMLDivElement>(null)
  const [scrollX, setScrollX] = useState<number>(0)
  const [startMove, setStartMove] = useState(false)
  const [labelValue, setLabel] = useState(min.toString())
  const scrollXRef = useRef<number | null>(null);
  const startMoveRef = useRef<boolean | null>(null)

  // Calculate the interval between each step on the slider.
  const interval = props.step ? width / ((max - min) / props.step) : width / (max - min)

  useEffect(() => {
    scrollXRef.current = scrollX
  }, [scrollX])

  useEffect(() => {
    startMoveRef.current = startMove
  }, [startMove])

  useEffect(() => {
    if (value) {
      handleSetSliderValues()
    }
    if (!sliderWrapperRef) {
      return
    }
    sliderWrapperRef.current?.addEventListener('wheel', handleScroll)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      sliderWrapperRef.current?.removeEventListener('wheel', handleScroll)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  function handleMouseUp() {
    if (startMoveRef.current) {
      setStartMove(false)
    }
  }

  function handleSetSliderValues() {
    const valuePercent = value / (max - min)
    setLabel(value.toString())
    setScrollX(width * valuePercent)
    setSliderXAxisValue(Math.round(valuePercent * 100).toString())
  }

  function handleMovingMouseWithSteps(sliderValue: number, offsetX: number, sliderWidth: number, goingLeft: boolean) {
    const middleInterval = props.step ? interval / 2 : 1

    // We are checking if mouse crossed half line beetween intervals
    // This value indicates where the thumb should be moved
    const stepsAhead = sliderValue % interval >= middleInterval
    const steps = offsetX >= middleInterval ? Math.round(sliderValue / interval) : 0

    // Calculate the percentage of the slider that the mouse has moved
    const percentMovedThumb = (steps * interval / sliderWidth) * 100

    // Calculate the value based on the percentage
    const newValue = (max - min) * (percentMovedThumb / 100) + min
    if (newValue <= max) {
      setLabel(Math.round(newValue).toString())
      if (stepsAhead) {
        setScrollX(steps * interval)
        setTimeout(() => {
          setSliderXAxisValue(percentMovedThumb.toString())
        }, 50)
      } else if (steps === 0) {
        setScrollX(0)
        setSliderXAxisValue('0')
      }

      // Update the slider value
      props.onChange && props.onChange(Math.round(newValue), Math.round(percentMovedThumb).toString())
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (startMoveRef.current) {
      const sliderLeft = sliderWrapperRef.current?.getBoundingClientRect().left || 0

      // Calculate the mouse position relative to the slider
      const offsetX = e.clientX - sliderLeft

      // Update the scroll position
      const mouseXValue = Math.min(Math.max(offsetX, 0), width)

      // In case we have predefined step
      if (props.step) {
        handleMovingMouseWithSteps(mouseXValue, offsetX, width, e.movementX < 0)
        return
      }
      const addPercent = e.movementX < 0 ? (thumbRadius - 3) / 2 / width * 100 : 0
      const percentMovedThumb = ((mouseXValue) / width) * 100

      // Calculate the value based on the percentage
      const newValue = (max - min) * (percentMovedThumb / 100) + min

      // in case new step exceeds max value
      // case interval value is not divisible with max - min
      if (newValue <= max) {
        setScrollX(mouseXValue)
        setSliderXAxisValue((percentMovedThumb + addPercent).toString())
        setLabel(Math.round(newValue).toString())

        // Update the slider value
        props.onChange && props.onChange(Math.round(newValue), Math.round(percentMovedThumb).toString())
      }
    }
  }

  function handleClickSlider(event: React.MouseEvent<HTMLDivElement>) {
    const sliderLeft = sliderWrapperRef.current?.getBoundingClientRect().left || 0

    // Calculate the mouse position relative to the slider
    const offsetX = event.clientX - sliderLeft

    // Update the scroll position
    const sliderValue = Math.min(Math.max(offsetX, 0), width)
    let steps = offsetX >= interval / 2 ? Math.round(sliderValue / interval) : 0

    // Calculate the percentage of the slider that the mouse has moved
    const percentMovedThumb = (steps * interval / width) * 100

    // Calculate the value based on the percentage
    const newValue = (max - min) * (percentMovedThumb / 100) + min

    // in case new step exceeds max value
    // case interval value is not divisible with max - min
    if (newValue <= max) {
      setLabel(Math.round(newValue).toString())
      setScrollX(steps * interval)
      setSliderXAxisValue(percentMovedThumb.toString())

      // Update the slider value
      props.onChange && props.onChange(Math.round(newValue), Math.round(percentMovedThumb).toString())
    }
  }

  function handleScroll(event: WheelEvent) {
    const goingLeft = event.deltaY > 0
    // check if wheel is going up or down
    const directionValue = goingLeft ? -interval : interval
    handleScrollThumb(directionValue, goingLeft)
  }

  function handleScrollThumb(directionValue: number, goingLeft: boolean) {
    const previousValue = scrollXRef.current || 0
    const remainder = width % interval

    // Update the scroll position
    const updateValue = previousValue + directionValue
    const updatedScrollValue = Math.min(Math.max(updateValue, 0), width - remainder)
    const percentMovedThumb = updatedScrollValue / width * 100

    // in case going left add radius into percent of filling calculation
    // make animation go smoother
    const addPercent = goingLeft ? (thumbRadius - 3) / 2 / width * 100 : 0
    const newValue = (max - min) * (percentMovedThumb / 100) + min

    // in case new step exceeds max value
    // case interval value is not divisible with max - min
    if (newValue <= max) {
      setLabel(Math.round(newValue).toString())
      setScrollX(updatedScrollValue)
      setTimeout(() => {
        setSliderXAxisValue((percentMovedThumb).toString())
      }, 50)

      // Update the slider value
      props.onChange && props?.onChange(Math.round(newValue), Math.round(percentMovedThumb).toString())
    }
  }

  return <SliderElements.Wrapper
    ref={sliderWrapperRef}
  >
    <SliderElements.Line
      $sliderxaxisvalue={sliderXAxisValue}
      width={width}
      className={startMove ? 'dragging' : ''}
      color={props.thumbColor || defaultThumbColor}
      onMouseDown={handleClickSlider}
      $lineBackgrondColor={props.lineBackgroundColor || defaultLineBackgroundColor}
    />
    <SliderElements.Thumb
      $scrollx={scrollX}
      ref={sliderThumbRef}
      label={Boolean(props.label) ? labelValue : ''}
      color={props.thumbColor || defaultThumbColor}
      $unit={props.unit || ''}
      onMouseDown={() => setStartMove(true)}
    />
  </SliderElements.Wrapper >
}
export default Slider