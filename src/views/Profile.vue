<template>
  <v-container fluid>
    <h2>သင့်ပရိုဖိုင်</h2>
    <v-divider class="mt-2 py-5"></v-divider>
    <v-alert v-if="error" dense outlined type="error" v-html="error"></v-alert>

    <v-row justify="space-between" align="start">
      <v-col sm="5" cols="12" class="text-center">
        <v-avatar class="profile" color="grey" size="200">
          <v-img :src="avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col sm="7" cols="12">
        <v-text-field
          v-model="name"
          label="သင့်နာမည်"
          :readonly="readonly"
          outlined
          ref="displayName"
          value=" "
        />
        <v-text-field
          v-model="email"
          label="သင့်အီးမေးလ်"
          value=" "
          :readonly="readonly"
          outlined
        />
        <v-row class="pr-4">
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :color="readonly ? 'secondary lighten-2' : 'primary'"
            depressed
            @click="readonly = !readonly"
          >
            <v-icon
              class="pr-2"
              small
              v-text="readonly ? 'mdi-pencil' : 'mdi-content-save'"
            ></v-icon>
            <span v-text="readonly ? 'ပြင်ရန်' : 'သိမ်းရန်'"></span>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-card-title>စတင်ခဲ့သည့်နေ့</v-card-title>
        <v-card-text>{{ translateDate(createdAt) }}</v-card-text>
      </v-col>
      <v-col cols="6">
        <v-card-title>၀င်ရောက်ခဲ့သည့်နေ့</v-card-title>
        <v-card-text>{{ translateDate(lastLoginAt) }}</v-card-text>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn
          v-if="!linked.google"
          @click="linkWithGoogle"
          class="mt-3 mb-3 font-weight-bold"
          color="red"
          dark
          block
        >
          <v-icon class="pr-2" small>mdi-google</v-icon> ဖြင့်ချိတ်ဆက်ရန်
        </v-btn>
        <v-btn
          v-else
          @click="unlinkWithFacebook"
          class="mt-3 mb-3 font-weight-bold"
          color="secondary"
          dark
          text
        >
          <v-icon small class="pr-2">mdi-google</v-icon>
          ဖြင့်ချိတ်ဆက်မှုဖြုတ်ရန်​
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn
          v-if="!linked.facebook"
          @click="linkWithFacebook"
          class="mt-3 mb-3 font-weight-bold"
          color="blue darken-2"
          dark
          block
        >
          <v-icon small class="pr-2">mdi-facebook</v-icon> ဖြင့်ချိတ်ဆက်ရန်
        </v-btn>
        <v-btn
          v-else
          @click="unlinkWithFacebook"
          class="mt-3 mb-3 font-weight-bold"
          color="secondary"
          dark
          text
        >
          <v-icon small class="pr-2">mdi-facebook</v-icon>
          ဖြင့်ချိတ်ဆက်မှုဖြုတ်ရန်​
        </v-btn>
      </v-col>
      <v-col cols="12">
        <div style="height: 60px;"></div>
        <delete-profile-modal />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeleteProfileModal from "../components/DeleteProfileModal.vue";
import placeholder from "../assets/img/image.png";
import firebase from "firebase/app";
import { translateDateTime } from "@/app/burmese";

export default {
  name: "Profile",

  components: {
    DeleteProfileModal,
  },

  data: () => ({
    loading: false,
    email: null,
    name: null,
    password: null,
    error: null,
    linked: {
      password: false,
      google: false,
      facebook: false,
    },
    readonly: true,
  }),

  methods: {
    translateDate(d) {
      return translateDateTime(new Date(d), "d-m-Y(Dနေ့)၊ A h:i");
    },

    unlinkWithGoogle() {
      firebase
        .auth()
        .currentUser.unlink("google.com")
        .then(() => {
          this.linked.google = false;
        });
    },
    unlinkWithFacebook() {
      firebase
        .auth()
        .currentUser.unlink("facebook.com")
        .then(() => {
          this.linked.facebook = false;
        });
    },
    linkWithFacebook() {
      const user = firebase.auth().currentUser;
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope("public_profile,email");
      user
        .linkWithPopup(provider)
        .then(({ credential, additionalUserInfo }) => {
          this.providers.push(credential.providerId);
          sessionStorage.setItem("fb.credential", JSON.stringify(user));
        });
    },
    linkWithGoogle() {
      const user = firebase.auth().currentUser;
      const provider = new firebase.auth.GoogleAuthProvider();
      user.linkWithPopup(provider).then(({ credential }) => {
        this.providers.push(credential.providerId);
      });
    },
  },

  computed: {
    createdAt() {
      let dt = new Date();
      dt.setTime(this.$root.user.createdAt);
      return dt.toLocaleString();
    },

    lastLoginAt() {
      let dt = new Date();
      dt.setTime(this.$root.user.lastLoginAt);
      return dt.toLocaleString();
    },
  },

  beforeMount() {
    const user = this.$root.user;
    this.name = user.displayName || "";
    this.email = user.email || "";
    this.avatar = user.photoURL || placeholder;
    user.providerData.forEach((provider) => {
      switch (provider.providerId) {
        case "facebook.com":
          this.linked.facebook = true;
          break;
        case "google.com":
          this.linked.google = true;
          break;
        case "password":
          this.linked.password = true;
          break;
      }
    });
  },

  watch: {
    readonly(edited) {
      if (edited) {
        const mutated = {};
        const user = this.$root.user;
        if (user.displayName !== this.name) {
          mutated.displayName = this.name;
        }
        if (user.email !== this.email) {
          mutated.email = this.email;
        }
        if (Object.keys(mutated).length) {
          this.loading = true;
          firebase
            .auth()
            .currentUser.updateProfile(mutated)
            .then(() => {
              if ("displayName" in mutated) {
                this.$root.user.displayName = mutated.displayName;
              }
              if ("email" in mutated) {
                user.email = mutated.email;
              }
            })
            .catch((e) => {
              if ("displayName" in mutated) {
                this.name = user.displayName;
              }
              if ("email" in mutated) {
                this.email = user.email;
              }
            })
            .then(() => (this.loading = false));
        }

        return;
      }
      this.$refs.displayName.$el.scrollIntoView({
        block: "end",
        inline: "start",
        behavious: "smooth",
      });
    },
  },
};
</script>
