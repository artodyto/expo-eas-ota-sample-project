import * as Updates from "expo-updates";

export default async function checkForUpdates() {
  try {
    const hasUpdate = await Updates.checkForUpdateAsync();

    if (!hasUpdate.isAvailable) {
      alert("No Update Available!");
      return;
    }

    const result = await Updates.fetchUpdateAsync();
    if (result.isNew) {
      setTimeout(() => {
        Updates.reloadAsync();
      }, 800);
    }
  } catch (error: any) {
    alert(`ERROR: ${error.toString()}`);
  }
}
