import * as FileSystem from "expo-file-system";

export const moveRecording = async (originalUri) => {
  const customPath = `${FileSystem.documentDirectory}my_saved_recording.m4a`;

  try {
    await FileSystem.moveAsync({
      from: originalUri,
      to: customPath,
    });

    console.log("Moved recording to:", customPath);
  } catch (err) {
    console.error("Error moving file:", err);
  }
};
