<template>
  <div class="home">
    <v-card color="red" dark width="70vw" class="ma-auto my-5">
      <v-card-title>
        <div class="text-center text-h1" id="commingSoonText">
          <div>COMING SOON...</div>
        </div>
      </v-card-title>
    </v-card>

    <v-card
      class="col-sm-12 col-md-10 col-lg-8 ma-auto blue-grey lighten-4"
      elevation="10"
    >
      <v-row justify="center" class="px-3">
        <v-col
          class="col-10 col-md-6 white  rounded-xl"
          style="overflow:hidden; height: 250px;"
        >
          <div
            style="width: 120%; height: 250px; background-image:url('/images/floor.png'); position:relative; left:-10%;"
          >
            <v-img
              :style="
                `position:relative; top: ${-robotTopPos}px; left: ${-robotLeftPos}px;`
              "
              height="200px"
              src="/images/how-humans-think-human-only.png"
              contain
            >
            </v-img>
            <v-img
              :style="
                `position:relative; top:${-200 +
                  robotTopPos}px;left: ${robotLeftPos}px;`
              "
              height="200px"
              src="/images/how-humans-think-robot-only.png"
              contain
            >
            </v-img>
          </div>
        </v-col>
        <v-col class="col-10 col-md-6">
          <v-card-title>
            Data Labeling Service
          </v-card-title>
          <v-card-subtitle>
            Showing machines how we think.
          </v-card-subtitle>
          <v-card-text>
            Need to make sense of your data? To categorize it? You are in the
            right place. Our Data Labeling service can help you turn your data
            into information. While data labeling services are most useful for
            machine learning projects, it can have various other use cases too.
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <div class="grey lighten-2 mt-10">
      <v-row justify="space-between">
        <v-card
          class="ma-5 mx-auto col-10 col-sm-8 col-md-5 blue-grey darken-3"
          dark
        >
          <v-card-title>
            Ask Thousands of Questions <br />
            in Minutes
          </v-card-title>
          <hr />
          <v-row>
            <v-col class="col-12 col-lg-6">
              <v-card-text>
                Just give us a text list with your data and describe the
                question you wish to ask about it. The process is simple and
                straightforward. <br /><br />
                After that you'll be able to download the answers in the same
                order.
              </v-card-text>
            </v-col>
            <v-col class="col-12 col-lg-6">
              <div class="white rounded-xl">
                <v-img
                  height="250px"
                  width="250px"
                  class="mx-auto"
                  contain
                  src="/images/i-need-data.png"
                ></v-img>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card
          class="ma-5 mx-auto col-10 col-sm-8 col-md-5 blue-grey darken-3"
          dark
        >
          <v-card-title>
            Earn Money by Labeling Data <br />
            in Seconds
          </v-card-title>
          <hr />
          <v-row>
            <v-col class="col-12 col-lg-6">
              <v-card-text>
                Data Labeling is an easy type of work that can help you earn
                some money during your free time. It is especially attractive to
                people whose regular jobs involve a lot of waiting. <br /><br />
                With our service you'll be able to see the results of your work
                in seconds.
              </v-card-text>
            </v-col>
            <v-col class="col-12 col-lg-6">
              <div class="white rounded-xl">
                <v-img
                  height="250px"
                  width="250px"
                  class="mx-auto"
                  contain
                  src="/images/i-have-time.png"
                ></v-img>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </div>

    <v-container class="col-11 my-10 mx-auto">
      <div class="text-center text-h4">Why entrust your data to us?</div>
      <v-row class="align-stretch" justify="center">
        <v-col
          class="col-12 col-md-4"
          v-for="reason in businessReasons"
          :key="reason.title"
        >
          <v-card style="height:100%" class="blue-grey lighten-4">
            <v-card-title>
              <v-icon left>{{ reason.icon }}</v-icon>
              {{ reason.title }}
            </v-card-title>
            <hr />
            <v-card-text>
              {{ reason.text }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="col-11 my-10 mx-auto">
      <div class="text-center text-h4">Want to earn money with us?</div>

      <v-row class="align-stretch" justify="center">
        <v-col
          class="col-12 col-md-4"
          v-for="reason in earningReasons"
          :key="reason.title"
        >
          <v-card style="height:100%" class="blue-grey lighten-4">
            <v-card-title>
              <v-icon left>{{ reason.icon }}</v-icon>
              {{ reason.title }}
            </v-card-title>
            <hr />
            <v-card-text>
              {{ reason.text }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <Subscribe></Subscribe>
    </v-container>
  </div>
</template>

<script>
import Subscribe from "../components/Subscribe";
export default {
  name: "Home",
  components: { Subscribe },
  data: function() {
    return {
      robotLeftPos: 0,
      robotTopPos: 0,

      businessReasons: [
        {
          icon: "mdi-send",
          title: "Pay As You Go",
          text:
            "Only pay for the labeling you receive. It is OK to stop halfway if you choose to."
        },
        {
          icon: "mdi-database",
          title: "Flexible Data Types",
          text:
            "A task can be a picture, a text question, a short video, an audio file... we support various different types."
        },
        {
          icon: "mdi-clock-fast",
          title: "It's Easy",
          text:
            "Tasks can be generated in bulk. Making 10 is just as easy as making 10'000."
        },
        {
          icon: "mdi-shopping",
          title: "Task Marketplace",
          text:
            "We let you choose how much to pay for yor tasks. If you are in a hurry - pay more. If you can wait - go cheap. Our users decide which tasks to solve based on payout and complexity."
        },
        {
          icon: "mdi-bookmark-multiple-outline",
          title: "Diversified Answers",
          text:
            "Our task solvers are normal users. A person can solve as few as 10 tasks and still get paid. Furthermore, the same questions can be answered by different people."
        },
        {
          icon: "mdi-camera-control",
          title: "Quality Control",
          text:
            'Our system lets you define your own Quality Control, through "Control Tasks". Simply answer correctly a few of your own questions and let us detect if other users get these control questions wrong.'
        }
      ],

      earningReasons: [
        {
          icon: "mdi-beach",
          title: "Work From Anywhere",
          text:
            "You only need a reliable internet connection and an web browser."
        },
        {
          icon: "mdi-av-timer",
          title: "Manage Your Own Time",
          text:
            "You could get paid for as little as a few seconds of work. You are in control of how much time you spend earning."
        },
        {
          icon: "mdi-cash-multiple",
          title: "Digital Patyments",
          text:
            "Payments in Bitcoin are fast, ultra-cheap and direct. Bitcoin can be converted to your preferred national currency, or spent online directly."
        }
      ]
    };
  },
  created() {
    window.addEventListener("mousemove", ev => {
      var x = ev.x / window.screen.width;
      var y = ev.y / window.screen.height;
      this.robotTopPos = -60 * (y - 0.5);
      this.robotLeftPos = -60 * (x - 0.5);
    });
  }
};
</script>

<style scoped>
#commingSoonText {
  height: 1em;
}
#commingSoonText > * {
  position: relative;
  top: 20px;
  width: 70vw;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  /* Starting position */
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  /* Apply animation to this element */
  -moz-animation: scroll-slow 7s linear infinite;
  -webkit-animation: scroll-slow 7s linear infinite;
  animation: scroll-slow 7s linear infinite;
}
/* Move it (define the animation) */
@-moz-keyframes scroll-slow {
  0% {
    -moz-transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%);
  }
}
@-webkit-keyframes scroll-slow {
  0% {
    -webkit-transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(-100%);
  }
}
@keyframes scroll-slow {
  0% {
    -moz-transform: translateX(100%); /* Browser bug fix */
    -webkit-transform: translateX(100%); /* Browser bug fix */
    transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%); /* Browser bug fix */
    -webkit-transform: translateX(-100%); /* Browser bug fix */
    transform: translateX(-100%);
  }
}
</style>
