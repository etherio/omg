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
                <code>{{ uptime }}</code>
              </td>
            </tr>
            <tr>
              <th>Public IP</th>
              <td class="text-right">
                <code>
                  <a
                    :href="`https://ipinfo.io/${ipAddr}`"
                    target="_blank"
                    rel="noreferrer"
                  >
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
  </v-container>
</template>

<script>
import server from "@/app/server";
const unit = 1024 * 1024;
let eid, stt;

export default {
  data: () => ({
    loading: true,
    active: false,
    pending: false,
    failed: false,
    ipAddr: null,
    rss: 0,
    count: 0,
    heapTotal: 0,
    heapUsed: 0,
    external: 0,
    uptime: 0,
  }),

  methods: {
    uptimeInterval() {
      try {
        let dt = new Date(Date.now() - this.uptime);
        eid = setInterval(() => {
          this.uptime = [
            dt.getUTCHours(),
            dt.getUTCMinutes(),
            dt.getUTCDate(),
          ].join(":");
          this.uptime = dt.getTime();
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
          this.count = data.count;
          this.rss = data.memory.rss;
          this.external = data.memory.external;
          this.heapTotal = data.memory.heapTotal;
          this.heapUsed = data.memory.heapUsed;
          this.uptime = data.uptime;
          stt = Date.now() - data.uptime * 1000;
          stt && this.uptimeInterval();
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
      return (Number(this.rss || 0) / unit).toFixed(3);
    },
    heapTotalInMB() {
      return (Number(this.heapTotal || 0) / unit).toFixed(3);
    },
    heapUsedInMB() {
      return (Number(this.heapUsed || 0) / unit).toFixed(3);
    },
    externalInMB() {
      return (Number(this.external || 0) / unit).toFixed(3);
    },
  },
};
</script>

<style scoped>
code {
  letter-spacing: 1.5px;
}
</style>
