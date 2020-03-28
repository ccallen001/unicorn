<template>
  <div id="view-Home" class="view">
    <div class="background"></div>
    <img class="rainbow-poo" src="../assets/images/rainbow-poo.png" @click="fart" />

    <h2 class="view-title">Home</h2>

    <div class="message-container">
      <ul ref="messageList" class="message-list">
        <li v-if="!messages.length">
          <strong>Loading unicorn poop...</strong>
          <br />
          <br />or
          <br />
          <br />Try feeding me some text.
        </li>
        <li v-for="message in messages" :key="message.id" :id="message.id">
          -
          <strong>{{ message.text }}</strong>
          <span :id="`delete-${message.id}`" @click="deleteMessage">X</span>
        </li>
      </ul>

      <div ref="rainbowsContainer" class="rainbows-container">
        <img
          v-for="rainbow in rainbows"
          :key="rainbow.index"
          class="rainbow"
          src="../assets/images/rainbow.gif"
          :style="{ position: 'relative', bottom: `${rainbow}px` }"
        />
      </div>

      <div class="input-container">
        <input
          ref="messageInput"
          placeholder="feed me text"
          v-model="userMessage"
          @keyup.enter="postMessage"
        />
        <div class="btn-post-message" @click="postMessage">🦄</div>
        <img
          ref="rainbowExplosion"
          class="rainbow-explosion"
          src="../assets/images/rainbow-explosion.gif"
        />
      </div>

      <audio ref="fart">
        <source src="../assets/sounds/fart.wav" />
      </audio>
    </div>
  </div>
</template>

<style lang="scss">
#view-Home {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url("../assets/images/home-background.jpeg") no-repeat center /
      cover;
    opacity: 0.25;
  }

  .rainbow-poo {
    @keyframes float {
      25% {
        top: 66vh;
        left: 66vw;
      }

      50% {
        top: 66vh;
        left: 64px;
        transform: rotate(1080deg) scale(20);
      }

      75% {
        top: 64px;
        left: 66vw;
      }

      100% {
        transform: rotate(2160deg) scale(1);
      }
    }

    position: absolute;
    top: 64px;
    left: 64px;
    z-index: 1;
    width: 64px;

    animation: float 30000ms ease-in infinite;
  }

  $backgroundColor: rgba(255, 255, 255, 0.75);
  $boxShadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  .view-title {
    text-shadow: $boxShadow;
  }

  .message-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;

    .message-list {
      position: relative;
      z-index: 2;
      margin: auto 0;
      padding: 8px;
      height: 55vh;
      background-color: $backgroundColor;
      font-size: 0.8rem;
      border: 1px solid;
      border-radius: 4px;
      box-shadow: $boxShadow, 0 4px 16px rgba(0, 0, 0, 0.33);
      overflow: auto;

      li {
        margin-bottom: 8px;

        [id^="delete-"] {
          margin-left: 8px;
          color: red;
          font-weight: bold;
        }
      }
    }

    .rainbows-container {
      @keyframes rise {
        to {
          bottom: 400px;
          opacity: 0;
        }
      }

      position: absolute;
      bottom: -28px;
      z-index: -1;
      display: none;
      justify-content: space-around;
      width: 100%;
      opacity: 0.5;

      .rainbow {
        height: 32px;
      }
    }

    .input-container {
      $paddingLeftRight: 12px;

      position: relative;
      z-index: 2;
      margin-top: auto;
      font-size: 1.2rem;

      input {
        position: relative;
        padding: 20px $paddingLeftRight;
        width: 100%;
        background-color: $backgroundColor;
        border: 1px solid;
        border-radius: 16px;
        box-shadow: $boxShadow;
        outline: none;
      }

      .btn-post-message {
        position: absolute;
        right: $paddingLeftRight + 4px;
        top: 50%;
        transform: translateY(-55%);
      }

      .rainbow-explosion {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: none;
        width: 200px;
      }
    }
  }
}
</style>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "view-Home",
  data: () => ({
    messages: [],
    rainbows: [16, 32, 64, 16, 48, 16],
    userMessage: ""
  }),
  created() {
    firebase
      .firestore()
      .collection("messages")
      .onSnapshot(snapshot => {
        let messages = [];

        snapshot.forEach(doc => messages.push(doc.data()));

        this.messages = messages.sort((curr, prev) => {
          const currTime = parseInt(curr.id);
          const prevTime = parseInt(prev.id);

          return currTime <= prevTime ? (currTime !== prevTime ? -1 : 0) : 1;
        });
      });
  },
  updated() {
    const messageList = this.$refs.messageList;

    messageList.scrollTo({
      top: messageList.scrollHeight,
      left: 0,
      behavior: "smooth"
    });
  },
  methods: {
    fart() {
      this.$refs.fart.play();
      (function hueRotate(deg) {
        if (deg === 360) return;
        document.body.style = `filter: hue-rotate(${deg}deg)`;
        setTimeout(() => {
          hueRotate(++deg);
        }, 1);
      })(1);
    },
    deleteMessage({ currentTarget }) {
      const shouldDeleteMessage = confirm(
        `Do you want to delete the message "${currentTarget.parentElement.textContent.slice(
          0,
          -1
        )}"?`
      );

      if (shouldDeleteMessage) {
        firebase
          .firestore()
          .collection("messages")
          .doc(currentTarget.id.replace("delete-", ""))
          .delete();
      }
    },
    async postMessage() {
      const userMessage = this.userMessage;

      if (userMessage) {
        const id = `${new Date().getTime()}`;
        const {
          messageInput,
          messageList,
          rainbowsContainer,
          rainbowExplosion
        } = this.$refs;

        await firebase
          .firestore()
          .collection("messages")
          .doc(id)
          .set({
            id,
            text: this.userMessage
          });

        rainbowExplosion.style.display = "block";
        setTimeout(() => {
          rainbowExplosion.style.display = "none";
        }, 1000);
        rainbowsContainer.style.animation = "rise 4000ms linear forwards";
        rainbowsContainer.style.display = "flex";
        rainbowsContainer.onanimationend = () => {
          rainbowsContainer.style.animation = "none";
          rainbowsContainer.style.display = "none";
        };

        this.userMessage = "";
        messageInput.blur();
      }
    }
  }
};
</script>