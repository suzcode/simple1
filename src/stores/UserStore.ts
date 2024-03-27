import { defineStore } from 'pinia';

// export const useUserStore = defineStore("UserStore", {
//     state: () =>({
//         userProfilePicUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//     }),
//     actions: {
//         updateUserProfilePicUrl(newUrl: string) {
//             this.userProfilePicUrl = newUrl;
//         }
//     }
// });
export const useUserStore = defineStore('UserStore', {
    state: () => ({
      demoVariable: false,
    }),
    actions: {
      setDemoVariable(newValue: boolean) {
        this.demoVariable = newValue;
      },
    },
  });