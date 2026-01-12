import { useContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import Scrollbar from 'react-scrollbars-custom'
import cl from '../General.module.css'
import { appData } from 'data/app'
import { Context } from '../../main'
import {
  useCategoriesDataInfo,
  useFilesDataInfo,
  useUsersRoles,
  useUsersTypes,
} from 'hooks'
import { IUserType, IUserRole } from './interfaces'
import { fileSizeString } from 'utils/fileSizeString'
import { InfoPanel } from 'components'
import { IInfoArrData } from 'components/InfoData/interfaces'

export const Info = observer(() => {
  const { data } = useContext(Context)
  const soundData = useCategoriesDataInfo(data.Sounds, data.SoundCategories)
  const musicData = useCategoriesDataInfo(data.Musics, data.MusicCategories)
  const allUsersTypes = useUsersTypes(data.Users) as IUserType
  const allUsersRoles = useUsersRoles(data.Users) as IUserRole
  const scrollRef = useRef<Scrollbar | null>(null)

  const filesData = [
    ...useFilesDataInfo(data.ListFiles, [
      { label: appData.infoLabels.fileLabels.images, folder: 'img' },
      { label: appData.infoLabels.fileLabels.sounds, folder: 'sound' },
    ]),
    ...[
      {
        id: 3,
        label: appData.infoLabels.fileLabels.imagesSize,
        count: fileSizeString(data.SizeImages),
      },
      {
        id: 4,
        label: appData.infoLabels.fileLabels.soundsSize,
        count: fileSizeString(data.SizeSounds),
      },
    ],
  ]

  const usersData = [
    {
      id: 1,
      label: appData.infoLabels.userLabels.allUsers,
      count: data.Users.length - 1,
    },
    {
      id: 2,
      label: appData.infoLabels.userLabels.isAnonymous,
      count: allUsersTypes.isAnonymous,
    },
    {
      id: 3,
      label: appData.infoLabels.userLabels.premiumUsers,
      count: allUsersTypes.premiumUser,
    },
    {
      id: 4,
      label: appData.infoLabels.userLabels.admins,
      count: allUsersRoles.ADMIN,
    },
    {
      id: 5,
      label: appData.infoLabels.userLabels.superAdmins,
      count: allUsersRoles.SUPERADMIN,
    },
  ]

  const items = [
    {
      nameSection: appData.infoLabels.generalStatisticsLabel,
      arrData: [
        {
          id: 1,
          label: appData.infoLabels.generalElements.allElements,
          count:
            data.Sounds.length && data.Musics.length
              ? data.Sounds.length + data.Musics.length - 2
              : '',
        },
        {
          id: 2,
          label: appData.infoLabels.generalElements.allSounds,
          count: data.Sounds.length ? data.Sounds.length - 1 : '',
        },
        {
          id: 3,
          label: appData.infoLabels.generalElements.allMusics,
          count: data.Musics.length ? data.Musics.length - 1 : '',
        },
        {
          id: 4,
          label: appData.infoLabels.generalElements.categoriesSound,
          count: data.SoundCategories.length
            ? data.SoundCategories.length - 1
            : '',
        },
        {
          id: 5,
          label: appData.infoLabels.generalElements.categoriesMusic,
          count: data.MusicCategories.length
            ? data.MusicCategories.length - 1
            : '',
        },
        {
          id: 6,
          label: appData.infoLabels.generalElements.files,
          count: data.MusicCategories.length ? data.ListFiles.length : '',
        },
        {
          id: 7,
          label: appData.infoLabels.generalElements.fileSizes,
          count:
            data.Sounds.length && data.Musics.length
              ? fileSizeString(data.SizeImages + data.SizeSounds)
              : '',
        },
      ],
    },
    {
      nameSection: appData.infoLabels.SoundStatisticsLabel,
      arrData: soundData,
    },
    {
      nameSection: appData.infoLabels.MusicStatisticsLabel,
      arrData: musicData,
    },
    {
      nameSection: appData.infoLabels.FilesLabel,
      arrData: filesData,
    },
    {
      nameSection: appData.infoLabels.UsersLabel,
      arrData: usersData,
    },
  ]

  return (
    data.Sounds.length > 0 && (
      <div className={cl.generalInfo} style={{ minWidth: 500 }}>
        <Scrollbar
          className={cl.scrollbarInfo}
          // eslint-disable-next-line
          ref={scrollRef as any}>
          {items.map((value, index) => (
            <div
              style={{ height: 'auto' }}
              key={`${value.nameSection}${index}`}>
              <InfoPanel
                nameSection={value.nameSection}
                arrData={value.arrData as IInfoArrData[]}
              />
            </div>
          ))}
        </Scrollbar>
      </div>
    )
  )
})
