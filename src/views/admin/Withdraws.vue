<template>
  <div class="dashboard px-3 px-md-10">
    <div class="text-h6">Administate: Withdraws</div>
    <p class="text-center grey--text lighten-1 mt-10" v-if="!isAdmin">
      You must be an admin to be able to use this page.
    </p>
    <v-container v-if="isAdmin">
      <v-row class="text-right">
        <v-spacer></v-spacer>
        <v-col>
          <v-btn outlined color="green" @click="updateRequests">
            <v-icon left>mdi-reload</v-icon>
            Reload
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="col-10 col-lg-8">
          <v-text-field
            v-model="searchString"
            prepend-icon="mdi-table-search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="col-11 col-lg-9">
          <v-data-table
            ref="withdrawRequestsTable"
            v-model="selectedItems"
            :headers="headers"
            :items="withdrawRequestsFlattenedData"
            item-key="id"
            sort-by="username"
            group-by="userHasSatoshisLeft"
            show-group-by
            selectable-key="userHasSatoshisLeft"
            class="elevation-3"
            show-select
            dense
            :search="searchString"
          >
            <template slot="body.append">
              <tr>
                <th class="text-right">Totals</th>
                <th class="text-right">{{ selectedItems.length }} selected</th>
                <th class="text-right">
                  {{ sum(selectedItems.map(i => i.satoshis)) }} sats
                </th>
                <th class="text-right">
                  ${{ sum(selectedItems.map(i => i.amountUsd)).toFixed(3) }}
                </th>
                <th class="text-right">
                  {{ sum(selectedItems.map(i => i.amountBsv)).toFixed(8) }} BSV
                </th>
              </tr>
            </template>
            <template v-slot:item.userSatoshisLeft="{ item }">
              <div :class="item.userHasSatoshisLeft ? '' : 'red--text'">
                {{ item.userSatoshisLeft }}
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col>
          <v-btn outlined color="red" @click="rejectInvalid">
            Reject Invalid Requests
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            outlined
            color="green"
            @click="showPaymentArea = !showPaymentArea"
          >
            <span> {{ showPaymentArea ? "Hide" : "Show" }} Payment Area</span>
          </v-btn>
        </v-col>
      </v-row>
      <div id="paymentArea" :class="showPaymentArea ? '' : 'hide'">
        <div
          v-if="!outputsForSelectedItems.length"
          class="grey--text text-center"
        >
          Select requests to pay!
        </div>
        <div class="text-center" v-if="outputsForSelectedItems.length">
          <div class="mbContainer">
            <MoneyButton
              :outputs="outputsForSelectedItems"
              label="Send"
              :clientIdentifier="$store.state.moneyButtonClientId"
              @payment="onPayment"
              @error="onError"
            ></MoneyButton>
          </div>

          <div class="text-h4">Outputs:</div>
          <div v-for="o in outputsForSelectedItems" :key="o.request.id">
            <span>
              {{ o.scriptObject.toAddress() || "Custom Script" }} -
              {{ o.amount }} BSV</span
            >
          </div>
        </div>
      </div>
      <br />
      <br />
    </v-container>
  </div>
</template>

<script>
import getPrice from "../../common/getPrice";
import MoneyButton from "vue-money-button";
import bsv from "bsv";

export default {
  name: "AdminWithdraws",
  data() {
    return {
      withdrawRequests: [],
      selectedItems: [],
      searchString: "",
      showPaymentArea: false,

      priceUsd: getPrice("USD"),

      headers: [
        { text: "Username", value: "username", align: "right" },
        {
          text: "Amount Left (sats)",
          align: "end",
          value: "userSatoshisLeft",
          groupable: false
        },
        {
          text: "Amount (USD)",
          align: "end",
          value: "amountUsd",
          groupable: false
        },
        {
          text: "Amount (BSV)",
          align: "end",
          value: "amountBsv",
          groupable: false
        }
      ]
    };
  },
  components: { MoneyButton },
  computed: {
    isAdmin() {
      return !this.user || !this.user.admin;
    },
    withdrawRequestsFlattenedData() {
      var satsInOneBitcoin = this.$store.state.satsInOneBitcoin;
      return this.withdrawRequests.map(i => {
        var amountBsv = parseFloat((i.satoshis / satsInOneBitcoin).toFixed(8));
        var amountUsd = parseFloat((amountBsv * this.priceUsd).toFixed(3));

        return {
          id: i.id,
          UserId: i.UserId,
          txOutput: i.txOutput,
          satoshis: i.satoshis,
          amountBsv: amountBsv,
          amountUsd: amountUsd,
          createdAt: new Date(i.createdAt),
          username: i.user.username,
          userSatoshis: i.user.satoshis,
          userSatoshisLeft: i.user.satoshisLeft,
          userHasSatoshisLeft: i.user.satoshisLeft >= 0
        };
      });
    },
    outputsForSelectedItems() {
      return this.selectedItems.map(i => {
        return {
          request: i,
          script: bsv.Script.fromHex(i.txOutput).toASM(),
          scriptObject: bsv.Script.fromHex(i.txOutput),
          amount: i.amountBsv.toFixed(8),
          amountNum: i.amountBsv,
          currency: "BSV"
        };
      });
    }
  },
  created() {
    this.updateRequests();
  },
  methods: {
    sum(numbers) {
      return numbers.reduce((total, v) => total + v, 0);
    },
    async getUsersForRequests(withdrawRequests) {
      var requestUserIds = withdrawRequests.map(i => i.UserId);
      var uniqueRequestUserIds = requestUserIds.filter(
        (v, i) => requestUserIds.indexOf(v) === i
      );
      var users = await Promise.all(
        uniqueRequestUserIds.map(i =>
          fetch(this.$store.state.serverUrl + `/user/${i}`).then(res =>
            res.json()
          )
        )
      );
      var userIds = users.map(i => i.id);
      var usersOrderedLikeRequests = requestUserIds.map(
        i => users[userIds.indexOf(i)]
      );
      return usersOrderedLikeRequests;
    },
    async updateRequests() {
      console.log(`Updating request list.`);
      this.withdrawRequests = [];

      var requests = await fetch(
        this.$store.state.serverUrl +
          "/withdrawrequest?completed=false&rejected=false"
      ).then(res => res.json());

      var users = await this.getUsersForRequests(requests);
      for (let i = 0; i < requests.length; i++)
        users[i].satoshisLeft = users[i].satoshis;

      for (let i = 0; i < requests.length; i++) {
        var req = requests[i];
        users[i].satoshisLeft = users[i].satoshisLeft - req.satoshis;
        req.user = users[i];
      }
      this.withdrawRequests = requests;
    },
    async rejectInvalid() {
      var requestsToReject = this.withdrawRequestsFlattenedData.filter(
        i => i.userHasSatoshisLeft === false
      );
      var promises = requestsToReject.map(req => {
        var body = JSON.stringify({ rejected: true });
        return fetch(
          this.$store.state.serverUrl + `/withdrawrequest/${req.id}`,
          {
            method: "PUT",
            body: body,
            headers: { "Content-Type": "application/json" }
          }
        ).then(res => res.json());
      });
      await Promise.all(promises);

      await this.updateRequests();
    },
    async onPayment(tx) {
      var userTransactions = this.selectedItems.map(i => {
        return {
          txid: tx.txid,
          satoshis: -i.satoshis,
          isDeposit: false,
          UserId: i.UserId
        };
      });
      var txSavePromises = userTransactions.map(i => {
        return fetch(this.$store.state.serverUrl + "/usertransaction", {
          method: "POST",
          body: JSON.stringify(i),
          headers: { "Content-Type": "application/json" }
        }).then(res => res.json());
      });
      var savedTransactions = await Promise.all(txSavePromises);

      console.log(`Created ${savedTransactions.length} transaction records.`);

      var reqUpdatePromises = this.selectedItems.map((item, i) => {
        return fetch(
          this.$store.state.serverUrl + `/withdrawrequest/${item.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              UserTransactionId: savedTransactions[i].id,
              completed: true
            }),
            headers: { "Content-Type": "application/json" }
          }
        ).then(res => res.json());
      });
      var updatedRequests = await Promise.all(reqUpdatePromises);

      console.log(`Updated ${updatedRequests.length} requests.`);

      await this.updateRequests();
    },
    onError(err) {
      console.error("onError", err, arguments);
    }
  }
};
</script>

<style scoped>
.mbContainer {
  padding: 1em;
  display: inline-block;
  border-bottom: 1px solid black;
  margin-bottom: 1em;
}
#paymentArea {
  overflow: hidden;
  border: 1px solid black;
  padding: 1em;
  max-height: 5000px;
  overflow-y: scroll;
  transition: max-height 0.6s, padding-top 1s, padding-bottom 1s;
}
#paymentArea.hide {
  max-height: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
}
</style>
