import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

import '../global.css'

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  SplashScreen.hideAsync()

  return <Stack screenOptions={{ headerShown: false }} />
}
