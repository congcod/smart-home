import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ProgressWidget from './ProgressWidget';
import globalTheme from '../theme/global-theme';
import { useRecoilState } from 'recoil';
import { sensorDataListState } from '../states/sensors';

export const Lecture = ({ id, name, firebaseName, icon, concrete, lectures }) => {
  return lectures !== undefined
    ? (
      <View style={stylesLecture.container}>
        <Text style={stylesLecture.titleLecture}>Lectura del sensor</Text>
        {
          concrete
            ? <LectureConcrete
              id={id}
              name={name}
              firebaseName={firebaseName}
              icon={icon}
              concrete={concrete}
              lectures={lectures}
            />
            : <LectureTacometer
              id={id}
              name={name}
              firebaseName={firebaseName}
              icon={icon}
              concrete={concrete}
              lectures={lectures}
            />
        }
      </View>
    )
    : <View style={stylesLecture.container}></View>;
}

const stylesLecture = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 20
  },
  titleLecture: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export const LectureTacometer = ({ id, name, firebaseName, icon, concrete, lectures }) => {
  const [ sensorDataList, setSensorDataList ] = useRecoilState(sensorDataListState);
  
  const getLastLecture = lectureName => {
    return +(sensorDataList[lectureName]);
  }
  
  const getProgress = id => {
    switch (id) {
      case 1: case 2:
        let temperature1 = getLastLecture(firebaseName);
        return (temperature1 + 10) * 2;
      case 3: case 4:
        let humidity = getLastLecture(firebaseName);
        return (humidity - 10) * 100 / 70;
      case 6:
        let gases = getLastLecture(firebaseName);
        return (gases - 300) * 100 / 9700;
      case 7: case 8:
        let distance = getLastLecture(firebaseName);
        return 100 - ((distance - 2) * 100 / 398);
    }

    return 0;
  }

  return (
    <View>
      <ProgressWidget
        id={id}
        name={name}
        firebaseName={firebaseName}
        icon={icon}
        concrete={concrete}
        lectures={lectures}
        data={getLastLecture(firebaseName)}
        progress={getProgress(id)}
      />
    </View>
  );
}

export const LectureConcrete = ({ id, name, firebaseName, icon, concrete, lectures }) => {
  const [ sensorDataList, setSensorDataList ] = useRecoilState(sensorDataListState);
  
  const getLastLecture = lectureName => {
    if (concrete) {
      return sensorDataList[lectureName] === 0
        ? 'NO' : 'SI';
    }

    return `${ sensorDataList[lectureName] }`;
  }

  const isActive = () => {
    return getLastLecture(firebaseName) === 'SI';
  }
  
  return (
    <View style={stylesConcrete.alertContainer}>
      <View style={stylesConcrete.alert}>
        {
          isActive()
            ? <View>
              <Text style={stylesConcrete.activeTitle}>
                El sensor esta registrando actividad
              </Text>
    
              <Text style={stylesConcrete.activeSubtitle}>
                Revisa que no haya ningun problema
              </Text>
            </View>
            : <View>
              <Text style={stylesConcrete.pasiveTitle}>
                El sensor no muestra actividad
              </Text>
    
              <Text style={stylesConcrete.pasiveSubtitle}>
                Las lecturas indican que todo esta bien
              </Text>
            </View>
        }

        <View>
          <FontAwesome5 
            name={ icon.name} size={40} 
            color={icon.color}
          />
        </View>
      </View>
    </View>
  );
}

const stylesConcrete = StyleSheet.create({
  alertContainer: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: globalTheme.colors.white.whitePrimary,
    borderRadius: 8,
    elevation: 2
  },
  alert: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red'
  },
  activeSubtitle: {
    fontSize: 14,
    color: 'red'
  },
  pasiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#404040'
  },
  pasiveSubtitle: {
    fontSize: 14,
    color: '#404040'
  }
});