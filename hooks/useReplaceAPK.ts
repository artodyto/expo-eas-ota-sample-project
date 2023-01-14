import { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Updates from "expo-updates";

function useReplaceAPK() {
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [textProgress, setTextProgress] = useState<string>();

  const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const downloadResumable = (uri: string) =>
    FileSystem.createDownloadResumable(
      uri,
      FileSystem.documentDirectory + "awesome.apk",
      {},
      callback
    );

  const downloadOnPress = async (uri: string) => {
    try {
      const data = await downloadResumable(uri).downloadAsync();
      console.log("Finished downloading to ", data?.uri);

      setTextProgress("Finished downloading.");

      if (data?.uri) {
        const localURI = await FileSystem.getContentUriAsync(data.uri);
        setTextProgress("Installing...");
        const result = await IntentLauncher.startActivityAsync(
          "android.intent.action.VIEW",
          { data: localURI, flags: 1 }
        );

        if (!result.resultCode) {
          setTextProgress("Installation cancelled");
          return;
        }

        setTextProgress("Successfully installed.");
        setTimeout(() => {
          Updates.reloadAsync();
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { downloadOnPress, textProgress, downloadProgress };
}

export default useReplaceAPK;
