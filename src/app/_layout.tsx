import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { cssInterop } from 'nativewind'
import { useEffect, useState } from 'react'
import { ImageBackground, StatusBar } from 'react-native'

import blurBackground from '../assets/bg-blur.png'
import Stripes from '../assets/stripes.svg'

import '../global.css'

const StyledStripes = cssInterop(Stripes, {
  className: 'style',
})

export default function RootLayout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null)

  SplashScreen.preventAutoHideAsync()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return null
  }

  SplashScreen.hideAsync()

  return (
    <ImageBackground
      source={blurBackground}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen
          name="index"
          redirect={isUserAuthenticated ?? undefined}
        />
        <Stack.Screen name="memories" />
      </Stack>
      <StatusBar barStyle="light-content" translucent />
    </ImageBackground>
  )
}
