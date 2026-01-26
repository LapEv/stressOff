import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { languageActions } from './languageActions'
import { ILocalizationOptions } from '@/localization/interfaces'
import { IUpdateLanguage } from '@/hooks/interfaces'

export function useLanguage(): [ILocalizationOptions, languageActions] {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  // const dispatch = useDispatch()

  return [
    language,
    {
      UpdateLanguage(data: IUpdateLanguage) {
        console.log('data = ', data)
        // dispatch(UpdateMusicsStatusDB({ _id, newSound }))
      },
      ChangeLanguage() {
        // dispatch(ChangeLanguage({ _id, newSound }))
      },
    },
  ]
}
