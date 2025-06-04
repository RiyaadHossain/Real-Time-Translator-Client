import api from './api';
import * as FileSystem from 'expo-file-system';

export const uploadAudio = async (fileUri, {fromLang, toLang}) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) throw new Error('File does not exist');

    const formData = new FormData();
    formData.append('audio', {
      uri: fileUri,
      name: 'recording.m4a',
      type: 'audio/m4a',
    });
  formData.append("fromLang", fromLang);
  formData.append("toLang", toLang);

    const response = await api.post('/translation/upload-audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    return {data: response.data, success: true};
  } catch (error) {
    console.log(error);
    return {success: false}
  }
};
