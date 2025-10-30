import { IIcons } from './interfaces'
import { memo } from 'react'
import cl from './icons.module.css'

export const CreateFolder = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="CreateFolder"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALFJREFUSEvVleENgkAMhT8mYARkE9wEJ9NRGMERYAM30NSEpJqrd/VSCPyl976+e5e2IfhrgvXZFDAAV+CUcHUHzsDD61g7mIHuh8BfEA14ersz6qXRCzDJ/wiA6AqktwC1wa838dZJOdgV8NGdkUGVg2MCcs/3OzP3FYUDdJbHzGBTByXjyh1yiajpUj8xmfWtV82oX9a9ogGycG6ZnVDCF/ExNa5LDrtraidnFhgOeAEiZzAZCTsDCwAAAABJRU5ErkJggg=="
    />
  )
})
