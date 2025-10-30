import { IIcons } from './interfaces'
import { memo } from 'react'

export const Sounds = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="SoundsIcon"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATVJREFUSEvVlWFxwkAQhb8oQAKgAHBQJOAAHOCgVEGpAsABDsAB4AAc1EE7L3PLbI4LBEhm4P5kcsnuu/d2315GwytrOD8vB9AHFoH1IDy3wBTYp9S4h8EM+HRJLPYv7E2AZQxSBcBOradfFjsG5kALuAC5BeBPfQCUbBdQfKzAbX8ISLZ8+Z8+gr6dhJZfgMC0TBLPQNKoDt/AEeimAPShHSW3U/sCxgB6V0LFW44RsI4ZxIFlFkkB/AQGxmIV5CxI9AyAGKptJfPGy+Rr8AyAV6OQ520A1AxqVZPoBOTdWBeDSkX+DW703aPiyZ21tKnoyTCxFwQok8lsVYx2lieWKNX3flQYm4dHRZmxVDwx610ZdjbC7x52Pmdj49qDGBvt2fiu7cIpk/Dq/q374KGkPqhxgH+/LFgZ/DdJbwAAAABJRU5ErkJggg=="
    />
  )
})
