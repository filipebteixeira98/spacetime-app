import { StatusBar, Text, View } from 'react-native'

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-zinc-950 items-center justify-center">
      <Text className="text-5xl font-bold text-zinc-50">Your time capsule</Text>
      <StatusBar barStyle="light-content" translucent />
    </View>
  )
}
