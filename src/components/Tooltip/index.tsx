import React, { useState } from "react"
import { TooltipWrapper, TopTooltip } from "./style"

interface TooltipProps {
  delay?: number
  direction?: string
  content: React.ReactNode
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ delay = 400, direction = "top", content, children }) => {
  let timeout: NodeJS.Timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, delay || 200)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <TooltipWrapper
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <TopTooltip>
          {content}
        </TopTooltip>
      )}
    </TooltipWrapper>
  )
}

export default Tooltip