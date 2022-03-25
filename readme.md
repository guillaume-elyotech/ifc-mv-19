# install

npm install -g @ionic/cli 


npm install @capacitor/storage


npm i reselect


npm install redux


npm i 

 # Live Serveur
 change url server with your url local 
 
 
 ionic.capacitor.json 
  #
   android/app/src/main  AndroidManifest.xml 
   
   
   add android:usesCleartextTraffic="true"
 # build and test 
 npx cap sync 
 
 ionic serve
## IOS 
npx cap open ios 


npx cap run  ios
## Android (/!\ need update graddle on graddle 7.0.4)  
npx cap open android 


npx cap run  android

 # How to start with Ios and Android?
  ```sh
git clone -b v16  https://github.com/ELYOTECH-PTY-LTD/IFCM && cd IFCM && npm install -g @ionic/cli 

```

 ```sh
npm install && ionic serve
```


###    copy your local host like this ( 192.168.0.1 ) to your capacitor.config.ts 
    
 ```sh
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'xxxxx.xxxx.xxx',
  appName: 'xxxx-xxx',
  webDir: 'build',
  bundledWebRuntime: false,
  server:{
    url:"your local address ip"
  },
};

export default config;

```

  ## Ios
  ```sh
npx cap open ios
```
  ```sh
npx cap run ios
```
## Android
 ```sh
npx cap open android
```
in your android studio upgrade gradle to 7.0.4

verify your gadle file Gradle Script > build.gradle

  ```sh
dependencies {
        classpath 'com.android.tools.build:gradle:7.0.4'
        classpath 'com.google.gms:google-services:4.3.5'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
```
 ```sh
npx cap run android
```
# CombineReducer.ts
function combineReducers<R extends { [key: string]: any }>(reducers: R)

# Update Graddle 7.0.4
npx cap open android 


update graddle inside your android studio
