## Getting Started   

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, install packages run the development server:

```bash
install packages: npm install
run server: npm run dev # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Slider

This repository contains a custom slider component built using React and styled-components.

The slider component allows users to select a value within a specified range by dragging a slider handle along a track.

  

## About

Slider allows us to select value in different ways. It's main purpose is display to user different ways of selecting value.

  

## Features  

-  **Customizable:** The slider component is highly customizable, allowing developers to specify various properties such as minimum and maximum values, width, step size, unit, dot color, line background color, and more.

-  **Responsive:** The slider component is designed to be responsive and works seamlessly across different screen sizes and devices.

-  **Interactive:** Users can interact with the slider by dragging the handle, scrolling the wheel or clicking to select the desired value. The component provides real-time feedback on the selected value and percentage.
  

### Slider props :  


| Property Name       | Required | Default Value | Description                                                                                                                                                                                         |
|---------------------|----------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| min                  | true     | undefined     | The minimum value of the slider.                                                                                                                                                                    |
| max                  | true     | undefined     | The maximum value of the slider.                                                                                                                                                                    |
| value                | true     | undefined     | The current value of the slider.                                                                                                                                                                    |
| width                | true     | undefined     | The width of the slider in px.                                                                                                                                                                      |
| onChange             | false    | undefined     | Callback function triggered when the slider value changes. Receives the new value as an argument.                                                                                                   |
| label                | false    | false         | Determines whether labels are displayed on the slider.                                                                                                                                              |
| unit                 | false    | ' '           | The unit of measurement displayed alongside the slider value.                                                                                                                                       |
| color                | false    | undefined     | The color of the slider.                                                                                                                                                                            |
| step                 | false    | 1             | The increment or decrement value for each step of the slider.                                                                                                                                       |
| dotColor             | false    | #96be25       | The color of the slider dot.                                                                                                                                                                        |
| lineBackgroundColor  | false    | #cbdf92       | The background color of the slider track.                                                                                                                                                           |
| tooltip (In progress)| false    | undefined     | Tooltip will work on hover where we can define additional description for selecting slider values.                                                                                                  |


