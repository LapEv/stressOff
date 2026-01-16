import React, { PropsWithChildren, useEffect, useState } from 'react'
import { StyleSheet, View, PanResponder, Animated } from 'react-native'

// var Dimensions = require('Dimensions');
// var SCREEN_WIDTH = useWindowDimensions().width;
// var SCREEN_HEIGHT = useWindowDimensions().height;

export const SlideDirection = {
  LEFT: 'left',
  RIGHT: 'right',
  BOTH: 'both',
}

interface IProps extends PropsWithChildren {
  slideDirection: string
  onSlideSuccess: () => void
  onSlide?: (x: number) => void
  style: Record<string, unknown>
}

export interface IState {
  initialX?: number
  locationX?: number
  dx?: number
  animatedX?: Animated.Value | Animated.ValueXY
  released?: boolean
  swiped?: boolean
  buttonWidth?: number
}

export interface LayoutRectangle {
  x: number
  y: number
  width: number
  height: number
}
export interface LayoutChangeEvent {
  nativeEvent: {
    layout: LayoutRectangle
  }
}

export const SlideButton = (props: IProps) => {
  const [state, setState] = useState<IState>()
  // const [isTimeOut, set_isTimeOut] = useState()
  const [buttonWidth, setButtonWidth] = useState<number>(0)
  let panResponder

  useEffect(() => {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState
        return dx > 2 || dx < -2 || dy > 2 || dy < -2
      },
      onMoveShouldSetPanResponderCapture: (e_vt, gestureState) => {
        const { dx, dy } = gestureState
        return dx > 2 || dx < -2 || dy > 2 || dy < -2
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: () => {},

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0) return
        setState({
          ...state,
          locationX: evt.nativeEvent.locationX,
          dx: gestureState.dx,
        })
        onSlide(gestureState.dx)
      },

      onPanResponderRelease: () => {
        if (isSlideSuccessful()) {
          // Move the button out
          moveButtonOut(() => {
            setState({ ...state, swiped: true })
            props.onSlideSuccess()
          })

          // Slide it back in after 1 sec
          // set_isTimeOut(
          //   setTimeout(() => {
          //     moveButtonIn(() => {
          //       setState({
          //         ...state,
          //         released: false,
          //         dx: state?.initialX,
          //       })
          //     })
          //   }, 2000),
          // )
        } else {
          snapToPosition(() => {
            setState({
              ...state,
              released: false,
              dx: state?.initialX,
            })
          })
        }
      },

      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        snapToPosition(() => {
          setState({
            ...state,
            released: false,
            dx: state?.initialX,
          })
        })
      },

      onShouldBlockNativeResponder: () => {
        // Returns whether this component should block native components from
        // becoming the JS responder. Returns true by default. Is currently only
        // supported on android.
        return true
      },
    })
  }, [])

  /* Button movement of > 40% is considered a successful slide */
  const isSlideSuccessful = () => {
    if (!props.slideDirection) {
      return state!.dx! > state!.buttonWidth! * 0.2
    } else if (props.slideDirection === SlideDirection.RIGHT) {
      return state!.dx! > buttonWidth * 0.2
    } else if (props.slideDirection === SlideDirection.LEFT) {
      return state!.dx! < -(buttonWidth * 0.2)
    } else if (props.slideDirection === SlideDirection.BOTH) {
      return Math.abs(state!.dx!) > buttonWidth * 0.2
    }
  }

  const onSlide = (x: number) => {
    if (props.onSlide) {
      props.onSlide(x)
    }
  }

  // const onSlideSuccess = () => {
  //   if (props.onSlideSuccess !== undefined) {
  //     props.onSlideSuccess()
  //   }
  // }

  // const measureButton = () => {
  //   refs.button.measure((ox: number, oy: number, width: number, height:  number) => {
  //     setState({
  //       ...state,
  //       initialX: ox,
  //       buttonWidth: width,
  //     });
  //   });
  // }

  // const moveButtonIn = (
  //   onCompleteCallback: Animated.EndCallback | undefined,
  // ) => {
  //   const startPos =
  //     state!.dx! >= 0
  //       ? state!.initialX! + buttonWidth * 0.2
  //       : state!.initialX! - buttonWidth * 0.2
  //   const endPos = state!.initialX as number

  //   setState({
  //     ...state,
  //     released: true,
  //     animatedX: new Animated.Value(startPos),
  //   })
  //   Animated.timing(state?.animatedX as Animated.Value, {
  //     toValue: endPos,
  //     useNativeDriver: false,
  //   }).start(onCompleteCallback)
  // }

  const moveButtonOut = (
    onCompleteCallback: Animated.EndCallback | undefined,
  ) => {
    const startPos = state!.initialX! + state!.dx!
    const endPos = state!.dx! < 0 ? -buttonWidth * 0.2 : buttonWidth * 0.2

    setState({
      released: true,
      animatedX: new Animated.Value(startPos),
    })
    Animated.timing(state!.animatedX as Animated.Value, {
      toValue: endPos,
      useNativeDriver: false,
    }).start(onCompleteCallback)
  }

  const snapToPosition = (
    onCompleteCallback: Animated.EndCallback | undefined,
  ) => {
    const startPos = state!.initialX! + state!.dx!
    const endPos = state!.initialX as number

    setState({
      released: true,
      animatedX: new Animated.Value(startPos),
    })
    Animated.timing(state!.animatedX as Animated.Value, {
      toValue: endPos,
      useNativeDriver: false,
    }).start(onCompleteCallback)
  }

  const onLayout = (event: LayoutChangeEvent) => {
    setButtonWidth(event.nativeEvent.layout.width)
    setState({
      ...state,
      initialX: event.nativeEvent.layout.x,
    })
  }

  // componentWillUnmount() {
  //   if (this._isTimeOut) {
  //     clearTimeout(this._isTimeOut);
  //     this._isTimeOut = setTimeout(()=>{});
  //   }
  // }

  const style = [styles.button, props.style, { left: state!.dx }]
  const style2 = [styles.button, props.style, { left: state!.animatedX }]
  const button = state!.released ? (
    <Animated.View style={style2}>{props.children}</Animated.View>
  ) : (
    <View style={style}>
      <View onLayout={onLayout.bind(this)}>{props.children}</View>
    </View>
  )

  return (
    <View ref="button" style={styles.container} {...panResponder!.panHandlers}>
      {button}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
  },
})
