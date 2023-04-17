import { StatusBar } from 'react-native'
import OneSignal from 'react-native-onesignal'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Routes } from './src/routes'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'
import { tagUserInfoCreate } from './src/notifications/notificationsTags'

import { CartContextProvider } from './src/contexts/CartContext'
import { useEffect } from 'react'

OneSignal.setAppId('c130e86d-2ab9-4ba6-ad1e-9c59f13bce1d')

OneSignal.promptForPushNotificationsWithUserResponse()

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  tagUserInfoCreate()

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      const { actionId } = response.action as any

      switch (actionId) {
        case '1':
          return console.log('Ver todas')
        case '2':
          return console.log('Ver pedido')
        default:
          return console.log('Não foi clicado em um botão de ação')
      }
    })

    return () => unsubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
