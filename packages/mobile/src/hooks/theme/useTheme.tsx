import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import { themeActions } from './themeActions'
import { IUpdateTheme } from '@/hooks/interfaces'

export function useTheme(): [ITheme, themeActions] {
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  // const dispatch = useDispatch()

  return [
    theme,
    {
      UpdateTheme(data: IUpdateTheme) {
        console.log('data = ', data)
        // dispatch(UpdateMusicsStatusDB({ _id, newSound }))
      },
    },
  ]
}
