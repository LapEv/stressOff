import { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import {
  useFilterList,
  useNewFilteredObjCat,
} from '../../hooks/useDropDownData'
import { Context } from '../../main'
import { appData } from 'data/app'
import { IDropDownData, IItem } from './interfaces'
import { DropDownGroup } from 'components/DropDownGroup/DropDownGroup'

export const DropDownData = observer((props: IDropDownData) => {
  const { data } = useContext(Context)
  const [value, setValue] = useState('')

  const {
    type,
    styleinputGroup,
    containerwidth,
    main,
    optional,
    list,
    getFileImg,
    getFileSound,
    ...inputProps
  } = props

  const dataSounds =
    type === 'Sounds' ? data.SoundCategories : data.MusicCategories

  const items =
    main === 'category'
      ? useNewFilteredObjCat(dataSounds, value, 'name', 'title', 'RUS')
      : main === 'storage'
        ? useFilterList(
            data.ListFiles,
            ['sounds\\', `${type}\\`],
            ['img\\'],
            value,
            'name',
          )
        : main === 'imgStorage'
          ? useFilterList(
              data.ListFiles,
              ['img', `${type}\\`],
              ['_lt'],
              value,
              'name',
            )
          : main === 'imgStorage_lt'
            ? useFilterList(
                data.ListFiles,
                ['img\\', `${type}\\`, '_lt'],
                ['*notIncludes*'],
                value,
                'name',
              )
            : list

  const onChange = (value: string | boolean) => {
    setValue(value as string)
    checkMediaChanges(value as string)

    if (main === 'category') {
      data.setCategory(dataSounds, value as string)
      return
    }
    const location =
      main === 'location'
        ? appData.locationArr.find(item => item.name === value)?.value
        : null
    value = main === 'location' ? (location as string) : value
    const payment =
      main === 'payment'
        ? appData.booleanArr.find(item => item.name === value)?.value
        : null
    value = main === 'payment' ? (payment as boolean) : value

    if (optional) {
      const current = data.CurrentObj
      data.setCurrentObj({
        ...data.CurrentObj,
        [main]: {
          [optional]: value,
          ...(current[main as keyof typeof current] as {}),
        },
      })
      return
    }
    if (main) {
      data.setCurrentObj({
        ...data.CurrentObj,
        [main]: value,
      })
    }
  }

  const checkMediaChanges = (value: string) => {
    if (
      getFileImg &&
      data.ActiveObj[main as keyof typeof data.ActiveObj] !== value
    ) {
      if (items.findIndex((item: IItem) => item.name === value) >= 0) {
        getFileImg(value)
      }
    }
    if (
      getFileSound &&
      data.ActiveObj[main as keyof typeof data.ActiveObj] !== value
    ) {
      if (items.findIndex((item: IItem) => item.name === value) >= 0) {
        getFileSound(value)
      }
    }
  }

  useEffect(() => {
    if (data.ActiveObj) {
      if (main === 'location') {
        setValue(
          appData.locationArr.find(
            item => item.value === data.ActiveObj.location,
          )?.name as string,
        )
        return
      }
      if (main === 'payment') {
        setValue(
          appData.booleanArr.find(
            item => item.value === (data.ActiveObj.payment as boolean),
          )?.name as string,
        )
        return
      }

      if (main === 'imgStorage') {
        setValue(data.ActiveObj.imgStorage)
        return
      }
      if (main === 'imgStorage_lt') {
        setValue(data.ActiveObj.imgStorage_lt)
        return
      }

      const activeObj = data.ActiveObj.title
      console.log('activeObj = ', activeObj)
      console.log('main = ', main)
      const active = activeObj[main as keyof typeof activeObj][
        optional as keyof typeof main
      ] as string

      optional
        ? setValue(appData.AddLabel.includes(active) ? '' : active)
        : setValue(
            appData.AddLabel.includes(
              data.ActiveObj[main as keyof typeof data.ActiveObj] as string,
            )
              ? ''
              : (data?.ActiveObj[
                  main as keyof typeof data.ActiveObj
                ] as string),
          )
    }
  }, [data?.ActiveObj])

  const getFirstValueOnBlur = (value: string) => {
    const activeObj = data.ActiveObj.title

    onChange(
      items.length > 0 && value
        ? items[0].name
        : optional
          ? activeObj[main as keyof typeof activeObj][
              optional as keyof typeof main
            ]
          : data?.ActiveObj[main as keyof typeof data.ActiveObj],
    )
  }

  return (
    <DropDownGroup
      required
      tabIndex={5}
      inputProps={inputProps}
      styleinputGroup={styleinputGroup}
      placeholder={appData.placeholders.required}
      label={appData.adminLabel.location}
      containerwidth={containerwidth}
      style={{ cursor: 'pointer' }}
      list={appData.locationArr}
      data={items}
      type={type}
      value={value}
      getFirstValueOnBlur={getFirstValueOnBlur}
      onChange={onChange}
    />
  )
})
