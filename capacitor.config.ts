import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'IFCM-App',
  webDir: 'build',
  bundledWebRuntime: false,
  server:{
    //url:"http://192.168.1.99:8100"
   // url:"http://172.20.10.2:8100"
 //  url:"http://192.168.1.113:8100",
      url:"http://192.168.1.113:8100",
      hostname:"ifcm-app.com",
      androidScheme:"https",

  },
  
};

export default config;
