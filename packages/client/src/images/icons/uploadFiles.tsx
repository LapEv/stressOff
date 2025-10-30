import { IIcons } from './interfaces'
import { memo } from 'react'

export const UploadFiles = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="UploadFiles"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALhJREFUSEvllNENwjAMRF8ngA2ACYAN2ATYjFG6AWyA2IANQCcZqVQ0nBVVAjU/qRL7nn1K3TDyakbWZ3qAQ1h6cq3NWLQBziG8BS4OxAXMgSugXesOrGIvclyAql33lHSmTqoB8ns/oKK7Y4ngdvDSeMSHnWcHhnAVwElOx3Q7SCcPeP+mMz3At2ev+yqLfhug+TJzSjRibsBScd1XtAP06y8MgVKIxDXW2z6gUvdzenZUpIv4f8ATsnwjGVbgPjIAAAAASUVORK5CYII="
    />
  )
})
