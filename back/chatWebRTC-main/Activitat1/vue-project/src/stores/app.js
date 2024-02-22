import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        usersList: [],
        myUser: {},
        messages: []
    }), 
    actions: {
        setUsersList(usersList) {
            this.usersList = usersList;
        },
        setMyUser(myUser) {
            this.myUser = myUser;
        },
        setMessages(messages) {
            this.messages = messages;
        },
        getUsersList() {
            return this.usersList;
        },
        getMyUser() {
            return this.myUser;
        },
        getMessages() {
            return this.messages;
        },
        addNewMessage(message) {
            this.messages.push(message);
        }
    }
});