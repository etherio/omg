<script>
import firebase from "firebase/app";

export default {
  beforeRouteEnter: () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        location.reload();
      }),
};
</script>
