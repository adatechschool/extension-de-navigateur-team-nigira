export const goTobreak = [
  '/audios/Audio_giau_pause.mp3',
  '/audios/Audio_nico_pause.mp3',
  '/audios/Audio_Raissa_pause.mp3'
];

export const goToWork = [
  '/audios/Audio_giau_taff.mp3',
  '/audios/Audio_nico_taff.mp3',
  '/audios/Audio_Raissa_taff.mp3'
]

export const playSound = (arrSound) => {

    const audioIndex = Math.floor(Math.random() * arrSound.length);
    const audioPath = chrome.runtime.getURL(arrSound[audioIndex]);
    console.log('audio path:', audioPath)
    const audio = new Audio(audioPath)
    audio.play()
}
