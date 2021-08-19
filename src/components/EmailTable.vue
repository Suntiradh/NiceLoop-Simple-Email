<template>
  <div v-if="this.$store.state.user !== null">
    <button
      class="
        border border-gray-900
        bg-gray-200
        hover:bg-gray-400
        p-1
        font-medium
        mx-1
      "
      @click="selectMenu = 'inbox'"
      :disabled="selectMenu == 'inbox'"
    >
      Inbox
    </button>
    |
    <button
      class="
        border border-yellow-400
        bg-gray-200
        hover:bg-yellow-100
        p-1
        font-medium
        mx-1
      "
      @click="selectMenu = 'faverite'"
      :disabled="selectMenu == 'faverite'"
    >
      Faverite
    </button>
    <table class="mail-table my-4">
      <tbody>
        <tr
          v-for="email in filteredEmails"
          :key="email.id"
          :class="['clickable', email.read ? 'read' : 'unread']"
        >
          <td>
            <input :checked="email.faverite ? false : true" type="checkbox" />
          </td>
          <td @click="openEmail(email)">{{ email.emailFrom }}</td>
          <td @click="openEmail(email)">
            <p class="subject">
              <strong>{{ email.subject }}</strong> - {{ email.body }}
            </p>
          </td>
          <td @click="openEmail(email)" class="date">
            {{ format(new Date(email.sentAt), "MMM do yyyy") }}
          </td>
          <td><button class="p-2 border-yellow-400" @click="faveriteEmail(email)">Faverite</button></td>
          <td><button class="p-2 border-red-400" @click="deleteEmail(email)">Delete</button></td>
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
