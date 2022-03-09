import * as React from 'react'
import { useDebugSetState } from '../hooks/fem-erecter'

export const Debug = () => {
  const setState = useDebugSetState()
  return <div>
    <h3>Debug Actions</h3>
    Set State:
    <button onClick={() => setState(0)}>PENDING</button><br />
    <button onClick={() => setState(1)}>ACTIVE</button><br />
    <button onClick={() => setState(2)}>FUNDS_PENDING</button><br />
    <button onClick={() => setState(3)}>SUCCESS</button><br />
    <button onClick={() => setState(4)}>FAILURE</button><br />
  </div>
}