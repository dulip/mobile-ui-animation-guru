import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

import {CARD_HEIGHT, CARD_WIDTH} from '../components/Card';
import Card, {cards} from '../components/Card';
import StyleGuide from '../components/StyleGuide';
import {useAnimatedStyle} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';

interface GestureProps {
  width: number;
  height: number;
}

const PanGesture: FC<JSX.Element> = ({width, height}: GestureProps) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.offsetX = translationX.value;
      ctx.offsetY = translationY.value;
    },
    onActive: (event, ctx) => {
      translationX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translationY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: event => {
      translationX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, boundX],
      });
      translationY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, boundY],
      });
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler {...{onGestureEvent}}>
        <Animated.View style={style}>
          <Card card={cards[2]} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default PanGesture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
});
