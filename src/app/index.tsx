import { isAxiosError } from 'axios'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { cssInterop } from 'nativewind'
import { useCallback, useEffect, useRef } from 'react'
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

import { api } from '../lib/api'

const StyledStripes = cssInterop(Stripes, {
  className: 'style',
})

const redirectUri = makeRedirectUri({
  scheme: 'spacetime',
})

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/Ov23lixd6blXTgl1UUzl',
}

export default function HomeScreen() {
  const processedAuthCodeRef = useRef<string | null>(null)

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'Ov23lixd6blXTgl1UUzl',
      scopes: ['identity'],
      redirectUri,
    },
    discovery,
  )

  const router = useRouter()

  const handleGithubOAuthCode = useCallback(
    async (code: string) => {
      if (processedAuthCodeRef.current === code) {
        return
      }

      const codeVerifier = request?.codeVerifier

      if (!codeVerifier) {
        return
      }

      processedAuthCodeRef.current = code

      try {
        const response = await api.post('/register', {
          code,
          codeVerifier,
          redirectUri,
        })

        const { token } = response.data

        await SecureStore.setItemAsync('token', token)

        router.push('/memories')
      } catch (error) {
        processedAuthCodeRef.current = null

        if (isAxiosError(error)) {
          console.log(error.response?.data ?? error.message)

          return
        }

        console.log(error)
      }
    },
    [request?.codeVerifier, router],
  )

  useEffect(() => {
    if (response?.type === 'success' && request?.codeVerifier) {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [request, response, handleGithubOAuthCode])

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
          disabled={!request}
          onPress={() => signInWithGithub()}
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
