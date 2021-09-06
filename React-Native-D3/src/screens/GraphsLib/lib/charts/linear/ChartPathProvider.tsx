import React, { ReactNode, useMemo, useState } from "react"
import ChartContext, { useGenerateValues } from "../../helpers/ChartContext"

interface IProps {
  data: any
  children: ReactNode
}

export default function ChartPathProvider({
  data: providedData,
  children,
}: IProps) {
  const values = useGenerateValues()
  const [contextReanimatedValue, setContextValue] = useState({})
  const contextValue = useMemo(
    () => ({
      ...values,
      ...contextReanimatedValue,
      providedData,
      setContextValue,
    }),
    [values, contextReanimatedValue, providedData]
  )

  return (
    <ChartContext.Provider value={contextValue as any}>
      {children}
    </ChartContext.Provider>
  )
}
