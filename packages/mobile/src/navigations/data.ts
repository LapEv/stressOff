export const verticalAnimationDownUp = {
  headerShown: false,
  // eslint-disable-next-line
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    }
  },
}

export const dataTab = [
  {
    id: 1,
    title: 'Мои миксы',
    keys: 'dataTab_1',
  },
  {
    id: 2,
    title: 'Звуки',
    keys: 'dataTab_2',
  },
  {
    id: 3,
    title: 'Музыка',
    keys: 'dataTab_3',
  },
  {
    id: 4,
    title: 'Настройки',
    keys: 'dataTab_4',
  },
]
