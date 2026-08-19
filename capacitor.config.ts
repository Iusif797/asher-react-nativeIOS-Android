import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.asher.app',
  appName: 'ASHER',
  webDir: 'dist',
  backgroundColor: '#fafcfe',
  ios: {
    backgroundColor: '#fafcfe',
  },
  android: {
    backgroundColor: '#fafcfe',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 4000,
      launchAutoHide: true,
      fadeOutDuration: 320,
      backgroundColor: '#fafcfe',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: false,
    },
  },
}

export default config
