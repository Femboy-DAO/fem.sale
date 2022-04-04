import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'

export function useLastDefined<T>(value: T): T {
  const valueRef = useRef<T>(value)
  useEffect(() => {
    if (!isEqual(value, valueRef.current) && Boolean(value)) {
      valueRef.current = value;
    }
  }, [value])
  return valueRef.current;
}