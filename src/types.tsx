import {NavigationProp} from '@react-navigation/native';

export interface ScreenProps {
  navigation: NavigationProp<any, any>;
}

export interface FormFamilyMemberProps {
  familyMemberIndex: number;
  inputNameValue: string;
  inputAddressValue: string;
  setInputNameValue: React.Dispatch<React.SetStateAction<string>>;
  setInputAddressValue: React.Dispatch<React.SetStateAction<string>>;
  handleAddItem: () => void;
  setPhase: React.Dispatch<React.SetStateAction<SetupPhaseType>>;
}

export interface FormListFamilyMemberProps {
  data: {name: string; address: string}[];
  setPhase: React.Dispatch<React.SetStateAction<SetupPhaseType>>;
}

export interface FormPeriodicityProps {
  pieChartValue: number;
  setPieChartValue: React.Dispatch<React.SetStateAction<number>>;
  setPhase: React.Dispatch<React.SetStateAction<SetupPhaseType>>;
}

export interface FormVideoProps {
  data: {name: string; address: string}[];
  videoLoading: boolean;
  handleUploadVideo: () => void;
  handleSetupRecovery: () => void;
}

export type SetupPhaseType = 'family' | 'list' | 'periodicity' | 'video';
