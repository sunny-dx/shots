import { makeImageFromView } from "@shopify/react-native-skia";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import Editor from "./src/Editor";
import Preview from "./src/Preview";
import { viewportHeight, viewportWidth } from "./constants";
import ContextProvider from "./GlobalContext";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#121212",
    // overflow: "hidden",
    // backgroundColor: "black  ",
  },
});

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
const App = () => {
  const viewRef = useRef(null);
  const [snapshot, setSnapshot] = useState(null);
  const takeSnapshot = async () => {
    const data = await captureRef(viewRef);
    console.log(data);
    setSnapshot(data);
    return;
    // if (viewRef.current == null) {
    //   return;
    // }
    // Take the snapshot of the view
    const snapshot = await makeImageFromView(viewRef, (...e) =>
      console.log("callback from make", e)
    );
    console.log(snapshot);
    const image = snapshot.encodeToBase64();
    console.log(snapshot, image);
    setSnapshot(image);
  };

  return (
    <View style={styles.safeAreaView}>
      <StatusBar backgroundColor="#121212" style="dark" />
      <ContextProvider>
        <Preview viewRef={viewRef} scale={1} />
        <View
          style={{
            // display: "none",
            height: 0,
            width: 0,
            overflow: "hidden",
          }}
        >
          <Preview scale={2} exportable={true} />
        </View>
        {/* <Button
          // style={{
          //   width: 200,
          //   height: 200,
          //   backgroundColor: "red",
          // }}
          onPress={takeSnapshot}
          title="ViewShot"
        />
        {snapshot ? (
          <Image
            source={{
              uri: `data:image/jpeg;base64,${snapshot}`,
              uri: snapshot,
            }}
            style={{
              width: 150,
              height: 150,
            }}
          />
        ) : null} */}

        <Editor />
      </ContextProvider>
    </View>
  );
};

export default App;

// {/* <View
//           style={{
//             width: 300,
//             height: 300,
//             backgroundColor: "red",
//             position: "relative",
//           }}
//           ref={viewRef}
//         > */}
//           {/* <LinearGradient
//             // Background Linear Gradient
//             colors={["red", "blue", "green"]}
//             style={{ width: 300, height: 300 }}
//           /> */}
//           {/* <HelloWorld /> */}
//         {/* </View>
//         <Button onPress={takeSnapshot} title="ViewShot" /> */}
//         {/* {snapshot ? (
//           <Image
//             source={{
//               uri: `data:image/jpeg;base64,${snapshot}`,
//               uri: snapshot,
//             }}
//             style={{
//               width: 300,
//               height: 300,
//             }}
//           />
//         ) : null} */}
