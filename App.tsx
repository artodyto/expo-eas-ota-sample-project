import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import checkForUpdates from "./utils/checkForUpdates";
import useReplaceAPK from "./hooks/useReplaceAPK";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const { textProgress, downloadOnPress, downloadProgress } = useReplaceAPK();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 14, fontWeight: "bold", paddingBottom: 10 }}>
        EAS OTA UPDATE DEMO
      </Text>
      <Text style={{ fontSize: 10 }}>Version 1.0.7</Text>
      <Text>{textProgress}</Text>

      <StatusBar style="auto" />

      <Text style={{ alignSelf: "flex-start", marginBottom: 8, fontSize: 14 }}>
        Download Progress: {Math.floor(downloadProgress * 100) || 0}%
      </Text>

      <ProgressBar progress={downloadProgress} />
      <View
        style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity onPress={checkForUpdates} style={{ padding: 10 }}>
          <Text style={{ fontWeight: "bold", color: "#0ea5e9" }}>
            Check for updates
          </Text>
        </TouchableOpacity>
        <Button
          onPress={() => downloadOnPress("__PATH_TO_YOUR_APK__.apk")}
          title="Download APK"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
});
