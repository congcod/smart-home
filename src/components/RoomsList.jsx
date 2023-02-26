import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { roomsData } from "../utils/rooms-data";
import RoomCard from "./RoomCard";
import globalTheme from './../theme/global-theme.js';

export default function RoomsList() {
  const { rooms } = roomsData();

  return <View style={styles.container}>
    <Text style={styles.title}>Habitaciones</Text>

    {/* <FlatList
      data={rooms}
      ItemSeparatorComponent={() => <Separator/>}
      renderItem={({ item: room }) => (
        <RoomCard 
          id={room.id}
          name={room.name}
          image={room.image}
          sensors={room.sensors}
          onPress={() => console.log(room)}
        />
      )}
    /> */}

    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal 
      style={styles.scroll}
    >
      {rooms.map(room => (
        <RoomCard 
          key={room.id}
          id={room.id}
          name={room.name}
          image={room.image}
          sensors={room.sensors}
          onPress={() => console.log(room)}
        />
      ))}
    </ScrollView>
  </View>;
}

function Separator() {
  return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 30
  },
  title: {
    fontSize: globalTheme.fontSizes.titles,
    fontWeight: globalTheme.fontWeights.bold,
    marginBottom: 5,
  },
  scroll: {
    paddingBottom: 15
  }
});