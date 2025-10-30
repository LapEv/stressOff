import { IIcons } from './interfaces'
import { memo } from 'react'

export const Exit = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="Exit"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMdJREFUSEvdleENwkAIhb9O4AjaTXQTnUxHcYS6gW6gE2heUkxzbeWkPU16f4H34MFBReFXFcbn5wRb4AhsgpVdgQNwtvi0Ajmsg+AWJox6jODZGqLS9eJToOUTnID9hx65Enn9FUAD7ID7gPMsBMIVuEhE1n0ugTl4lZhdMy/Z7P2fwMvcMnwA+vVfS5RDcGnBQ032PtrkMfUIciqUz3tDLG9VqHErTwfHfuvek1QijZ4aGb0JAteuGj04E5Pvh0cPS3YixQlenxYyGbO5dyYAAAAASUVORK5CYII="
    />
  )
})
