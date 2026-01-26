import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import { themeActions } from './themeActions'
import { IChangeTheme } from '@/hooks/interfaces'
import { useDispatch } from 'react-redux'
import { ChangeTheme } from '@/store/actions/theme'

export function useTheme(): [ITheme, themeActions] {
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const dispatch = useDispatch()

  return [
    theme,
    {
      ChangeTheme({ newTheme, _id }: IChangeTheme) {
        dispatch(ChangeTheme(newTheme.nameTheme))
        console.log('need update to server _id = ', _id)
      },
    },
  ]
}
