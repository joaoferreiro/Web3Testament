import {NavigationProp} from '@react-navigation/native';

export interface ScreenProps {
  navigation: NavigationProp<any, any>;
}

export type SetupPhaseType = 'first' | 'second';
