<template>
  <div v-if="this.$store.state.user !== null">
    <button @click="selectMenu = 'inbox'" :disabled="selectMenu == 'inbox'">
      Inbox
    </button>
    <button @click="selectMenu = 'archive'" :disabled="selectMenu == 'archive'">
      Faverite
    </button>
    <table class="mail-table">
      <tbody>
        <tr
          v-for="email in filteredEmails"
          :key="email.id"
          :class="['clickable', email.read ? 'read' : '']"
        >
          <td>
            <input :checked="email.faverite ? false : true" type="checkbox" />
          </td>
          <td @click="openEmail(email)">{{ email.emailFrom }}</td>
          <td @click="openEmail(email)">
            <p>
              <strong>{{ email.subject }}</strong> - {{ email.body }}
            </p>
          </td>
          <td @click="openEmail(email)" class="date">
            {{ format(new Date(email.sentAt), "MMM do yyyy") }}
          </td>
          <td><button @click="faveriteEmail(email)">Faverite</button></td>
          <td><button @click="deleteEmail(email)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <Modal v-if="openedEmail" @closeModal="openedEmail = null">
      <MailView v-if="openedEmail" :email="openedEmail" />
    </Modal>
  </div>
</template>

<script>
import { format } from "date-fns";
import { db } from "../main";
// import firebase from "firebase";
import MailView from "@/components/MailView.vue";
import Modal from "@/components/Modal.vue";
import { ref } from "vue";

export default {
  components: {
    MailView,
    Modal,
  },
  data() {
    return {
      format,
      emails: [],
      openedEmail: null,
      selectMenu: ref("inbox"),
    };
  },
  mounted() {
    this.$store.dispatch("getData");
  },
  computed: {
    sortedEmails() {
      let coppyData = this.$store.state.data;
      return coppyData.sort((a, b) => {
        return a.sentAt < b.sentAt ? 1 : -1;
      });
    },
    filteredEmails() {
      if (this.selectMenu == "inbox") {
        return this.sortedEmails;
      } else {
        return this.sortedEmails.filter((e) => !e.faverite);
      }
    },
  },
  methods: {
    openEmail(email) {
      this.updateEmail(email);
      this.openedEmail = email;
    },
    updateEmail(email) {
      db.collection("mailsAuth").doc(email.id).update({
        read: true,
      });
    },
    faveriteEmail(email) {
      db.collection("mailsAuth").doc(email.id).update({
        faverite: !email.faverite,
      });
    },
    deleteEmail(email) {
      this.$store.dispatch("deleteEmail", {
        id: email.id,
      });
    },
  },
};
</script>

<style></style>
