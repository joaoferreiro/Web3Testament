import React from 'react';
import {Text, View, Pressable} from 'react-native';

import CircleSlider from '../../components/CircleSlider';
import {FormPeriodicityProps} from '../../types';
import {styles} from '../../screens/Setup';
import colors from '../../utils/colors';

export default ({
  pieChartValue,
  setPieChartValue,
  setPhase,
}: FormPeriodicityProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Warning Periodicity</Text>
      <Text style={styles.secondaryText}>
        From time to time you will need to push the button to prove you are with
        us.
      </Text>
      <View style={styles.slider}>
        <CircleSlider
          btnRadius={22.5}
          dialRadius={120}
          dialWidth={45}
          meterColor={colors.primary}
          fillColor={colors.tertiary}
          textColor={colors.primary}
          onValueChange={(x: number) => setPieChartValue(x * 1)}
          value={pieChartValue}
        />
        <Text style={styles.sliderMainText}>{pieChartValue}</Text>
        <Text style={styles.sliderSecondaryText}>days</Text>
      </View>
      <Pressable onPress={() => setPhase('video')} style={styles.nextButton}>
        <Text style={styles.buttonText}>{'Next'}</Text>
      </Pressable>
    </View>
  );
};
