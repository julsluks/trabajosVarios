import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
      password: '',
    },
    infoVotos:{
      votos:[]
    }
  }),
  actions: {
    setLoginInfo(loggedIn, username, password) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
      this.loginInfo.password = password;
    },
    setVotos(votos){
      this.infoVotos.votos=votos;
    },
    getVotos(){
      return this.infoVotos.votos;
    },
    isLoggedIn(){
      return this.loginInfo.loggedIn;
    },
    getLoginInfo(){
      return this.loginInfo;
    }
  },
})