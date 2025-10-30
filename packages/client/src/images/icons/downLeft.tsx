import { IIcons } from './interfaces'
import { memo } from 'react'

export const DownLeft = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="DownLeft"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASlJREFUSEu1le0xBFEQRc9GYDMgAzYCMkAGREAGyIAIyAARIIOVARkQAXWqelTXYKfmTU//mppXdc/tr/cWzByLmfWpAOwBt2F01Tc8FXAJXCTRX3qtgB3gHtB9jhLAebheAu/ACfAUlEkABXV9EGKPIf4BfE0FHEUjhXyG8EOqTTNAQSdEgPES37rO0QSwFIrbUF07Mdf/7M0ogK4dPZtpvIbrtw1LOQqwBnZD7CqcDy18M8CyCBmKUQBLpPBZqJrRMVBWos6tTb4DtgGnRuhNRZOzhtkIOYyfz5FNyZhmkHsgaCuyOQVKFq2fjaL78dNvQSVXRQa5H/bDbGy8kJLLLkPcbjPo9qU7m3Sb/jVAsz04Geaj4wAY/Qeo5E3euOWtT+bQ1fFz/g3z2joZKcKcfAAAAABJRU5ErkJggg=="
    />
  )
})
