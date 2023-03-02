import { View, StyleSheet, Text } from "react-native";
import SmartHomeLogo from "../components/SmartHomeLogo";
import CompleterSpace from "../components/CompleterSpace";
import ProgressWidget from "../components/ProgressWidget";
import useSensor from "../hooks/useSensor";
import globalTheme from "../theme/global-theme";
import { Lecture } from "../components/Lecture";

export default function Sensor({ route }) {
  const { id } = route.params;
  const { sensor } = useSensor(id);

  return <View style={styles.container}>
    <SmartHomeLogo
      title={sensor.name}
      subtitle={`Medidas de ${ sensor.name }`}
    />

    <Lecture
      {...sensor}
    />

    <CompleterSpace/>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalTheme.colors.blue.blue100
  }
});