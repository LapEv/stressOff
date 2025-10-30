import { IIcons } from './interfaces'
import { memo } from 'react'

export const Categories = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="CategoriesIcon"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPNJREFUSEvtlOERATEQhb+rAB3QARWgAkqgAyqhA0qgAyqgA3RABcyajYmYSFzkZszYX3fJzr7dt++lIHMUmetTOcAG6Hqmkru+3sXmvUxwDVBmJo7N8wK41JmCLkAo7w8QZsDHoW/XyUt+J78t0IuQqZ1XvdG+/nK4O4h2KNAEZkBbu9oDU+Bod1l2yVJ8B9Sdkc9AxwYJOlELuE5eAQNAFjrSnKW+Y2tgaIDLAkinNaBldStTHfRfzu+RCtAABEzCAJz0OwnAUCSiGCvAQn0SRVHIydKtqEZosuOiqnoo6ROZPjlUaZg7Mp2EZJrdaL8HcAPngkYZU3x7HgAAAABJRU5ErkJggg=="
    />
  )
})
