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
          <tr>
            <th>Total Requests</th>
            <td>{{ count.toLocaleString() }} times</td>
          </tr>
          <tr>
            <th>Server Uptime</th>
            <td>{{ uptime.toLocaleString() }} seconds</td>
          </tr>
          <tr>
            <th>Public IP</th>
            <td><a :href="`https://ipinfo.io/${ipAddr}`" target="_blank" rel="noreferrer">{{ ipAddr }}</a></td>
          </tr>
        </v-simple-table>
      </v-card-subtitle>
    </v-card>
    <v-divider class="mt-2 mb-2" />
    <!-- Memory -->
    <v-card>
      <v-card-title>
	Memory (RAM)
	<v-spacer />
        <v-icon class="pr-2">
	  mdi-memory
	</v-icon>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
	  <tr>
	    <th>RSS <small>ResidentSetSize</small></th>
	    <td>{{ rss.toLocaleString() }}MB</td>
	  </tr>
	  <tr>
	    <th>Heap Total</th>
	    <td>{{ heapTotal.toLocaleString() }}MB</td>
	  </tr>
	  <tr>
	    <th>Heap Used</th>
	    <td>{{ heapUsed.toLocaleString() }}MB</td>
	  </tr>
	  <tr>
	    <th>External</th>
	    <td>{{ external.toLocaleString() }}MB</td>
	  </tr>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import server from "@/app/server";

const unit = 1024 * 1024;

let eid;
let stt;

export default {
  data: () => ({
    loading: true,
    active: false,
    pending: false,
    failed: false,
    ipAddr: null,
    processor: null,
    rss: 0,
    count: 0,
    heapTotal: 0,
    heapUsed: 0,
    uptime: 0,
  }),

  methods: {
    uptimeInterval() {
      try {
        eid = setInterval(() => {
          this.uptime = Math.round((Date.now() - stt) / 1000);
        }, 800);
      } catch(e) {
        console.error(e);
        clearInterval(eid);
        this.uptime = eid = undefined;
      }
    }
  },

  beforeDestroy() {
    if (eid) {
      clearInterval(eid);
      eid = undefined;
    }
  },

  created() {
    this.pending = true,
    this.axios
      .get(server.status)
      .then(({ data }) => {
        this.active = true;
        this.pending = this.failed = this.loading = false;
	this.ipAddr = data.ip;
        this.count = data.count;
        this.processor = null;
        this.rss = data.memory.rss;
        this.external = Math.round(data.memory.external / unit, 2);
	this.heapTotal = Math.round(data.memory.heapTotal / unit, 2);
	this.heapUsed = Math.round(data.memory.heapUsed / unit, 2);
        this.uptime = data.uptime;
        stt = Date.now() - (data.uptime * 1000);
        stt && this.uptimeInterval();
      })
      .catch((err) => {
	this.failed = true;
	this.pending = this.active = this.loading = false;
      });
  }
}
</script>
