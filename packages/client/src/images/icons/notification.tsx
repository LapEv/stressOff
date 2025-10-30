import { IIcons } from './interfaces'
import { memo } from 'react'

export const Notification = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="NotificationIcon"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATNJREFUSEvtldFRAkEMhj860A6kArECtQNKwAqECoQK0AqkBKgAqACtRDuQ+Z2EkWVzu3Bzb+Zlb2ey/5dks7keHVuvY33OAYyAuQU0ARY1wdUAroBnYAzoW/YNvAJv9h2ySgCP2oVTIYGegGVEaAJI/N0Orizije0fgClwb3tBsiWLADfAzkoSHjbIi5WpnytXBFB0OqjIh4XLVFbKZGbAI/cI8AHcAo+AlyXiqFxrQGfuUqcI8GOOpSZwvdD/H3BRifSovi68g+u0VdM7kLg6YgB82lozcrzrtKrz9MJ/LQW4o8TVfgfHAkWBqZ3V2kftmgK83U5SrUgjW9oIUKHX6HLQTQH+7NsAtlbe7B20Ec6erR0FPvz+imSHW+0sykUjiP4RMs1+7YtWm0FRKHLoHLAHNsk6GUbrB0oAAAAASUVORK5CYII="
    />
  )
})
