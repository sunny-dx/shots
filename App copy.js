import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { makeImageFromView } from "@shopify/react-native-skia";
import { captureRef } from "react-native-view-shot";
import ImagePickerExample from "./src/ImagePicker";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const HelloWorld = () => {
  const size = 256;
  const r = size * 0.33;
  return (
    <Canvas style={{ flex: 1 }}>
      <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={size - r} cy={r} r={r} color="magenta" />
        <Circle cx={size / 2} cy={size - r} r={r} color="yellow" />
      </Group>
    </Canvas>
  );
};

const Reanimated = () => {
  const width = useSharedValue(100);
  const increase = useRef(true);

  const handlePress = () => {
    console.log(increase.current);
    let newValue = width.value;
    if (increase.current) {
      newValue += 100;
    } else {
      newValue -= 100;
    }
    width.value = withSpring(newValue);
    increase.current = !increase.current;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.box, width }} />
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
};

export default function App() {
  const viewRef = useRef(null);
  const [snapshot, setSnapshot] = useState(null);
  const takeSnapshot = async () => {
    const data = await captureRef(viewRef);
    console.log(data);
    setSnapshot(data);
    return;
    if (viewRef.current == null) {
      return;
    }
    // Take the snapshot of the view
    const snapshot = await makeImageFromView(viewRef);
    const image = snapshot.encodeToBytes()
    console.log(snapshot);
  };
  return (
    <>
      <View
        style={{
          height: 200,
          width: 200,
          backgroundColor: "green",
        }}
        ref={viewRef}
      ></View>
      <Button onPress={takeSnapshot} title="Screenshot" />
      <View style={styles.container}>
        {/* <Reanimated /> */}
        <Image
          source={{ uri: snapshot }}
          style={{
            width: 300,
            height: 300,
          }}
        />
        <ImagePickerExample />
        <Text>Open up App.js to start working on your app!</Text>
        {/* <HelloWorld /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    // justifyContent: "center",
  },
  box: {
    height: 100,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginVertical: 64,
  },
});
