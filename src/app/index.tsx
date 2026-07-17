import * as AuthSession from 'expo-auth-session'
import { cssInterop } from 'nativewind'
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import blurBackground from '../assets/bg-blur.png'
import Logo from '../assets/nlw-spacetime-logo.svg'
import Stripes from '../assets/stripes.svg'

const redirectUri = AuthSession.makeRedirectUri({
  // No proxy parameter here; it will default to your local bundler URL
})

console.log(redirectUri)
// Outputs something like: exp://192.168.1.100:8081/--/auth-callback

const StyledStripes = cssInterop(Stripes, {
  className: 'style',
})

export default function HomeScreen() {
  return (
    <ImageBackground
      source={blurBackground}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Your time capsule
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Collect memorable moments from your journey and share them (if you
            wish) with the world!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Set a reminder
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Made with 💕
      </Text>
      <StatusBar barStyle="light-content" translucent />
    </ImageBackground>
  )
}
