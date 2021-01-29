<template>
  <v-container>
    <h2>
      <v-badge
        :color="failed ? 'error' : active ? 'success' : 'warning'"
        bottom
        bordered
        dot
        overlap
      >
        <v-icon>mdi-server</v-icon>
      </v-badge>
      Server Status
    </h2>
    <v-divider class="mt-2 mb-2" />
    <!-- Total Requested -->
    <v-card>
      <v-card-title>
        Information
        <v-spacer />
        <v-icon class="pr-2">
          mdi-router-network
        </v-icon>
      </v-card-title>
      <v-card-subtitle>
        <v-simple-table>
          <tbody>
            <tr>
              <th>Total Requests</th>
              <td class="text-right">
                <code>{{ totalCount }} times</code>
              </td>
            </tr>
            <tr>
              <th>Server Uptime</th>
              <td class="text-right">
                <code>{{ uptimeInSeconds }} seconds</code>
              </td>
            </tr>
            <tr>
              <th>Public IP</th>
              <td class="text-right">
                <code>
                  <a @click="dialog = true">
                    {{ ipAddr }}
                  </a>
                </code>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-subtitle>
    </v-card>
    <v-divider class="mt-2 mb-2" />
    <!-- Memory -->
    <v-card>
      <v-card-title>
        RAM
        <v-spacer />
        <v-icon class="pr-2">
          mdi-memory
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <tbody>
            <tr>
              <th>Resident Set Size <small>(RSS)</small></th>
              <td class="text-right">
                <code>{{ residentSetSizeInMB }} MB</code>
              </td>
            </tr>
            <tr>
              <th>Heap Total</th>
              <td class="text-right">
                <code>{{ heapTotalInMB }} MB</code>
              </td>
            </tr>
            <tr>
              <th>Heap Used</th>
              <td class="text-right">
                <code>{{ heapUsedInMB }} MB</code>
              </td>
            </tr>
            <tr>
              <th>External</th>
              <td class="text-right">
                <code>{{ externalInMB }} MB</code>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          <code>{{ ipAddr }}</code>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <tbody>
              <tr v-show="ipDetails.bogon">
                <th>Network Type</th>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      Bongo
                      <v-icon v-bind="attrs" v-on="on" small
                        >mdi-information</v-icon
                      >
                    </template>
                    <span style="width: 500px;">
                      Some IP addresses and IP ranges are reserved for special
                      use, such as for local or private networks, and should not
                      appear on the public internet. These reserved ranges,
                      along with other IP ranges that haven’t yet been allocated
                      and therefore also shouldn’t appear on the public internet
                      are sometimes known as bogons.
                    </span>
                  </v-tooltip>
                </td>
              </tr>
              <tr v-show="ipDetails.city">
                <th>Provider</th>
                <td>{{ ipDetails.org }}</td>
              </tr>
              <tr v-show="ipDetails.city">
                <th>City</th>
                <td>{{ ipDetails.city }}</td>
              </tr>
              <tr v-show="ipDetails.region">
                <th>Region</th>
                <td>{{ ipDetails.region }}</td>
              </tr>
              <tr v-show="ipDetails.country">
                <th>Country</th>
                <td>{{ ipDetails.country }}</td>
              </tr>
              <tr>
                <th>Timezone</th>
                <td>{{ ipDetails.timezone }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import server from "@/app/server";
const unit = 1024 * 1024;
let eid, stt;

export default {
  name: "ServerStatus",

  data: () => ({
    loading: true,
    active: false,
    pending: false,
    failed: false,
    ipAddr: null,
    ipDetails: {},
    rss: 0,
    count: 0,
    heapTotal: 0,
    heapUsed: 0,
    external: 0,
    uptime: 0,
    dialog: false,
  }),

  methods: {
    uptimeInterval() {
      try {
        eid = setInterval(() => {
          this.uptime = Date.now() - stt;
        }, 1000);
      } catch (e) {
        clearInterval(eid);
        this.uptime = eid = undefined;
      }
    },
  },

  beforeDestroy() {
    if (!eid) return;
    clearInterval(eid);
    eid = undefined;
  },

  beforeMount() {
    (this.pending = true),
      this.axios
        .get(server.status)
        .then(({ data }) => {
          this.active = true;
          this.pending = this.failed = this.loading = false;
          this.ipAddr = data.ip;
          this.ipDetails = data.ipDetails;
          this.count = data.count;
          this.rss = data.memory.rss;
          this.external = data.memory.external;
          this.heapTotal = data.memory.heapTotal;
          this.heapUsed = data.memory.heapUsed;
          this.uptime = data.uptime;
          stt = Date.now() - data.uptime * 1000;
          this.uptimeInterval();
        })
        .catch((err) => {
          this.failed = true;
          this.pending = this.active = this.loading = false;
        });
  },

  computed: {
    totalCount() {
      return Number(this.count || 0).toLocaleString();
    },
    residentSetSizeInMB() {
      return (Number(this.rss || 0) / unit).toFixed(2);
    },
    heapTotalInMB() {
      return (Number(this.heapTotal || 0) / unit).toFixed(2);
    },
    heapUsedInMB() {
      return (Number(this.heapUsed || 0) / unit).toFixed(2);
    },
    externalInMB() {
      return (Number(this.external || 0) / unit).toFixed(2);
    },
    uptimeInSeconds() {
      return (Number(this.uptime || 0) / 1000).toFixed(0);
    },
  },
};
</script>

<style scoped>
code {
  letter-spacing: 1.5px;
}
</style>
